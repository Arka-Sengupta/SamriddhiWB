
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import AuthModals from './AuthModals';

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleStartJourney = () => {
    setIsRegisterOpen(true);
  };

  const handleExploreMarketplace = () => {
    navigate('/marketplace');
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2940&auto=format&fit=crop"
            alt="Bengali artisan crafting traditional products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Bengali Text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-text mb-4">
              {t('hero.title')}
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-secondary-text mt-2">
                {t('hero.subtitle')}
              </span>
            </h1>

            {/* Main Tagline */}
            <p className="text-xl md:text-2xl text-primary-text mb-6 max-w-3xl mx-auto leading-relaxed">
              {t('hero.tagline')}
            </p>

            {/* Subtitle */}
            <p className="text-lg text-secondary-text mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleStartJourney}
                className="bg-terracotta hover:bg-terracotta/90 text-white px-8 py-3 text-lg hover-lift"
              >
                {t('hero.startJourney')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleExploreMarketplace}
                className="border-bengal-yellow text-bengal-yellow hover:bg-bengal-yellow hover:text-dark-base px-8 py-3 text-lg hover-lift"
              >
                {t('hero.exploreMarketplace')}
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-bengal-yellow">500+</div>
                <div className="text-sm text-secondary-text">{t('hero.stats.artisans')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-success-green">₹2M+</div>
                <div className="text-sm text-secondary-text">{t('hero.stats.revenue')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-terracotta">150+</div>
                <div className="text-sm text-secondary-text">{t('hero.stats.mentors')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-text">20+</div>
                <div className="text-sm text-secondary-text">{t('hero.stats.districts')}</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-secondary-text" />
          </div>
        </div>
      </section>

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

export default Hero;
