import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from 'recharts';

interface AnalyticsProps {
  answeredQuestions: boolean[];
  hintCounts: number[];
  currentRiskCardQuestions: any[];
  selectedRoles: string[];
  totalScore: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const Analytics: React.FC<AnalyticsProps> = ({
  answeredQuestions,
  hintCounts,
  currentRiskCardQuestions,
  selectedRoles,
  totalScore,
}) => {
  // Calculate analytics data
  const correctAnswers = answeredQuestions.filter(Boolean).length;
  const incorrectAnswers = answeredQuestions.filter(answer => !answer).length;
  const totalQuestions = answeredQuestions.length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const pieData = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: incorrectAnswers },
  ];

  // Group hint usage by question number
  const hintUsageData = hintCounts.map((count, index) => ({
    question: `Q${index + 1}`,
    hints: count,
  }));

  // Calculate performance by role
  const performanceByRole = selectedRoles.map(role => {
    const roleQuestions = currentRiskCardQuestions.filter(q => q.role === role);
    const correctForRole = roleQuestions.filter((_, idx) => answeredQuestions[idx]).length;
    return {
      role,
      score: roleQuestions.length > 0 ? (correctForRole / roleQuestions.length) * 100 : 0,
    };
  });

  // Calculate strengths and areas for improvement
  const strengthsData = [
    { subject: 'Knowledge', score: accuracy },
    { subject: 'Hint Independence', score: hintCounts.length > 0 ? 100 - (Math.max(...hintCounts) / 2) * 100 : 100 },
    { subject: 'Speed', score: 80 }, // This could be calculated based on time if tracked
    { subject: 'Consistency', score: 75 }, // This could be more dynamic based on patterns
    { subject: 'Overall', score: totalQuestions > 0 ? (totalScore / (totalQuestions * 5)) * 100 : 0 },
  ];

  // Calculate performance trends
  const performanceTrend = answeredQuestions.map((isCorrect, index) => ({
    question: index + 1,
    score: isCorrect ? 100 : 0,
  }));

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
          <div className="text-4xl font-bold">{Math.round(accuracy)}%</div>
          <p className="mt-2">Total Questions: {totalQuestions}</p>
          <p className="mt-1">Total Score: {totalScore}</p>
        </div>

        {/* Correct vs Incorrect Distribution */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Answer Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance by Role */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Performance by Role</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceByRole}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hint Usage Chart */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Hint Usage by Question</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hintUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hints" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar Chart */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengthsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="mt-8 bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Areas for Improvement</h3>
        <ul className="space-y-2">
          {accuracy < 70 && (
            <li className="flex items-center text-slate-700 dark:text-gray-300">
              <span className="mr-2">•</span>
              Focus on improving overall knowledge of security concepts
            </li>
          )}
          {Math.max(...hintCounts) > 1 && (
            <li className="flex items-center text-slate-700 dark:text-gray-300">
              <span className="mr-2">•</span>
              Try to solve more questions without using hints
            </li>
          )}
          {performanceByRole.some(role => role.score < 60) && (
            <li className="flex items-center text-slate-700 dark:text-gray-300">
              <span className="mr-2">•</span>
              Review materials related to specific roles where performance was lower
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}; 