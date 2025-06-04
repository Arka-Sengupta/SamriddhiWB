import { useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Ripple, initTWE } from 'tw-elements';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  useEffect(() => {
    initTWE({ Ripple });
  }, []);

  return (
    <footer className="bg-dark-container border-t border-dark-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">স</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-text">SamriddhiWB</h1>
                <p className="text-xs text-secondary-text -mt-1">সমৃদ্ধি</p>
              </div>
            </div>
            <p className="text-secondary-text text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-primary-text font-semibold mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#marketplace" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.marketplace')}</a></li>
              <li><a href="#mentorship" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.mentorship')}</a></li>
              <li><a href="#community" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.community')}</a></li>
              <li><a href="#finance" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.finance')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-primary-text font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.helpCenter')}</a></li>
              <li><a href="#tutorials" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.tutorials')}</a></li>
              <li><a href="#contact" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#faq" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.faq')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-primary-text font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#terms" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#about" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.about')}</a></li>
              <li><a href="#careers" className="text-secondary-text hover:text-primary-text transition-colors">{t('footer.careers')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-base mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-text text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Facebook */}
              <a
                href="#"
                className="relative inline-block rounded-full bg-blue-600 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <Facebook className="h-4 w-4" />
                </span>
                <span className="sr-only">Facebook</span>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="relative inline-block rounded-full bg-sky-500 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-sky-600 hover:shadow-lg focus:bg-sky-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-700 active:shadow-lg"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <Twitter className="h-4 w-4" />
                </span>
                <span className="sr-only">Twitter</span>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="relative inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <Instagram className="h-4 w-4" />
                </span>
                <span className="sr-only">Instagram</span>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="relative inline-block rounded-full bg-blue-500 p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <span className="[&>svg]:h-4 [&>svg]:w-4">
                  <Linkedin className="h-4 w-4" />
                </span>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
