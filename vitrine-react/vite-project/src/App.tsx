// src/App.tsx
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Feature from './components/Salles';
import Offer from './components/Offer';
import Contact from './components/Contact';
import Footer from './components/Footer';
import About from './components/About';
import BookingForm from './components/Reservation';
import './App.css';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import ThemeToggleButton from './components/ThemeToggleButton';

const ThemedApp: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Navbar />
      <Header />
      <Feature />
      <Offer />
      <About />
      <BookingForm />
      <Contact />
      <Footer />
      <ThemeToggleButton />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
