import { Ref, UnwrapRef, ref, toValue, watchEffect } from 'vue';

export const useFetch = <T = unknown>(
  url: string
): {
  data?: Ref<UnwrapRef<T> | null>;
  error?: Ref<Error | null>;
  isFetching: Ref<boolean>;
} => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isFetching = ref(true);

  const fetchData = () => {
    data.value = null;
    error.value = null;
    isFetching.value = true;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
      .finally(() => (isFetching.value = false));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error, isFetching };
};
