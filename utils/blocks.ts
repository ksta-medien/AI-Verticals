import { type DefineComponent, defineAsyncComponent } from 'vue';
export const blocks: Partial<Record<string, DefineComponent<object, object, any> | string>> = {
  'content-items.r-ich-text': defineAsyncComponent(() => import('@base/components/content-items/ArticleRichText.vue')),
  'content-items.media': defineAsyncComponent(() => import('@base/components/content-items/ArticleMedia.vue')),
  'content-items.free-html': defineAsyncComponent(() => import('@base/components/content-items/FreeHtml.vue')),
  'content-items.embedded-post': defineAsyncComponent(() => import('@base/components/content-items/EmbeddedPost.vue')),
  'content-items.external-teaser': defineAsyncComponent(
    () => import('@base/components/content-items/ExternalTeaser.vue')
  ),
  'content-items.quote': defineAsyncComponent(() => import('@base/components/content-items/ArticleQuote.vue')),
  'content-items.faq-list': defineAsyncComponent(() => import('@base/components/content-items/FAQList.vue')),
  'content-items.you-tube-video': defineAsyncComponent(
    () => import('@base/components/content-items/ArticleYouTubeVideo.vue')
  ),
};

export function componentForBlockType(type: string) {
  return blocks[type];
}
