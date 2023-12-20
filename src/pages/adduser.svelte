<script>
    import { goto } from '@roxi/routify';
    import { onMount } from "svelte";
    import axios from 'axios';
    import { baseURL } from '../urlconfig.js';

    let username = '';
    let name = '';
    let email = '';
    let password = '';
    let busername = '';

    onMount(async () => {

    try {
      const response = await axios.get(baseURL+'/getbUsername', { withCredentials: true });
      busername = response.data.busername;
      console.log(response);
      if (busername == null){
        console.log('Not logged in')
        $goto('/brokerLogin')
      } else {
        console.log('Logged in AddUser ' + busername)
      }
    } catch (err) {
      console.error(err);
    }
    });

  
    async function handleSubmit() {
      // Form validation can be performed here
  
      const response = await fetch(baseURL+'/addUserAndClient', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, password}),
        });

        if (response.ok) {
        // You can redirect to another page on successful user creation
        alert('Added user successfully');
        location.reload();
      } else {
        // Handle error
        const errorMessage = await response.text(); // get the error message from the server
        alert('Username is too long or has invalid characters', errorMessage);

        // Display the error message on the page
        // You should replace this with the appropriate method for your application
        //const errorElement = document.getElementById('error-message'); // replace 'error-message' with the ID of your error message element
        if (errorElement) {
          alert(errorMessage);
        }
      }}

      
  </script>
  
  <div class="container mt-5 text-align-center">
    
    <form on:submit|preventDefault={handleSubmit} class="m-5">
      <h5>Add User</h5>
      <div class="mb-3">
        <label class="form-label">
          User Name:
          <input type="text" maxlength=10 bind:value={username} class="form-control" required>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          Name:
          <input type="text" bind:value={name} class="form-control" required>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          Email:
          <input type="email" bind:value={email} class="form-control" required>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label">
          Password:
          <input type="password" bind:value={password} class="form-control" required>
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Add User</button>
    </form>
  </div>
  