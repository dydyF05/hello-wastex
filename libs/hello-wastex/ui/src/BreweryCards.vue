<script setup lang="ts">
import BreweryCard from './BreweryCard.vue';
import { UIBreweryItem } from './types';

const props = defineProps<{
  items?: UIBreweryItem[];
  placeholdersCount: number;
  isLoading?: boolean;
}>();
</script>

<template>
  <div
    id="brewerycontainer"
    class="flex flex-row flex-1 justify-start p-8 w-full flex-wrap"
  >
    <template v-if="!!props.items?.length && !props.isLoading">
      <div class="p-4" v-for="item in props.items" :key="item.id">
        <BreweryCard :item="item" :isLoading="props.isLoading"></BreweryCard>
      </div>
    </template>
    <template v-else-if="props.isLoading">
      <div
        class="p-4"
        v-for="(_, index) in Array.from({
          length: props.placeholdersCount,
        })"
        :key="'brewery-placeholder-' + index.toString()"
      >
        <BreweryCard :isLoading="props.isLoading"></BreweryCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#brewerycontainer {
  animation: fadein 0.2s;
}
</style>
