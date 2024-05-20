<script setup lang="ts">
import {
  ITEM_PER_QUERY,
  useSearchStore,
} from '@hello-wastex/search-data-access';
import { BreweryCards } from '@hello-wastex/ui';
import { ref, watch } from 'vue';
import { mapApiBreweryToUI } from './utils';

const searchStore = useSearchStore();

const EMPTY: never[] = [];
const items = ref<ReturnType<typeof mapApiBreweryToUI>[]>(EMPTY);

watch(
  searchStore,
  (store) =>
    (items.value = Array.isArray(store.data)
      ? store.data?.filter((i) => !!i).map(mapApiBreweryToUI) || EMPTY
      : EMPTY)
);
</script>

<template>
  <BreweryCards
    :items="items"
    :isLoading="searchStore.isFetching"
    :placeholdersCount="ITEM_PER_QUERY"
  ></BreweryCards>
</template>
