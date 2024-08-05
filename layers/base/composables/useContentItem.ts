import { defineAsyncComponent } from 'vue';

interface ComponentMap {
  [key: string]: ReturnType<typeof defineAsyncComponent>;
}

const componentMap: ComponentMap = {
  'content.info-person': defineAsyncComponent(() => import('@base/components/content-items/Person.vue')),
  'content.info-haus': defineAsyncComponent(() => import('@base/components/content-items/Haus.vue')),
  'content.info-event': defineAsyncComponent(() => import('@base/components/content-items/Event.vue')),
  'content.artikel-fuer-die-kategorie': defineAsyncComponent(
    () => import('@base/components/content-items/ArticlesForCategorie.vue')
  ),
  'content.alle-artikel-limit': defineAsyncComponent(
    () => import('@base/components/content-items/AllArticlesWithFilterOption.vue')
  ),
  'content.neuste-artikel': defineAsyncComponent(() => import('@base/components/content-items/NewestArticles.vue')),
  'content.personen': defineAsyncComponent(() => import('@base/components/content-items/Personen.vue')),
  'content.haeuser': defineAsyncComponent(() => import('@base/components/content-items/Haeuser.vue')),
  'content.events': defineAsyncComponent(() => import('@base/components/content-items/Events.vue')),
};

export const componentForContentItem = (type: string) => {
  const component = componentMap[type];
  if (!component) {
    return defineAsyncComponent(() => import('../components/atoms/ContentItemNotImplemented.vue'));
  }
  return component;
};
