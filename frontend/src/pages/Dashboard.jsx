import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Filter, Star, Briefcase, Award } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (dept = '') => {
    setIsLoading(true);
    try {
      const url = dept ? `/employees/search?department=${dept}` : '/employees';
      const res = await api.get(url);
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Employee Directory</h1>
          <p className="text-slate-400">Manage and analyze your workforce performance.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search by department..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-xl bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          {searchTerm && (
            <button 
              type="button"
              onClick={() => { setSearchTerm(''); fetchEmployees(); }}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : employees.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center border border-slate-700">
          <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No employees found</h3>
          <p className="text-slate-400">Try adjusting your search or add a new employee.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div key={emp._id} className="glass rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{emp.name}</h3>
                  <p className="text-slate-400 text-sm">{emp.email}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {emp.department}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Performance
                  </div>
                  <span className="font-semibold text-white">{emp.performanceScore}/100</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Award className="w-4 h-4 text-purple-400" />
                    Experience
                  </div>
                  <span className="font-semibold text-white">{emp.experience} yrs</span>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {emp.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
