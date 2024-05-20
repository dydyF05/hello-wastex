import { Ref, UnwrapRef, ref, toValue, watchEffect } from 'vue';

type UseFetchParams = {
  url: string;
  /** Should you want to delay the call for a number of milliseconds, here's the place to say so */
  delay?: number;
};
type FetchParams = UseFetchParams & {
  data: Ref<unknown>;
  error: Ref<Error | null>;
  isFetching: Ref<boolean>;
};

const fetchData = async ({
  data,
  error,
  isFetching,
  delay,
  url,
}: FetchParams) => {
  data.value = null;
  error.value = null;
  isFetching.value = true;

  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  fetch(toValue(url))
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))
    .finally(() => (isFetching.value = false));
};

export const useFetch = <T = unknown>(
  params: UseFetchParams
): {
  data?: Ref<UnwrapRef<T> | null>;
  error?: Ref<Error | null>;
  isFetching: Ref<boolean>;
} => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isFetching = ref(true);

  watchEffect(() => {
    fetchData({ ...params, data, error, isFetching });
  });

  return { data, error, isFetching };
};
