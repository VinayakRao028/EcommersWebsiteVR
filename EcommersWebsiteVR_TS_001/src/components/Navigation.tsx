import React, { useEffect } from 'react';

const Navigation: React.FC = () => {
  useEffect(() => {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
      bar.addEventListener('click', () => {
        nav?.classList.add('active');
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        nav?.classList.remove('active');
      });
    }

    // Cleanup function to remove event listeners
    return () => {
      if (bar) {
        bar.removeEventListener('click', () => {
          nav?.classList.add('active');
        });
      }
      if (close) {
        close.removeEventListener('click', () => {
          nav?.classList.remove('active');
        });
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <nav id="navbar">
      {/* Navigation content goes here */}
      <div id="bar">Menu</div>
      <div id="close">Close</div>
    </nav>
  );
};

export default Navigation;