<script>
    import { onMount } from "svelte";
    import axios from 'axios';
    import { baseURL } from "../urlconfig";
  
    let users = [];
    let selectedUser = null;
    let policies = [];
    let selectedPolicy = null;
  
    onMount(async () => {
      try {
        const response = await axios.get(baseURL+'/usernames', { withCredentials: true });
        users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });
  
    async function selectUser(user) {
      policies = [];
      selectedPolicy = null;
      selectedUser = user;
      try {
        const response = await axios.get(baseURL+`/getPolicies?username=${user}`, { withCredentials: true });
        policies = response.data;
      } catch (error) {
        console.error(`Error fetching policies for ${user}:`, error);
      }
    }
  
    function selectPolicy(policy) {
      selectedPolicy = policy;
    }
  </script>
  
  <main>
    <h1>Insurance Broker Portal</h1>
    <h2>Select a User</h2>
    <select on:change={(e) => selectUser(e.target.value)}>
      <option disabled selected value>Select a user...</option>
      {#each users as user (user)}
        <option>{user}</option>
      {/each}
    </select>
  
    {#if selectedUser}
      <h2>Policies for {selectedUser}</h2>
      {#each policies as policy (policy.PDF_ID)}
        <div>
          <h3>{policy.POLICY_NUMBER} - {policy.TYPE}</h3>
          <button on:click={() => selectPolicy(policy)}>View Details</button>
        </div>
      {/each}
    {/if}
  
    {#if selectedPolicy}
      <h2>Policy Details</h2>
      <p>Policy Number: {selectedPolicy.POLICY_NUMBER}</p>
      <p>Type: {selectedPolicy.TYPE}</p>
      <p>Description: {selectedPolicy.DESCRIPTION}</p>
      <!-- Display other policy details here -->
    {/if}
  </main>
  