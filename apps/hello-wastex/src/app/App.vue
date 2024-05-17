<script setup lang="ts">
import { useSearchStore } from '@hello-wastex/search-data-access';
import NxWelcome from './NxWelcome.vue';
const search = useSearchStore();
</script>

<template>
  <NxWelcome :title="search.query" />
</template>
