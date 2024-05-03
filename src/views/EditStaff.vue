<template>
    <div>
        <p style="margin: 100px 30px 0 30px; max-width: 600px">
            <h2>Staff Page Editor</h2>
        </p>
        <div id="edit-staff-container">
            <div class="person" v-for="staff, j in staffToDisplay" :key="staff.id">
                <label><span>Name: </span><input type="text" v-model="staff.name" /></label>
                <label><span>Grad Term: </span>
                    <select v-model="staff.gradTerm">
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                    </select>
                </label>
                <label><span>Grad Year: </span><input type="number" v-model="staff.gradYear" /></label>
                <label><span>Github Username: </span><input type="string" v-model="staff.github" /></label>
                <label>
                    <span>Website: </span>
                    <input type="string" v-model="staff.link" placeholder="[will link to Github by default]" />
                </label>
                <label>
                    <span>Photo: </span>
                    <input type="string" v-model="staff.photo" disabled placeholder="[uses Github pic by default]" />
                    <button v-if="staff.photo" @click="staff.photo=''" class="upload-button">❌</button>
                    <button @click="upload(j)" class="upload-button" title="Upload photo">Upload</button>
                    <input type="file" ref="fileUpload" style="display:none" accept="image/jpeg,image/png" />
                </label>
                Titles:
                <input type="text" v-for="title, i in staff.titles" v-model="staff.titles[i]" :key="i" />
                <input type="text" v-model="newTitles[j]" placeholder="Add title..." />
                <label><span>Current Leadership</span><input type="checkbox" v-model="staff.isCurrent"></label>
                <div style="display: flex; justify-content: space-evenly; gap: 10px">
                    <button style="width:100%" @click="update(staff, j)">
                        {{j==0 ? "➕" : "💾"}}{{ confirmation.has(j) ? ' ✅' : "" }}
                    </button>
                    <button style="width:100%" v-if="j!==0" @click="remove(staff, j)">
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

const staffMembers = ref([]);

const confirmation = ref(new Set());

const newTitles = ref([]);
watch(staffMembers, (newValue) => {
    for (let i = newTitles.value.length; i < newValue.length + 1; ++i){
        newTitles.value.push("");
    }
});

const repo = remult.repo(StaffMember);

const newStaff = reactive(repo.create());

const staffToDisplay = computed(() => {
    return [newStaff].concat(staffMembers.value);
});

let unsubscribe;
onMounted(() => {
    unsubscribe = repo.liveQuery({orderBy: {gradYear: "desc"}})
      .subscribe(info => (staffMembers.value = info.applyChanges(staffMembers.value)));
});

onUnmounted(() => {
    if (unsubscribe){
        unsubscribe();
    }
});

const update = (staff, j) => {
    const newTitle = newTitles.value[j].trim();
    const titles = (staff.titles || []).concat(newTitle ? [newTitle] : [])
        .filter(t => t.trim());
    let update;
    if (j == 0){
        update = repo.insert({...newStaff, titles});
    } else {
        update = repo.update(staff.id, { ...staff, titles });
    }
    update.then(() => {
        newTitles.value[j] = "";
        confirmation.value.add(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0){
            Object.assign(newStaff, repo.create());
        }
    }).catch((e) => {
        alert("Error updating staff: " + e.message);
    })
};

const remove = (staff, j) => {
    if(confirm("really delete " + staff.name+"?")){
        repo.delete(staff);
    }
}

const fileUpload = ref(null);
watch(fileUpload, (inputs) => {
    for (let i=0; i<inputs.length; ++i){
        inputs[i].onchange = () => {
            const data = new FormData();
            data.append("photo", inputs[i].files[0]);
            fetch("/staff-photo-upload", { method: "POST", body: data })
                .then(async (res) => {
                    const path = await res.text();
                    staffToDisplay.value[i].photo = path;
                });
        };
    }
}, { deep: true });
const upload = (i) => {
    if (fileUpload.value[i]){
        fileUpload.value[i].click();
    }
};

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
    align-items: center;
    width: 100%;
}
input {
    padding: 2px;
    width: 100%;
    border-radius: 5px;
    &:disabled {
        background-color: #ddd;
    }
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
.upload-button {
    height: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
    padding: 5px;
}
</style>
