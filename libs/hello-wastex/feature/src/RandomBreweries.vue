<script setup lang="ts">
import { BreweryCards } from '@hello-wastex/ui';
import { ApiBrewery, breweryApi, useFetch } from '@hello-wastex/utils';
import { Ref, ref, watch } from 'vue';
import { mapApiBreweryToUI } from './utils';

const COUNT = 25;

const { data, isFetching } = useFetch<ApiBrewery[]>(
  breweryApi.randoms({ size: COUNT })
);

const EMPTY: never[] = [];
const items = ref<ReturnType<typeof mapApiBreweryToUI>[]>(EMPTY);

watch(
  data as Ref<ApiBrewery[]>,
  (apiItems) =>
    (items.value = Array.isArray(apiItems)
      ? apiItems?.filter((i) => !!i).map(mapApiBreweryToUI) || EMPTY
      : EMPTY)
);
</script>

<template>
  <BreweryCards
    :items="items"
    :isLoading="isFetching"
    :placeholdersCount="COUNT"
  ></BreweryCards>
</template>
