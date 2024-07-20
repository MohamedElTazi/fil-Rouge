import React, { useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import '../../css/employeeForm.css'; // Assurez-vous d'avoir un fichier CSS pour le style général

const EmployeeForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin'); // Par défaut, admin
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEmployee = {
      name,
      email,
      role,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        if (password.length >= 8) {
          Toastify({
            text: 'Employé créé avec succès !',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
          }).showToast();
          setName('');
          setEmail('');
          setPassword('');
          setError(null);
        } else {
          setError('Le mot de passe doit contenir au moins 8 caractères.');
          Toastify({
            text: 'Le mot de passe doit contenir au moins 8 caractères.',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          }).showToast();
        }
      } else {
        throw new Error('Erreur lors de la création de l\'employé.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la communication avec le serveur.');
      Toastify({
        text: 'Erreur lors de la communication avec le serveur.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Formulaire de création d'employé</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Rôle :</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Créer</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
