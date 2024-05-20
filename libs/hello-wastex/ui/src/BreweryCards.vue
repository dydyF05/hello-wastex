<script setup lang="ts">
import { faSadTear } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
    <template v-else-if="!props.isLoading && !props.items?.length">
      <div
        class="flex-1 flex flex-col justify-center items-center transition ease-in-out duration-100 m-"
        id="emptybreweries"
      >
        <FontAwesomeIcon :icon="faSadTear" class="text-blue-600 text-5xl" />
        <p class="text-blue-600 mt-4 font-sans">Drink water mate</p>
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
#brewerycontainer,
#emptybreweries {
  animation: fadein 0.2s;
}

#emptybreweries {
  height: 80vh;
}
</style>
