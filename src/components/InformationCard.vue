<template>
	<div class="information-container">
        <div class="information-photo" v-if="information.photo">
            <img class="information-image" :src="information.photo" alt="">
        </div>
        <div class="information">
            <component class="information-title" :is="information.link ? 'a' : 'span'" :href="information.link" target="_blank" style="color:white">
                <img class="external-link" v-if="false"
                    style="height: 30px" src="@/assets/images/external-link.svg" />
                <img v-else-if="information.link" style="height: 26px;margin-right:10px" src="@/assets/external-link.svg" />
                <h2>{{ information.title }}</h2>
            </component>
            <div class="event-text" v-if="information.descriptionHTML" v-html="information.descriptionHTML"></div>
        </div>
    </div>
</template>

<script setup>
defineProps(["information"]);
</script>

<style scoped lang="scss">
.information-container {
    background: linear-gradient(90deg, rgb(155, 76, 187) 0%, rgb(157, 77, 185) 24%, rgb(161, 78, 194) 32%, rgb(171, 82, 203) 100%); 
    opacity: 0.975;
    border-radius: 15px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    margin: 0 auto 40px auto;
    &:first-of-type {
        margin-top: 50px;
    }
    max-width: 1000px;
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.15);
    padding-bottom: 0px;
    overflow: hidden;
    text-align: left;

    // allow this item to shrink to less than its natural height when necessary;
    // the .event-text element inside the .event element will then shrink and
    // become scrollable due to tose elements' css
    min-height: 0;
    flex-shrink: 1;
}
.information {
    &>* {
        padding: 0 24px;
    }
    display: flex;
    flex-direction: column;

    // allow this item to shrink to less than its natural height when necessary;
    // the .event-text element will shrink and become scrollable due to its css
    min-height: 0;
    flex-shrink: 1;

    min-width: 60%;
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
.information-photo {
    max-width: 40%;
    height: auto;
    background-repeat: no-repeat;
    background-position: center;
}

.information-image{
    width: 100%; /* Set the width to 35% of the container */
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    object-fit: cover;
}

.information-title {
    margin: 12px 0 8px;
    // text-decoration: none;
    display: flex;
    align-items: center;
}
.information-text {
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 6px;
    }
    // allow this element to shrink when necessary, causing the text inside it
    // to scroll
    min-height: 0;
    flex-shrink: 1;
}
.external-link {
    margin-right: 10px;
}
strong {
    font-weight: 600;
}
</style>