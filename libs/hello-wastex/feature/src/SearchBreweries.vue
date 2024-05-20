<script setup lang="ts">
import {
  ITEM_PER_QUERY,
  useSearchStore,
} from '@hello-wastex/search-data-access';
import { BreweryCards, UIBreweryComponentProps } from '@hello-wastex/ui';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { mapApiBreweryToUI } from './utils';

const searchStore = useSearchStore();
const searchStoreRef = storeToRefs(useSearchStore());

const EMPTY: never[] = [];
const items = ref<UIBreweryComponentProps[]>(EMPTY);
const isFetchingMoreDebouncing = ref(false);

const LOADING_MORE_PLACEHOLDERS = Array.from({
  length: ITEM_PER_QUERY,
}).map<UIBreweryComponentProps>((_, i) => ({
  item: {
    id: `brewery-more-placeholder-${i}`,
    address: '',
    name: '',
    type: 'bar',
  },
  isLoading: true,
}));

watch(searchStoreRef.data, (data) => {
  items.value = Array.isArray(data)
    ? data
        ?.filter((i) => !!i)
        .map((item) => ({ item: mapApiBreweryToUI(item) })) || EMPTY
    : EMPTY;
});

/** Avoid multiple DOM events from triggering infinite scroll uselessly */
let reachEndDebounceId: ReturnType<typeof setTimeout>;

const handleReachEnd = (scrollAmount: number) => {
  clearTimeout(reachEndDebounceId);
  isFetchingMoreDebouncing.value = true;
  window.scrollTo(0, scrollAmount - 10);
  reachEndDebounceId = setTimeout(() => {
    useSearchStore().nextPage();
    isFetchingMoreDebouncing.value = false;
  }, 500);
};
</script>

<template>
  <BreweryCards
    title="Search"
    :items="
      isFetchingMoreDebouncing || searchStore.isFetchingMore
        ? items.concat(LOADING_MORE_PLACEHOLDERS)
        : items
    "
    :isLoading="searchStore.isFetching"
    :placeholdersCount="ITEM_PER_QUERY"
    :onReachEnd="handleReachEnd"
  ></BreweryCards>
</template>
