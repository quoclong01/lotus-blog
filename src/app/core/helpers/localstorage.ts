export const getData = (key: string, defaultValue: any) => {
  const value = localStorage.getItem(key)
  if  (value) {
    return JSON.parse(value) ;
  }
  return defaultValue;
};

export const storeData = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const KEYS = {
  'I18N_LANG': 'lang'
};
