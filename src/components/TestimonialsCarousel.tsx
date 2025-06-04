import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [{
  id: 1,
  name: "Rashida Begum",
  location: "Murshidabad",
  profession: "Silk Weaver",
  image: "https://i.pinimg.com/736x/41/9a/e2/419ae2595882d8af7e48d2a5ff882362.jpg?q=80&w=400&h=400&auto=format&fit=crop",
  quote: "SamriddhiWB helped me reach customers across India. My traditional silk sarees are now selling in Delhi and Mumbai!",
  revenue: "₹45,000/month",
  bengali: "আমার ঐতিহ্যবাহী তাঁত শাড়ি এখন সারা দেশে বিক্রি হচ্ছে।"
}, {
  id: 2,
  name: "Gopal Das",
  location: "Birbhum",
  profession: "Terracotta Artist",
  image: "https://www.shutterstock.com/image-photo/portrait-happy-adult-man-isolated-600nw-2282907881.jpg?q=80&w=400&h=400&auto=format&fit=crop",
  quote: "The mentorship program taught me digital marketing. Now I have my own online store and regular customers.",
  revenue: "₹32,000/month",
  bengali: "ডিজিটাল বিপণন শিখে আমার নিজস্ব দোকান হয়েছে।"
}, {
  id: 3,
  name: "Sarita Mondal",
  location: "Nadia",
  profession: "Jute Craftsperson",
  image: "https://thumbs.dreamstime.com/b/sindur-khala-2011-25330530.jpg?w=576?q=80&w=400&h=400&auto=format&fit=crop",
  quote: "With microfinance support, I expanded my jute bag business. Now I employ 8 women from my village.",
  revenue: "₹78,000/month",
  bengali: "এখন আমার গ্রামের ৮ জন মহিলা আমার সাথে কাজ করেন।"
}];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  return (
    <section className="py-16 bg-dark-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-secondary-text">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-dark-base rounded-xl p-8 md:p-12 max-w-4xl mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-32 h-32 rounded-full object-cover border-4 border-terracotta" />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-xl md:text-2xl text-primary-text mb-4 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <p className="text-bengal-yellow italic mb-4">
                  "{testimonials[currentIndex].bengali}"
                </p>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-primary-text">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-secondary-text">
                      {testimonials[currentIndex].profession} • {testimonials[currentIndex].location}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-success-green/20 text-success-green px-4 py-2 rounded-full text-sm font-semibold">
                      {testimonials[currentIndex].revenue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button variant="ghost" size="sm" onClick={prevTestimonial} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-dark-container/80 hover:bg-dark-container text-primary-text text-neutral-50 bg-neutral-700 hover:bg-neutral-600">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={nextTestimonial} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-dark-container/80 hover:bg-dark-container text-primary-text text-neutral-50 bg-neutral-700 hover:bg-neutral-600">
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-terracotta' : 'bg-secondary-text'}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
