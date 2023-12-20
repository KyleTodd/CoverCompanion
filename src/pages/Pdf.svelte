<script>
  import { onMount, onDestroy } from 'svelte';
  import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
  import { goto } from '@roxi/routify';
  import axios from 'axios';
  import { params } from '@roxi/routify'; // for getting route params
  import { baseURL } from '../urlconfig.js';

  let pdfContainer;
  let username;
  let policyNumber;
  let pdfUrl;
  let loading = false;

  $: {
    username = $params.username;
    policyNumber = $params.policyNumber;
  }


  GlobalWorkerOptions.workerSrc = './node_modules/pdfjs-dist/build/pdf.worker.js'
  
  function goBack() {
    $goto('/ListPolicies');
  }

  onMount(async () => {

    const loadingModal = document.getElementById('loadingModal');

    loadingModal.style.display = 'block';
    // get USERNAME and POLICY_NUMBER from the route params
    const { username, policyNumber } = $params;

    //console.log('USERNAME- '+username+' POLICY NUMBER- '+policyNumber)
    let user_ip = '0.0.0.0';
    try {
      const user_ip_response = await axios.get('https://api.ipify.org?format=json', { timeout: 5000 });
      user_ip = user_ip_response.data.ip;
    } catch (error) {
      console.log('Could not fetch IP, using default IP 0.0.0.0');
    }

    await axios.post(baseURL+'/capture', {
      policy_number: policyNumber,
      user_ip: user_ip,
      username: username,
    }, { withCredentials: true });

    // Make a request to your server to get the PDF file
    const response = await axios.get(baseURL+`/getPdf?policyNumber=${policyNumber}`, { withCredentials: true });

    // The server should return the URL of the PDF file
    pdfUrl = response.data.pdfUrl;

    const loadingTask = getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
  
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.5 });
  
      // Create a new canvas for each page
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = viewport.width;
      pageCanvas.height = viewport.height;
  
      // Add the new canvas to the container
      pdfContainer.appendChild(pageCanvas);
  
      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: pageCanvas.getContext('2d'),
        viewport: viewport
      };
      await page.render(renderContext);
    }

    loadingModal.style.display = 'none';
  });
  
  function downloadPdf() {
    const link = document.createElement('a');
    link.href = pdfUrl;
    alert(pdfUrl);
    link.download = policyNumber + '.pdf'; // Specify the file name
    link.click();
  }

  onDestroy(() => {
    while (pdfContainer.firstChild) {
      pdfContainer.firstChild.remove();
    }
  });
</script>


<div class="modal" tabindex="-1" role="dialog" id="loadingModal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5);">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
        <div class="spinner-border text-dark" role="status">
          <!-- <span class="sr-only">LOooooooaaaaddinggg</span> -->
        </div>
      </div>
    </div>
  </div>
</div>


<div class="container mx-auto d-flex justify-content-center">
<button class="btn btn-danger mx-auto" on:click={goBack}>Go back</button>
<button class="btn btn-primary mx-auto" on:click={downloadPdf}>Download PDF</button> <!-- Button to trigger download -->
</div>
<div class="container mx-auto d-flex justify-content-center">
<div class="row" bind:this={pdfContainer}></div>
</div>
