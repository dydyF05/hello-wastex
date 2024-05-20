<script setup lang="ts">
import { Home } from '@hello-wastex/feature';
import { useSearchStore } from '@hello-wastex/search-data-access';
import { Header } from '@hello-wastex/ui';

const onSearch = (search: string) => {
  search != undefined && useSearchStore().change(search);
};
</script>

<template>
  <Header v-bind:on-search="onSearch"></Header>
  <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <Home></Home>
  </div>
</template>
