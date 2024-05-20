<script setup lang="ts">
import { BreweryCards, UIBreweryComponentProps } from '@hello-wastex/ui';
import { ApiBrewery, breweryApi, useFetch } from '@hello-wastex/utils';
import { Ref, ref, watch } from 'vue';
import { mapApiBreweryToUI } from './utils';

const COUNT = 25;

const { data, isFetching } = useFetch<ApiBrewery[]>({
  url: breweryApi.randoms({ size: COUNT }),
  // Leave time for user to see sumth is loading
  delay: 1500,
});

const EMPTY: never[] = [];
const items = ref<UIBreweryComponentProps[]>(EMPTY);

watch(
  data as Ref<ApiBrewery[]>,
  (apiItems) =>
    (items.value = Array.isArray(apiItems)
      ? apiItems
          ?.filter((i) => !!i)
          .map((item) => ({ item: mapApiBreweryToUI(item) })) || EMPTY
      : EMPTY)
);
</script>

<template>
  <BreweryCards
    title="Random"
    :items="items"
    :isLoading="isFetching"
    :placeholdersCount="COUNT"
  ></BreweryCards>
</template>
