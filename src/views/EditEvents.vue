<template>
    <div>
        <p style="margin: 100px 30px 0 30px; max-width: 600px">
            <h2>Events Editor</h2>
        </p>
        <div id="edit-events-container">
            <div class="event" v-for="event, j in eventsToDisplay" :key="event.id">
                <div class="cover-photo-preview"
                    :style="event.photo ? {backgroundImage: `url(${event.photo})`} : {backgroundColor: '#333'}">
                    <button @click="() => choosePhoto(j)" class="add-photo" v-if="!event.photo">+</button>
                    <button @click="event.photo = ''" class="remove-photo" v-if="event.photo">x</button>
                    <input type="file" ref="fileUpload" style="display:none" accept="image/jpeg,image/png" />
                </div>
                <label><span>Title: </span><input type="text" v-model="event.title" /></label>
                <label><span>Date: </span><input type="date" v-model="event.date" /></label>
                <label style="flex-direction: column;">
                    <span>Markdown Description:</span>
                    <textarea v-model="event.descriptionMD" />
                </label>
                <label><span>Presenter: </span><input type="text" v-model="event.presenter" /></label>
                <label><span>Link: </span><input type="text" v-model="event.link" /></label>
                <div style="display: flex; justify-content: space-evenly; gap: 10px">
                    <button style="width:100%" @click="update(event, j)">
                        {{j==0 ? "➕" : "💾"}}{{ confirmation.has(j) ? ' ✅' : "" }}
                    </button>
                    <button style="width:100%" v-if="j!==0" @click="remove(event, j)">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
        <dialog ref="cropModal">
            <div>
                <h2>Crop:</h2>
                <cropper
                    ref="cropperComponent"
                    v-if="imagePreview"
                    class="cropper"
                    :src="imagePreview"
                    :stencil-props="{ aspectRatio: 2.5 }"
                ></cropper>
                <button @click="() => cropDoneCallback()">Save</button>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { remult } from "remult";
import { Event } from "../../db/entities.js";

import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const events = ref([]);

const confirmation = ref(new Set());

const repo = remult.repo(Event);

const newEvent = ref(repo.create());

const eventsToDisplay = computed(() => {
    return [newEvent.value].concat(events.value);
});

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery({orderBy: {date: "desc"}})
      .subscribe(info => (events.value = info.applyChanges(events.value)));
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (event, j) => {
    let update;
    if (j == 0){
        update = repo.insert(newEvent.value);
    } else {
        update = repo.update(event.id, event);
    }
    update.then(() => {
        confirmation.value.add(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0){
            newEvent.value = repo.create();
        }
    }).catch((e) => {
        alert("Error updating event: " + e);
        alert("e: " + e);
    })
};

const remove = (event, j) => {
    if(confirm("really delete " + event.title+"?")){
        repo.delete(event);
    }
}

const cropModal = ref(null);
const cropperComponent = ref(null);
const imagePreview = ref("");
const cropDoneCallback = ref(null);

function crop(url, resultCallback){
    imagePreview.value = url;
    cropModal.value?.showModal();
    console.log("setting cropDoneCallback");
    cropDoneCallback.value = () => {
        console.log("cropDoneCallback called");
        cropDoneCallback.value = null;
        imagePreview.value = "";
        cropperComponent.value.getResult().canvas.toBlob(resultCallback);
        cropModal.value.close();
    };
}

const uploadPhoto = async (photoFile, name) => {
    const data = new FormData();
    data.append("photo", photoFile, name);
    return await fetch("/event-photo-upload", { method: "POST", body: data })
        .then(async (res) => {
            const path = await res.text();
            return path;
        });
};

const fileUpload = ref(null);
watch(fileUpload, (inputs) => {
    for (let i = 0; i<inputs.length; ++i){
        inputs[i].onchange = () => {
            const fileName = inputs[i].files[0].name;
            const url = URL.createObjectURL(inputs[i].files[0]);
            crop(url, async (result) => {
                eventsToDisplay.value[i].photo = await uploadPhoto(
                    result, fileName
                );
            });
        };
    }
}, { deep: true });

const choosePhoto = (i) => {
    fileUpload.value[i]?.click();
};
</script>

<style scoped lang="scss">
* {
    color: black;
}
#edit-events-container {
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
}
.cover-photo-preview {
    padding-bottom: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-size: cover;
    background-position: center;
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
.event {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;
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
    width: 300px;
    height: 100px;
}
.cropper {
    width: 600px;
    max-height: 600px;
}
</style>
