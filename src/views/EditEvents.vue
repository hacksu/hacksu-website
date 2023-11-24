<template>
    <div>
        <p style="margin: 100px 30px 0 30px; max-width: 600px">
            <h2>Events Editor</h2>
        </p>
        <div id="edit-events-container">
            <div class="event" v-for="event, j in eventsToDisplay" :key="event.id">
                <label><span>Title: </span><input type="text" v-model="event.title" /></label>
                <label><span>Date: </span><input type="date" v-model="event.date" /></label>
                <label><span>Subtitle: </span><input type="text" v-model="event.subtitle" /></label>
                <label><span>Description: </span><textarea v-model="event.descriptionMD" /></label>
                <label><span>Presenter: </span><input type="text" v-model="event.presenter" /></label>
                <label><span>Link: </span><input type="text" v-model="event.link" /></label>
                <div style="display: flex; justify-content: space-evenly; gap: 10px">
                    <button style="width:100%" @click="update(event, j)">
                        {{j==0 ? "➕" : "💾"}}{{ confirmation.has(j) ? ' ✅' : "" }}
                    </button>
                    <button style="width:100%" v-if="j!==0" @click="remove(event, j)">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import { remult } from "remult";
import { Event } from "../../db/entities.js";

const events = ref([]);

const confirmation = ref(new Set());

const repo = remult.repo(Event);

const newEvent = reactive(repo.create());

const eventsToDisplay = computed(() => {
    return [newEvent].concat(events.value);
});

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery({orderBy: {date: "asc"}})
      .subscribe(info => (events.value = info.applyChanges(events.value)));
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (event, j) => {
    let update;
    if (j == 0){
        update = repo.insert(newEvent);
    } else {
        update = repo.update(event.id, event);
    }
    update.then(() => {
        confirmation.value.add(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0){
            Object.assign(newEvent, repo.create());
        }
        location.reload(true);
    }).catch((e) => {
        alert("Error updating event: " + e.message);
        alert("e: " + e);
    })
};

const remove = (event, j) => {
    if(confirm("really delete " + event.title+"?")){
        repo.delete(event);
    }
}
</script>

<style scoped lang="scss">
* {
    color: black;
}
#edit-events-container {
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
}
.event {
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
button, button:hover {
    color: black;
    border: 1px solid darkgray;
    transition: none;
}
</style>
