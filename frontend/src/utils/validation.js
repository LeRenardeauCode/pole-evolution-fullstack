export const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const sanitizePhoneInput = (value = '') => {
  return value.replace(/[^0-9+\s.-]/g, '').slice(0, 20);
};

export const isValidFrenchPhone = (value = '') => {
  if (!value) {
    return true;
  }

  return FRENCH_PHONE_REGEX.test(value.trim());
};