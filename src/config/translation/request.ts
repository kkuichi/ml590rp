import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const allowedLocales = ['sk', 'en'];

export default getRequestConfig(async () => {
  const sessionCookies = await cookies();

  const language = sessionCookies.get('language')?.value;

  function checkLocale(locale: string | undefined) {
    if (!locale) {
      return 'en';
    }
    if (allowedLocales.some((value) => value === locale)) {
      return locale;
    }
    return 'en';
  }

  const locale = checkLocale(language);

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
