<script>
    import { onMount } from 'svelte';
    import { goto } from '@roxi/routify';
    import axios from 'axios';
    import Icon from '@iconify/svelte';
    import { getLabel } from '../policyTypes.js';
    import { iconMapping } from '../policyTypes.js';
    import { baseURL } from '../urlconfig.js';

    let email = '';
    let username = '';
    let pdfList = [];
  
    function logout() {
      axios.get(baseURL+'/logout', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) { // Check if the request was successful
          localStorage.removeItem('session');
          console.log('Session Cleared');
          $goto('/Login');
        } else {
          console.log('Logout failed with status: ' + response.status);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  
    onMount(async () => {
      try {
        const response = await axios.get(baseURL+'/getUsername', { withCredentials: true });
        email = response.data.email;
        username = response.data.username;
        console.log(response);
        if (email == null){
          console.log('Not logged in')
          $goto('/Login')
        } else {
          console.log('Logged in ' + email)
          listPdf().catch(console.error);
        }
      } catch (err) {
        console.error(err);
      }
    });
  
  
    function viewPolicy(username, policyNumber) {
      $goto(`/Pdf?username=${username}&policyNumber=${policyNumber}`);
    }
  
    const listPdf = async () => {
  const response = await axios.get(baseURL+'/getPolicies', { withCredentials: true });
  pdfList = response.data;
  const currentDate = new Date();
  pdfList = pdfList.filter(pdf => {
    let date = new Date(pdf.E_DATE);
    pdf.E_DATE = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    let timeDiff = date.getTime() - currentDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 31) {
      pdf.daysUntilExpiry = diffDays;
    }
    return diffDays <= 0;  // Only include policies that have expired
  })
  .sort((a, b) => {
    // Convert strings to dates for comparison
    let aDate = new Date(a.E_DATE.split("/").reverse().join("-"));
    let bDate = new Date(b.E_DATE.split("/").reverse().join("-"));
    return aDate - bDate;
  });  // Sort the list by expiration date

  // Map the sorted list to only include the dates, then log the result
  const sortedDates = pdfList.map(pdf => pdf.E_DATE);
  console.log(sortedDates);
};

let showNav = false;
  function toggleNav() {
    showNav = !showNav;
  };


  </script>
  
  
  <html lang="en" class="body-dark">
    <body class="body-bg">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="https://www.bespokeinsurancegroup.com.au/">
            <img src="https://www.bespokeinsurancegroup.com.au/uploads/site_logo/site_logo.png">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" on:click={toggleNav} data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse {showNav ? '' : 'collapse'}" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#" on:click|preventDefault={() => $goto('/ListPolicies')}>Current Policies</a>
            </li>
            
            <li class="nav-item active">
              <a class="nav-link active" href="#"><b>Expired Policies</b></a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item end-button">
              <button class="btn btn-outline-light" href="#"><Icon icon="ion:person-sharp" color="white" width="20" height="20" /> {email}</button>
            </li>
            <li class="nav-item end-button">
              <button class="btn btn-outline-danger" href="#" on:click={logout}><Icon icon="material-symbols:logout" color="red" width="20" height="20" /> Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
      <div class="container-fluid mt-4">
        <div style="padding-bottom: 1em;">
        <h1>Expired Policies:</h1>
        <h5 style="color:grey;">There are {pdfList.length} expired policies on your account.</h5>
        </div>
        {#each pdfList as pdf}
          <div class="card border-1 shadow mb-3">
            <div class="card-body row ">
              <div class="col-sm-1 col-md-1 col-2 d-flex  justify-content-center align-items-center">
                <Icon  icon={iconMapping[pdf.TYPE] || iconMapping['default']}   color="black" width="3.5em" height="3.5em" />
              </div>
              <div class="col-md-4 col-10 d-flex flex-column justify-content-center align-items-start">
                <h5 class="policy-desc">{pdf.DESCRIPTION}</h5>
                <p class="card-subtitle text-muted">
                  <b>{getLabel(pdf.TYPE)}</b> - {pdf.POLICY_NUMBER}
                </p>
              </div>
              <div class=" col-md-4 col-12 d-flex flex-column align-items-center align-items-sm-start align-self-center align-self-md-start  p-2">
                <div class="date datebg-dark">Expiry date: {pdf.E_DATE}</div>
                {#if pdf.daysUntilExpiry}
                  <div class="date datebg-red">Expired {pdf.daysUntilExpiry} days ago</div>
                {/if}
              </div>
              <div class=" justify-content-sm-end justify-content-center col-md-3 col-12 d-flex align-self-md-center ">
                <button class="btn btn-dark" style="height: 2.5em;" on:click={() => viewPolicy(username, pdf.POLICY_NUMBER)}><Icon icon="material-symbols:search" color="white" width="30" height="30" /> View Policy</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </body>
</html>

  