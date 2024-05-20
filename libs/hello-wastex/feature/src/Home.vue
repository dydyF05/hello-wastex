<script setup lang="ts">
import { useSearchStore } from '@hello-wastex/search-data-access';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import RandomBreweries from './RandomBreweries.vue';
import SearchBreweries from './SearchBreweries.vue';

const { query } = storeToRefs(useSearchStore());
const search = ref(query.value || '');

watch(query, (value) => {
  search.value = value;
});
</script>

<template>
  <RandomBreweries v-if="!search"></RandomBreweries>
  <SearchBreweries v-if="search"></SearchBreweries>
</template>
