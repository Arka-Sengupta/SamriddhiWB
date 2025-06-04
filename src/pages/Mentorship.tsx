
import { useState } from 'react';
import { Star, Clock, Users, Award, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

const mentors = [
  {
    id: 1,
    name: "Dr. Priya Chakraborty",
    expertise: "Digital Marketing & E-commerce",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    mentees: 89,
    image: "https://images.unsplash.com/photo-1659758591866-efe0c572615c?q=80&w=400&h=400&auto=format&fit=crop",
    price: 500,
    languages: ["Bengali", "English", "Hindi"],
    availability: "Mon-Fri, 6-9 PM",
    specialties: ["Social Media Strategy", "Brand Building", "Customer Acquisition"]
  },
  {
    id: 2,
    name: "Rajesh Kumar Singh",
    expertise: "Business Development & Finance",
    experience: "15 years",
    rating: 4.8,
    reviews: 203,
    mentees: 124,
    image: "https://img.freepik.com/free-photo/front-view-smiley-man-with-headphones_23-2149915902.jpg?q=80&w=400&h=400&auto=format&fit=crop",
    price: 750,
    languages: ["Bengali", "English"],
    availability: "Tue-Sat, 7-10 PM",
    specialties: ["Micro-finance", "Business Planning", "Investment Strategy"]
  },
  {
    id: 3,
    name: "Ananya Das",
    expertise: "Handicraft Export & Global Markets",
    experience: "8 years",
    rating: 4.9,
    reviews: 98,
    mentees: 67,
    image: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=400&h=400&auto=format&fit=crop",
    price: 400,
    languages: ["Bengali", "English"],
    availability: "Mon-Wed-Fri, 5-8 PM",
    specialties: ["Export Documentation", "Quality Standards", "International Trade"]
  },
  {
    id: 4,
    name: "Amit Bhowmik",
    expertise: "Technology & Digital Tools",
    experience: "10 years",
    rating: 4.7,
    reviews: 145,
    mentees: 78,
    image: "https://img.freepik.com/free-photo/successful-businessman_1098-18155.jpg?q=80&w=400&h=400&auto=format&fit=crop",
    price: 600,
    languages: ["Bengali", "English"],
    availability: "Daily, 8-11 PM",
    specialties: ["Website Development", "Payment Systems", "Digital Photography"]
  }
];

const Mentorship = () => {
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [bookedMentors, setBookedMentors] = useState<number[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);

  const expertiseAreas = ["All", "Digital Marketing", "Business Development", "Handicraft Export", "Technology"];

  const filteredMentors = mentors.filter(mentor => 
    selectedExpertise === "All" || mentor.expertise.includes(selectedExpertise)
  );

  const openBookingModal = (mentor: typeof mentors[0]) => {
    setSelectedMentor(mentor);
    setBookingModalOpen(true);
  };

  const handleBookingConfirm = (mentorId: number) => {
    setBookedMentors(prev => [...prev, mentorId]);
    setBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-base">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-8 md:pb-12 bg-gradient-to-r from-dark-base to-dark-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-text mb-4">
              Expert Mentorship Program
            </h1>
            <p className="text-base md:text-lg text-secondary-text max-w-2xl mx-auto mb-6 md:mb-8 px-4 sm:px-0">
              Connect with experienced business mentors to grow your rural enterprise
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
              <div className="text-center p-4">
                <div className="bg-terracotta/20 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-terracotta" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">500+ Mentors</h3>
                <p className="text-sm md:text-base text-secondary-text">Expert professionals ready to guide you</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-bengal-yellow/20 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <Award className="h-6 w-6 md:h-8 md:w-8 text-bengal-yellow" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">95% Success Rate</h3>
                <p className="text-sm md:text-base text-secondary-text">Mentees achieving their business goals</p>
              </div>
              <div className="text-center p-4 sm:col-span-2 lg:col-span-1">
                <div className="bg-success-green/20 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-success-green" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-2">Flexible Hours</h3>
                <p className="text-sm md:text-base text-secondary-text">Schedule sessions at your convenience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary-text mb-3 md:mb-4">Find Your Perfect Mentor</h2>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((area) => (
                <Button
                  key={area}
                  variant={selectedExpertise === area ? "default" : "outline"}
                  onClick={() => setSelectedExpertise(area)}
                  size="sm"
                  className={`text-xs md:text-sm relative overflow-hidden transition-all duration-300 ${
                    selectedExpertise === area 
                      ? "bg-terracotta hover:bg-terracotta/90 text-white" 
                      : "border-gray-600 text-secondary-text hover:text-white hover:border-terracotta relative before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-terracotta before:transition-all before:duration-300 before:ease-in-out hover:before:w-full before:z-0"
                  }`}
                >
                  <span className="relative z-10">{area}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="bg-dark-container border-gray-700 hover-lift">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-terracotta mx-auto sm:mx-0 flex-shrink-0"
                    />
                    <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
                      <h3 className="text-lg md:text-xl font-semibold text-primary-text mb-1">{mentor.name}</h3>
                      <p className="text-terracotta font-medium mb-2 text-sm md:text-base">{mentor.expertise}</p>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-4 mb-3 text-xs md:text-sm text-secondary-text">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 md:h-4 md:w-4 fill-bengal-yellow text-bengal-yellow" />
                          <span>{mentor.rating}</span>
                          <span>({mentor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{mentor.mentees} mentees</span>
                        </div>
                      </div>

                      <div className="mb-4 space-y-2">
                        <p className="text-xs md:text-sm text-secondary-text">
                          <strong>Experience:</strong> {mentor.experience}
                        </p>
                        <p className="text-xs md:text-sm text-secondary-text">
                          <strong>Languages:</strong> {mentor.languages.join(", ")}
                        </p>
                        <p className="text-xs md:text-sm text-secondary-text">
                          <strong>Available:</strong> {mentor.availability}
                        </p>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs md:text-sm text-secondary-text mb-2"><strong>Specialties:</strong></p>
                        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                          {mentor.specialties.map((specialty, index) => (
                            <span key={index} className="bg-terracotta/20 text-terracotta px-2 py-1 rounded-full text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-center sm:text-left">
                          <span className="text-xl md:text-2xl font-bold text-primary-text">₹{mentor.price}</span>
                          <span className="text-xs md:text-sm text-secondary-text">/session</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="border-gray-600 text-secondary-text hover:text-primary-text text-xs md:text-sm">
                            <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                            Message
                          </Button>
                          <Button 
                            onClick={() => openBookingModal(mentor)}
                            size="sm"
                            className="bg-terracotta hover:bg-terracotta/90 text-xs md:text-sm"
                            disabled={bookedMentors.includes(mentor.id)}
                          >
                            {bookedMentors.includes(mentor.id) ? (
                              <>Session Booked</>
                            ) : (
                              <>
                                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                Book Session
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Become a Mentor CTA */}
          <div className="mt-12 md:mt-16">
            <Card className="bg-gradient-to-br from-gray-800 via-gray-900 to-dark-container border-gray-600 shadow-2xl">
              <CardContent className="p-6 md:p-8 text-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-bengal-yellow/5 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-terracotta/5 to-transparent"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-primary-text mb-4">
                    Become a Mentor
                  </h3>
                  <p className="text-sm md:text-base text-secondary-text mb-6 max-w-2xl mx-auto px-4 sm:px-0">
                    Share your expertise and help rural entrepreneurs build successful businesses. 
                    Join our community of expert mentors and make a real impact.
                  </p>
                  <Button className="bg-terracotta hover:bg-terracotta/90 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 border border-terracotta/30 hover:border-terracotta/50">
                    Apply as Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        mentor={selectedMentor}
        onConfirm={handleBookingConfirm}
      />
    </div>
  );
};

export default Mentorship;
