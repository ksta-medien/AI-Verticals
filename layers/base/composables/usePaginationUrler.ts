export default function usePaginationUrler() {
  const route = useRoute();
  const baseUrl = computed(() => {
    // if there is no page number, we are on the first page
    if (!route.params.page) {
      return route.path;
    } else {
      // if there is a page number, we need to remove that last number from the path to get the base path
      return route.path.replace(new RegExp(`/${route.params.page}$`), '');
    }
  });

  const isValidPageNumber = (page: number, pageNumberTotal = Number.MAX_SAFE_INTEGER) => {
    return page >= 1 && page <= pageNumberTotal;
  };

  const getHrefUrl = (page: number, searchParams = new URLSearchParams()) => {
    if (!isValidPageNumber(page)) {
      return '';
    }
    const pagePath = page === 1 ? '' : `/${page}`;

    // const url = new URL();
    // searchParams.forEach((value, name) => {
    //   url.searchParams.set(name, value);
    // });
    return `${baseUrl.value}${pagePath}`;
  };

  return { baseUrl, getHrefUrl, isValidPageNumber };
}
