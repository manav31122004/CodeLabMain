import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import logo from '@/assets/CodeTalk.png';

interface FormData {
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithGithub } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('signup') === 'true') {
      setIsLogin(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(formData.email, formData.password);
      } else {
        await signUpWithEmail(formData.email, formData.password);
      }
      
      setShowSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError('');
    setLoading(true);
    try {
      provider === 'google' ? await signInWithGoogle() : await signInWithGithub();
      setShowSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Error signing in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex justify-center p-4">
      <div className="max-w-md w-full space-y-5">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="h-20 w-auto" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-blue-500">Welcome to CodeTalk</h2>
          <p className="mt-2 text-gray-800 dark:text-gray-300">
            {isLogin ? "Sign in to continue coding" : "Join the developer community"}
          </p>
        </div>

        {/* Auth Form */}
        <div className="dark:bg-gray-800/90 bg-slate-200/50 rounded-xl shadow-2xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {showSuccess && (
            <Alert className="mb-4 bg-green-500/10 border-green-500/50">
              <AlertDescription className="text-green-500">
                {isLogin ? "Login successful!" : "Account created successfully!"} Redirecting...
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="dark:text-gray-300 text-sm font-medium block mb-2">Email</label>
              <div className="relative">
                <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-600"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="dark:text-gray-300 text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-500 absolute left-3 top-3" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:text-white pl-10 pr-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || showSuccess}
              className="w-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-green-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="px-4 text-gray-400 text-lg font-semibold">OR</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={loading || showSuccess}
              className="w-full flex items-center justify-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white py-2 rounded-lg shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600 transition disabled:opacity-50"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              disabled={loading || showSuccess}
              className="w-full flex items-center justify-center bg-gray-900 text-white py-2 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              <FaGithub className="h-5 w-5 mr-2" />
              Continue with GitHub
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="dark:text-blue-400 hover:text-blue-300 text-sm"
              type="button"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
