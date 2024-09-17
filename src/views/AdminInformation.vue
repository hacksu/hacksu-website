<template>
    <div>
        <p style="margin: 100px 30px 0 30px; max-width: 600px">
            <h2>Information Editor</h2>
        </p>
        <div id="edit-information-container">
            <div class="information" v-for="information, j in informationToDisplay" :key="information.id" @input="edited.add(j)">
                <label><span>Title: </span><input type="text" v-model="information.title" /></label>
                <label>
                    <span>Photo: </span>
                    <input type="string" v-model="information.photo" disabled  />
                    <button v-if="information.photo" @click="information.photo=''" class="upload-button">❌</button>
                    <button @click="upload(j)" class="upload-button" title="Upload photo">Upload</button>
                    <input type="file" ref="fileUpload" style="display:none" accept="image/jpeg,image/png" />
                </label>
                <label style="flex-direction: column;">
                    <span>Markdown Description:</span>
                    <textarea v-model="information.descriptionMD" />
                </label>
                <label><span>Link: </span><input type="text" v-model="information.link" /></label>
                <div style="display: flex; justify-content: space-evenly; gap: 10px">
                    <button style="width:100%" @click="update(information, j)">
                        {{(j==0 ? "➕" : "💾") + (edited.has(j) ? "❗" : "")}}{{ confirmation.has(j) ? ' ✅' : "" }}
                    </button>
                    <button style="width:100%" v-if="j!==0" @click="remove(information, j)">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { remult } from "remult";
import { Information } from "../../db/entities.js";

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const informations = ref([]);

const confirmation = ref(new Set());

const edited = ref(new Set());

const repo = remult.repo(Information);

const newInformation = ref(repo.create());

const informationToDisplay = computed(() => {
    return [newInformation.value].concat(informations.value);
});

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery({orderBy: {date: "desc"}})
      .subscribe(info => {
        informations.value = info.items;
    });
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (information, j) => {
    let update;
    if (j == 0){
        update = repo.insert(newInformation.value);
    } else {
        update = repo.update(information.id, information);
    }
    update.then(() => {
        confirmation.value.add(j);
        edited.value.delete(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0){
            newInformation.value = repo.create();
        }
    }).catch((e) => {
        alert("Error updating event: " + e);
        alert("e: " + e.message);
    })
};

const remove = (information, j) => {
    if(confirm("really delete " + information.title + "?")){
        repo.delete(information);
    }
}

const fileUpload = ref(null);
watch(fileUpload, (inputs) => {
    for (let i=0; i<inputs.length; ++i){
        inputs[i].onchange = () => {
            const data = new FormData();
            data.append("photo", inputs[i].files[0]);
            fetch("/information-photo-upload", { method: "POST", body: data })
                .then(async (res) => {
                    const path = await res.text();
                    informationToDisplay.value[i].photo = path;
                });
        };
    }
}, { deep: true });
const upload = (i) => {
    if (fileUpload.value[i]){
        fileUpload.value[i].click();
    }
};

</script>

<style scoped lang="scss">
* {
    color: black;
}
#edit-information-container {
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
}
.cover-photo-preview {
    width: 50%;
    height: auto;
    padding-bottom: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    button.add-photo {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 2px;
        font-size: 1.3rem;
        border-radius: 0;
        width: 30px;
        height: 30px;
    }
    button.remove-photo {
        position: absolute;
        top: 2px;
        right: 2px;
        padding: 2px;
        font-size: 0.9rem;
        border-radius: 0;
        width: 20px;
        height: 20px;
        font-size: small;
    }
}
.information {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;
    width: 900px;
}
label {
    display: flex;
    width: 100%;
}
input {
    padding: 2px;
    width: 100%;
    border-radius: 5px;
}
label span {
    flex-shrink: 0;
    margin-right: 15px;
}
button, button:hover {
    color: black;
    border: 1px solid darkgray;
    transition: none;
}
textarea {
    width: 900px;
    height: 100px;
    overflow: scroll;
    resize: none;
}
.cropper {
    width: 600px;
    max-height: 600px;
}
</style>

