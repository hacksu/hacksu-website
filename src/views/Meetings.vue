<template>
    <div class="event-page-container">
        <div v-for="label, i in groupedEvents.keys()" :key="label">
            <h1 style="text-align: center;">{{ label + " Meetings" + (i > 0 ? " (Archive) " : "") }}</h1>
            <div class="event-list-container">
                <div class="event-container" v-for="event, i in groupedEvents.get(label)" :key="event.id"
                        ref="containers" :style="{transform: translations[i] || 'unset'}">
                    <img v-if="event.photo" :src="event.photo" class="event-cover-photo" />
                    <div class="event">
                        <component class="event-title" :is="event.link ? 'a' : 'span'" :href="event.link" target="_blank">
                            <img class="external-link" v-if="event.link.startsWith('https://github.com')"
                                style="height: 30px" src="@/assets/images/github-white.svg" />
                            <img v-else-if="event.link" style="height: 26px" src="@/assets/external-link.svg" />
                            <h2>{{ event.title }}</h2>
                        </component>
                        <div class="event-text" v-if="event.descriptionHTML" v-html="event.descriptionHTML"></div>
                        <div class="event-footer">  
                            <p><strong>{{formatDate(event.date)}}</strong></p>
                            <p style="text-align: right">Presented by <strong>{{ event.presenter }}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { remult } from "remult";
import { Event } from "../../db/entities.js";

const sineWavePeriod = 1500;
// TODO: IDEA: make this reactive and based on scroll position. might be hard to
// update container positions based on it in a performant way
const sineWaveWidth = 200;
const containers = ref([]);
const translations = ref([]);
function updateContainerPositions(){
    if (window.innerWidth < 800) {
        return;
    } else if (containers.value && containers.value.length){
        // TODO: go group by group somehow. really just need to update `start`
        // after we go through all the containers in each group
        translations.value = [];
        const start = containers.value[0].getBoundingClientRect().top;
        for (const cont of containers.value){
            const contRect = cont.getBoundingClientRect();
            const pos = contRect.top + contRect.height/2 - start;
            const waveOffset = -Math.sin((pos / sineWavePeriod) * (Math.PI * 2)) * (sineWaveWidth / 2);
            translations.value.push(`translateX(${waveOffset}px)`);
        }
    }
}

const backgroundSize = computed(() => {
    return `${sineWaveWidth}px ${sineWavePeriod}px`;
})

const events = ref([]);
const repo = remult.repo(Event);
onMounted(() => {
    repo.find({orderBy: {date: "desc"}})
        .then(e => {
            events.value = e;
            nextTick(updateContainerPositions);
        });
});
const groupedEvents = computed(() => {
    // create a map which will store ordered key-value pairs, where the key is
    // the name of the semester and the value is an array of events from that
    // semester
    const result = new Map();

    // iterate through the events (which are fetched in reverse chronological
    // order) and create groups based on the semesters that they fall into
    for (const event of events.value){
        const date = new Date(event.date);
        const label = (date.getMonth() < 6 ? "Spring" : "Fall") + " " + date.getFullYear();
        if (!result.has(label)){
            result.set(label, [event]);
        } else {
            result.get(label).push(event);
        }
    }

    // reverse the order of events within each group to make them
    // forward-chronological within each semester
    result.forEach(value => value.reverse());
    
    return result;
});

const formatDate = (dateString) => {
    return new Date(dateString + "T19:00:00")  // that day at 7pm
        .toLocaleDateString("en-us", {month: "long", day: "numeric", year: "numeric"});
}
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}
.event-page-container {
    background: linear-gradient(to top left, #35c982, #4683FF);
    min-height: 100vh;
    padding: 60px 100px 100px 100px;
    @media (max-width: 700px){
        padding: 100px 10px;
    }
    overflow: auto;
}
.page-title {
    padding: 10px;
}
.event-list-container {
    background: url("@/assets/sine.svg");
    background-size: v-bind("backgroundSize");
    background-repeat: repeat-y;
    background-position: center top;
}
.event-container {
    background: linear-gradient(90deg, rgb(155, 76, 187) 0%, rgb(157, 77, 185) 24%, rgb(161, 78, 194) 32%, rgb(171, 82, 203) 100%); 
    opacity: 0.975;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto 80px auto;
    &:first-of-type {
        margin-top: 50px;
    }
    max-width: 500px;
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.15);
    padding-bottom: 16px;
    overflow: hidden;
}
.event {
    &>* {
        padding: 0 24px;
    }
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 1rem;
    &:deep(a:visited) {
        color: white;
    }
    h2 {
        display: inline;
        font-size: 1.5rem;
        margin: 0;
    }
}
.event-cover-photo {
    width: 100%;
}
.event-title {
    margin: 12px 0 8px;
    // text-decoration: none;
    display: flex;
    align-items: center;
}
// .event-text {
// }
.event-footer {
    display:flex;
    justify-content: space-between;
    margin-top: 4px;
    & > p {
        padding: 4px;
        margin: 2px -4px;
    }
}
.external-link {
    margin-right: 10px;
}
strong {
    font-weight: 600;
}
</style>
