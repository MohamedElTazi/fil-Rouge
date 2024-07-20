// src/components/ThemeToggleButton.tsx
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Passer en mode {theme === 'light' ? 'sombre' : 'clair'}
    </button>
  );
};

export default ThemeToggleButton;
