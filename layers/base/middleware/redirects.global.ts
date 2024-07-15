import { normalize } from '@utils/jsonApiNormalizer';
import type { ManualRedirect } from '@types';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log(`check for redirect - ${to.path}`);
  // const { find } = useStrapi();
  // try {
  //   const { data } = await useAsyncData(`redirect-${to.path}`, () =>
  //     find('manual-redirects', { filters: { from: to.path } })
  //   );
  //   const manualRedirect = normalize(data.value?.data[0]) as ManualRedirect;
  //   if (manualRedirect) {
  //     console.log(`will redirect '${to.path}' to '${manualRedirect.to}'`);
  //     return navigateTo(manualRedirect.to, { redirectCode: manualRedirect.statusCode });
  //   }
  // } catch (e) {
  //   console.log('error fetching manual redirect');
  // }
});
