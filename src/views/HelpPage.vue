<template>
    <div class="info-page-container">
        <h1 style="margin: auto; text-align: center;">Helpful Resources</h1>
        <InformationCard v-for="information, j in informations" :key="information" ref=""
                    :information="information"/>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { remult } from 'remult';
import { Information } from "../../db/entities.js";
import InformationCard from "../components/InformationCard.vue";

const informations = ref([]);
const repo = remult.repo(Information);
onMounted(async () => {
    repo.find({
        skip: 4 // Skips the first 4 items (starts from the 5th, allows the fall-fest stuff to stay Anna's legacy and all that)
    }).then(e => {
        informations.value = e;
    });
});
</script>
<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.information{
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

.info-page-container{
    background: linear-gradient(to top left, #35c982, #4683FF);
    width: 100%;
    background-repeat: repeat;
    min-height: 50vh;
    padding: 100px;
    @media (max-width: 1000px){
        padding: 100px 10px;
    }
    overflow: auto;
}

</style>
