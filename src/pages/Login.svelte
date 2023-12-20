<script>
    import { onMount } from "svelte";
    import { goto } from "@roxi/routify";
    import axios from "axios";
    import { baseURL } from "../urlconfig.js";

    let email = "";
    let password = "";
    let error = "";
    let showPModal = false;
    let showTModal = false;

    async function login() {
        try {
            const response = await axios.post(
                baseURL + "/login",
                { email, password },
                { withCredentials: true }
            );
            if (response.data.success) {
                $goto("/ListPolicies");
            } else {
                error = "Invalid email or password.";
            }
        } catch (err) {
            console.error(err);
            error = "An error occurred while logging in." + err;
        }
    }
</script>

<html lang="en" class="body-bg">
    <div class="container" style="">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form
                    on:submit|preventDefault={login}
                    class="p-5 border rounded"
                    style="background-color: white;"
                >
                    <div class="mb-3">
                        <div class="d-flex justify-content-center">
                            <h1 class="logo">COVER COMPANION DEMO</h1>
                        </div>

                        <label for="email" class="form-label"
                            >Email address</label
                        >
                        <input
                            bind:value={email}
                            type="email"
                            id="email"
                            class="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label
                        >
                        <input
                            bind:value={password}
                            type="password"
                            id="password"
                            class="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div class="d-grid gap-2">
                        <button
                            type="submit"
                            class="btn btn-dark"
                            style="color:white;">Log In</button
                        >
                    </div>
                </form>
            </div>
        </div>
        <div class="d-flex justify-content-center text-center row">
            <div class="text-end col">
                <a href="/" on:click|preventDefault={() => (showTModal = true)}
                    >Terms and Conditions</a
                >
            </div>
            <div class="text-start col">
                <a href="/" on:click|preventDefault={() => (showPModal = true)}
                    >Privacy Policy</a
                >
            </div>
        </div>
        <div class="d-flex justify-content-center">Beta 1.0.0 DEMO VERSION</div>

        {#if error}
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            </div>
        {/if}

        {#if showPModal}
            <div class="modal" style="display: block;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Privacy Policy</h5>
                            <button
                                type="button"
                                class="close"
                                on:click={() => (showPModal = false)}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>
                                <b>1. Introduction</b>
                                Welcome to the Cover Companion Insurance App, provided
                                by Cover Companion Insurance Group Pty Ltd ("we",
                                "us", "our"). We respect your privacy and want you
                                to understand how we collect, use, and share data
                                about you. This Privacy Policy covers our data collection
                                practices and describes your rights to access, correct,
                                or restrict our use of your personal data. By using
                                the Services, you agree to the terms of this Privacy
                                Policy.
                            </p>

                            <p>
                                <b>2. Information We Collect</b>
                                We collect certain data from you directly, like the
                                information you enter yourself, data about your participation
                                in courses, and data from third-party platforms you
                                connect with our Services. We also collect some data
                                automatically, like information about your device
                                and what parts of our Services you interact with
                                or spend time using.
                            </p>

                            <p>
                                <b>2.1 Data You Provide to Us</b>
                                We may collect different data from or about you depending
                                on how you use the Services. Below are some examples
                                to help you better understand the data we collect.
                                When you create an account and use the Services,
                                we collect your name, email address, and password.
                                When you participate in courses or send messages
                                through the Services, we collect certain information
                                including the name of the course, the number of lessons
                                you've started and completed, your submissions to
                                activities, and text data you send via chat.
                            </p>

                            <p>
                                <b>2.2 Data We Collect Automatically</b>
                                Device Data: We collect data about your device, including
                                IP address, web browser type, mobile operating system
                                version, phone carrier and manufacturer, application
                                installations, device identifiers, mobile advertising
                                identifiers, and push notification tokens. Usage
                                Data: We track user activity in relation to the types
                                of Services our users use, the configuration of their
                                computers, and performance metrics related to their
                                use of the Services.
                            </p>

                            <p>
                                <b>3. How We Use Your Data</b>
                                We use your data to do things like providing our
                                Services, communicating with you, troubleshooting
                                issues, securing against fraud and abuse, improving
                                and updating our Services, analyzing how people use
                                our Services, serving personalized advertising, and
                                as required by law or necessary for safety and integrity.
                            </p>

                            <p>
                                <b>4. Who We Share Your Data With</b>
                                We share certain data about you with companies performing
                                services for us, our business partners, analytics
                                and data enrichment providers, your social media
                                providers, companies helping us run promotions and
                                surveys, and advertising companies who help us promote
                                our Services.
                            </p>

                            <p>
                                <b>5. Security</b>
                                We use appropriate security measures to protect the
                                security of your personal information both online
                                and offline. These measures vary based on the sensitivity
                                of the information that we collect, process, and
                                store.
                            </p>

                            <p>
                                <b>6. Changes & Updates to This Policy</b>
                                We will notify you before we make changes to this
                                policy and give you the opportunity to review the
                                revised policy before deciding if you would like
                                to continue to use the Services.
                            </p>

                            <p>
                                <b>7. Contact Information</b>
                                You can contact us at with any questions or comments
                                about this policy.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                on:click={() => (showPModal = false)}
                                >Close</button
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        {#if showTModal}
            <div class="modal" style="display: block;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Terms and Conditions</h5>
                            <button
                                type="button"
                                class="close"
                                on:click={() => (showTModal = false)}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <b> Terms and Conditions </b>

                            <p>
                                <b>1. Introduction</b>

                                Welcome to The Cover Companion Insureance App!
                                These Terms and Conditions outline the rules and
                                regulations for the use of Cover Companion
                                Insurance's Application. By accessing this
                                Application, we assume you accept these terms
                                and conditions in full. Do not continue to use
                                The Cover Companion Insurance App if you do not
                                accept all of the terms and conditions stated on
                                this page.
                            </p>
                            <p>
                                <b>2. License</b>

                                Unless otherwise stated, Cover Companion
                                Insurance Group Pty Ltd owns the intellectual
                                property rights for all material in the
                                Application. All intellectual property rights
                                are reserved.
                            </p>
                            <p>
                                <b>3. Restrictions</b>

                                Users are specifically restricted from all of
                                the following: Selling, sublicensing and/or
                                commercializing any Application material;
                                Publicly performing and/or showing any
                                Application material; Using this Application in
                                a way that is damaging, or that could be
                                damaging to this Application; Using this
                                Application contrary to applicable laws and
                                regulations, or in a manner that results in, or
                                that could result in harm to the Application, or
                                to any person or business entity.
                            </p>
                            <p>
                                <b>4. Privacy Policy</b>

                                Your privacy is important to us. Please review
                                our Privacy Policy, which also governs your use
                                of The Cover Companion Insurance App, to
                                understand our practices.
                            </p>
                            <p>
                                <b>5. Changes to Terms</b>

                                We reserve the right, in our sole discretion, to
                                change these Terms at any time. If a revision is
                                material, we will make reasonable efforts to
                                provide at least 30 days' notice prior to any
                                new terms taking effect.
                            </p>
                            <p>
                                <b>6. Contact Us</b>

                                If you have any questions about these Terms,
                                please contact us at REDACTED@NULL.COM.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                on:click={() => (showTModal = false)}
                                >Close</button
                            >
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</html>

<style>
    .logo {
        font-family: "Times New Roman", Times, serif;
        font-size: 2em;
        text-align: center;
        margin-bottom: 1em;
    }
</style>
