<template>
	<div class="event-container" :style="color ? {backgroundColor: color} : {}">
        <div class="cover-photo" v-if="event.photo" :style="{backgroundImage: `url(${event.photo})`}" />
        <div class="event">
            <component class="event-title" :is="event.link ? 'a' : 'span'" :href="event.link" target="_blank">
                <img class="external-link" v-if="event.link.startsWith('https://github.com')"
                    style="height: 30px" src="@/assets/images/github-white.svg" />
                <img v-else-if="event.link" style="height: 26px;margin-right:10px" src="@/assets/external-link.svg" />
                <h2>{{ (showDetails ? "Our next meeting: " : "") +   event.title }}</h2>
            </component>
            <div class="event-text" v-if="event.descriptionHTML" v-html="event.descriptionHTML"></div>
            <div class="event-footer" v-if="showDetails" >
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
defineProps(["event", "showDetails", "color"]);

const formatDate = (dateString) => {
    return new Date(dateString + "T19:00:00")  // that day at 7pm
        .toLocaleDateString("en-us", {month: "long", day: "numeric", year: "numeric"});
}
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
    &:first-of-type {
        margin-top: 50px;
    }
    max-width: 500px;
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.15);
    padding-bottom: 16px;
    overflow: hidden;
    text-align: left;
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
