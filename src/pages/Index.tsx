
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-base">
      <Navbar />
      <Hero />
      <TestimonialsCarousel />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
