<script>
    import { onMount } from 'svelte';
    import { goto } from '@roxi/routify';
    import axios from 'axios';
    import { baseURL } from '../urlconfig';
  

    let files;
    let policyNumber = '';
    let policyType = '';
    let description = '';
    let fundingLink = '';
    let username = '';
    let usernames = [];
    let s_date = '';
    let e_date = '';
    let busername = '';
    let warning = false;
    let isEndDateBeingEdited = false;

    $: {
    if(s_date && !isEndDateBeingEdited){
      // set e_date to one year after s_date
      let startDate = new Date(s_date);
      let endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
      e_date = endDate.toISOString().split('T')[0];
    }

    if(e_date){
      // Check if end date is not 1 year after start date
      let startDate = new Date(s_date);
      let endDate = new Date(e_date);
      let oneYearLater = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
      warning = (endDate.toISOString() !== oneYearLater.toISOString()); // set warning flag
    }
    }

    onMount(async () => {

    try {
      const response = await axios.get(baseURL+'/getbUsername', { withCredentials: true });
      busername = response.data.busername;
    //   console.log(response);
      if (busername == null){
        console.log('Not logged in')
        $goto('/brokerLogin')
      } else {
        console.log('Logged in AddPolicy: ' + busername)
      }
    } catch (err) {
      console.error(err);
    }
 
    getClientUsernames();
    
    });

    const policies = [
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



    const getClientUsernames = async ()=>{
    const response = await axios.get(baseURL+'/usernames', { withCredentials: true });
    usernames = response.data;
    };

    const submitForm = async () => {
        const formData = new FormData();
        formData.append('pdf', files[0]);
        formData.append('policyNumber', policyNumber);
        formData.append('policyType', policyType);
        formData.append('description', description);
        formData.append('fundingLink', fundingLink);
        formData.append('username', username);
        formData.append('s_date', s_date);
        formData.append('e_date', e_date);

        // Call your server API to handle the upload
        const response = await fetch(baseURL+'/uploadPolicy', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Upload successful');
            location.reload();
        } else {
            console.log('Upload failed');
        }
    };


</script>


<form on:submit|preventDefault={submitForm} class="m-5">
    <h5>Add Policy</h5>
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
            Policy Type:
            <select id="policyType" class="form-control" bind:value={policyType}>
                <option disabled selected>Choose Policy Type ...</option>
                {#each policies as policy (policy.value)}
                    <option value={policy.value}>{policy.label}</option>
                {/each}
            </select>            
        </label>
    </div>
    <div class="mb-3">
        <label class="form-label">
            Policy Number:
            <input type="text" bind:value={policyNumber} class="form-control" required>
        </label>
    </div>
    <div class="mb-3">
        <label class="form-label">
            Inception Date:
            <input type="date" bind:value={s_date} class="form-control" required>
        </label>
    </div>
    <div class="mb-3">
        <label class="form-label">
          Expiry Date:
          <input type="date" bind:value={e_date} 
                 on:focus={() => isEndDateBeingEdited = true} 
                 on:blur={() => isEndDateBeingEdited = false} 
                 class="form-control" required>
        </label>
        {#if warning}
          <div class="alert alert-warning mt-2">
            Warning: The policy duration is not the standard 1 year.
          </div>
        {/if}
      </div>
      
    <div class="mb-3">
        <label class="form-label">
            Description:
            <input type="text" bind:value={description} class="form-control" required>
        </label>
    </div>
    <div class="mb-3">
        <label class="form-label">
            Link to Fund the Policy:
            <input type="text" bind:value={fundingLink} class="form-control" required>
        </label>
    </div>
    <div class="mb-3">
        <label class="form-label">
            PDF:
            <input type="file" bind:files={files} accept=".pdf" class="form-control" required>
        </label>
    </div>
    <button type="submit" class="btn btn-primary">Upload</button>
</form>


