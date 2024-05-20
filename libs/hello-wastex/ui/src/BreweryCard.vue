<script setup lang="ts">
import { UIBreweryComponentProps } from './types';

const props = defineProps<UIBreweryComponentProps>();
</script>

<template>
  <div
    class="flex flex-col flex-1 justify-start max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    v-if="!!props.item && !props.isLoading"
  >
    <a href="#">
      <h5
        class="line-clamp-1 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ item?.name }}
      </h5>
    </a>
    <p class="line-clamp-1 mb-3 font-normal text-gray-700 dark:text-gray-400">
      {{ item?.type }}
    </p>
    <p class="line-clamp-2 mb-3 font-normal text-gray-700 dark:text-gray-400">
      {{ item?.address }}
    </p>
    <a
      v-if="!!props.item.websiteUrl"
      :href="item?.websiteUrl"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <p>Website</p>
      <svg
        class="rtl:rotate-180 w-3.5 h-3.5 ms-2 ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
    <button
      v-else
      disabled
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-400 rounded-lg"
    >
      No website to visit
    </button>
  </div>
  <div
    v-else-if="props.isLoading"
    class="flex flex-col flex-1 w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 rounded-lg animate-pulse"
  >
    <!-- Title on two large lines -->
    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-1"></div>
    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4"></div>
    <!-- Subtitle on three small lines -->
    <div
      class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"
    ></div>
    <div
      class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"
    ></div>
    <div
      class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-10/12 mb-4"
    ></div>
    <!-- Button on one huge line -->
    <div
      class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"
    ></div>
  </div>
</template>

<style scoped></style>
