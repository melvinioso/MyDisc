export function isString(value) {
  if (value === undefined) return;
  if (typeof value !== 'string') {
    throw new Error('Must be a string');
  }
}

export function isNumber(value) {
  if (typeof value !== 'number') {
    throw new Error('Must be a number');
  }
}

export function isJSON(value) {
  if (typeof value !== 'object') {
    throw new Error('Not valid JSON');
  }

  const keys = Object.keys(value);

  if (!keys || !keys.length) {
    throw new Error('Not valid JSON');
  }
}

export function isValidEmail(value) {
  const mail = /\S+@\S+\.\S+/;
  if (mail.test(value)) {
    throw new Error('Not a valid email');
  }
}
