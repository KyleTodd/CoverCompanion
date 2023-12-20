<script>
    import { onMount } from 'svelte';
    import { goto } from '@roxi/routify';
    import axios from 'axios';
    import { baseURL } from '../urlconfig';

    let username = '';
    let usernames = [];
    let busername = '';
    let policies = [];
    let noPolicies = false;
    let logs = [];
    let selectedPolicyNumber = '';
    let showModal = false;
    let showConfirmModal = false;
    let policyToDelete = null;
    let showExpired = false; 
    let displayedPolicies = [];
    let policyToEdit = null;
    let showEditModal = false;
    let originalPolicyNumber = '';

    const policyTypes = [
    {value: "ASSOCIATIO", label: "ASSOCIATIO - Association Liability"},
    {value: "BINT", label: "BINT - Business Interruption Insurance"},
    {value: "BOIL", label: "BOIL - Boiler Explosion"},
    {value: "BURG", label: "BURG - Burglary Insurance"},
    {value: "BUS", label: "BUS - Business Insurance"},
    {value: "BWACT", label: "BWACT - Builders Warranty ACT"},
    {value: "BWNSW", label: "BWNSW - Builders Warranty NSW"},
    {value: "COMP", label: "COMP - Computer Insurance"},
    {value: "COMSTRUCT", label: "COMSTRUCT - Commercial Structural Defects"},
    {value: "CONS", label: "CONS - Construction Insurance"},
    {value: "CROP", label: "CROP - Crop Insurance"},
    {value: "CVAN", label: "CVAN - Caravan Insurance"},
    {value: "CYB", label: "CYB - Cyber Crime"},
    {value: "CYBER", label: "CYBER - Security and Privacy"},
    {value: "D&O", label: "D&O - Directors and Officers Liability"},
    {value: "FARM", label: "FARM - Farm Insurance"},
    {value: "FEE ONLY", label: "FEE ONLY - Fee Only"},
    {value: "FIRE", label: "FIRE - Fire & Perils"},
    {value: "FLEET", label: "FLEET - Motor Fleet"},
    {value: "FMOT", label: "FMOT - Farm Motor Insurance"},
    {value: "GENP", label: "GENP - General Property"},
    {value: "GNL", label: "GNL - General Liability"},
    {value: "HH", label: "HH - Home Insurance"},
    {value: "HOME", label: "HOME - Home Insurance"},
    {value: "ISR", label: "ISR - Industrial Special Risks Insurance"},
    {value: "IT PI", label: "IT PI - Information Technology Professional Indemnity"},
    {value: "JEWBLO", label: "JEWBLO - Jewellers Block"},
    {value: "LD", label: "LD - Land Lord Domestic"},
    {value: "LEGALEXP", label: "LEGALEXP - Legal Expenses Insurance"},
    {value: "LIAB", label: "LIAB - Liability Insurance"},
    {value: "LIVE", label: "LIVE - Livestock Insurance"},
    {value: "LL", label: "LL - Land Lord Commercial"},
    {value: "LLCOMM", label: "LLCOMM - Land Lord Commercial"},
    {value: "LOSS", label: "LOSS - Consequential Loss Insurance"},
    {value: "MACH", label: "MACH - Machinery Breakdown Insurance"},
    {value: "MANAGEMENT", label: "MANAGEMENT - Management Liability"},
    {value: "MAR", label: "MAR - Marine Transit Insurance"},
    {value: "MARINE", label: "MARINE - Annual Marine"},
    {value: "MC", label: "MC - Motor Cycle Insurance"},
    {value: "MNL", label: "MNL - Management Liability"},
    {value: "MON", label: "MON - Money Insurance"},
    {value: "MVC", label: "MVC - Commercial Motor Vehicle Insurance"},
    {value: "MVP", label: "MVP - Private Motor Vehicle Insurance"},
    {value: "MVT", label: "MVT - Commercial Truck Insurance"},
    {value: "OWNER BUIL", label: "OWNER BUIL - Owner Builder Warranty Insurance"},
    {value: "PERS", label: "PERS - Personal Accident and Illness"},
    {value: "PI", label: "PI - Professional Indemnity Insurance"},
    {value: "PI OVERSEA", label: "PI OVERSEA - PI Insurance"},
    {value: "PLEA", label: "PLEA - Pleasure Craft"},
    {value: "PLNT/EQUIP", label: "PLNT/EQUIP - Plant and Equipment"},
    {value: "PR", label: "PR - Product Recall"},
    {value: "RD", label: "RD - Rural Domestic"},
    {value: "RESBUILWAR", label: "RESBUILWAR - Residential Builders Warranty NSW"},
    {value: "RESBUWAROT", label: "RESBUWAROT - Res Builders Warranty All states except NSW"},
    {value: "RET", label: "RET - Retail Insurance"},
    {value: "RU", label: "RU - Rural Commercial"},
    {value: "STRCOM", label: "STRCOM - Commercial Strata Title Insurance"},
    {value: "STRRES", label: "STRRES - Residential Strata Title Insurance"},
    {value: "TAX", label: "TAX - Tax"},
    {value: "TAXIMETRO", label: "TAXIMETRO - Taxi Metro Motor & Liability"},
    {value: "TAXIREG", label: "TAXIREG - TAXI Regional Motor"},
    {value: "TAXIREGLIA", label: "TAXIREGLIA - Taxi Regional Liability"},
    {value: "TENP", label: "TENP - Tenanted Property Insurance Cover"},
    {value: "TP", label: "TP - Third Party Commercial Motor Insurance"},
    {value: "TRADECR", label: "TRADECR - Trade Credit"},
    {value: "TRAV", label: "TRAV - Travel Insurance"},
    {value: "UNRG", label: "UNRG - Unregistered Machinery Insurance"},
    {value: "VACANTLAND", label: "VACANTLAND - Vacant Land Liability"},
    {value: "VAL", label: "VAL - Valuables"},
    {value: "VOLW", label: "VOLW - Voluntary Workers Insurance"},
    {value: "WCOV", label: "WCOV - Workers' Compensation Insurance"},
    ];


    $: {
    if (username) {
    fetchPolicies();
    }
    }

    $: displayedPolicies = showExpired ? policies : policies.filter(policy => new Date(policy.E_DATE) >= new Date());


    onMount(async () => {
        try {
            const response = await axios.get(baseURL+'/getbUsername', { withCredentials: true });
            busername = response.data.busername;

            if (busername == null){
                console.log('Not logged in')
                $goto('/brokerLogin')
            } else {
                console.log('Logged in UpdatePolicy: ' + busername)
            }
        } catch (err) {
            console.error(err);
        }
    
        getClientUsernames();
    });

    const getClientUsernames = async ()=>{
        const response = await axios.get(baseURL+'/usernames', { withCredentials: true });
        usernames = response.data;
    };

    
    const fetchPolicies = async () => {
        try {
            const response = await axios.get(baseURL+`/brokerpolicies?username=${username}`, { withCredentials: true });
            policies = response.data;
            noPolicies = false;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                noPolicies = true;
            } else {
                console.error(error);
            }
        }
    };

    async function fetchPolicyLogs(policyNumber) {
        const response = await axios.get(baseURL+`/getPolicyLogs?policyNumber=${policyNumber}`, { withCredentials: true });
        logs = response.data;
        showModal = true;
    }

    function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = date.getFullYear();

    return day + '/' + month + '/' + year;
    }

    function formatTime(dateString) {
    const date = new Date(dateString);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const strTime = hours + ':' + minutes + ' ' + ampm;
    
    return strTime;
    }


    function viewPolicyLogs(policyNumber) {
        selectedPolicyNumber = policyNumber;
        fetchPolicyLogs(policyNumber);
    }

    function confirmDeletePolicy(username, policyNumber) {
        policyToDelete = { username, policyNumber };
        showConfirmModal = true;
    }

    async function proceedDeletePolicy() {
        try {
            const response = await axios.delete(baseURL+`/deletePolicy/${policyToDelete.username}/${policyToDelete.policyNumber}`, { withCredentials: true });

            // Assuming the server returns a message in the response
            window.alert(response.data.message || 'Policy has been deleted successfully');
            
            // Re-fetch the policies list after successful deletion
            fetchPolicies();
        } catch (error) {
            window.alert(error.response?.data?.message || 'An error occurred while deleting the policy');
        } finally {
            showConfirmModal = false;
        }
    }

    async function viewPolicy(username, policyNumber) {
    try {
        const response = await axios.get(baseURL+`/getPolicy/${username}/${policyNumber}`, { withCredentials: true });

        policyToEdit = response.data;
        originalPolicyNumber = policyNumber;

        // Format s_date
        let s_dateObj = new Date(policyToEdit.S_DATE);
        policyToEdit.s_date = `${s_dateObj.getFullYear()}-${(s_dateObj.getMonth() + 1).toString().padStart(2, '0')}-${s_dateObj.getDate().toString().padStart(2, '0')}`;

        // Format e_date
        let e_dateObj = new Date(policyToEdit.E_DATE);
        policyToEdit.e_date = `${e_dateObj.getFullYear()}-${(e_dateObj.getMonth() + 1).toString().padStart(2, '0')}-${e_dateObj.getDate().toString().padStart(2, '0')}`;

        showEditModal = true;
    } catch (error) {
        window.alert(error.response?.data?.message || 'An error occurred while fetching the policy');
    }
    }

  async function saveEditedPolicy() {
    try {
      const response = await axios.put(baseURL+`/updatePolicy/${policyToEdit.USERNAME}`, policyToEdit, { withCredentials: true });

      window.alert(response.data.message || 'Policy has been updated successfully');
      
      // Re-fetch the policies list after successful update
      originalPolicyNumber = '';
      fetchPolicies();
     
    } catch (error) {
      window.alert(error.response?.data?.message || 'An error occurred while updating the policy');
    } finally {
      showEditModal = false;
    }
  }



    function closeModal() {
        showModal = false;
    }

