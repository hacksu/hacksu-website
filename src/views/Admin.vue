<template>
    <div style="padding: 100px; color: black" v-if="loggedIn">
        <h2>Admin Stuff</h2>
        <ul>
            <li><router-link to="/redirects">Redirect Links</router-link></li>
            <li><router-link to="/edit-staff">Staff Page Editor</router-link></li>
            <li><router-link to="/edit-events">Events Editor</router-link></li>
            <li><a href="/audit-log">DB Edit Log</a></li>
        </ul>
    </div>
</template>

<script setup>
import { loggedIn } from "../globals.js";
</script>
