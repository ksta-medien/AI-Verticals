export enum TrackingEvents {
  MORE_CATEGORY_CLICK = 'MoreOfInPostClick',
  MAIN_MENU_CLICK = 'MainMenuClick',
  LOGO_CLICK = 'LogoClick',
  FOOTER_MENU_CLICK = 'FooterMenuClick',
  IMAGE_TEXT_BUTTON_CLICK = 'ImageTextButtonClick',
  FEATURED_HERO_BLOGPOST_CLICK = 'FeaturedHeroBlogpostClick',
  CATEGORY_PAGE_BLOGPOST_CLICK = 'CategoryPageBlogpostClick',
  BLOG_PAGE_BLOGPOST_CLICK = 'BlogPageBlogpostClick',
  HEADER_NEWSLETTER_BUTTON_CLICK = 'HeaderNewsletterButtonClick',
  EMBEDDED_POST_CLICK = 'EmbeddedPostClick',
  EXTERNAL_TEASER_CLICK = 'ExternalTeaserClick',
  COMPACT_EXPLORE_MODE = 'CompactExploreMode',
  COMPACT_EXPLORE_MODE_LOADMORE = 'CompactExploreModeLoadMore',
  CALL_TO_ACTION_CLICK = 'CallToActionClick',
  MATCHING_TAB_CLICK = 'MatchingTabClick',
  HOMEPAGE_VIDEO_PLAYED = 'HomepageVideoPlayed',
  HOMEPAGE_VIDEO_PAUSED = 'HomepageVideoPaused',
  HOMEPAGE_CTA_CLICKED = 'HomepageCallToActionButtonClicked',
  LC_LANDING_VIDEO_PLAYED = 'LCLandingVideoPlayed',
  LC_LANDING_VIDEO_PAUSED = 'LCLandingVideoPaused',
  LC_LANDING_CTA_CLICKED = 'LCLandingCallToActionButtonClicked',
  EXPERT_CTA_CLICKED = 'ExpertCTAClicked',
  EXPERT_REQUEST_SENT = 'ExpertRequestSent',
}

export function dispatchEvent(trackingEvent: TrackingEvents, content: string) {
  // useTrackEvent(trackingEvent, { props: { content } });
}
