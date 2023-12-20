<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  import Login from "./pages/Login.svelte";
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';



  import 'bootstrap/dist/css/bootstrap.min.css';

</script>

    
<Router {routes} />