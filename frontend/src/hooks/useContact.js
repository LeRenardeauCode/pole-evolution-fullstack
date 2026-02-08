import { useState } from 'react';
import contactService from '@services/contactService';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendMessage = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await contactService.sendMessage(formData);
      
      setSuccess(true);
      return true;
    } catch (err) {
      console.error('Erreur envoi message:', err);
      
      if (err.response?.status === 429) {
        setError('Limite de 3 messages par jour atteinte. Réessayez demain.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    loading,
    error,
    success,
    sendMessage,
    resetForm
  };
};
