import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const query = ref('');

  const change = (value?: string) => {
    query.value = value || '';
  };

  return { query, change };
});
