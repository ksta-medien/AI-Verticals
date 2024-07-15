import { extractUrlParts } from './extractUrlParts';

export const addDomainToCookieOptions = <CookieSerializeOptions>(
  cookieOptions: CookieSerializeOptions,
  uri: string
): CookieSerializeOptions => {
  const { host } = extractUrlParts(uri);
  const domainParts = (host || uri).split('.');
  if (domainParts.length >= 3) {
    domainParts.splice(0, domainParts.length - 3 || 1);
  }
  return { ...cookieOptions, domain: uri.includes('run.app') ? null : domainParts.join('.').replace(/:\d+/, '') };
};

export const generateAnonCookieValue = () => {
  return Math.floor(1e20 * Math.random()).toString();
};
