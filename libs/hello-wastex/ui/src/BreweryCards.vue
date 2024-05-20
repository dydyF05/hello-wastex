<script setup lang="ts">
import { faSadTear } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onMounted, onUnmounted, ref } from 'vue';
import BreweryCard from './BreweryCard.vue';
import { UIBreweryComponentProps } from './types';

const props = defineProps<{
  title: string;
  items?: UIBreweryComponentProps[];
  placeholdersCount: number;
  isLoading?: boolean;
  /**
   * Will be called anytime user has scrolled down to bottom of the list
   * @param scrollBottom The exact y pixel number that triggered end reach
   */
  onReachEnd?: (scrollBottom: number) => void;
}>();

const scrollContainer = ref<HTMLDivElement | null>(null);

const handleScroll = () => {
  if (!scrollContainer.value || !props.onReachEnd) return;
  const trigger = scrollContainer.value.getBoundingClientRect().bottom * 0.75;
  if (trigger < window.innerHeight) {
    props.onReachEnd(trigger);
  }
};

onMounted(() => {
  if (props.onReachEnd) window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="w-full">
    <h4 class="text-2xl font-bold text-slate-400 ml-10">{{ props.title }}</h4>
    <div
      ref="scrollContainer"
      id="brewerycontainer"
      class="flex flex-row flex-1 justify-start p-8 pt-2 w-full flex-wrap"
    >
      <template v-if="!!props.items?.length && !props.isLoading">
        <div
          class="p-4"
          v-for="itemProps in props.items"
          :key="itemProps.item?.id"
        >
          <BreweryCard v-bind="itemProps"></BreweryCard>
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
          <FontAwesomeIcon :icon="faSadTear" class="text-slate-400 text-5xl" />
          <p class="text-slate-400 mt-4 font-sans">Drink water mate</p>
        </div>
      </template>
    </div>
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
  height: 70vh;
}
</style>
