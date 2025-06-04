
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User, CreditCard, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Mentor {
  id: number;
  name: string;
  expertise: string;
  price: number;
  image: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor | null;
  onConfirm: (mentorId: number) => void;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

const BookingModal = ({ isOpen, onClose, mentor, onConfirm }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Confirmation
  const { toast } = useToast();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select both date and time",
        description: "Both date and time are required to proceed.",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = () => {
    if (mentor) {
      onConfirm(mentor.id);
      toast({
        title: "🎉 Session Booked Successfully!",
        description: `Your mentorship session with ${mentor.name} is confirmed for ${format(selectedDate!, 'PPP')} at ${selectedTime}.`,
      });
      // Reset state
      setSelectedDate(undefined);
      setSelectedTime("");
      setStep(1);
    }
  };

  const handleClose = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
    setStep(1);
    onClose();
  };

  if (!mentor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-dark-container border-gray-700 text-primary-text max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-bengal-yellow" />
            Book Mentorship Session
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mentor Info */}
          <div className="flex items-center gap-4 p-4 bg-dark-base rounded-lg border border-gray-600">
            <img 
              src={mentor.image} 
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-terracotta"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-text">{mentor.name}</h3>
              <p className="text-terracotta text-sm">{mentor.expertise}</p>
              <div className="flex items-center gap-2 mt-1">
                <CreditCard className="h-4 w-4 text-bengal-yellow" />
                <span className="text-lg font-bold text-primary-text">₹{mentor.price}</span>
                <span className="text-sm text-secondary-text">/session</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-primary-text flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-terracotta" />
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-dark-base border-gray-600 hover:bg-dark-container hover:border-terracotta",
                        !selectedDate && "text-secondary-text"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-dark-container border-gray-600" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-primary-text flex items-center gap-2">
                  <Clock className="h-4 w-4 text-terracotta" />
                  Select Time
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "text-xs relative overflow-hidden transition-all duration-300",
                        selectedTime === time
                          ? "bg-terracotta hover:bg-terracotta/90 text-white"
                          : "border-gray-600 text-secondary-text hover:text-white hover:border-terracotta bg-dark-base before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-terracotta before:transition-all before:duration-300 before:ease-in-out hover:before:w-full before:z-0"
                      )}
                    >
                      <span className="relative z-10">{time}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                  className="flex-1 border-gray-600 text-secondary-text hover:text-primary-text hover:border-gray-500"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="flex-1 bg-terracotta hover:bg-terracotta/90 text-white"
                  disabled={!selectedDate || !selectedTime}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="space-y-4 p-4 bg-dark-base rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-primary-text mb-3">Booking Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-text flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Mentor
                    </span>
                    <span className="text-primary-text font-medium">{mentor.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-text flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Date
                    </span>
                    <span className="text-primary-text font-medium">
                      {selectedDate && format(selectedDate, 'PPP')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-text flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time
                    </span>
                    <span className="text-primary-text font-medium">{selectedTime}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex items-center justify-between text-lg">
                      <span className="text-primary-text font-semibold">Total Amount</span>
                      <span className="text-bengal-yellow font-bold">₹{mentor.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1 border-gray-600 text-secondary-text hover:text-primary-text hover:border-gray-500"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-terracotta to-bengal-yellow hover:from-terracotta/90 hover:to-bengal-yellow/90 text-white font-semibold shadow-lg"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
