import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Du hành thời gian' },
  { path: '/noi-dung-cuong-linh-1930', label: 'Nội dung cương lĩnh chính trị 1930' },
  { path: '/lien-he-thuc-tien', label: 'Liên hệ thực tiễn' },
  { path: '/video', label: 'Xem video' },
  { path: '/ai-usage', label: 'AI Usage' },
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
        <div className="flex items-center justify-between h-20">
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
          <NavLink
            to="/game"
            className={({ isActive }) =>
              `px-8 py-3 rounded-full font-bold transition-colors duration-300 ${
                isActive
                  ? 'bg-secondary-3 text-primary shadow-[0_0_25px_rgba(255,203,154,0.8)]'
                  : 'bg-secondary-3/80 text-primary hover:bg-secondary-3 shadow-[0_0_15px_rgba(255,203,154,0.5)] hover:shadow-[0_0_25px_rgba(255,203,154,0.8)]'
              }`
            }
          >
            Play Game
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
