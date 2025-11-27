<template>
    <div class="edit-icons-page">
        <div class="page-header">
            <h1>Lesson Icons Editor</h1>
            <p class="subtitle">Manage icon mappings for lesson categories</p>
        </div>

        <div class="icons-grid">
            <div class="icon-card" v-for="(icon, j) in iconsToDisplay" :key="icon.categoryName || `new-${j}`" @input="edited.add(j)">
                <div class="icon-preview">
                    <Icon v-if="icon.iconifyId" :icon="icon.iconifyId" width="64" height="64" />
                    <div v-else class="no-icon">?</div>
                </div>

                <div class="icon-form">
                    <div class="form-group">
                        <label>Category Name</label>
                        <input 
                            type="text" 
                            v-model="icon.categoryName" 
                            class="form-input"
                            placeholder="e.g., react, python, docker"
                            :disabled="j !== 0"
                        />
                    </div>

                    <div class="form-group">
                        <label>Iconify ID</label>
                        <input 
                            type="text" 
                            v-model="icon.iconifyId" 
                            class="form-input"
                            placeholder="e.g., logos:react, logos:python"
                        />
                        <a href="https://icon-sets.iconify.design/" target="_blank" class="icon-link">
                            Browse Iconify Icons →
                        </a>
                    </div>

                    <div class="button-group">
                        <button class="btn btn-primary" @click="update(icon, j)">
                            {{(j==0 ? "Add New Icon" : "Save Changes") + (edited.has(j) ? " ❗" : "")}}
                            {{ confirmation.has(j) ? ' ✅' : "" }}
                        </button>
                        <button class="btn btn-danger" v-if="j!==0" @click="remove(icon, j)">
                            Delete Icon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { remult } from "remult";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { LessonIcon } from "../../db/entities";
import { Icon } from '@iconify/vue';

const icons = ref([]);
const confirmation = ref(new Set());
const edited = ref(new Set());
const repo = remult.repo(LessonIcon);
const newIcon = ref(repo.create());

const iconsToDisplay = computed(() => [newIcon.value, ...icons.value]);

let unsubscribe;
onMounted(async () => {
    try {
        unsubscribe = repo.liveQuery({
            orderBy: { categoryName: "asc" }
        }).subscribe(info => {
            icons.value = info.items;
            console.log('Icons loaded:', icons.value);
        });
    } catch (error) {
        console.error('Error loading icons:', error);
    }
});

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
});

const update = (icon, j) => {
    if (!icon.categoryName || !icon.iconifyId) {
        alert("Please fill in both category name and iconify ID");
        return;
    }

    let update;
    if (j == 0) {
        update = repo.insert(newIcon.value);
    } else {
        update = repo.update(icon.categoryName, icon);
    }
    update.then(() => {
        confirmation.value.add(j);
        edited.value.delete(j);
        setTimeout(() => confirmation.value.delete(j), 3000);
        if (j == 0) {
            newIcon.value = repo.create();
        }
    }).catch((e) => {
        alert("Error updating icon: " + e);
    })
};

const remove = (icon, j) => {
    if(confirm(`Really delete icon mapping for "${icon.categoryName}"?`)){
        repo.delete(icon);
    }
}
</script>

<style scoped lang="scss">
.edit-icons-page {
    padding: 2rem;
    background-color: #f5f5f5;
    min-height: 100vh;
    color: #2c3e50;
}

.page-header {
    max-width: 1200px;
    margin: 0 auto 2rem;
    padding-top: 80px;

    h1 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin: 0 0 0.5rem;
    }

    .subtitle {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin: 0;
    }
}

.icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.icon-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.icon-preview {
    height: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    .no-icon {
        font-size: 48px;
        font-weight: 300;
        opacity: 0.5;
    }
}

.icon-form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        color: #2c3e50;
        font-weight: 500;
        font-size: 0.9rem;
    }
}

.form-input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
    color: #2c3e50;
    background-color: white;

    &:focus {
        outline: none;
        border-color: #667eea;
    }

    &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }

    &::placeholder {
        color: #bdc3c7;
    }
}

.icon-link {
    font-size: 0.85rem;
    color: #667eea;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
}

.button-group {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;

    &:hover {
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        opacity: 0.9;
    }
}

.btn-primary {
    background-color: #667eea;
    color: white;

    &:hover {
        background-color: #5568d3;
    }
}

.btn-danger {
    background-color: #e74c3c;
    color: white;

    &:hover {
        background-color: #c0392b;
    }
}
</style>
