<script>
    import { onMount } from "svelte";
    import axios from 'axios';
    import { goto } from '@roxi/routify';
    import { baseURL } from '../urlconfig.js';

    let username = '';
    let linkedAccount = '';
    let usernames = [];


    onMount(async () => {
    try {
      const response = await axios.get(baseURL+'/getbUsername', { withCredentials: true });
      linkedAccount = response.data.busername;

      if (linkedAccount == null){
        console.log('Not logged in')
        $goto('/brokerLogin')
      } else {
        console.log('Logged in AddUser ' + linkedAccount)

        const usernamesResponse = await axios.get(baseURL+'/usernames', { withCredentials: true });
        usernames = usernamesResponse.data;
      }
    } catch (err) {
      console.error(err);
    }
    });

    async function handleSubmit() {
      const response = await fetch(baseURL+'/addLinkedUsername', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, linkedAccount}),
      });

      if (response.ok) {
        alert('Added user successfully');
        location.reload();
      } else {
        const errorMessage = await response.text();
        alert('Username is too long or has invalid characters', errorMessage);
      }
    }

    
</script>

<div class="container mt-5 text-align-center">
  <form on:submit|preventDefault={handleSubmit} class="m-5">
    <h5>Add Linked User</h5>
    <div class="mb-3">
      <label class="form-label">
        User Name:
        <input type="text" maxlength=10 bind:value={username} class="form-control" required>
      </label>
    </div>
    <div class="mb-3">
      <label class="form-label">
        Linked Account:
        <select bind:value={linkedAccount} class="form-control" placeholder="Select..." style="color:black;">
          {#each usernames as username (username)}
            <option>{username}</option>
          {/each}
        </select>
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Add User</button>
  </form>
</div>
