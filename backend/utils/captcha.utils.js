export const verifyRecaptchaToken = async ({ token, ipAddress } = {}) => {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return true;
  }

  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return false;
  }

  try {
    const payload = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token.trim(),
    });

    if (ipAddress) {
      payload.append('remoteip', ipAddress);
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return Boolean(data.success);
  } catch (error) {
    console.error('Erreur vérification reCAPTCHA:', error.message);
    return false;
  }
};