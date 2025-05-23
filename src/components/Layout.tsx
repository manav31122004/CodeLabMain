
import NavBar from "./NavBar";
import { GradientBackground } from "./GradientBackground";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Link,useLocation } from 'react-router-dom';


// Navigation links data for better maintainability
const NAVIGATION_LINKS = [
  { to: "/", label: "Home" },
  { to: "/playground", label: "CodeRoom" },
  { to: "/help", label: "Help" },
  { to: "/contact", label: "Contact Us" }
];


// Footer component
const Footer = () => {
  const location = useLocation();
  
  return (
    <footer className={`
      ${!location.pathname.startsWith('/playground/') && location.pathname!="/auth" ? 'block' : 'hidden'} 
      bg-gray-100 dark:bg-slate-950 
      text-gray-700 dark:text-gray-300 
      py-16 transition-colors duration-300
    `}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              CodeLab
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The Online Code Analysis And Debugging Platform Analyze, debug, and optimize your code with AI assistance
            </p>
          </div>
          
          <div className="col-span-1"></div>

          {/* Pages Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pages
            </h3>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Created By : 
            </h3>
            <ul className="space-y-2">
              {/* {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <li key={href}>
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {icon}
                    {label}
                  </a>
                </li>
              ))} */}
              <a className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Manav.A.Prajapati 
              </a>
              <a className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Mrunali.S.Avaghade
              </a>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export const Layout = () => {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <NavBar />
      <GradientBackground className="lg:min-h-screen overflow-auto flex flex-col font-mono pb-2">
        
        <main className="dark:backdrop-blur-sm flex-grow mt-24">
          <ProtectedRoute>
            <Outlet />
           
          </ProtectedRoute>
        </main>
         <Footer />
      </GradientBackground>
      
    </ThemeProvider>
  );
};

export default Layout;