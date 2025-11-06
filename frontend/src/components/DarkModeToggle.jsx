import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  // We'll use state to track the theme
  const [theme, setTheme] = useState('light');

  // On mount, check the user's preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
    // Set the attribute on the <html> tag
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default DarkModeToggle;