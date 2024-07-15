import { $URL } from 'ufo';
const urlDisect = new RegExp('^/(?<topic>.*?)(?:/.*?)?(?<id>d+)$');

type UrlParts = {
  topic: string;
  id: string;
};

const urlPartDefaults: {
  [P in keyof UrlParts]-?: UrlParts[P];
} = {
  topic: '',
  id: '',
};

export function extractUrlParts(href: string) {
  const url = new $URL(href as string);

  return {
    ...url,
    ...urlPartDefaults,
    ...url.pathname.match(urlDisect)?.groups,
    fullUrl: url.toString(),
  };
}
