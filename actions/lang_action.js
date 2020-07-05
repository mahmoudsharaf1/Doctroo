import {CHANGE_LANGUAGE} from './type';
import I18n from '../locales/i18n';

export const changeLanguge = (locale) => {
    I18n.locale = locale;
    return { type: CHANGE_LANGUAGE, payload: locale };
}