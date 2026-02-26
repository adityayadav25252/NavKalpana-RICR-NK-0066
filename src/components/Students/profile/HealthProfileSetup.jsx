import React, { useState } from 'react';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  User, 
  Calendar, 
  Ruler, 
  Weight, 
  Zap,
  ChevronRight,
  CheckCircle2,
  Info
} from 'lucide-react';

const HealthProfileSetup = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    height: '',
    weight: '',
    activity: '',
    experience: '',
    goal: ''
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseInt(formData.weight);
    const activity = parseFloat(formData.activity);
    const { sex, goal } = formData;

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    
    // Determine BMI category with color coding
    let bmiCategory = "";
    let bmiColor = "";
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) {
      bmiCategory = "Underweight";
      bmiColor = "text-blue-600";
    } else if (bmiNum < 25) {
      bmiCategory = "Normal";
      bmiColor = "text-emerald-600";
    } else if (bmiNum < 30) {
      bmiCategory = "Overweight";
      bmiColor = "text-amber-600";
    } else {
      bmiCategory = "Obese";
      bmiColor = "text-rose-600";
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = sex === "male"
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161;

    const maintenance = Math.round(bmr * activity);

    // Calculate target based on goal
    let target = maintenance;
    let adjustment = 0;
    let goalLabel = "";

    switch (goal) {
      case "loss":
        adjustment = -500;
        goalLabel = "Weight Loss";
        break;
      case "gain":
        adjustment = 300;
        goalLabel = "Muscle Gain";
        break;
      case "recomp":
        adjustment = -200;
        goalLabel = "Body Recomposition";
        break;
      case "maintain":
        adjustment = 0;
        goalLabel = "Maintenance";
        break;
      case "endurance":
        adjustment = 200;
        goalLabel = "Endurance Training";
        break;
      default:
        adjustment = 0;
    }
    
    target += adjustment;

    // Apply safety floors
    const minCalories = sex === "female" ? 1200 : 1500;
    const isAdjusted = target < minCalories;
    if (target < minCalories) target = minCalories;

    setResults({
      bmi,
      bmiCategory,
      bmiColor,
      maintenance,
      target,
      goalLabel,
      isAdjusted,
      minCalories
    });
    
    setShowResults(true);
    setLoading(false);
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const goals = [
    { value: 'loss', label: 'Weight Loss', icon: TrendingUp, desc: 'Lose fat sustainably' },
    { value: 'gain', label: 'Muscle Gain', icon: Zap, desc: 'Build lean muscle mass' },
    { value: 'recomp', label: 'Body Recomposition', icon: Activity, desc: 'Lose fat & gain muscle' },
    { value: 'maintain', label: 'Maintain', icon: CheckCircle2, desc: 'Keep current physique' },
    { value: 'endurance', label: 'Improve Endurance', icon: Target, desc: 'Boost stamina & performance', fullWidth: true }
  ];

  const activityLevels = [
    { value: "1.2", label: "Sedentary", desc: "Little to no exercise" },
    { value: "1.375", label: "Lightly Active", desc: "1-3 days/week" },
    { value: "1.55", label: "Moderately Active", desc: "3-5 days/week" },
    { value: "1.725", label: "Very Active", desc: "6-7 days/week" },
    { value: "1.9", label: "Extra Active", desc: "Physical job + training" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-lg shadow-teal-500/25 mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Health & Goal Profile
          </h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Create your personalized nutrition and fitness plan tailored to your body
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-medium">Setup Progress</span>
              <span className="text-teal-600 font-semibold">
                {Object.values(formData).filter(v => v !== '').length}/7 completed
              </span>
            </div>
            <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ease-out"
                style={{ width: `${(Object.values(formData).filter(v => v !== '').length / 7) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
            {/* Basic Information Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
                  <p className="text-sm text-slate-500">Tell us about your body stats</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="25"
                      required
                      min="10"
                      max="100"
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all hover:border-slate-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Biological Sex <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all hover:border-slate-300 cursor-pointer appearance-none"
                    >
                      <option value="">Select sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Height (cm) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="175"
                      required
                      min="50"
                      max="300"
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all hover:border-slate-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Current Weight (kg) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="70"
                      required
                      min="20"
                      max="300"
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all hover:border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Lifestyle & Experience</h2>
                  <p className="text-sm text-slate-500">How active are you currently?</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Activity Level <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activityLevels.map((level) => (
                      <label
                        key={level.value}
                        className={`relative cursor-pointer group`}
                      >
                        <input
                          type="radio"
                          name="activity"
                          value={level.value}
                          checked={formData.activity === level.value}
                          onChange={handleInputChange}
                          required
                          className="sr-only"
                        />
                        <div className={`
                          p-4 rounded-xl border-2 transition-all duration-200 h-full
                          ${formData.activity === level.value
                            ? 'bg-teal-50 border-teal-500 shadow-md shadow-teal-500/10'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }
                        `}>
                          <div className="font-semibold text-sm text-slate-900 mb-1">{level.label}</div>
                          <div className="text-xs text-slate-500">{level.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Experience Level <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all hover:border-slate-300 cursor-pointer appearance-none"
                    >
                      <option value="">Select your experience</option>
                      <option value="beginner">Beginner - New to fitness</option>
                      <option value="intermediate">Intermediate - 6+ months training</option>
                      <option value="advanced">Advanced - 2+ years training</option>
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Goal Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Primary Goal</h2>
                  <p className="text-sm text-slate-500">What do you want to achieve?</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <label 
                      key={goal.value} 
                      className={`relative cursor-pointer ${goal.fullWidth ? 'sm:col-span-2' : ''}`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={goal.value}
                        checked={formData.goal === goal.value}
                        onChange={handleInputChange}
                        required
                        className="sr-only"
                      />
                      <div className={`
                        flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 h-full
                        ${formData.goal === goal.value 
                          ? 'bg-gradient-to-br from-teal-50 to-teal-100/50 border-teal-500 shadow-lg shadow-teal-500/10' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/50'
                        }
                      `}>
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
                          ${formData.goal === goal.value 
                            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25' 
                            : 'bg-slate-100 text-slate-500'
                          }
                        `}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className={`
                            font-bold text-base mb-1 transition-colors duration-200
                            ${formData.goal === goal.value ? 'text-teal-900' : 'text-slate-900'}
                          `}>
                            {goal.label}
                          </div>
                          <div className="text-sm text-slate-500 leading-relaxed">
                            {goal.desc}
                          </div>
                        </div>
                        {formData.goal === goal.value && (
                          <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0 animate-in fade-in zoom-in duration-200" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl text-base font-bold shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30 disabled:shadow-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Calculating Your Plan...</span>
                  </>
                ) : (
                  <>
                    <span>Calculate My Personalized Plan</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Results Section */}
          {showResults && results && (
            <div 
              id="results"
              className="border-t border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-6 sm:p-8 lg:p-10 animate-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Your Personalized Results</h2>
                  <p className="text-sm text-slate-500">Based on your {results.goalLabel.toLowerCase()} goal</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* BMI Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">BMI Score</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{results.bmi}</span>
                    <span className={`text-sm font-semibold ${results.bmiColor}`}>{results.bmiCategory}</span>
                  </div>
                  <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        results.bmiCategory === 'Normal' ? 'bg-emerald-500 w-1/2' :
                        results.bmiCategory === 'Underweight' ? 'bg-blue-500 w-1/4' :
                        results.bmiCategory === 'Overweight' ? 'bg-amber-500 w-3/4' :
                        'bg-rose-500 w-full'
                      }`}
                      style={{ width: `${Math.min((results.bmi / 40) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Maintenance Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Maintenance</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-slate-900">{results.maintenance.toLocaleString()}</span>
                    <span className="text-sm text-slate-500">kcal</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Daily calories to maintain weight</div>
                </div>

                {/* Target Card - Highlighted */}
                <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-5 rounded-2xl shadow-lg shadow-teal-600/20 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="relative">
                    <div className="text-xs font-semibold text-teal-100 uppercase tracking-wider mb-2">Target Intake</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{results.target.toLocaleString()}</span>
                      <span className="text-sm text-teal-200">kcal</span>
                    </div>
                    <div className="mt-2 text-xs text-teal-100">Recommended daily calories</div>
                  </div>
                </div>
              </div>

              {/* Safety Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900 text-sm mb-1">Safety Guidelines</div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Minimum recommended intake is <strong>{results.minCalories} kcal</strong> for {formData.sex === 'female' ? 'women' : 'men'}. 
                    {results.isAdjusted && " Your target has been adjusted to meet safety requirements."} 
                    Always consult a healthcare provider before starting any new diet or exercise program.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-400">
          <p>Powered by Mifflin-St Jeor Equation • Results are estimates only</p>
        </div>
      </div>
    </div>
  );
};

export default HealthProfileSetup;