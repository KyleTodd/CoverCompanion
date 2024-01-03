import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { promises as fsp } from 'fs';
import fs from 'fs';
import path  from 'path';
import https from 'https';
import bcrypt from 'bcrypt';
import multer from 'multer';
import moment from 'moment';
import session from 'express-session';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
config({ path: path.resolve(process.cwd(), '.env') });
const dbPassword = process.env.DB_PW;
const serverUrl = process.env.SERVER_URL;
const backendUrl = process.env.BACKEND_URL;
console.log(dbPassword,serverUrl,backendUrl);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const options = {
  key: fs.readFileSync('privatekey.pem', 'utf8'),
  cert: fs.readFileSync('certificate.pem', 'utf8'),
  // ca: fs.readFileSync('gd_bundle-g2-g1.crt'), // CA bundle file
};

let now = moment().format('DD/MM/YYYY hh:mm:ss A');

app.use(session({
  secret: 'dem0d4ta', // This is a secret key for signing the session ID cookie.
  resave: false, // This forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: true, // This forces a session that is "uninitialized" to be saved to the store.
  cookie: { 
    secure: false, // If true, the browser sends the cookie only over HTTPS.
    httpOnly: false, // If true, the cookie cannot be accessed through client side script (highly recommended)
    maxAge: 24 * 60 * 60 * 1000 // Cookie expires after 24 hours
  }
}));

function authenticate(req, res, next) {
  const email = req.session.email;
  if (!email) {
    // User is not logged in
    res.send({ email: null })
    console.log('Authentication Not logged in');
  } else {
    // User is logged in
    req.email = email;
    console.log('Email is working ' + req.email);
    next();
  }
}

function brokerAuthenticate(req, res, next) {
  const busername = req.session.busername;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];

  if (!busername) {
    // User is not logged in
    res.send({ busername: null })
    console.log(chalk.red('Broker Authentication:')+ chalk.bold(' Not logged in'));
    console.log(`IP address: ${ip}`);
    console.log(`Device Info: ${userAgent}`);
  } else {
    // User is logged in
    req.busername = busername;
    // console.log('Broker username is working ' + req.busername);
    // console.log(`IP address: ${ip}`);
    // console.log(`Device Info: ${userAgent}`);
    next();
  }
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './PDF/'); // specify the directory to save files
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // specify the filename, in this case we prepend the current timestamp to the original file name
  }
});

const upload = multer({ storage: storage });

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
  origin: serverUrl,
  credentials: true
}));


const db = mysql.createPool({
  host: 'mysql-cc-covercompanion.a.aivencloud.com',
  port:'11940',
  user: 'avnadmin',
  password: dbPassword,
  database: 'defaultdb',
  ssl: {
    ca: fs.readFileSync('./ca.cer'), 
  },

});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Connected successfully to mysql-cc-covercompanion.a.aivencloud.com!');
    connection.release();
  } catch (err) {
    console.error('Connection error:', err.message);
  }
}

testConnection();

app.use('/PDF', express.static(path.join(__dirname, './PDF')));

