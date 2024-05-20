import { ApiBrewery, breweryApi } from '@hello-wastex/utils';
import { defineStore } from 'pinia';
import { Ref, WatchStopHandle, ref, toValue } from 'vue';

export const ITEM_PER_QUERY = 25;

type FetchParams = {
  url: string;
  data: Ref<unknown>;
  error: Ref<Error | null>;
  isFetching: Ref<boolean>;
  onSuccess?: () => void;
};

const fetchData = async ({ data, error, isFetching, url }: FetchParams) => {
  data.value = null;
  error.value = null;
  isFetching.value = true;

  try {
    const res = await fetch(toValue(url));
    const json = await res.json();
    data.value = json;
  } catch (err) {
    error.value = err as Error;
  } finally {
    isFetching.value = false;
  }
};

export const useSearchStore = defineStore('search', () => {
  const query = ref('');
  const isFetching = ref(false);
  const data = ref<ApiBrewery[]>([]);
  const error = ref<Error | null>(null);
  const fetchHandler = ref<WatchStopHandle>();
  const page = ref(1);

  const searchData = () => {
    data.value = [];
    isFetching.value = false;
    fetchData({
      data,
      error,
      isFetching,
      url: breweryApi.list({
        name: query.value,
        page: page.value,
        perPage: ITEM_PER_QUERY,
      }),
      onSuccess: () => {
        page.value++;
      },
    });
  };
  const clearData = () => {
    data.value = [];
    error.value = null;
    page.value = 1;
  };

  const change = (value?: string) => {
    // Reset page number when query changes
    if ((query.value || '') !== (value || '')) page.value = 1;

    // Cancel ongoing netcall effects
    fetchHandler.value && fetchHandler.value();

    query.value = value || '';

    query.value && searchData();
    !query.value && clearData();
  };

  return { query, change, isFetching, data };
});
