import React from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiDownload } from 'react-icons/fi';

const Analytics = () => {
  // Sample data for charts
  const userData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: 'Active Users',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(167, 139, 250, 0.2)',
        borderColor: 'rgba(167, 139, 250, 1)',
        borderWidth: 2,
        tension: 0.3
      }
    ]
  };

  const courseData = {
    labels: ['Web Dev', 'Design', 'Data Science', 'Business', 'Marketing'],
    datasets: [
      {
        data: [300, 150, 100, 200, 50],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(167, 139, 250, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  const stats = [
    { title: 'Total Visits', value: '12,345', change: '+12%', trend: 'up' },
    { title: 'Avg. Session', value: '4m 23s', change: '+3%', trend: 'up' },
    { title: 'Bounce Rate', value: '34%', change: '-5%', trend: 'down' },
    { title: 'Conversion', value: '2.4%', change: '+0.8%', trend: 'up' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Analytics Dashboard</h2>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-full ${
                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              } flex items-center justify-center`}>
                {stat.trend === 'up' ? <FiTrendingUp /> : <FiTrendingUp className="transform rotate-180" />}
              </div>
            </div>
            <div className={`mt-3 flex items-center text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">User Growth</h3>
            <div className="flex space-x-2">
              <button className="p-1 rounded hover:bg-gray-100">
                <FiBarChart2 className="text-gray-500" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <FiDownload className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-64">
            {/* In a real app, you would use a charting library like Chart.js here */}
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FiBarChart2 className="mx-auto text-3xl mb-2" />
                <p>User Growth Chart</p>
                <p className="text-xs mt-1">(Chart.js would render here)</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-xs text-gray-500">New Users</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-xs text-gray-500">Active Users</span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Course Categories</h3>
            <div className="flex space-x-2">
              <button className="p-1 rounded hover:bg-gray-100">
                <FiPieChart className="text-gray-500" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <FiDownload className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="h-64">
            {/* In a real app, you would use a charting library like Chart.js here */}
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FiPieChart className="mx-auto text-3xl mb-2" />
                <p>Course Categories Chart</p>
                <p className="text-xs mt-1">(Chart.js would render here)</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {courseData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: courseData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            { id: 1, action: 'New course published', user: 'John Doe', time: '2 hours ago' },
            { id: 2, action: 'User registration', user: 'Jane Smith', time: '5 hours ago' },
            { id: 3, action: 'Course completion', user: 'Robert Johnson', time: '1 day ago' },
            { id: 4, action: 'Payment received', user: 'Emily Davis', time: '2 days ago' },
          ].map(item => (
            <div key={item.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mt-1">
                <FiTrendingUp />
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium text-gray-800">{item.action}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">{item.user}</span> • {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>  
  );
};

export default Analytics;