<script>
    import { goto } from '@roxi/routify';
    import { onMount } from "svelte";
    import axios from 'axios';
    import { baseURL } from '../urlconfig';

    
    let name = '';
    let email = '';
    let busername = '';
    let newPassword = '';
    let username = '';
    let usernames = [];
    let user = null;

    onMount(async () => {

        try {
        const response = await axios.get(baseURL+'/getbUsername', { withCredentials: true });
        busername = response.data.busername;
        if (busername == null){
            console.log('Not logged in')
            $goto('/brokerLogin')
        } else {
            console.log('Logged in Update User: ' + busername)
        }

        const userResponse = await axios.get(baseURL+'/usernames', { withCredentials: true });
        usernames = userResponse.data;
        // console.log(usernames);  // This log will show the result correctly

    } catch (err) {
        console.error(err);
    }

    });


  
    async function handleSubmit() {
        try {
            const response = await axios({
            method: 'post',
            url: baseURL+'/updateUser',
            data: {
                username,
                name,
                email
            },
            withCredentials: true
            });

            if (response.status === 200) {
            alert('Updated user successfully');
            location.reload();
            } else {
            throw new Error('An error occurred');
            }
        } catch (error) {
            alert(error.message);
        }
    }
    

    async function fetchUserInfo(username) {
        try {
            const response = await axios.get(baseURL+'/getUserInfo', {
                params: { username },
                withCredentials: true
            });

            user = response.data[0];

            name = user.NAME;
            email = user.EMAIL;
        } catch (err) {
            console.error(err);
        }
    }

    // Call fetchUserInfo when a username is selected
    $: if (username) {
        fetchUserInfo(username);
    }
</script>
  
<div class="container mt-5 text-align-center">
    <form on:submit|preventDefault={handleSubmit} class="m-5">
      <h5>Change User Information</h5>
      <div class="mb-3">
        <label class="form-label">
          Username:
          <select bind:value={username} class="form-select" required>
              <option disabled>Select a username</option>
              {#each usernames as name (name)}
                  <option>{name}</option>
              {/each}
          </select>
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
    <button type="submit" class="btn btn-primary">Update User</button>
     
    </form>
</div>