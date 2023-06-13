export const emailValidator = () => {
  return {
    required: { value: true, message: 'Email address is required.' },
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      message: 'Email address is invalid.',
    },
  };
};

export const passwordValidator = () => {
  return {
    required: { value: true, message: 'Password is required.' },
    minLength: {
      value: 8,
      message: 'Please enter at least 8 characters.',
    },
    maxLength: {
      value: 20,
      message: 'Please enter at most 20 characters.',
    },
  };
};

export const nameValidator = () => {
  return {
    required: { value: true, message: 'is required.' },
    pattern: {
      value:
        /^[a-zA-Z0-9_ỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ.+'-]+(?:\s[a-zA-Z0-9_ỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ.+'-]+)*\s?$/,
      message: 'is invalid.',
    },
  };
};
