<template>
    <div class="event-container" :class="{ 'future-meeting': isFutureMeeting, 'past-meeting': isPastMeeting }" :style="background ? {background} : {}">
        <div class="meeting-status" v-if="isFutureMeeting || isPastMeeting">
            {{ isFutureMeeting ? 'Upcoming' : 'Past Meeting' }}
        </div>
        <div class="cover-photo" v-if="event.photo" :style="{backgroundImage: `url(${event.photo})`}" />
        <div class="event">
            <component class="event-title" :is="event.link ? 'a' : 'span'" :href="event.link" target="_blank" style="color:white">
                <img class="external-link" v-if="event.link.startsWith('https://github.com')"
                    style="height: 30px" src="@/assets/images/github-white.svg" />
                <img v-else-if="event.link" style="height: 26px;margin-right:10px" src="@/assets/external-link.svg" />
                <h2>{{ (solo ? "Our next meeting: " : "") +   event.title }}</h2>
            </component>
            <div class="event-text" v-if="event.descriptionHTML" v-html="event.descriptionHTML"
                :style="solo ? {overflowY: 'scroll'} : {}"></div>
            <div class="event-footer" v-if="solo" >
                <span><strong>{{formatDate(event.date)}}</strong> at 7:00 PM</span>
                <strong>MSB 228</strong>
            </div>
            <div class="event-footer" v-else>
                <p><strong>{{formatDate(event.date)}}</strong></p>
                <p style="text-align: right">Presented by <strong>{{ event.presenter }}</strong></p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["event", "solo", "background"]);

const formatDate = (dateString) => {
    return new Date(dateString + "T19:00:00")  // that day at 7pm
        .toLocaleDateString("en-us", {month: "long", day: "numeric", year: "numeric"});
}

const currentDate = new Date();
const meetingDate = new Date(props.event.date + "T19:00:00");

const isPastMeeting = meetingDate < currentDate;
const isFutureMeeting = meetingDate > currentDate;
</script>

<style scoped lang="scss">
.event-container {
    background: linear-gradient(90deg, rgb(155, 76, 187) 0%, rgb(157, 77, 185) 24%, rgb(161, 78, 194) 32%, rgb(171, 82, 203) 100%); 
    opacity: 0.975;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto 80px auto;
    position: relative;
    &:first-of-type {
        margin-top: 50px;
    }
    max-width: 500px;
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.15);
    padding-bottom: 16px;
    overflow: hidden;
    text-align: left;

    // allow this item to shrink to less than its natural height when necessary;
    // the .event-text element inside the .event element will then shrink and
    // become scrollable due to tose elements' css
    min-height: 0;
    flex-shrink: 1;
}

.event {
    &>* {
        padding: 0 24px;
    }
    display: flex;
    flex-direction: column;

    // allow this item to shrink to less than its natural height when necessary;
    // the .event-text element will shrink and become scrollable due to its css
    min-height: 0;
    flex-shrink: 1;

    width: 100%;
    font-size: 1rem;
    &:deep(a:visited), &:deep(a) {
        color: white;
    }
    h2 {
        display: inline;
        font-size: 1.5rem;
        margin: 0;
    }
}

.cover-photo {
    width: 100%;
    padding-bottom: 40%;
    background-size: cover;
    background-position: center;
}

.event-title {
    margin: 12px 0 8px;
    // text-decoration: none;
    display: flex;
    align-items: center;
}

.event-text {
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 6px;
    }
    // allow this element to shrink when necessary, causing the text inside it
    // to scroll
    min-height: 0;
    flex-shrink: 1;
}

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

.meeting-status {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    z-index: 1;
}

.future-meeting {
    border: 2px solid #2ecc71;
    .meeting-status {
        background-color: #2ecc71;
    }
}

.past-meeting {
    opacity: 0.8;
    .meeting-status {
        background-color: rgba(0, 0, 0, 0.4);
    }
}
</style>
