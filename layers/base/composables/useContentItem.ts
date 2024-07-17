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
};

export const componentForContentItem = (type: string) => {
  const component = componentMap[type];
  if (!component) {
    return defineAsyncComponent(() => import('../components/atoms/ContentItemNotImplemented.vue'));
  }
  return component;
};
