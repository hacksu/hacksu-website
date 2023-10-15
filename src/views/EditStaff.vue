<template>
    <div>
        <p style="margin: 100px 30px 0 30px; max-width: 600px">
            <h2>Staff Page Editor</h2>
            If no website link is provided, a GitHub profile link will be used. If
            no photo URL is provided, a GitHub profile picture will be used. Blank
            titles will be removed, so just clear them and save to get rid of them.
            Add a new alumnus using the blank form at the beginning.
        </p>
        <div id="edit-staff-container">
            <div class="person" v-for="alumnus, j in alumniDisplay" :key="alumnus.id">
                <label><span>Name: </span><input type="text" v-model="alumnus.name" /></label>
                <label><span>Grad Term: </span>
                    <select v-model="alumnus.gradTerm">
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                    </select>
                </label>
                <label><span>Grad Year: </span><input type="number" v-model="alumnus.gradYear" /></label>
                <label><span>Github Username: </span><input type="string" v-model="alumnus.github" /></label>
                <label><span>Website: </span><input type="string" v-model="alumnus.link" /></label>
                <label><span>Photo URL: </span><input type="string" v-model="alumnus.photo" /></label>
                Titles:
                <input type="text" v-for="title, i in alumnus.titles" v-model="alumnus.titles[i]" :key="i" />
                <input type="text" v-model="newTitles[j]" placeholder="Add title..." />
                <div style="display: flex; justify-content: space-evenly; gap: 10px">
                    <button style="width:100%" @click="update(alumnus, j)">
                        💾{{ confirmation.has(j) ? ' ✅' : "" }}
                    </button>
                    <button style="width:100%" v-if="j!==0" @click="remove(alumnus, j)">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, reactive, computed } from "vue";
import { remult } from "remult";
import { StaffMember } from "../../db/entities.js";

const alumni = ref([]);

const confirmation = ref(new Set());

const newTitles = ref([]);
watch(alumni, (newValue) => {
    for (let i = newTitles.value.length; i < newValue.length + 1; ++i){
        newTitles.value.push("");
    }
});

const repo = remult.repo(StaffMember);

const newAlumnus = reactive(repo.create());

const alumniDisplay = computed(() => {
    return [newAlumnus].concat(alumni.value);
});

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery({orderBy: {gradYear: "desc"}})
      .subscribe(info => (alumni.value = info.applyChanges(alumni.value)));
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (alumnus, j) => {
    const newTitle = newTitles.value[j].trim();
    const titles = (alumnus.titles || []).concat(newTitle ? [newTitle] : [])
        .filter(t => t.trim());
    let update;
    if (j == 0){
        update = repo.insert({...newAlumnus, titles});
    } else {
        update = repo.update(alumnus.id, { ...alumnus, titles });
    }
    update.then(() => {
        newTitles.value[j] = "";
        confirmation.value.add(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0){
            Object.assign(newAlumnus, repo.create());
        }
    }).catch((e) => {
        alert("Error updating alumnus: " + e.message);
    })
};

const remove = (alumnus, j) => {
    if(confirm("really delete alumnus "+alumnus.name+"?")){
        repo.delete(alumnus);
    }
}

</script>

<style scoped lang="scss">
* {
    color: black;
}
#edit-staff-container {
    margin: 10px 10px;
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
