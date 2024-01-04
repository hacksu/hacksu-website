<template>
    <div id="redirect-container">
        <h2>Redirect Links</h2>            
        <div class="input-grid">
            <template v-for="r in redirects">
                <span>https://hacksu.com/{{ r.urlSlug }}</span>
                <span>{{ r.destination }}</span>
                <span style="text-align: center; margin: auto 0">
                    <button @click="remove(r)">❌</button>
                </span>
            </template>
            <span class="slug-input">
                https://hacksu.com/
                <input type="text" v-model="slugInput" placeholder="URL Slug"
                    style="margin-left: 3px" />
            </span>
            <span style="margin-top: auto">
                <input class="destInput" type="text" v-model="destInput"
                    placeholder="Redirect Destination" @keypress.enter="addNew" />
            </span>
            <span style="margin-top: auto; text-align: center">
                <button style="height: 1.9em;" @click="addNew">💾</button>
            </span>
        </div>
        <div class="error">{{ error }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { remult } from "remult";
import { Redirect } from "../../db/entities.js";

const slugInput = ref("");
const destInput = ref("");

let redirects = ref([]);
const repo = remult.repo(Redirect);
onMounted(() => {
    onUnmounted(
        repo.liveQuery()
            .subscribe(info => (redirects.value = info.applyChanges(redirects.value)))    
    );
});

const error = ref("");

const addNew = () => {
    if (slugInput.value.trim() && destInput.value.trim()){
        repo.insert({urlSlug: slugInput.value, destination: destInput.value})
            .then(() => { slugInput.value = destInput.value = "" })
            .catch((e) => error.value = e.message);
    } else {
        error.value = "Empty fields not allowed";
    }
}

const remove = (r) => {
    repo.delete(r)
        .catch((e) => error.value = e.message);
}

</script>

<style scoped lang="scss">
#redirect-container {
    color: black;
    padding: 100px;
    @media (max-width: 800px){
        padding-left: 10px;
        padding-right: 10px;
    }
    overflow-x: auto;
}
button {
    background-color: white;
}
.error {
    color: darkred;
    margin-top: 20px;
    font-family: monospace;
}
.input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 50px;
    width: 100%;
    max-width: 800px;
    font-family: monospace;
    gap: 10px;
    span {
        word-wrap: break-word;
    }
    input {
        padding: 5px;
        border-radius: 0;
        margin-bottom: -3px;
        font-family: monospace;
        width: 100%;
    }
}
.slug-input {
    display: flex;
    align-items: center;
    @media (max-width: 800px) {
        flex-direction: column;
    }
}
button {
    background: none;
    padding: 0;
}
</style>
