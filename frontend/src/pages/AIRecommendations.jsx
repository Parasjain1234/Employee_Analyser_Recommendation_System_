import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Sparkles, TrendingUp, AlertCircle, Award, Lightbulb, Zap } from 'lucide-react';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees first to send to AI
    const fetchEmployees = async () => {
      try {
        const res = await api.get('/employees');
        setEmployees(res.data);
      } catch (err) {
        setError('Failed to fetch employee data for AI analysis.');
      }
    };
    fetchEmployees();
  }, []);

  const generateInsights = async () => {
    if (employees.length === 0) {
      setError('No employees available to analyze.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const res = await api.post('/ai/recommend', { employees });
      setRecommendations(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate AI insights. Check API keys.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            AI Analytics & Insights
          </h1>
          <p className="text-slate-400">Powered by OpenRouter API for intelligent HR decisions.</p>
        </div>
        
        <button 
          onClick={generateInsights}
          disabled={isLoading || employees.length === 0}
          className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
              Analyzing Data...
            </div>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate New Insights
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {!recommendations && !isLoading && !error && (
        <div className="glass rounded-2xl p-16 text-center border border-slate-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 mb-6 border border-slate-700">
            <Sparkles className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Ready to Analyze {employees.length} Employees</h3>
          <p className="text-slate-400 max-w-lg mx-auto">
            Click the generate button above to run our AI model on your employee database. It will provide promotion recommendations, training suggestions, and rank your workforce.
          </p>
        </div>
      )}

      {recommendations && (
        <div className="space-y-8 animate-fade-in-up">
          {/* Rankings */}
          <div className="glass rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Award className="w-32 h-32 text-blue-500" />
             </div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-400" />
              Top Performers Ranking
            </h3>
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-3 px-4 text-slate-300 font-medium">Rank</th>
                    <th className="py-3 px-4 text-slate-300 font-medium">Employee Name</th>
                    <th className="py-3 px-4 text-slate-300 font-medium">AI Score</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.rankings?.map((rank, idx) => (
                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 text-white font-bold">#{rank.rank}</td>
                      <td className="py-3 px-4 text-slate-200">{rank.name}</td>
                      <td className="py-3 px-4 text-blue-400 font-medium">{rank.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Promotions */}
            <div className="glass rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Promotion Recommendations
              </h3>
              <div className="space-y-4">
                {recommendations.promotions?.map((promo, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="font-semibold text-white mb-1">{promo.name}</div>
                    <p className="text-sm text-slate-400 leading-relaxed">{promo.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Training */}
            <div className="glass rounded-2xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Training Needs
              </h3>
              <div className="space-y-4">
                {recommendations.training?.map((train, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <div className="font-semibold text-white mb-2">{train.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {train.suggestions.map((suggestion, sIdx) => (
                        <span key={sIdx} className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs border border-yellow-500/20">
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="glass rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-purple-400" />
              General AI Feedback
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.feedback?.map((fb, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="font-semibold text-white mb-2">{fb.name}</div>
                  <p className="text-sm text-slate-400 italic">"{fb.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
