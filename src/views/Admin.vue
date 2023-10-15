<template>
    <div style="padding: 100px; color: black" v-if="loggedIn">
        <h2>Admin Stuff</h2>
        <ul>
            <li><a href="/redirects">Redirect Links</a></li>
            <li><a href="/edit-staff">Staff Page Editor</a></li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from "vue";

const loggedIn = ref(false);

fetch("/info").then(async res => {
    const text = await res.text();
    if (text){
        let info = "";
        try {
            info = JSON.parse(text);
        } catch {
            window.location.href = "/discord-login";
            return;
        }
        if (!info || !info.isLeader){
            window.location.href = "/discord-login";
        } else {
            loggedIn.value = true;
        }
    }
});
</script>
