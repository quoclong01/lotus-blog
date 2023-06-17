import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { KEYS, getData } from '../helpers/localstorage';
import translationEN from '../../../assets/i18n/en/index';
import translationVI from '../../../assets/i18n/vi/index';
import translationJP from '../../../assets/i18n/ja/index';

// the translations
const resources = {
	en: {
		translation: translationEN
	},
	vi: {
		translation: translationVI
	},
	ja: {
		translation: translationJP
	}
};

const getLang = () => {
	const lang = getData(KEYS.I18N_LANG, 'en');

	return lang
}

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
			lng: getLang(),
			resources,
			fallbackLng: 'en',
			debug: true,
			interpolation: {
				escapeValue: false // not needed for react as it escapes by default
			}
	});

export default i18n;

