import { ApiBrewery, breweryApi } from '@hello-wastex/utils';
import { defineStore } from 'pinia';
import { Ref, ref, toValue } from 'vue';

export const ITEM_PER_QUERY = 25;

type FetchParams = {
  url: string;
  data: Ref<unknown[] | null>;
  error: Ref<Error | null>;
  isFetching: Ref<boolean>;
  isFetchingMore: Ref<boolean>;
  onSuccess?: () => void;
};

const fetchData = async ({
  data,
  error,
  isFetching,
  isFetchingMore,
  url,
  onSuccess,
}: FetchParams) => {
  !isFetchingMore && (data.value = null);
  error.value = null;
  isFetching.value = true;

  try {
    const res = await fetch(toValue(url));
    const json: unknown[] = await res.json();
    if (!data.value || !isFetchingMore.value) {
      data.value = json;
    } else {
      data.value = [...data.value, ...json];
    }
    onSuccess && onSuccess();
  } catch (err) {
    error.value = err as Error;
  } finally {
    isFetching.value = false;
    isFetchingMore.value = false;
  }
};

export const useSearchStore = defineStore('search', () => {
  const query = ref('');
  const isFetching = ref(false);
  const isFetchingMore = ref(false);
  const data = ref<ApiBrewery[]>([]);
  const error = ref<Error | null>(null);
  const page = ref(1);

  const searchData = async () => {
    isFetching.value = false;
    isFetchingMore.value = page.value !== 1;
    !isFetchingMore.value && (data.value = []);
    await fetchData({
      data,
      error,
      isFetching,
      isFetchingMore,
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
    query.value = value || '';

    query.value && searchData();
    !query.value && clearData();
  };

  const nextPage = async () => {
    if (!query.value) return;
    await searchData();
  };

  return { query, change, nextPage, isFetching, isFetchingMore, data };
});
