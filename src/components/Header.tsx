import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Du hành thời gian' },
  { path: '/game', label: 'Game' },
  { path: '/video', label: 'Xem video' },
  { path: '/ai-usage', label: 'AI Usage' },
  { path: '/lien-he-thuc-tien', label: 'Liên hệ thực tiễn' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLinkStyle = {
    color: '#FFCB9A',
    textShadow: '0 0 10px rgba(255, 203, 154, 0.7)',
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/80 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="text-secondary-4/80 hover:text-secondary-4 transition-colors duration-300 font-medium"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
