<template>
    <div class="event-page-container">
        <div v-for="label, i in groupedEvents.keys()" :key="label">
            <h1 style="text-align: center;">{{ label + " Meetings" + (i > 0 ? " (Archive) " : "") }}</h1>
            <div class="event-list-container">
                <MeetingCard v-for="event, j in groupedEvents.get(label)" :key="event.id" ref="cards"
                    :event="event" :style="translations.length ? {transform: translations[i][j]} : {}" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { remult } from "remult";
import { Event } from "../../db/entities.js";
import MeetingCard from '../components/MeetingCard.vue'

const sineWavePeriod = 1500;
const sineWaveWidth = 200;
const cards = ref([]);
// this stores a two-dimensional array of translations to be applied to each
// meeting card, where the first index is the index of the "group" the card is
// in (i.e. which semester it's attached to) and the second index is the index
// of the card itself within the group.
const translations = ref([]);
function updateContainerPositions(){
    if (window.innerWidth < 800) {
        // don't apply a sine wave translation if the window is narrow and there isn't room
        return;
    } else if (cards.value && cards.value.length){
        translations.value = [];
        // the y-coordinate that the sine wave starts at is the same as the top
        // edge of the first event container
        let start = cards.value[0].$el.getBoundingClientRect().top;
        // we need to keep track of the group of events that we're in as we
        // iterate through them, since the y-coordinate of the top edge of the
        // current sine wave is given by the top edge of the container in the
        // current group
        let groupIndex = 0;
        let indexWithinGroup = 0;
        translations.value.push([]);
        for (const card of cards.value){
            const contRect = card.$el.getBoundingClientRect();
            const currentGroupKey = Array.from(groupedEvents.value.keys())[groupIndex];
            if (indexWithinGroup == groupedEvents.value.get(currentGroupKey).length){
                // if we've passed the end of the current group, go to the next
                // one and set `start` anew
                indexWithinGroup = 0;
                ++groupIndex;
                start = contRect.top;
                translations.value.push([]);
            }
            const pos = contRect.top + contRect.height/2 - start;
            const waveOffset = -Math.sin((pos / sineWavePeriod) * (Math.PI * 2)) * (sineWaveWidth / 2);
            translations.value[translations.value.length-1].push(`translateX(${waveOffset}px)`);
            ++indexWithinGroup;
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
    
    return result;
});
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
</style>
