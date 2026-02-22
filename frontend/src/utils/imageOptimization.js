/**
 * Optimise une URL Cloudinary avec transformations pour performance
 * @param {string} url - URL Cloudinary originale
 * @param {object} options - Options de transformation
 * @returns {string} - URL optim isée
 */
export const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary')) {
    return url;
  }

  const {
    width = 'auto',
    quality = 'auto:good',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  // Détection de la structure URL Cloudinary
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  // Construire les transformations
  const transformations = [
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
    `g_${gravity}`,
  ].join(',');

  // Insérer les transformations après /upload/
  const optimizedUrl = `${url.slice(0, uploadIndex + 8)}${transformations}/${url.slice(uploadIndex + 8)}`;

  return optimizedUrl;
};

/**
 * Génère un srcSet responsive pour images Cloudinary
 * @param {string} url - URL Cloudinary originale
 * @returns {string} - srcSet avec différentes résolutions
 */
export const generateCloudinarySrcSet = (url) => {
  if (!url || !url.includes('cloudinary')) {
    return '';
  }

  const widths = [400, 800, 1200, 1600];
  
  return widths
    .map((width) => {
      const optimized = optimizeCloudinaryUrl(url, { width });
      return `${optimized} ${width}w`;
    })
    .join(', ');
};
