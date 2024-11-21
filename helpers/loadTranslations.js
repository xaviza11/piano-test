import translationsEs from '../locales/es/translations.json'
import translationsEn from '../locales/en/translations.json'

import seoEs from '../locales/es/seo.json'
import seoEn from '../locales/en/seo.json'

import alertsEs from '../locales/es/alerts.json'
import alertsEn from '../locales/en/alerts.json'

export function loadTranslation(lang) {
  if (lang === 'es')return translationsEs
  else if (lang === 'en') return translationsEn
}

export function loadSeo(lang) {
  if (lang === 'es') return seoEs
  else if (lang === 'en') return seoEn
}

export function loadAlert(lang) {
  if (lang === 'es') return alertsEs
  else if (lang === 'en') return alertsEn
}


