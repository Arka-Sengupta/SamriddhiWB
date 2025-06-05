
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const AuthModals = ({
  isLoginOpen,
  isRegisterOpen,
  onLoginClose,
  onRegisterClose,
  onSwitchToRegister,
  onSwitchToLogin
}: AuthModalsProps) => {
  const { t } = useLanguage();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { toast } = useToast();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: 'Welcome back!',
        description: 'You have been logged in successfully',
        className: 'bg-green-500 text-white',
      });
      onLoginClose();
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'Failed to login. Please check your credentials.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { register } = useAuth();

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      await register(registerData.name, registerData.email, registerData.password);
      toast({
        title: 'Welcome to SamriddhiWB!',
        description: 'Your account has been created successfully',
        className: 'bg-green-500 text-white',
      });
      onRegisterClose();
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-container border-gray-600 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-primary-text">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-center text-secondary-text">
              Sign in to your account to continue
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-secondary-text">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="bg-dark-base border-gray-600 text-primary-text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-secondary-text">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="bg-dark-base border-gray-600 text-primary-text"
                required
              />
            </div>
            <Button 
              type="submit" 
              className={cn(
                "w-full bg-terracotta hover:bg-terracotta/90 transition-all",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
          <div className="text-center text-sm text-secondary-text">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-terracotta hover:underline"
            >
              Register here
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={isRegisterOpen} onOpenChange={onRegisterClose}>
        <DialogContent className="sm:max-w-[425px] bg-dark-container border-gray-600 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-primary-text">
              Join SamriddhiWB
            </DialogTitle>
            <DialogDescription className="text-center text-secondary-text">
              Create your account to get started
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name" className="text-secondary-text">Full Name</Label>
              <Input
                id="register-name"
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                className="bg-dark-base border-gray-600 text-primary-text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email" className="text-secondary-text">Email</Label>
              <Input
                id="register-email"
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                className="bg-dark-base border-gray-600 text-primary-text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-secondary-text">Password</Label>
              <Input
                id="register-password"
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="bg-dark-base border-gray-600 text-primary-text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm-password" className="text-secondary-text">Confirm Password</Label>
              <Input
                id="register-confirm-password"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="bg-dark-base border-gray-600 text-primary-text"
                required
              />
            </div>
            <Button 
              type="submit" 
              className={cn(
                "w-full bg-terracotta hover:bg-terracotta/90 transition-all",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          <div className="text-center text-sm text-secondary-text">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-terracotta hover:underline"
            >
              Login here
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;
