<template>
    <div id="edit-staff-container">
        <div class="person" v-for="alumnus, j in alumni" :key="alumnus.id">
            <label><span>Name: </span><input type="text" v-model="alumnus.name" /></label>
            <label><span>Grad Term: </span><input type="text" v-model="alumnus.gradTerm" /></label>
            <label><span>Grad Year: </span><input type="number" v-model="alumnus.gradYear" /></label>
            <label><span>Github Username: </span><input type="string" v-model="alumnus.github" /></label>
            <label><span>Photo URL: </span><input type="string" v-model="alumnus.photo" /></label>
            Titles:
            <input type="text" v-for="title, i in alumnus.titles" v-model="alumnus.titles[i]" :key="i" />
            <input type="text" v-model="newTitles[j]" placeholder="Add title..." />
            <button @click="update(alumnus, j)">💾</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { remult } from "remult";
import { StaffMember } from "../../db/entities.js";

const alumni = ref([]);

const newTitles = ref([]);
watch(alumni, (newValue) => {
    for (let i = newTitles.value.length; i < newValue.length; ++i){
        newTitles.value.push("");
    }
});

const repo = remult.repo(StaffMember);

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery()
      .subscribe(info => (alumni.value = info.applyChanges(alumni.value)));
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (alumnus, j) => {
    const newTitle = newTitles.value[j].trim();
    const titles = (alumnus.titles || []).concat(newTitle ? [newTitle] : []);
    repo.update(alumnus.id, {
        ...alumnus,
        titles: titles.filter(t => t.trim())
    }).then(() => {newTitles.value[j] = ""});
};

</script>

<style scoped lang="scss">
#edit-staff-container {
    margin: 100px 10px;
    color: black;
    display: flex;
    flex-wrap: wrap;
}
.person {
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
</style>