//Hash the password passed into the function
async function hashPassword(password, saltRounds) {
  try {
      const salt = await bcrypt.genSalt(Number(saltRounds) || 10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
  } catch (err) {
      console.error(err);
      throw err;
  }
}

//UPDATED
app.get('/getUsername', authenticate, async (req, res) => {
  const email = req.session.email;

  try {
    const getClientSql = 'SELECT ID FROM Client WHERE EMAIL = ?';
    const [clientResult] = await db.query(getClientSql, [email]);

    if (clientResult.length === 0) {
      console.log('Client not found');
      res.status(404).send('Client not found');
      return;
    }

    const clientId = clientResult[0].ID;
    const getUserSql = 'SELECT USERNAME FROM User WHERE CLIENT_ID = ? AND LINKED IS NULL';
    const [userResult] = await db.query(getUserSql, [clientId]);

    if (userResult.length === 0) {
      console.log('User not found');
      res.status(404).send('User not found');
      return;
    }

    const username = userResult[0].USERNAME;
    console.log('/getusername result username: '+username);
    res.send({ email: email, username: username });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.post('/uploadPolicy', upload.single('pdf'), async (req, res) => {
  console.log('uploading');

  // The file information is available in req.file
  console.log(req.file);

  // You can now store additional details in your database, e.g.
  const username = req.body.username;
  const policyNumber = req.body.policyNumber;
  const policyType = req.body.policyType;
  const description = req.body.description;
  const fundingLink = req.body.fundingLink;
  const startDate = req.body.s_date;
  const expiryDate = req.body.e_date;

  // Create the username and policyNumber directories if they don't exist
  const userDir = path.join('./PDF', username);
  try {
    await fsp.access(userDir);
  } catch (e) {
    await fsp.mkdir(userDir, { recursive: true });
  }

  const policyDir = path.join(userDir, policyNumber);
  try {
    await fsp.access(policyDir);
  } catch (e) {
    await fsp.mkdir(policyDir, { recursive: true });
  }

  // Rename the file to USERNAME-POLICY_NUMBER
  const oldPath = req.file.path;
  const newPath = path.join(policyDir, `${username}-${policyNumber}${path.extname(req.file.originalname)}`);
  await fsp.rename(oldPath, newPath);

  const sql = 'INSERT INTO PDF (USERNAME, TYPE, POLICY_NUMBER, DESCRIPTION, FULL_LINK, LOCATION, FUNDING_LINK, E_DATE, S_DATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  try {
    await db.query(sql, [username, policyType, policyNumber,  description,"link", newPath, fundingLink, expiryDate, startDate]);
    console.log('Data added successfully');
    res.status(200).send('Data added successfully');
  } catch (err) {
    console.error('Failed to insert data', err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.get('/getPolicies', authenticate, async (req, res) => {
  const email = req.email;
  const getPoliciesSql = 'SELECT pdf.PDF_ID, pdf.TYPE, pdf.DESCRIPTION, pdf.LOCATION, pdf.FULL_LINK, pdf.FUNDING_LINK , pdf.POLICY_NUMBER, pdf.E_DATE, pdf.S_DATE FROM PDF pdf INNER JOIN User user ON pdf.USERNAME = user.USERNAME INNER JOIN Client client ON user.CLIENT_ID = client.ID WHERE client.EMAIL = ?';
  
  try {
    const [rows] = await db.query(getPoliciesSql, [email]);

    if (rows.length > 0) {
      console.log(rows);
      res.send(rows);
    } else {
      console.log('No results found.');
      res.status(404).send('No results found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.get('/getPdf', authenticate, async (req, res) => {
  const policyNumber = req.query.policyNumber;

  const sql = 'SELECT LOCATION FROM PDF WHERE POLICY_NUMBER = ?';

  try {
    const [rows] = await db.query(sql, [policyNumber]);

    if (rows.length > 0) {
      const pdfLocation = rows[0].LOCATION;
      const pdfUrl = backendUrl+`:3000/${pdfLocation}`; 
      res.json({ pdfUrl });
    } else {
      console.log('PDF not found');
      res.status(404).send('PDF not found');
    }
  } catch (err) {
    console.error('Failed to fetch PDF location', err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.post('/capture', authenticate, async (req, res) => {
  // extract information from request body
  const { policy_number, user_ip, username } = req.body;

  // get the current date and time from server
  const eventDateTime = new Date();

  // Insert captured information into the database
  const sql = 'INSERT INTO PageViews ( policy_number, view_date, user_ip, username) VALUES (?, ?, ?, ?)';
  
  try {
    const [result] = await db.query(sql, [policy_number, eventDateTime, user_ip, username]);
    console.log('Event data added successfully');
    res.status(200).send('Event data added successfully');
  } catch (err) {
    console.error('Failed to insert data', err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.get('/getPolicyLogs', brokerAuthenticate, async (req, res) => {
  // Extract policy number from the request
  const { policyNumber } = req.query;

  // SQL statement to retrieve logs for the specified policy number
  const sql = 'SELECT * FROM PageViews WHERE policy_number = ?';

  try {
    // Query the database using the promise-based method
    const [result] = await db.execute(sql, [policyNumber]);

    // Return the result to the client
    res.json(result);
    console.log('Getting logs of: '+policyNumber);
  } catch (err) {
    console.error('Failed to retrieve logs', err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.post('/addUserAndClient', brokerAuthenticate, async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || username.length > 10 || !/^[a-zA-Z0-9]+$/.test(username)) {
    res.status(400).send('Invalid username. It should be a maximum of 10 alphanumeric characters.');
    return;
  }

  const hashedPassword = await hashPassword(password, 'b3sp0ke!'); 

  // begin transaction
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const clientSql = 'INSERT INTO Client (EMAIL, PW_HASH, NAME) VALUES (?, ?, ?)';
    const [clientRows] = await connection.query(clientSql, [email, hashedPassword, name]);
    const clientId = clientRows.insertId;

    const userSql = 'INSERT INTO User (USERNAME, CLIENT_ID) VALUES (?, ?)';
    await connection.query(userSql, [username, clientId]);

    await connection.commit();
    
    console.log('User and client added successfully');
    res.status(200).send('User and client added successfully');
  } catch (err) {
    console.error('Failed to add user and client', err);
    await connection.rollback();
    res.status(500).send('Server error');
  } finally {
    connection.release();
  }
});

//UPDATED
app.post('/addLinkedUsername', brokerAuthenticate, async (req, res) => {
  const { username, linkedAccount } = req.body;

  if (!username || username.length > 10 || !/^[a-zA-Z0-9]+$/.test(username)) {
    res.status(400).send('Invalid username. It should be a maximum of 10 alphanumeric characters.');
    return;
  }

  // begin transaction
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Get CLIENT_ID from the linked account
    const userSql = 'SELECT CLIENT_ID FROM User WHERE USERNAME = ?';
    const [userRows] = await connection.query(userSql, [linkedAccount]);
    if (userRows.length === 0) {
      throw new Error(`Linked account '${linkedAccount}' not found.`);
    }
    const clientId = userRows[0].CLIENT_ID;

    const insertUserSql = 'INSERT INTO User (USERNAME, CLIENT_ID, LINKED) VALUES (?, ?, ?)';
    await connection.query(insertUserSql, [username.toUpperCase(), clientId, 1]);

    await connection.commit();
    
    console.log('User added successfully');
    res.status(200).send('User added successfully');
  } catch (err) {
    console.error('Failed to add user', err);
    await connection.rollback();
    res.status(500).send('Server error');
  } finally {
    connection.release();
  }
});

//UPDATED
app.get('/getbUsername', brokerAuthenticate, async (req, res) => {
  const busernameFromSession = req.session.busername;

  const getBrokerSql = 'SELECT USERNAME FROM Broker WHERE USERNAME = ?';

  try {
    const [brokerResult] = await db.query(getBrokerSql, [busernameFromSession]);

    if (brokerResult.length === 0) {
      console.log(chalk.yellow('Broker not found'));
      res.status(404).send('Broker not found');
      return;
    }

    const busernameFromDB = brokerResult[0].USERNAME;
    console.log(chalk.green('BrokerAuthenticate Success') +' Username logged in: '+ chalk.bold(busernameFromDB));
    res.send({ busername: busernameFromDB});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



//UPDATED
app.get('/brokerpolicies', brokerAuthenticate, async (req, res) => {
  const clientusername = req.query.username;
  console.log('Broker fetching policies from ' + clientusername)

  const getPoliciesSql = 'SELECT PDF_ID, TYPE, DESCRIPTION, LOCATION, FULL_LINK, FUNDING_LINK, POLICY_NUMBER, E_DATE, S_DATE FROM PDF WHERE USERNAME = ?';

  try {
    const [rows] = await db.query(getPoliciesSql, [clientusername]);

    if (rows.length > 0) {
      console.log(rows); // Output the result to the terminal
      res.send(rows); // Send the result as a response to the client
    } else {
      console.log('No results found.'); // Output to the terminal if no results
      res.status(404).send('No results found.'); // Send a 404 status to the client
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.get('/getPolicy/:username/:policyNumber', async (req, res) => {
  const { username, policyNumber } = req.params;

  const sql = `
    SELECT * FROM PDF
    WHERE USERNAME = ? AND POLICY_NUMBER = ?
  `;

  const params = [username, policyNumber];
  
  try {
    const [rows] = await db.query(sql, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Assuming that policyNumber is unique for each user, there should only be one row.
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching the policy.' });
  }
});

//UPDATED
app.put('/updatePolicy/:username', async (req, res) => {
  const { PDF_ID, TYPE, DESCRIPTION, FUNDING_LINK, USERNAME, POLICY_NUMBER, s_date, e_date } = req.body;

  const sql = `
    UPDATE PDF 
    SET 
      POLICY_NUMBER = ?,
      TYPE = ?, 
      DESCRIPTION = ?, 
      FUNDING_LINK = ?, 
      USERNAME = ?, 
      S_DATE = ?, 
      E_DATE = ?
    WHERE PDF_ID = ?
  `;

  const params = [POLICY_NUMBER, TYPE, DESCRIPTION, FUNDING_LINK, USERNAME, s_date, e_date, PDF_ID];

  let connection; // Define the connection outside the try block

  try {
    connection = await db.getConnection();

    await connection.query(sql, params);

    res.send({ message: 'Policy updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error occurred while updating the policy.' });
  } finally {
    if (connection) connection.release(); // Ensure the connection is released in case of error or success
  }
});

//UPDATED
app.delete('/deletePolicy/:username/:policyNumber', brokerAuthenticate, async (req, res) => {
  const policyNumber = req.params.policyNumber;
  const username = req.params.username;

  // Query the database to get the file location
  const getPolicySql = 'SELECT LOCATION FROM PDF WHERE POLICY_NUMBER = ?';

  try {
    const [result] = await db.query(getPolicySql, [policyNumber]);

    if (result.length === 0) {
      console.log(policyNumber + ', ' + username + ' Policy not found');
      return res.status(404).send(' Policy not found');
    }

    // Delete the file from server
    const policyLocation = result[0].LOCATION;
    await fs.unlinkSync(policyLocation);

    // First delete the referencing rows in pageviews
    const deletePageViewsSql = 'DELETE FROM pageviews WHERE policy_number = ?';
    await db.query(deletePageViewsSql, [policyNumber]);

    // Then delete the policy from the database
    const deletePolicySql = 'DELETE FROM PDF WHERE POLICY_NUMBER = ?';
    await db.query(deletePolicySql, [policyNumber]);

    console.log('Policy deleted successfully');
    res.status(200).send('Policy deleted successfully from ' + username);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.post('/updateUser', brokerAuthenticate, async (req, res) => {
  const { username, name, email } = req.body;

  try {
    // Execute UPDATE query to update user information in the database
    const result = await db.execute(
      'UPDATE User INNER JOIN Client ON User.CLIENT_ID = Client.ID SET Client.NAME = ?, Client.EMAIL = ? WHERE User.USERNAME = ?',
      [ name, email, username]
    );

    if (result.affectedRows === 0) {
      // If no rows were affected, the user was not found in the database
      console.log(username+' '+email+' '+name+' Not found');
      return res.status(404).json({ message: 'User not found' });

    }

    // If the user was updated successfully, return a success message
    console.log(username+' '+email+' '+name+' Updated');
    return res.status(200).json({ message: 'User updated successfully' });

  } catch (err) {
    console.error(err);
    console.log(username+' '+email+' '+name+' ERROR !');
    return res.status(500).json({ message: 'Server error' });
  }
});

//UPDATED
app.get('/getUserInfo', brokerAuthenticate, async (req, res) => {
  const username = req.query.username;
  console.log('Getting ready to update: '+  JSON.stringify(req.query.username));

  // Query the database with JOIN to get information from both User and Client tables
  const getUserResult = 'SELECT User.USERNAME, Client.NAME, Client.EMAIL, Client.ID  FROM User INNER JOIN Client ON User.CLIENT_ID = Client.ID WHERE User.USERNAME = ?';

  try {
    const [rows] = await db.query(getUserResult, [username]);

    if (rows.length > 0) {
      console.log(rows); // Output the result to the terminal
      res.status(200).send(rows); // Send the result as a response to the client
    } else {
      console.log('No results found.'); // Output to the terminal if no results
      res.status(404).send('No results found.'); // Send a 404 status to the client
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//UPDATED
app.get('/usernames', brokerAuthenticate, async (req, res) => {
  const sql = 'SELECT USERNAME FROM User';
  const busername = req.session.busername;

  try {
    const [rows] = await db.query(sql);

    const usernames = rows.map(row => row.USERNAME);
    
    res.json(usernames);
    console.log('Got list of client usernames for '+busername);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error fetching usernames for ' + busername);
  }
});

//UPDATED
app.get('/linkedusernames', brokerAuthenticate, async (req, res) => {
  const sql = 'SELECT USERNAME FROM User ';
  const busername = req.session.busername;

  try {
    const [rows] = await db.query(sql);

    const usernames = rows.map(row => row.USERNAME);
    
    res.json(usernames);
    console.log('Got list of client usernames for '+busername);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error fetching usernames for ' + busername);
  }
});

//UPDATED
app.post('/login', async (req, res) => {
  console.log('login url reached')
  const { email, password } = req.body;

  try {
    // Query the database to get the hashed password
    const sql = 'SELECT PW_HASH FROM Client WHERE EMAIL = ?';
    const [rows] = await db.query(sql, [email]);

    if (rows.length > 0) {
      const hashedPassword = rows[0].PW_HASH;
      // Use bcrypt.compare to check if the passwords match
      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        req.session.email = email;
        res.json({ success: true });
        console.log(Date.now()+' Successful Login from '+email);
      } else {
        res.json({ success: false });
        console.log(Date.now()+' Unsuccessful login from '+email);
      }
    } else {
      res.json({ success: false });
      console.log(Date.now()+' Unsuccessful login from '+email);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
});

//UPDATED
app.post('/brokerlogin', async (req, res) => {
  const { busername, password } = req.body;

  const sql = 'SELECT PW_HASH FROM Broker WHERE USERNAME = ?';
  
  try {
    const [rows] = await db.query(sql, [busername]);

    if (rows.length > 0) {
      const hashedPassword = rows[0].PW_HASH;

      const match = await bcrypt.compare(password, hashedPassword);

      if (match) {
        req.session.busername = busername;
        res.json({ success: true });
        console.log(chalk.green(now+' Successful Broker Login from ')+busername);
      } else {
        res.json({ success: false });
        console.log(chalk.red(now+' Unsuccessful Broker login from ')+busername);
      }
    } else {
      res.json({ success: false });
      console.log(chalk.red(now+' Unsuccessful Broker login from ')+busername);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
});

app.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.status(200).send('Logged Out');
    }
  });
});

https.createServer(options, app).listen(3000, () => {
  console.log(chalk.underline('Backend server started on port 3000'));
});
