<script setup lang="ts">
import { Header } from '@hello-wastex/ui';
const onSearch = () => {
  console.log('App.vue');
};
</script>

<template>
  <Header v-bind:on-search="onSearch"></Header>
</template>
