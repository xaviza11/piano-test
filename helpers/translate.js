import { loadAlert, loadSeo, loadTranslation } from "./loadTranslations";

export function translate(lang, type, key) {

  if(type !== 'translation' && type !== 'seo' && type !== 'alert') return 'incorrect type'

  if (type === 'translation') {
    const translations = loadTranslation(lang);
    let text = translations;

    const keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
      text = text[keys[i]];
      if (text === undefined) {
        return 'Translation key not found';
      }
    }
    return text
  }

  if (type === 'seo') {
    const translations = loadSeo(lang);
    let text = translations;

    const keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
      text = text[keys[i]];
      if (text === undefined) {
        return 'Translation key not found';
      }
    }
    return text
  }

  if (type === 'alert') {
    const translations = loadAlert(lang);
    let text = translations;

    const keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
      text = text[keys[i]];
      if (text === undefined) {
        return 'Translation key not found';
      }
    }
    return text
  }

}