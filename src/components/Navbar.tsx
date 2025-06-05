
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import AuthModals from './AuthModals';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { href: "/marketplace", label: t('nav.marketplace') },
    { href: "/mentorship", label: t('nav.mentorship') },
    { href: "/community", label: t('nav.community') },
    { href: "/about", label: t('nav.about') }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsMenuOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-base/90 backdrop-blur-md border-b border-dark-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-sm">স</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-primary-text">
                  SamriddhiWB
                </h1>
                <p className="text-xs text-secondary-text -mt-1">সমৃদ্ধি</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-base font-bold text-primary-text">
                  SamriddhiWB
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors text-sm lg:text-base ${
                    isActive(item.href)
                      ? "text-terracotta font-semibold"
                      : "text-secondary-text hover:text-primary-text"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons and Language Switcher */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <LanguageSwitcher />
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{user?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden">
                      <DropdownMenuItem className="bg-transparent hover:bg-white/[0.07] transition-all duration-300 ease-in-out">
                        <Link to="/profile" className="flex items-center w-full text-white/95 font-medium p-3 rounded-lg">
                          <User size={16} className="mr-3 text-white/80" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-300 hover:bg-red-500/5 hover:text-red-200 transition-all duration-300 ease-in-out p-3"
                        onClick={logout}
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <button 
                    onClick={handleLoginClick}
                    className="relative px-4 py-2 text-sm text-secondary-text rounded-full border border-gray-600 overflow-hidden group transition-all duration-300 hover:text-white"
                  >
                    <span className="absolute inset-0 bg-terracotta transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10">{t('nav.login')}</span>
                  </button>
                  <Button 
                    size="sm" 
                    onClick={handleRegisterClick}
                    className="bg-terracotta hover:bg-terracotta/90 text-white text-sm rounded-full"
                  >
                    {t('nav.joinNow')}
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-fade-in pb-4">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-container rounded-lg mt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 transition-colors text-sm ${
                      isActive(item.href)
                        ? "text-terracotta font-semibold"
                        : "text-secondary-text hover:text-primary-text"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <button 
                    onClick={handleLoginClick}
                    className="relative px-3 py-2 text-sm text-secondary-text rounded-full border border-gray-600 overflow-hidden group transition-all duration-300 hover:text-white text-left"
                  >
                    <span className="absolute inset-0 bg-terracotta transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10">{t('nav.login')}</span>
                  </button>
                  <Button 
                    size="sm" 
                    onClick={handleRegisterClick}
                    className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full"
                  >
                    {t('nav.joinNow')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Navbar;
