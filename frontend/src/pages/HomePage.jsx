import { useState } from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen, FaUserFriends, FaSearch } from 'react-icons/fa';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    { id: 1, title: 'Interactive Mathematics', category: 'STEM', duration: '8 weeks' },
    { id: 2, title: 'Creative Writing Workshop', category: 'Humanities', duration: '6 weeks' },
    { id: 3, title: 'Introduction to AI', category: 'Technology', duration: '10 weeks' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Transform Your <span className="text-indigo-600">Learning</span> Experience
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            EduFusion combines innovative teaching methods with cutting-edge technology to create engaging educational experiences for all ages.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Explore Courses
              </a>
            </div>
            <div className="ml-3 inline-flex">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to learn
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaChalkboardTeacher className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Expert Instructors</h3>
                <p className="mt-2 text-base text-gray-500">
                  Learn from industry professionals and experienced educators passionate about sharing their knowledge.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaBookOpen className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Interactive Content</h3>
                <p className="mt-2 text-base text-gray-500">
                  Engaging multimedia lessons, quizzes, and hands-on projects to reinforce learning.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <FaUserFriends className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Collaborative Learning</h3>
                <p className="mt-2 text-base text-gray-500">
                  Connect with peers, join study groups, and participate in discussions to enhance your understanding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular <span className="text-indigo-600">Courses</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our most engaging and impactful learning programs
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <FaBookOpen className="h-16 w-16 text-indigo-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {course.category}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">{course.duration}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-3 text-base text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius.
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">$99</span>
                  <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            View All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;