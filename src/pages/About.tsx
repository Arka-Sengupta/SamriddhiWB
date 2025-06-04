import { useState } from 'react';
import { Users, Target, Award, Heart, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';

const teamMembers = [
  {
    name: "Saptarshi Bose",
    role: "Founder & CEO",
    image: "https://avatars.githubusercontent.com/u/165061481?v=4?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Front-end developer & ML engineer",
    linkedin: "https://www.linkedin.com/in/saptarshi-bose-a09436313/"
  },
  {
    name: "Arka Sengupta",
    role: "Head of Technology",
    image: "https://raw.githubusercontent.com/Arka-Sengupta/Portfolio2/refs/heads/main/src/assets/images/pic.jpg?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Passionate in Front-end development",
    linkedin: "https://www.linkedin.com/in/arka-sengupta-02211b320/"
  },
  {
    name: "lorem ipsum",
    role: "Community Manager",
    image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Expert in rural entrepreneurship and women empowerment",
    linkedin: "#"
  },
  {
    name: "lorem ipsum",
    role: "Product Manager",
    image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?q=80&w=400&h=400&auto=format&fit=crop",
    bio: "Passionate about creating inclusive technology solutions",
    linkedin: "#"
  }
];

const milestones = [
  { year: "2021", event: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
  { year: "2022", event: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { year: "2023", event: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { year: "2024", event: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { year: "2025", event: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
];

const About = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleJoinMission = () => {
    setIsRegisterOpen(true);
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
    <div className="min-h-screen bg-dark-base">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-8 md:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-base via-dark-container to-dark-base opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://t4.ftcdn.net/jpg/02/10/23/09/360_F_210230989_aQg2F7Bpg05f0A7Bl1ZxP028PMvBvdGL.jpg?q=80&w=2000&h=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text mb-4 md:mb-6">
              About SamriddhiWB
            </h1>
            <p className="text-lg md:text-xl text-secondary-text max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Empowering rural entrepreneurs across West Bengal through technology, 
              mentorship, and sustainable business solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            <Card className="bg-dark-container border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-primary-text flex items-center gap-3">
                  <Target className="h-6 w-6 md:h-8 md:w-8 text-terracotta" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm md:text-base text-secondary-text leading-relaxed">
                <p className="mb-4">
                  To bridge the gap between rural artisans and global markets by providing 
                  a comprehensive digital platform that enables sustainable economic growth 
                  and preserves traditional craftsmanship.
                </p>
                <p>
                  We believe every rural entrepreneur deserves access to modern tools, 
                  expert guidance, and fair market opportunities to build thriving businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-container border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-primary-text flex items-center gap-3">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-bengal-yellow" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm md:text-base text-secondary-text leading-relaxed">
                <p className="mb-4">
                  To transform West Bengal into a model state for rural entrepreneurship, 
                  where traditional skills meet modern technology to create sustainable 
                  livelihoods and prosperous communities.
                </p>
                <p>
                  We envision a future where every village has successful entrepreneurs 
                  contributing to both local development and global markets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-dark-container to-dark-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-text text-center mb-8 md:mb-12">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-terracotta mb-2">10K+</div>
              <div className="text-sm md:text-base text-secondary-text">Entrepreneurs Supported</div>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-bengal-yellow mb-2">₹5Cr+</div>
              <div className="text-sm md:text-base text-secondary-text">Revenue Generated</div>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-success-green mb-2">500+</div>
              <div className="text-sm md:text-base text-secondary-text">Expert Mentors</div>
            </div>
            <div className="text-center p-4 md:p-6">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-2">20+</div>
              <div className="text-sm md:text-base text-secondary-text">Districts Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-text text-center mb-8 md:mb-12">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-dark-container border-gray-700 hover-lift text-center">
                <CardContent className="p-4 md:p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-4 border-2 border-terracotta"
                  />
                  <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">{member.name}</h3>
                  <p className="text-terracotta font-medium mb-3 text-sm md:text-base">{member.role}</p>
                  <p className="text-xs md:text-sm text-secondary-text mb-4">{member.bio}</p>
                  <Button variant="outline" size="sm" className="border-gray-600 text-secondary-text hover:text-primary-text">
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 md:py-16 bg-dark-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-text text-center mb-8 md:mb-12">
            Our Journey
          </h2>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-terracotta"></div>
            
            <div className="space-y-6 md:space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-terracotta rounded-full border-2 md:border-4 border-dark-base"></div>
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="bg-dark-base border-gray-700">
                      <CardContent className="p-4 md:p-6">
                        <div className="text-xl md:text-2xl font-bold text-terracotta mb-2">{milestone.year}</div>
                        <p className="text-sm md:text-base text-secondary-text">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-text text-center mb-8 md:mb-12">
            Get in Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-dark-container border-gray-700 text-center hover-lift">
              <CardContent className="p-6 md:p-8">
                <MapPin className="h-8 w-8 md:h-12 md:w-12 text-terracotta mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">Address</h3>
                <p className="text-sm md:text-base text-secondary-text">
                  Salt Lake Sector V<br />
                  Kolkata, West Bengal 700091
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-container border-gray-700 text-center hover-lift">
              <CardContent className="p-6 md:p-8">
                <Phone className="h-8 w-8 md:h-12 md:w-12 text-bengal-yellow mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">Phone</h3>
                <p className="text-sm md:text-base text-secondary-text">
                  +91 98765 43210<br />
                  Mon-Fri: 9 AM - 6 PM
                </p>
              </CardContent>
            </Card>

            <Card className="bg-dark-container border-gray-700 text-center hover-lift md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 md:p-8">
                <Mail className="h-8 w-8 md:h-12 md:w-12 text-success-green mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">Email</h3>
                <p className="text-sm md:text-base text-secondary-text">
                  hello@samriddhiwb.org<br />
                  support@samriddhiwb.org
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button 
              onClick={handleJoinMission}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
            >
              Join Our Mission
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Auth Modals */}
      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default About;
