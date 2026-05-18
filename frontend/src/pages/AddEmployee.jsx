import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { UserPlus, Briefcase, Star, Award, Code, CheckCircle, XCircle } from 'lucide-react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '', // will be split by comma
    performanceScore: '',
    experience: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Process skills array
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');

    const payload = {
      ...formData,
      skills: skillsArray,
      performanceScore: Number(formData.performanceScore),
      experience: Number(formData.experience)
    };

    try {
      await api.post('/employees', payload);
      setStatus({ type: 'success', message: 'Employee added successfully!' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Error adding employee' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="glass rounded-2xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px]"></div>

        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 mb-4 border border-blue-500/20">
            <UserPlus className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Add New Employee</h2>
          <p className="text-slate-400 mt-1">Enter details to add an employee to the analytics system.</p>
        </div>

        {status.message && (
          <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 border ${
            status.type === 'success' 
              ? 'bg-green-500/10 border-green-500/50 text-green-400' 
              : 'bg-red-500/10 border-red-500/50 text-red-400'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                Department
              </label>
              <select 
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="" disabled>Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-slate-400" />
                Skills (comma separated)
              </label>
              <input 
                type="text" 
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Star className="w-4 h-4 text-slate-400" />
                Performance Score (0-100)
              </label>
              <input 
                type="number" 
                name="performanceScore"
                required
                min="0"
                max="100"
                value={formData.performanceScore}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="85"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400" />
                Years of Experience
              </label>
              <input 
                type="number" 
                name="experience"
                required
                min="0"
                step="0.5"
                value={formData.experience}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="3"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? 'Saving...' : 'Save Employee Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
