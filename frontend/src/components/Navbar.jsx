import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Users, PlusCircle, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'text-blue-400 font-bold' : 'text-slate-300 hover:text-white transition-colors';

  if (!user) return null;

  return (
    <nav className="glass sticky top-0 z-50 mb-8 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                ElevateAI
              </span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/" className={`flex items-center gap-2 ${isActive('/')}`}>
                <Users className="w-4 h-4" />
                Directory
              </Link>
              <Link to="/add" className={`flex items-center gap-2 ${isActive('/add')}`}>
                <PlusCircle className="w-4 h-4" />
                Add Employee
              </Link>
              <Link to="/ai-insights" className={`flex items-center gap-2 ${isActive('/ai-insights')}`}>
                <Sparkles className="w-4 h-4" />
                AI Insights
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
