<script setup lang="ts">
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { debouncedWatch } from '@vueuse/core';
import { ref } from 'vue';

// @TODO MOVE INPUT AND MODAL INTO search/ui

const props = defineProps<{
  /**
   * Called after approriate debounce when user has changed the search input
   * @param value search string value
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSearch?: (value: string) => void;
  /**
   * The search value you want to init the search with (first init only)
   */
  search?: string;
}>();

const isSearchDisplayed = ref(false);
const searchInputRef = ref<HTMLInputElement | null>(null);
const tmpSearch = ref(props.search || '');

debouncedWatch(
  tmpSearch,
  async (newSearch) => {
    props.onSearch !== undefined && props.onSearch(newSearch);
  },
  { debounce: 500 }
);

const toggleSearchDisplay = (): void => {
  isSearchDisplayed.value = !isSearchDisplayed.value;
  // Leave the DOM some time to build before forcing focus
  isSearchDisplayed.value &&
    setTimeout(() => searchInputRef?.value?.focus(), 10);
};
</script>

<template>
  <header class="bg-white shadow-md">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <h1 class="ml-5 text-2xl text-blue-600 pointer-events-none font-sans">
          Brewery Sempa
        </h1>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <FontAwesomeIcon
          :icon="faSearch"
          @click="toggleSearchDisplay"
          v-if="!isSearchDisplayed"
          class="text-blue-600 cursor-pointer hover:text-blue-800 transition ease-in-out delay-150 hover:scale-110 duration-100"
        />
      </div>
    </nav>
    <div
      v-show="isSearchDisplayed"
      id="searchmodal"
      class="fixed h-screen w-screen top-0 bottom-0 flex flex-1 justify-center flex-col p-8"
      v-on:keyup.escape="toggleSearchDisplay"
      @click="toggleSearchDisplay"
    >
      <input
        ref="searchInputRef"
        v-model="tmpSearch"
        class="m-auto bg-transparent appearance-none focus:outline-none text-lg text-white placeholder:italic placeholder:text-grey-900 font-sans placeholder:font-sans"
        placeholder="What you're looking for ?"
        type="text"
        v-on:keyup.enter="toggleSearchDisplay"
        @click.stop=""
      />
    </div>
  </header>
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
#searchmodal {
  background-color: rgba(00, 0, 0, 0.8);
  animation: fadein 0.2s;
}
</style>
