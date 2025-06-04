import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object with proper typing
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.marketplace': 'Marketplace',
    'nav.mentorship': 'Mentorship',
    'nav.community': 'Community',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.joinNow': 'Join Now',
    
    // Hero Section
    'hero.title': 'সমৃদ্ধি',
    'hero.subtitle': 'SamriddhiWB',
    'hero.tagline': "Empowering West Bengal's rural entrepreneurs through digital markets, expert mentorship, and microfinance",
    'hero.description': 'Connect traditional craftsmanship with modern opportunities. Build sustainable livelihoods. Create prosperity that lasts.',
    'hero.startJourney': 'Start Your Journey',
    'hero.exploreMarketplace': 'Explore Marketplace',
    'hero.stats.artisans': 'Active Artisans',
    'hero.stats.revenue': 'Revenue Generated',
    'hero.stats.mentors': 'Expert Mentors',
    'hero.stats.districts': 'Districts Covered',
    
    // Features Section
    'features.title': 'Everything You Need to Succeed',
    'features.subtitle': 'From traditional skills to digital success - we provide the complete ecosystem for rural entrepreneurship',
    'features.marketplace.title': 'Digital Marketplace',
    'features.marketplace.description': 'Showcase your traditional crafts to customers across India and beyond',
    'features.marketplace.benefit1': 'Global reach',
    'features.marketplace.benefit2': 'Easy product listing',
    'features.marketplace.benefit3': 'Secure payments',
    'features.mentorship.title': 'Expert Mentorship',
    'features.mentorship.description': 'Learn from successful entrepreneurs and industry experts',
    'features.mentorship.benefit1': '1-on-1 guidance',
    'features.mentorship.benefit2': 'Business skills',
    'features.mentorship.benefit3': 'Marketing strategies',
    'features.microfinance.title': 'Microfinance Support',
    'features.microfinance.description': 'Access loans and financial services tailored for rural entrepreneurs',
    'features.microfinance.benefit1': 'Quick approval',
    'features.microfinance.benefit2': 'Low interest',
    'features.microfinance.benefit3': 'Flexible repayment',
    'features.learnMore': 'Learn More →',
    'features.cta.title': 'Ready to Transform Your Traditional Skills into Digital Success?',
    'features.cta.subtitle': 'Join thousands of rural entrepreneurs who have already started their journey with SamriddhiWB',
    'features.cta.entrepreneur': 'Register as Entrepreneur',
    'features.cta.mentor': 'Become a Mentor',

    // Features Popup Content
    'features.popup.marketplace.title': 'Digital Marketplace - Transform Your Craft Business',
    'features.popup.marketplace.description': 'Our comprehensive digital marketplace empowers rural artisans to reach customers worldwide while preserving traditional craftsmanship.',
    'features.popup.marketplace.keyFeatures': 'Key Features',
    'features.popup.marketplace.globalAccess.title': 'Global Market Access',
    'features.popup.marketplace.globalAccess.description': 'Reach customers across India and international markets through our e-commerce platform',
    'features.popup.marketplace.productManagement.title': 'Easy Product Management',
    'features.popup.marketplace.productManagement.description': 'Simple tools to list products, manage inventory, and track orders in real-time',
    'features.popup.marketplace.secureTransactions.title': 'Secure Transactions',
    'features.popup.marketplace.secureTransactions.description': 'Bank-grade security for all payments with multiple payment gateway options',
    'features.popup.marketplace.analytics.title': 'Business Analytics',
    'features.popup.marketplace.analytics.description': 'Detailed insights on sales performance, customer behavior, and market trends',
    'features.popup.marketplace.impact': 'Our Impact',
    'features.popup.marketplace.activeSellers': 'Active Sellers',
    'features.popup.marketplace.productsListed': 'Products Listed',
    'features.popup.marketplace.monthlyOrders': 'Monthly Orders',
    'features.popup.getStarted': 'Get Started Now',

    'features.popup.mentorship.title': 'Expert Mentorship - Learn from the Best',
    'features.popup.mentorship.description': 'Connect with successful entrepreneurs and industry experts who understand the challenges of rural business development.',
    'features.popup.mentorship.oneOnOne.title': '1-on-1 Mentoring Sessions',
    'features.popup.mentorship.oneOnOne.description': 'Personal guidance from experienced mentors tailored to your specific business needs',
    'features.popup.mentorship.skillDevelopment.title': 'Business Skill Development',
    'features.popup.mentorship.skillDevelopment.description': 'Learn essential skills like financial planning, marketing, and customer service',
    'features.popup.mentorship.strategicPlanning.title': 'Strategic Planning',
    'features.popup.mentorship.strategicPlanning.description': 'Develop comprehensive business strategies and growth plans with expert guidance',
    'features.popup.mentorship.industryInsights.title': 'Industry Insights',
    'features.popup.mentorship.industryInsights.description': 'Access valuable market insights and trends from seasoned professionals',
    'features.popup.mentorship.expertMentors': 'Expert Mentors',
    'features.popup.mentorship.successRate': 'Success Rate',
    'features.popup.mentorship.avgSessionTime': 'Avg Session Time',

    'features.popup.microfinance.title': 'Microfinance Support - Fuel Your Business Growth',
    'features.popup.microfinance.description': 'Access tailored financial solutions designed specifically for rural entrepreneurs and traditional craftspeople.',
    'features.popup.microfinance.quickApproval.title': 'Quick Approval Process',
    'features.popup.microfinance.quickApproval.description': 'Get loan approval within 48 hours with minimal documentation requirements',
    'features.popup.microfinance.flexibleOptions.title': 'Flexible Loan Options',
    'features.popup.microfinance.flexibleOptions.description': 'Choose from various loan products ranging from ₹5,000 to ₹5,00,000',
    'features.popup.microfinance.lowRates.title': 'Low Interest Rates',
    'features.popup.microfinance.lowRates.description': 'Competitive interest rates starting from 8.5% per annum with no hidden charges',
    'features.popup.microfinance.counseling.title': 'Financial Counseling',
    'features.popup.microfinance.counseling.description': 'Free financial literacy training and business planning support',
    'features.popup.microfinance.loansDispersed': 'Loans Disbursed',
    'features.popup.microfinance.successRate': 'Success Rate',
    'features.popup.microfinance.avgProcessing': 'Average Processing',
    
    // Marketplace
    'marketplace.title': 'Authentic Bengal Marketplace',
    'marketplace.subtitle': 'Discover handcrafted treasures from rural artisans across West Bengal',
    'marketplace.search': 'Search products, artisans, or locations...',
    'marketplace.filters': 'Filters',
    'marketplace.cart': 'Cart',
    'marketplace.showing': 'Showing',
    'marketplace.products': 'products',
    'marketplace.sortBy': 'Sort by:',
    'marketplace.popular': 'Popular',
    'marketplace.buyNow': 'Buy Now',
    'marketplace.addToCart': 'Cart',
    'marketplace.outOfStock': 'Out of Stock',
    
    // Mentorship
    'mentorship.title': 'Expert Mentorship Program',
    'mentorship.subtitle': 'Connect with experienced business mentors to grow your rural enterprise',
    'mentorship.stats.mentors': 'Mentors',
    'mentorship.stats.mentorsDesc': 'Expert professionals ready to guide you',
    'mentorship.stats.successRate': 'Success Rate',
    'mentorship.stats.successRateDesc': 'Mentees achieving their business goals',
    'mentorship.stats.flexibleHours': 'Flexible Hours',
    'mentorship.stats.flexibleHoursDesc': 'Schedule sessions at your convenience',
    'mentorship.findMentor': 'Find Your Perfect Mentor',
    'mentorship.categories.all': 'All',
    'mentorship.categories.digitalMarketing': 'Digital Marketing',
    'mentorship.categories.businessDevelopment': 'Business Development',
    'mentorship.categories.handicraftExport': 'Handicraft Export',
    'mentorship.categories.technology': 'Technology',
    'mentorship.experience': 'Experience:',
    'mentorship.years': 'years',
    'mentorship.languages': 'Languages:',
    'mentorship.available': 'Available:',
    'mentorship.specialties': 'Specialties:',
    'mentorship.session': 'session',
    'mentorship.message': 'Message',
    'mentorship.bookSession': 'Book Session',
    'mentorship.becomeMentor': 'Become a Mentor',
    'mentorship.becomeMentorDesc': 'Share your expertise and help rural entrepreneurs build successful businesses. Join our community of expert mentors and make a real impact.',
    'mentorship.applyMentor': 'Apply as Mentor',
    
    // Community Page
    'community.title': 'Rural Entrepreneur Community',
    'community.subtitle': 'Connect, learn, and grow together with fellow entrepreneurs across West Bengal',
    'community.stats.members': 'Active Members',
    'community.stats.discussions': 'Discussions',
    'community.stats.responseRate': 'Response Rate',
    'community.stats.avgResponse': 'Avg Response',
    'community.search': 'Search discussions...',
    'community.newPost': 'New Post',
    'community.categories.all': 'All',
    'community.categories.marketing': 'Marketing',
    'community.categories.export': 'Export',
    'community.categories.finance': 'Finance',
    'community.categories.quality': 'Quality',
    'community.categories.technology': 'Technology',
    'community.guidelines.title': 'Community Guidelines',
    'community.guidelines.respectful': '• Be respectful and supportive',
    'community.guidelines.authentic': '• Share authentic experiences',
    'community.guidelines.help': '• Help fellow entrepreneurs',
    'community.guidelines.noSpam': '• No spam or self-promotion',
    'community.guidelines.tags': '• Use relevant tags',
    'community.trending.title': 'Trending Tags',
    'community.quickActions.title': 'Quick Actions',
    'community.quickActions.profile': 'Edit Profile',
    'community.quickActions.discussions': 'My Discussions',
    'community.quickActions.saved': 'Saved Posts',
    
    // About Page
    'about.title': 'About SamriddhiWB',
    'about.subtitle': 'Empowering rural entrepreneurs across West Bengal through technology, mentorship, and sustainable business solutions.',
    'about.mission.title': 'Our Mission',
    'about.mission.text1': 'To bridge the gap between rural artisans and global markets by providing a comprehensive digital platform that enables sustainable economic growth and preserves traditional craftsmanship.',
    'about.mission.text2': 'We believe every rural entrepreneur deserves access to modern tools, expert guidance, and fair market opportunities to build thriving businesses.',
    'about.vision.title': 'Our Vision',
    'about.vision.text1': 'To transform West Bengal into a model state for rural entrepreneurship, where traditional skills meet modern technology to create sustainable livelihoods and prosperous communities.',
    'about.vision.text2': 'We envision a future where every village has successful entrepreneurs contributing to both local development and global markets.',
    'about.impact.title': 'Our Impact',
    'about.impact.entrepreneurs': 'Entrepreneurs Supported',
    'about.impact.revenue': 'Revenue Generated',
    'about.impact.mentors': 'Expert Mentors',
    'about.impact.districts': 'Districts Covered',
    'about.team.title': 'Meet Our Team',
    'about.journey.title': 'Our Journey',
    'about.contact.title': 'Get in Touch',
    'about.contact.address': 'Address',
    'about.contact.phone': 'Phone',
    'about.contact.email': 'Email',
    'about.contact.joinMission': 'Join Our Mission',
    
    // Testimonials
    'testimonials.title': 'Success Stories',
    'testimonials.subtitle': 'Real entrepreneurs, real transformations',
    
    // Footer
    'footer.description': "Empowering West Bengal's rural entrepreneurs through digital innovation and traditional craftsmanship.",
    'footer.platform': 'Platform',
    'footer.marketplace': 'Marketplace',
    'footer.mentorship': 'Mentorship',
    'footer.community': 'Community',
    'footer.finance': 'Microfinance',
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.tutorials': 'Video Tutorials',
    'footer.contact': 'Contact Us',
    'footer.faq': 'FAQ',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.copyright': '© 2025 SamriddhiWB. Made with ❤️ for West Bengal\'s entrepreneurs.',
  },
  bn: {
    // Navbar
    'nav.marketplace': 'বাজার',
    'nav.mentorship': 'পরামর্শ',
    'nav.community': 'সম্প্রদায়',
    'nav.about': 'সম্পর্কে',
    'nav.login': 'লগইন',
    'nav.joinNow': 'যোগ দিন',
    
    // Hero Section
    'hero.title': 'সমৃদ্ধি',
    'hero.subtitle': 'সমৃদ্ধি ডব্লিউবি',
    'hero.tagline': 'ডিজিটাল বাজার, বিশেষজ্ঞ পরামর্শ এবং ক্ষুদ্রঋণের মাধ্যমে পশ্চিমবঙ্গের গ্রামীণ উদ্যোক্তাদের ক্ষমতায়ন',
    'hero.description': 'ঐতিহ্যবাহী কারুশিল্পের সাথে আধুনিক সুযোগের সংযোগ। টেকসই জীবিকা গড়ুন। দীর্ঘস্থায়ী সমৃদ্ধি সৃষ্টি করুন।',
    'hero.startJourney': 'আপনার যাত্রা শুরু করুন',
    'hero.exploreMarketplace': 'বাজার অন্বেষণ করুন',
    'hero.stats.artisans': 'সক্রিয় শিল্পী',
    'hero.stats.revenue': 'আয় উৎপাদিত',
    'hero.stats.mentors': 'বিশেষজ্ঞ পরামর্শদাতা',
    'hero.stats.districts': 'জেলা আচ্ছাদিত',
    
    // Features Section
    'features.title': 'সফল হওয়ার জন্য যা প্রয়োজন',
    'features.subtitle': 'ঐতিহ্যবাহী দক্ষতা থেকে ডিজিটাল সাফল্য - আমরা গ্রামীণ উদ্যোক্তার জন্য সম্পূর্ণ ইকোসিস্টেম প্রদান করি',
    'features.marketplace.title': 'ডিজিটাল বাজার',
    'features.marketplace.description': 'ভারত এবং বিদেশের গ্রাহকদের কাছে আপনার ঐতিহ্যবাহী কারুশিল্প প্রদর্শন করুন',
    'features.marketplace.benefit1': 'বিশ্বব্যাপী পৌঁছানো',
    'features.marketplace.benefit2': 'সহজ পণ্য তালিকা',
    'features.marketplace.benefit3': 'নিরাপদ পেমেন্ট',
    'features.mentorship.title': 'বিশেষজ্ঞ পরামর্শ',
    'features.mentorship.description': 'সফল উদ্যোক্তা এবং শিল্প বিশেষজ্ঞদের কাছ থেকে শিখুন',
    'features.mentorship.benefit1': 'এক-এক করে নির্দেশনা',
    'features.mentorship.benefit2': 'ব্যবসায়িক দক্ষতা',
    'features.mentorship.benefit3': 'বিপণন কৌশল',
    'features.microfinance.title': 'ক্ষুদ্রঋণ সহায়তা',
    'features.microfinance.description': 'গ্রামীণ উদ্যোক্তাদের জন্য উপযুক্ত ঋণ এবং আর্থিক সেবা অ্যাক্সেস করুন',
    'features.microfinance.benefit1': 'দ্রুত অনুমোদন',
    'features.microfinance.benefit2': 'কম সুদ',
    'features.microfinance.benefit3': 'নমনীয় পরিশোধ',
    'features.learnMore': 'আরও জানুন →',
    'features.cta.title': 'আপনার ঐতিহ্যবাহী দক্ষতাকে ডিজিটাল সাফল্যে রূপান্তর করতে প্রস্তুত?',
    'features.cta.subtitle': 'হাজার হাজার গ্রামীণ উদ্যোক্তার সাথে যোগ দিন যারা ইতিমধ্যে সমৃদ্ধিওয়েবি দিয়ে তাদের যাত্রা শুরু করেছেন',
    'features.cta.entrepreneur': 'উদ্যোক্তা হিসেবে নিবন্ধন করুন',
    'features.cta.mentor': 'একজন পরামর্শদাতা হন',

    // Features Popup Content
    'features.popup.marketplace.title': 'ডিজিটাল বাজার - আপনার কারুশিল্প ব্যবসা রূপান্তরিত করুন',
    'features.popup.marketplace.description': 'আমাদের ব্যাপক ডিজিটাল বাজার গ্রামীণ কারিগরদের ঐতিহ্যবাহী কারুশিল্প সংরক্ষণ করে বিশ্বব্যাপী গ্রাহকদের কাছে পৌঁছাতে ক্ষমতায়ন করে।',
    'features.popup.marketplace.keyFeatures': 'মূল বৈশিষ্ট্য',
    'features.popup.marketplace.globalAccess.title': 'বিশ্বব্যাপী বাজার প্রবেশাধিকার',
    'features.popup.marketplace.globalAccess.description': 'আমাদের ই-কমার্স প্ল্যাটফর্মের মাধ্যমে ভারত এবং আন্তর্জাতিক বাজারের গ্রাহকদের কাছে পৌঁছান',
    'features.popup.marketplace.productManagement.title': 'সহজ পণ্য ব্যবস্থাপনা',
    'features.popup.marketplace.productManagement.description': 'পণ্য তালিকাভুক্ত করা, ইনভেন্টরি পরিচালনা এবং রিয়েল-টাইমে অর্ডার ট্র্যাক করার সহজ সরঞ্জাম',
    'features.popup.marketplace.secureTransactions.title': 'নিরাপদ লেনদেন',
    'features.popup.marketplace.secureTransactions.description': 'একাধিক পেমেন্ট গেটওয়ে বিকল্প সহ সমস্ত পেমেন্টের জন্য ব্যাংক-গ্রেড নিরাপত্তা',
    'features.popup.marketplace.analytics.title': 'ব্যবসায়িক বিশ্লেষণ',
    'features.popup.marketplace.analytics.description': 'বিক্রয় কর্মক্ষমতা, গ্রাহক আচরণ এবং বাজার প্রবণতার বিস্তারিত অন্তর্দৃষ্টি',
    'features.popup.marketplace.impact': 'আমাদের প্রভাব',
    'features.popup.marketplace.activeSellers': 'সক্রিয় বিক্রেতা',
    'features.popup.marketplace.productsListed': 'পণ্য তালিকাভুক্ত',
    'features.popup.marketplace.monthlyOrders': 'মাসিক অর্ডার',
    'features.popup.getStarted': 'এখনই শুরু করুন',

    'features.popup.mentorship.title': 'বিশেষজ্ঞ পরামর্শ - সেরাদের কাছ থেকে শিখুন',
    'features.popup.mentorship.description': 'সফল উদ্যোক্তা এবং শিল্প বিশেষজ্ঞদের সাথে সংযোগ করুন যারা গ্রামীণ ব্যবসায়িক উন্নয়নের চ্যালেঞ্জগুলি বোঝেন।',
    'features.popup.mentorship.oneOnOne.title': '১-বনাম-১ পরামর্শ সেশন',
    'features.popup.mentorship.oneOnOne.description': 'আপনার নির্দিষ্ট ব্যবসায়িক প্রয়োজনের জন্য তৈরি অভিজ্ঞ পরামর্শদাতাদের কাছ থেকে ব্যক্তিগত নির্দেশনা',
    'features.popup.mentorship.skillDevelopment.title': 'ব্যবসায়িক দক্ষতা উন্নয়ন',
    'features.popup.mentorship.skillDevelopment.description': 'আর্থিক পরিকল্পনা, বিপণন এবং গ্রাহক সেবার মতো প্রয়োজনীয় দক্ষতা শিখুন',
    'features.popup.mentorship.strategicPlanning.title': 'কৌশলগত পরিকল্পনা',
    'features.popup.mentorship.strategicPlanning.description': 'বিশেষজ্ঞ নির্দেশনা সহ ব্যাপক ব্যবসায়িক কৌশল এবং বৃদ্ধির পরিকল্পনা তৈরি করুন',
    'features.popup.mentorship.industryInsights.title': 'শিল্প অন্তর্দৃষ্টি',
    'features.popup.mentorship.industryInsights.description': 'অভিজ্ঞ পেশাদারদের কাছ থেকে মূল্যবান বাজার অন্তর্দৃষ্টি এবং প্রবণতায় অ্যাক্সেস',
    'features.popup.mentorship.expertMentors': 'বিশেষজ্ঞ পরামর্শদাতা',
    'features.popup.mentorship.successRate': 'সাফল্যের হার',
    'features.popup.mentorship.avgSessionTime': 'গড় সেশন সময়',

    'features.popup.microfinance.title': 'ক্ষুদ্রঋণ সহায়তা - আপনার ব্যবসায়িক বৃদ্ধিতে ইন্ধন যোগান',
    'features.popup.microfinance.description': 'গ্রামীণ উদ্যোক্তা এবং ঐতিহ্যবাহী কারিগরদের জন্য বিশেষভাবে ডিজাইন করা উপযুক্ত আর্থিক সমাধানে অ্যাক্সেস।',
    'features.popup.microfinance.quickApproval.title': 'দ্রুত অনুমোদন প্রক্রিয়া',
    'features.popup.microfinance.quickApproval.description': 'ন্যূনতম ডকুমেন্টেশন প্রয়োজনীয়তা সহ ৪৮ ঘন্টার মধ্যে ঋণ অনুমোদন পান',
    'features.popup.microfinance.flexibleOptions.title': 'নমনীয় ঋণ বিকল্প',
    'features.popup.microfinance.flexibleOptions.description': '৫,০০০ টাকা থেকে ৫,০০,০০০ টাকা পর্যন্ত বিভিন্ন ঋণ পণ্য থেকে বেছে নিন',
    'features.popup.microfinance.lowRates.title': 'কম সুদের হার',
    'features.popup.microfinance.lowRates.description': 'কোন লুকানো চার্জ ছাড়াই বার্ষিক ৮.৫% থেকে শুরু হওয়া প্রতিযোগিতামূলক সুদের হার',
    'features.popup.microfinance.counseling.title': 'আর্থিক পরামর্শ',
    'features.popup.microfinance.counseling.description': 'বিনামূল্যে আর্থিক সাক্ষরতা প্রশিক্ষণ এবং ব্যবসায়িক পরিকল্পনা সহায়তা',
    'features.popup.microfinance.loansDispersed': 'ঋণ বিতরণ',
    'features.popup.microfinance.successRate': 'সাফল্যের হার',
    'features.popup.microfinance.avgProcessing': 'গড় প্রক্রিয়াকরণ',
    
    // Marketplace
    'marketplace.title': 'প্রামাণিক বাংলা বাজার',
    'marketplace.subtitle': 'পশ্চিমবঙ্গের গ্রামীণ কারিগরদের হস্তনির্মিত ধন আবিষ্কার করুন',
    'marketplace.search': 'পণ্য, কারিগর, বা অবস্থান খুঁজুন...',
    'marketplace.filters': 'ফিল্টার',
    'marketplace.cart': 'কার্ট',
    'marketplace.showing': 'দেখানো হচ্ছে',
    'marketplace.products': 'পণ্য',
    'marketplace.sortBy': 'সাজান:',
    'marketplace.popular': 'জনপ্রিয়',
    'marketplace.buyNow': 'এখনই কিনুন',
    'marketplace.addToCart': 'কার্ট',
    'marketplace.outOfStock': 'স্টক শেষ',
    
    // Mentorship
    'mentorship.title': 'বিশেষজ্ঞ পরামর্শ প্রোগ্রাম',
    'mentorship.subtitle': 'আপনার গ্রামীণ উদ্যোগ বৃদ্ধির জন্য অভিজ্ঞ ব্যবসায়িক পরামর্শদাতাদের সাথে সংযোগ করুন',
    'mentorship.stats.mentors': 'পরামর্শদাতা',
    'mentorship.stats.mentorsDesc': 'আপনাকে গাইড করতে প্রস্তুত বিশেষজ্ঞ পেশাদার',
    'mentorship.stats.successRate': 'সাফল্যের হার',
    'mentorship.stats.successRateDesc': 'তাদের ব্যবসায়িক লক্ষ্য অর্জনকারী মেন্টি',
    'mentorship.stats.flexibleHours': 'নমনীয় সময়',
    'mentorship.stats.flexibleHoursDesc': 'আপনার সুবিধামতো সেশন সময়সূচী করুন',
    'mentorship.findMentor': 'আপনার নিখুঁত পরামর্শদাতা খুঁজুন',
    'mentorship.categories.all': 'সব',
    'mentorship.categories.digitalMarketing': 'ডিজিটাল বিপণন',
    'mentorship.categories.businessDevelopment': 'ব্যবসায়িক উন্নয়ন',
    'mentorship.categories.handicraftExport': 'হস্তশিল্প রপ্তানি',
    'mentorship.categories.technology': 'প্রযুক্তি',
    'mentorship.experience': 'অভিজ্ঞতা:',
    'mentorship.years': 'বছর',
    'mentorship.languages': 'ভাষা:',
    'mentorship.available': 'উপলব্ধ:',
    'mentorship.specialties': 'বিশেষত্ব:',
    'mentorship.session': 'সেশন',
    'mentorship.message': 'বার্তা',
    'mentorship.bookSession': 'সেশন বুক করুন',
    'mentorship.becomeMentor': 'একজন পরামর্শদাতা হন',
    'mentorship.becomeMentorDesc': 'আপনার দক্ষতা শেয়ার করুন এবং গ্রামীণ উদ্যোক্তাদের সফল ব্যবসা গড়তে সাহায্য করুন। আমাদের বিশেষজ্ঞ পরামর্শদাতাদের সম্প্রদায়ে যোগ দিন এবং সত্যিকারের প্রভাব তৈরি করুন।',
    'mentorship.applyMentor': 'পরামর্শদাতা হিসেবে আবেদন করুন',
    
    // Community Page
    'community.title': 'গ্রামীণ উদ্যোক্তা সম্প্রদায়',
    'community.subtitle': 'পশ্চিমবঙ্গ জুড়ে সহ-উদ্যোক্তাদের সাথে সংযুক্ত হন, শিখুন এবং একসাথে বেড়ে উঠুন',
    'community.stats.members': 'সক্রিয় সদস্য',
    'community.stats.discussions': 'আলোচনা',
    'community.stats.responseRate': 'প্রতিক্রিয়ার হার',
    'community.stats.avgResponse': 'গড় প্রতিক্রিয়া',
    'community.search': 'আলোচনা খুঁজুন...',
    'community.newPost': 'নতুন পোস্ট',
    'community.categories.all': 'সব',
    'community.categories.marketing': 'বিপণন',
    'community.categories.export': 'রপ্তানি',
    'community.categories.finance': 'অর্থ',
    'community.categories.quality': 'গুণমান',
    'community.categories.technology': 'প্রযুক্তি',
    'community.guidelines.title': 'সম্প্রদায়ের নির্দেশিকা',
    'community.guidelines.respectful': '• সম্মানজনক এবং সহায়ক হন',
    'community.guidelines.authentic': '• সত্যিকারের অভিজ্ঞতা শেয়ার করুন',
    'community.guidelines.help': '• সহ-উদ্যোক্তাদের সাহায্য করুন',
    'community.guidelines.noSpam': '• স্প্যাম বা স্ব-প্রচার নেই',
    'community.guidelines.tags': '• প্রাসঙ্গিক ট্যাগ ব্যবহার করুন',
    'community.trending.title': 'ট্রেন্ডিং ট্যাগ',
    'community.quickActions.title': 'দ্রুত ক্রিয়া',
    'community.quickActions.profile': 'প্রোফাইল সম্পাদনা',
    'community.quickActions.discussions': 'আমার আলোচনা',
    'community.quickActions.saved': 'সংরক্ষিত পোস্ট',
    
    // About Page
    'about.title': 'সমৃদ্ধিওয়েবি সম্পর্কে',
    'about.subtitle': 'প্রযুক্তি, পরামর্শ এবং টেকসই ব্যবসায়িক সমাধানের মাধ্যমে পশ্চিমবঙ্গের গ্রামীণ উদ্যোক্তাদের ক্ষমতায়ন।',
    'about.mission.title': 'আমাদের মিশন',
    'about.mission.text1': 'একটি বিস্তৃত ডিজিটাল প্ল্যাটফর্ম প্রদানের মাধ্যমে গ্রামীণ কারিগর এবং বিশ্ববাজারের মধ্যে ব্যবধান পূরণ করা যা টেকসই অর্থনৈতিক বৃদ্ধি সক্ষম করে এবং ঐতিহ্যবাহী কারুশিল্প সংরক্ষণ করে।',
    'about.mission.text2': 'আমরা বিশ্বাস করি প্রতিটি গ্রামীণ উদ্যোক্তা আধুনিক সরঞ্জাম, বিশেষজ্ঞ নির্দেশনা এবং ন্যায্য বাজার সুযোগের অ্যাক্সেসের যোগ্য।',
    'about.vision.title': 'আমাদের দৃষ্টিভঙ্গি',
    'about.vision.text1': 'পশ্চিমবঙ্গকে গ্রামীণ উদ্যোক্তার জন্য একটি মডেল রাজ্যে রূপান্তরিত করা, যেখানে ঐতিহ্যবাহী দক্ষতা আধুনিক প্রযুক্তির সাথে মিলিত হয়।',
    'about.vision.text2': 'আমরা এমন একটি ভবিষ্যতের কল্পনা করি যেখানে প্রতিটি গ্রামে সফল উদ্যোক্তারা স্থানীয় উন্নয়ন এবং বিশ্ববাজার উভয়ে অবদান রাখে।',
    'about.impact.title': 'আমাদের প্রভাব',
    'about.impact.entrepreneurs': 'উদ্যোক্তা সমর্থিত',
    'about.impact.revenue': 'আয় উৎপাদিত',
    'about.impact.mentors': 'বিশেষজ্ঞ পরামর্শদাতা',
    'about.impact.districts': 'জেলা আচ্ছাদিত',
    'about.team.title': 'আমাদের টিম দেখুন',
    'about.journey.title': 'আমাদের যাত্রা',
    'about.contact.title': 'যোগাযোগ করুন',
    'about.contact.address': 'ঠিকানা',
    'about.contact.phone': 'ফোন',
    'about.contact.email': 'ইমেইল',
    'about.contact.joinMission': 'আমাদের মিশনে যোগ দিন',
    
    // Testimonials
    'testimonials.title': 'সফলতার গল্প',
    'testimonials.subtitle': 'সত্যিকারের উদ্যোক্তা, সত্যিকারের রূপান্তর',
    
    // Footer
    'footer.description': 'ডিজিটাল উদ্ভাবন এবং ঐতিহ্যবাহী কারুশিল্পের মাধ্যমে পশ্চিমবঙ্গের গ্রামীণ উদ্যোক্তাদের ক্ষমতায়ন।',
    'footer.platform': 'প্ল্যাটফর্ম',
    'footer.marketplace': 'বাজার',
    'footer.mentorship': 'পরামর্শ',
    'footer.community': 'সম্প্রদায়',
    'footer.finance': 'ক্ষুদ্রঋণ',
    'footer.support': 'সহায়তা',
    'footer.helpCenter': 'সহায়তা কেন্দ্র',
    'footer.tutorials': 'ভিডিও টিউটোরিয়াল',
    'footer.contact': 'যোগাযোগ',
    'footer.faq': 'প্রশ্ন উত্তর',
    'footer.legal': 'আইনি',
    'footer.privacy': 'গোপনীয়তা নীতি',
    'footer.terms': 'সেবার শর্তাবলী',
    'footer.about': 'সম্পর্কে',
    'footer.careers': 'ক্যারিয়ার',
    'footer.copyright': '© ২০২৫ সমৃদ্ধি ডব্লিউবি। পশ্চিমবঙ্গের উদ্যোক্তাদের জন্য ❤️ দিয়ে তৈরি।'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    console.log('Language changed to:', lang); // Debug log
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key; // Return the key itself if translation is missing
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
