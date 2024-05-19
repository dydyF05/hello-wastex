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
  <Home></Home>
</template>
