import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`http://localhost:5000/employees?email=${email}&password=${password}`);
    const data = await response.json();

    if (data.length > 0) {
      Toastify({
        text: 'Connexion réussie !',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
      }).showToast();

      return data[0]; // Renvoie les détails de l'utilisateur
    } else {
      Toastify({
        text: 'Email ou mot de passe invalide.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();

      throw new Error('Invalid email or password');
    }
  } catch (error) {
    Toastify({
      text: 'Une erreur est survenue lors de l\'authentification.',
      duration: 3000,
      backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
    }).showToast();

    throw new Error('An error occurred while trying to authenticate');
  }
};
