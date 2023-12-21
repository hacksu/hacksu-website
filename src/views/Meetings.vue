<template>
    <div class="container">
        <h1 style="margin: auto">Schedule of Meetings & Events (2023-2024)</h1>
        <br>
        <div class="event" v-for="event, i in events" :key="event.id"
            :style="{backgroundColor: randomColor(i)}">
            <div style="display: flex; flex-direction: column; width: 100%">
                <component :is="event.link ? 'a' : 'span'" v-if="event.link"
                    :href="event.link" target="_blank">
                    <h2>{{ event.title }}</h2>
                </component>
                <div v-if="event.descriptionHTML" v-html="event.descriptionHTML"></div>
                <p>{{
                    [event.subtitle, formatDate(event.date), event.presenter]
                        .filter(s => s).join(' - ')
                }}</p>
            </div>
            <a v-if="event.link" :href="event.link" target="_blank">
                <img v-if="event.link.startsWith('https://github.com')"
                    style="height: 50px" src="@/assets/images/github-white.svg" />
                <img v-else style="height: 40px" src="@/assets/external-link.svg" />
            </a>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { remult } from "remult";
import { Event } from "../../db/entities.js";

const events = ref([]);
const repo = remult.repo(Event);
onMounted(() => {
    repo.find({orderBy: {date: "asc"}})
        .then(e => (events.value = e));
});
const formatDate = (dateString) => {
    return new Date(dateString + "T19:00:00").toLocaleDateString();
}

const colors = ["#37bf94", "#a250c1", "#1079c5"];
// adapted from https://stackoverflow.com/a/19303725/3962267
function randomColor(index) {
    const x = Math.sin(index) * 10000;
    const randomIshNumber = x - Math.floor(x);  // in [0, 1)?
    return colors[Math.floor(randomIshNumber*(colors.length-1))];
}
</script>
<style scoped lang="scss">
* {
    box-sizing: border-box;
}
.event {
    background-color: #a250c1;
    width: 100%;
    border-radius: 5000px;
    padding: 15px 30px 15px 50px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    max-width: 750px;
    h2 {
        margin: 5px 0;
    }
    &:deep(p) {
        margin: 5px 0;
    }
}
.container{
    background: linear-gradient(to top left, #35c982, #4683FF);
    min-height: 100vh;
    padding: 100px;
    @media (max-width: 700px){
        padding: 100px 10px;
    }
    overflow: auto;
}
a {
    color: white;
}
</style>
