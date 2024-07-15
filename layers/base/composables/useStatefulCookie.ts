import { useCookie, useState, watch } from '#imports';

export default function useStatefulCookie<T>(name: string) {
  const cookie = useCookie<T>(name, { maxAge: 200 * 24 * 60 * 60 });
  const state = useState<T>(name, () => cookie.value);

  watch(
    state,
    () => {
      cookie.value = state.value;
    },
    { deep: true }
  );

  return state;
}
