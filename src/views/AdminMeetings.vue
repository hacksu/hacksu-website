<template>
    <div class="container">
        <h1 style="margin: auto">HacKSU Administrative Meetings</h1>
        <br>
        <div class="meeting" v-for="note in notes" :keys="note.id"
            style="border: 1px solid darkgray;">
            <div style="display: flex; flex-direction: column; width: 100%;">
                <h2>{{ note.title }}</h2>
                <p>{{ formatDate(note.date) }}</p>
                <div v-if="note.notesMD" v-html="note.notesHTML"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { remult } from 'remult';
import { Note } from "../../db/entities.js";

const notes = ref([]);
const repo = remult.repo(Note);
onMounted(() => {
    repo.find({orderBy: {date: "asc"}})
        .then(e => (notes.value = e));
});
const formatDate = (dateString) => {
    return new Date(dateString + "T19:00:00").toLocaleDateString();
}
</script>
<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.meeting{
    background-color: lightgrey;
    color: darkslategrey;
    width: 100%;
    padding: 15px 15px 15px 15px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    max-width: 850px;
    h2 {
        margin: 5px 0;
    }
    &:deep(p) {
        margin: 5px 0;
    }
}

.container{
    background-image: url(https://openai-labs-public-images-prod.azureedge.net/user-PnQThMy1peuKuwTLH7WisZcE/generations/generation-vptRYyu6041Cj250PWNpBE9E/image.png);
    background-repeat: repeat;
    min-height: 100vh;
    padding: 100px;
    @media (max-width: 800px){
        padding: 100px 10px;
    }
    overflow: auto;
}

</style>
