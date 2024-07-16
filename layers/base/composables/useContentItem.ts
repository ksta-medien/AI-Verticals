import { defineAsyncComponent } from 'vue';

interface ComponentMap {
  [key: string]: ReturnType<typeof defineAsyncComponent>;
}

const componentMap: ComponentMap = {
  person: defineAsyncComponent(() => import('../components/organisms/Person.vue')),
  haus: defineAsyncComponent(() => import('../components/organisms/Haus.vue')),
};

export const componentForContentItem = (type: string) => {
  const component = componentMap[type];
  if (!component) {
    return defineAsyncComponent(() => import('../components/atoms/ContentItemNotImplemented.vue'));
  }
  return component;
};
