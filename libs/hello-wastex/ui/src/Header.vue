<script setup lang="ts">
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
defineProps<{ onSearch?: (value: string) => void }>();

const isSearchDisplayed = ref(false);
const searchInputRef = ref<HTMLInputElement | null>(null);
const search = ref('');

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
          class="text-blue-600 cursor-pointer hover:text-blue-800 transition ease-in-out delay-150 hover:scale-125 duration-300"
        />
      </div>
    </nav>
    <div
      v-show="isSearchDisplayed"
      id="searchmodal"
      class="fixed h-screen w-screen top-0 bottom-0 flex flex-col p-8"
    >
      <div class="w-full flex flex-wrap justify-end">
        <FontAwesomeIcon
          :icon="faClose"
          @click="toggleSearchDisplay"
          class="text-white text-xl cursor-pointer transition ease-in-out hover:scale-125 duration-300"
        />
      </div>
      <div class="flex flex-1 justify-center">
        <input
          ref="searchInputRef"
          v-model="search"
          class="m-auto bg-transparent appearance-none focus:outline-none text-lg text-white placeholder:italic placeholder:text-grey-900 font-sans placeholder:font-sans"
          placeholder="What you're looking for ?"
          type="text"
        />
      </div>
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
  background-color: rgba(0, 0, 0, 0.85);
  animation: fadein 0.2s;
}
</style>
