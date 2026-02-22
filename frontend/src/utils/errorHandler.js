/**
 * Centralized error handling for API requests
 * Standardizes error logging and user-facing messages
 */

const errorHandler = {
  /**
   * Handle API errors and return user-friendly message
   * @param {Error} error - The error object from axios
   * @returns {string} User-friendly error message
   */
  getErrorMessage(error) {
    if (!error) return 'Une erreur inattendue est survenue';

    // Network error
    if (!error.response) {
      console.error('❌ Erreur réseau:', error.message);
      return 'Erreur de connexion. Vérifiez votre internet.';
    }

    // API error with response
    const status = error.response.status;
    const message = error.response.data?.message;

    console.error(`❌ Erreur ${status}:`, message || error.message);

    // Status-specific messages
    switch (status) {
      case 400:
        return message || 'Données invalides. Vérifiez votre saisie.';
      case 401:
        return 'Session expirée. Reconnectez-vous.';
      case 403:
        return 'Accès refusé. Vous n\'avez pas les permissions.';
      case 404:
        return 'Resource non trouvée.';
      case 500:
        return 'Erreur serveur. Réessayez plus tard.';
      default:
        return message || 'Une erreur est survenue.';
    }
  },

  /**
   * Log error for debugging
   * @param {string} context - Where the error occurred (e.g., "useAuth")
   * @param {Error} error - The error object
   */
  logError(context, error) {
    console.error(`[${context}]`, error);
  },
};

export default errorHandler;
