<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed, provide } from 'vue';

const data = reactive({
    paths: [] as string[]
});
const modules = import.meta.glob('@/views/**/*.vue');
const templateResult = (path: string) => { 
    return path.match(/\/template\/(dr_\d+)/) 
};
for (const path in modules) {
    const match = templateResult(path);
    if (match) {
        data.paths.push(match[0]);
    }
}

console.log(data)

</script>

<template>
    <div class="content" id="content">
        <div v-for="(path, index) in data.paths" :key="index">
            <router-link :to="path">{{ path }}</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
