
import text from 'body-parser/lib/types/text';
<template>
    <div>
        <p style="margin: 100px 30px 0 30px; max-width: 600px">
            <h2>Meeting Notes</h2>
        </p>
        <div id="edit-notes-container">
            <div class="note" v-for="note, j in notesToDisplay" :key="note.id">
                <label><span>Title: </span><input type="text" v-model="note.title" /></label>
                <label><span>Date: </span><input type="date" v-model="note.date" /></label>
                <label><span>Note: </span><textarea v-model="note.notesMD"/></label>
                <div style="display: flex; justify-content: space-evenly; gap: 10px">
                    <button style="width:100%" @click="update(note, j)">
                        {{j==0 ? "➕" : "💾"}}{{ confirmation.has(j) ? ' ✅' : ""}}
                    </button>
                    <button style="width: 100%;" v-if="j!==0" @click="remove(note, j)">
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
import { Note } from "../../db/entities.js";

const notes = ref([]);

const confirmation = ref(new Set());

const repo = remult.repo(Note);

const newNote = reactive(repo.create());

const notesToDisplay = computed(() => {
    return [newNote].concat(notes.value);
});

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery({orderBy: {date: "asc"}})
        .subscribe(info => (notes.value = info.applyChanges(notes.value)));
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (note, j) => {
    let update;
    if (j == 0){
        update = repo.insert(newNote);
    } else {
        update = repo.update(note.id, note);
    }
    update.then(() => {
        confirmation.value.add(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0) {
            Object.assign(newNote, repo.create());
        }
        location.reload(true);
    }).catch((e) => {
        alert("Error updating note: " + e.message);
    })
};

const remove = (note, j) => {
    if(confirm("really delete " + note.title+"?")){
        repo.delete(note);
    }
}
</script>

<style scoped lang="scss">
* {
    color: black;
}
#edit-notes-container {
    margin: 10px 10px;
    display: flex;
    flex-wrap: wrap;
}


.note {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px;
    width: 900px;
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

textarea {
    padding: 2px;
    width: 100%;
    height: 400px;
}

label span {
    flex-shrink: 0;
    margin-right: 15px;
}

buton, button:hover {
    color: black;
    border: 1px solid darkgray;
    transition: none;
}
</style>
