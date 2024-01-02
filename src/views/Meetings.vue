<template>
    <div class="event-page-container">
        <div class="event-container" v-for="event, i in events" :key="event.id">
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
                    <p>Presented by <strong>{{ event.presenter }}</strong></p>
                </div>
            </div>
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
    return new Date(dateString + "T19:00:00")
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
    padding: 100px;
    @media (max-width: 700px){
        padding: 100px 10px;
    }
    overflow: auto;
}
.event-container {
    background: linear-gradient(90deg, rgb(155, 76, 187) 0%, rgb(157, 77, 185) 24%, rgb(161, 78, 194) 32%, rgb(171, 82, 203) 100%); 
    border-radius: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    max-width: 500px;
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.15);
    padding: 16px 24px;
}
.event {
    display: flex;
    flex-direction: column;
    width: 100%;
    &:deep(a:visited) {
        color: white;
    }
    h2 {
        display: inline;
        font-size: 26px;
        margin: 0;
    }
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
