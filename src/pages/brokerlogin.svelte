<script>
    import { goto } from "@roxi/routify";
    import axios from "axios";
    import { baseURL } from "../urlconfig.js";

    let busername = "";
    let password = "";
    let error = "";

    async function login() {
        try {
            const response = await axios.post(
                baseURL + "/brokerlogin",
                { busername, password },
                { withCredentials: true }
            );
            if (response.data.success) {
                $goto("/brokerdash");
            } else {
                error = "Invalid username or password.";
            }
        } catch (err) {
            console.error(err);
            error = "An error occurred while logging in." + err;
        }
    }
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <form on:submit|preventDefault={login} class="p-5 border rounded">
                <div class="mb-3">
                    <div class="d-flex justify-content-center">
                        <h1 class="logo">COVER COMPANION</h1>
                    </div>
                    <h1 class="logo">DASHBOARD</h1>
                    <label for="busername" class="form-label">Username</label>
                    <input
                        bind:value={busername}
                        type="busername"
                        id="busername"
                        class="form-control"
                        placeholder="Username"
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        bind:value={password}
                        type="password"
                        id="password"
                        class="form-control"
                        placeholder="Password"
                    />
                </div>
                <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-dark">Log In</button>
                </div>
            </form>
        </div>
    </div>

    {#if error}
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    .logo {
        font-family: "Times New Roman", Times, serif;
        font-size: 2em;
        text-align: center;
        margin-bottom: 1em;
    }
</style>
