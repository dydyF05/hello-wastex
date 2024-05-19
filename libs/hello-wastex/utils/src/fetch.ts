import { Ref, UnwrapRef, ref, toValue, watchEffect } from 'vue';

type Params = {
  url: string;
  /** Should you want to delay the call for a number of milliseconds, here's the place to say so */
  delay?: number;
};

export const useFetch = <T = unknown>({
  url,
  delay,
}: Params): {
  data?: Ref<UnwrapRef<T> | null>;
  error?: Ref<Error | null>;
  isFetching: Ref<boolean>;
} => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isFetching = ref(true);

  const fetchData = async () => {
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

  watchEffect(() => {
    fetchData();
  });

  return { data, error, isFetching };
};
