export function loadTranslation(lang) {
  if (lang === 'es')return require('../locales/es/translations.json');
  else if (lang === 'en') return require('../locales/en/translation.json');
}

export function loadSeo(lang) {
  if (lang === 'es') return require('../locales/es/seo.json');
  else if (lang === 'en') return require('../locales/en/seo.json');
}

export function loadAlert(lang) {
  if (lang === 'es') return require('../locales/es/alert.json');
  else if (lang === 'en') return require('../locales/en/alert.json');
}


