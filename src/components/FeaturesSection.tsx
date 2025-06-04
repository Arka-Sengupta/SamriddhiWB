
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingBag, Users, CreditCard, CheckCircle, Globe, Shield, Clock, TrendingUp, BookOpen, Award, MessageCircle, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('features.marketplace.title'),
      description: t('features.marketplace.description'),
      icon: "🏪",
      color: "terracotta",
      benefits: [
        t('features.marketplace.benefit1'),
        t('features.marketplace.benefit2'),
        t('features.marketplace.benefit3')
      ],
      hasPopup: true,
      popupContent: {
        title: t('features.popup.marketplace.title'),
        description: t('features.popup.marketplace.description'),
        features: [
          {
            icon: <Globe className="h-5 w-5 text-terracotta" />,
            title: t('features.popup.marketplace.globalAccess.title'),
            description: t('features.popup.marketplace.globalAccess.description')
          },
          {
            icon: <ShoppingBag className="h-5 w-5 text-terracotta" />,
            title: t('features.popup.marketplace.productManagement.title'),
            description: t('features.popup.marketplace.productManagement.description')
          },
          {
            icon: <Shield className="h-5 w-5 text-terracotta" />,
            title: t('features.popup.marketplace.secureTransactions.title'),
            description: t('features.popup.marketplace.secureTransactions.description')
          },
          {
            icon: <TrendingUp className="h-5 w-5 text-terracotta" />,
            title: t('features.popup.marketplace.analytics.title'),
            description: t('features.popup.marketplace.analytics.description')
          }
        ],
        stats: [
          { label: t('features.popup.marketplace.activeSellers'), value: "2,500+" },
          { label: t('features.popup.marketplace.productsListed'), value: "15,000+" },
          { label: t('features.popup.marketplace.monthlyOrders'), value: "8,000+" }
        ]
      }
    },
    {
      title: t('features.mentorship.title'),
      description: t('features.mentorship.description'),
      icon: "👥",
      color: "bengal-yellow",
      benefits: [
        t('features.mentorship.benefit1'),
        t('features.mentorship.benefit2'),
        t('features.mentorship.benefit3')
      ],
      hasPopup: true,
      popupContent: {
        title: t('features.popup.mentorship.title'),
        description: t('features.popup.mentorship.description'),
        features: [
          {
            icon: <Users className="h-5 w-5 text-bengal-yellow" />,
            title: t('features.popup.mentorship.oneOnOne.title'),
            description: t('features.popup.mentorship.oneOnOne.description')
          },
          {
            icon: <BookOpen className="h-5 w-5 text-bengal-yellow" />,
            title: t('features.popup.mentorship.skillDevelopment.title'),
            description: t('features.popup.mentorship.skillDevelopment.description')
          },
          {
            icon: <Target className="h-5 w-5 text-bengal-yellow" />,
            title: t('features.popup.mentorship.strategicPlanning.title'),
            description: t('features.popup.mentorship.strategicPlanning.description')
          },
          {
            icon: <Award className="h-5 w-5 text-bengal-yellow" />,
            title: t('features.popup.mentorship.industryInsights.title'),
            description: t('features.popup.mentorship.industryInsights.description')
          }
        ],
        stats: [
          { label: t('features.popup.mentorship.expertMentors'), value: "150+" },
          { label: t('features.popup.mentorship.successRate'), value: "92%" },
          { label: t('features.popup.mentorship.avgSessionTime'), value: "45 Min" }
        ]
      }
    },
    {
      title: t('features.microfinance.title'),
      description: t('features.microfinance.description'),
      icon: "💰",
      color: "success-green",
      benefits: [
        t('features.microfinance.benefit1'),
        t('features.microfinance.benefit2'),
        t('features.microfinance.benefit3')
      ],
      hasPopup: true,
      popupContent: {
        title: t('features.popup.microfinance.title'),
        description: t('features.popup.microfinance.description'),
        features: [
          {
            icon: <Clock className="h-5 w-5 text-success-green" />,
            title: t('features.popup.microfinance.quickApproval.title'),
            description: t('features.popup.microfinance.quickApproval.description')
          },
          {
            icon: <CreditCard className="h-5 w-5 text-success-green" />,
            title: t('features.popup.microfinance.flexibleOptions.title'),
            description: t('features.popup.microfinance.flexibleOptions.description')
          },
          {
            icon: <CheckCircle className="h-5 w-5 text-success-green" />,
            title: t('features.popup.microfinance.lowRates.title'),
            description: t('features.popup.microfinance.lowRates.description')
          },
          {
            icon: <Users className="h-5 w-5 text-success-green" />,
            title: t('features.popup.microfinance.counseling.title'),
            description: t('features.popup.microfinance.counseling.description')
          }
        ],
        stats: [
          { label: t('features.popup.microfinance.loansDispersed'), value: "₹12+ Cr" },
          { label: t('features.popup.microfinance.successRate'), value: "96%" },
          { label: t('features.popup.microfinance.avgProcessing'), value: "36 Hours" }
        ]
      }
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-dark-base">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-text mb-3 md:mb-4">
            {t('features.title')}
          </h2>
          <p className="text-base md:text-lg text-secondary-text max-w-2xl mx-auto px-4 sm:px-0">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-dark-container p-6 md:p-8 rounded-xl hover-lift group cursor-pointer"
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2 md:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-secondary-text mb-4 md:mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2 mb-4 md:mb-6">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-secondary-text flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-${feature.color} mr-3 flex-shrink-0`}></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className={`bg-${feature.color} hover:bg-${feature.color}/90 text-white group-hover:translate-x-1 transition-all duration-300 rounded-full px-4 py-2 text-xs md:text-sm font-medium w-full`}
                  >
                    {t('features.learnMore')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-dark-container border-gray-700 text-primary-text max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg md:text-xl font-bold text-primary-text mb-2">
                      {feature.popupContent?.title}
                    </DialogTitle>
                    <p className="text-sm md:text-base text-secondary-text mb-4 md:mb-6">
                      {feature.popupContent?.description}
                    </p>
                  </DialogHeader>
                  
                  <div className="space-y-4 md:space-y-6">
                    {/* Key Features */}
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-primary-text mb-3 md:mb-4">
                        {t('features.popup.marketplace.keyFeatures')}
                      </h4>
                      <div className="grid gap-3 md:gap-4">
                        {feature.popupContent?.features.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 md:p-4 bg-dark-base rounded-lg">
                            <div className="flex-shrink-0 mt-0.5">
                              {item.icon}
                            </div>
                            <div>
                              <h5 className="text-sm md:text-base font-medium text-primary-text mb-1">
                                {item.title}
                              </h5>
                              <p className="text-xs md:text-sm text-secondary-text">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Statistics */}
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-primary-text mb-3 md:mb-4">
                        {t('features.popup.marketplace.impact')}
                      </h4>
                      <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {feature.popupContent?.stats.map((stat, idx) => (
                          <div key={idx} className="text-center p-3 md:p-4 bg-dark-base rounded-lg">
                            <div className={`text-lg md:text-2xl font-bold text-${feature.color} mb-1`}>
                              {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-secondary-text">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 md:pt-4">
                      <Button 
                        className={`w-full bg-${feature.color} hover:bg-${feature.color}/90 text-white rounded-full py-2 md:py-3 text-sm md:text-base font-medium`}
                      >
                        {t('features.popup.getStarted')}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-dark-container p-6 md:p-8 rounded-xl max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-primary-text mb-3 md:mb-4">
              {t('features.cta.title')}
            </h3>
            <p className="text-sm md:text-base text-secondary-text mb-4 md:mb-6 px-4 sm:px-0">
              {t('features.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-6 md:px-8 text-sm md:text-base">
                {t('features.cta.entrepreneur')}
              </Button>
              <Button size="lg" className="bg-bengal-yellow hover:bg-bengal-yellow/90 text-dark-base rounded-full px-6 md:px-8 text-sm md:text-base">
                {t('features.cta.mentor')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