</script>

<div class="container mt-5 text-align-center">
    <h5>Select Client to View Policies</h5>
    <div class="mb-3">
        <label class="form-label">
            Username:
            <select bind:value={username} on:change={fetchPolicies} class="form-select" required>
                <option disabled>Select a username</option>
                {#each usernames as name (name)}
                    <option>{name}</option>
                {/each}
            </select>
        </label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="expiredCheck" bind:checked={showExpired}>
            <label class="form-check-label" for="expiredCheck">
                Show expired policies
            </label>
        </div>
    </div>
    <h5>Policies</h5>
        {#if noPolicies}
            <p>No past or present policies</p>
        {:else}
            {#each displayedPolicies as policy (policy.POLICY_NUMBER)}
                <div class="card border-dark mb-3">
                    <div class="card-header d-flex justify-content-between">
                        <h5>
                            {new Date(policy.E_DATE) >= new Date() ? '🟢' : '🔴'}
                            {policy.DESCRIPTION}
                        </h5>
                        <p class="card-subtitle text-muted">{policy.POLICY_NUMBER} - {policy.TYPE}</p>
                    </div>
                    <div class="card-body row">
                        <div class="col-6 p-2 d-flex justify-content-start">
                            <button class="btn btn-danger" on:click={() => confirmDeletePolicy(username, policy.POLICY_NUMBER)}>Delete Policy</button>
                        </div>
                        <div class="col-6 p-2 d-flex justify-content-end">
                            <button class="btn btn-secondary" on:click={() => viewPolicyLogs(policy.POLICY_NUMBER)}>👁️ Logs</button>
                            <button class="btn btn-primary" on:click={() => viewPolicy(username, policy.POLICY_NUMBER)}>Edit Policy</button>    
                        </div>
                        <div class="col-12">
                            {#if policy.S_DATE}
                            <div>Start date: {formatDate(policy.S_DATE)}</div>
                            {/if}
                            <div>End date: {formatDate(policy.E_DATE)}</div>
                        </div>
                    </div>
                </div>
            {/each}
        {/if}

</div>
{#if showModal}
    <div class="modal" tabindex="-1" style="display:block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Policy Logs for {selectedPolicyNumber}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={closeModal}></button>
                </div>
                <div class="modal-body">
                    {#each logs as log, i (i)}
                        <p>User: {log.username}, Date: {formatDate(log.view_date)}, Time: {formatTime(log.view_date)}</p>
                    {/each}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={closeModal}>Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-backdrop show"></div>
{/if}

{#if showConfirmModal}
    <div class="modal" tabindex="-1" style="display:block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Delete</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => { showConfirmModal = false; }}></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete policy with policy number {policyToDelete.policyNumber} from {policyToDelete.username}?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" on:click={proceedDeletePolicy}>Delete</button>
                    <button type="button" class="btn btn-secondary" on:click={() => { showConfirmModal = false; }}>Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-backdrop show"></div>
{/if}

{#if showEditModal}
  <div class="modal" tabindex="-1" style="display:block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Policy {originalPolicyNumber}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => { showEditModal = false; }}></button>
        </div>
        <div class="modal-body">
          <form on:submit|preventDefault={saveEditedPolicy}>
            <div class="mb-3">
              <label class="form-label">Username:</label>
              <input type="text" class="form-control" bind:value={policyToEdit.USERNAME} readonly />
            </div>
            <div class="mb-3">
              <label class="form-label">Policy Number:</label>
              <input type="text" class="form-control" bind:value={policyToEdit.POLICY_NUMBER}  />
            </div>
            <div class="mb-3">
                <label class="form-label">Policy Type:</label>
                <select id="policyType" class="form-control" bind:value={policyToEdit.TYPE}>
                    <option disabled selected>Choose Policy Type ...</option>
                    {#each policyTypes as policy (policy.value)}
                        <option value={policy.value}>{policy.label}</option>
                    {/each}
                </select>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Policy Description:</label>
              <textarea class="form-control" bind:value={policyToEdit.DESCRIPTION}></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Policy Start Date:</label>
              <input type="date" class="form-control" bind:value={policyToEdit.s_date} />
            </div>
            <div class="mb-3">
              <label class="form-label">Policy End Date:</label>
              <input type="date" class="form-control" bind:value={policyToEdit.e_date} />
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={() => { showEditModal = false; }}>Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-backdrop show"></div>
{/if}
