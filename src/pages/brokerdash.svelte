<script>
    import { goto } from "@roxi/routify";
    import axios from "axios";
    import Icon from "@iconify/svelte";
    import Component1 from "./adduser.svelte";
    import Component2 from "./UploadPolicy.svelte";
    import Component3 from "./updatepolicies.svelte";
    import UpdateUser from "./updateuser.svelte";
    import AddLinkedUsername from "./addlinkeduser.svelte";
    import { baseURL } from "../urlconfig";

    let activeTab = "uploadpolicy";

    function logout() {
        axios
            .get(baseURL + "/logout", { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    // Check if the request was successful
                    localStorage.removeItem("session");
                    console.log("Session Cleared");
                    $goto("/brokerlogin");
                } else {
                    console.log(
                        "Logout failed with status: " + response.status
                    );
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    let showNav = false;
    function toggleNav() {
        showNav = !showNav;
    }
</script>

<body class="">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <div class="container-fluid d-flex justify-content-between">
            <a class="navbar-brand" href="#">Broker Dashboard</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                on:click={toggleNav}
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="navbar-collapse {showNav ? '' : 'collapse'}"
                id="navbarNav"
            >
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item end-button">
                        <button
                            class="btn btn-outline-danger"
                            href="#"
                            on:click={logout}
                            ><Icon
                                icon="material-symbols:logout"
                                color="red"
                                width="20"
                                height="20"
                            /> Logout</button
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="d-flex justify-content-end" style="color:grey;" href="#">
        Beta 1.0.0
    </div>

    <div class="container-fluid mt-4">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    class:active={activeTab === "uploadpolicy"}
                    on:click={() => (activeTab = "uploadpolicy")}
                    >Upload Policy</a
                >
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    class:active={activeTab === "adduser"}
                    on:click={() => (activeTab = "adduser")}>Add User</a
                >
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    class:active={activeTab === "addlinkeduser"}
                    on:click={() => (activeTab = "addlinkeduser")}
                    >Add Linked User</a
                >
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    class:active={activeTab === "updateuser"}
                    on:click={() => (activeTab = "updateuser")}>Update User</a
                >
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    href="#"
                    class:active={activeTab === "updatepolicies"}
                    on:click={() => (activeTab = "updatepolicies")}
                    >Update / View Policies</a
                >
            </li>
        </ul>
        {#if activeTab === "adduser"}
            <Component1 />
        {:else if activeTab === "uploadpolicy"}
            <Component2 />
        {:else if activeTab === "updateuser"}
            <UpdateUser />
        {:else if activeTab === "addlinkeduser"}
            <AddLinkedUsername />
        {:else if activeTab === "updatepolicies"}
            <Component3 />
        {/if}
    </div>
</body>
