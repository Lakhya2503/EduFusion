import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';

// Mock data for real-time courses (replace with actual API calls)
const mockCourses = [
  {
    _id: "1",
    title: "React Masterclass 2024",
    description: "Learn React from basics to advanced concepts including hooks, context API, and state management",
    isActive: true,
    basePrice: "16000",
    offer: "25",
    finalPrice: "12000",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Frontend",
    owner: { username: "ReactExpert" }
  },
  {
    _id: "2",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB",
    isActive: true,
    basePrice: "14000",
    offer: "20",
    finalPrice: "11200",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Backend",
    owner: { username: "BackendPro" }
  },
  {
    _id: "3",
    title: "Python Data Science Bootcamp",
    description: "Master data analysis, visualization, and machine learning with Python",
    isActive: true,
    basePrice: "18000",
    offer: "30",
    finalPrice: "12600",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Data Science",
    owner: { username: "DataGuru" }
  },
  {
    _id: "4",
    title: "Full Stack JavaScript Development",
    description: "Complete MERN stack course with React, Node.js, Express, and MongoDB",
    isActive: true,
    basePrice: "20000",
    offer: "35",
    finalPrice: "13000",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Full Stack",
    owner: { username: "FullStackMaster" }
  },
  {
    _id: "5",
    title: "UI/UX Design Principles",
    description: "Learn professional UI/UX design techniques and tools for modern applications",
    isActive: true,
    basePrice: "12000",
    offer: "15",
    finalPrice: "10200",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "UI/UX",
    owner: { username: "DesignWizard" }
  },
  {
    _id: "6",
    title: "AWS Cloud Practitioner",
    description: "Master AWS services and prepare for cloud certification exams",
    isActive: true,
    basePrice: "15000",
    offer: "25",
    finalPrice: "11250",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Cloud",
    owner: { username: "CloudExpert" }
  },
  {
    _id: "7",
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications using Flutter and Dart",
    isActive: true,
    basePrice: "17000",
    offer: "20",
    finalPrice: "13600",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Mobile Dev",
    owner: { username: "MobilePro" }
  },
  {
    _id: "8",
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity concepts and protection techniques",
    isActive: true,
    basePrice: "19000",
    offer: "10",
    finalPrice: "17100",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    typeOfCourse: "Cybersecurity",
    owner: { username: "SecurityExpert" }
  }
];

// Custom hook for course management
const useCourse = () => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCourse(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return { course, getCourses, loading };
};

// CourseCard Component
const CourseCard = ({
  title = "Full-Stack Web Development: Master Frontend and Backend Skills",
  description = "Learn frontend, backend, databases, and deployment to build complete modern web applications",
  basePrice = "16000",
  offer = "20",
  finalPrice = "12800",
  typeOfCourse = "Full Stack",
  thumbnail = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  owner = "JS_GURU",    
}) => {
  const discountPercentage = Math.round((1 - finalPrice / basePrice) * 100);

  return (
    <div className="max-w-sm bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 border border-gray-700/50 backdrop-blur-sm">

      <div className="relative overflow-hidden">
        <img 
          src={thumbnail} 
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" 
          alt={title}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
          }}
        />
        
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
            {typeOfCourse}
          </span>
        </div>
        
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {offer}% OFF
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
            <span className="text-white text-sm font-bold uppercase">{owner.charAt(0)}</span>
          </div>
          <span className="text-gray-300 text-sm font-medium">By {owner}</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight hover:text-purple-300 transition-colors">
          {title}
        </h2>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              ₹{finalPrice.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ₹{basePrice.toLocaleString()}
            </span>
          </div>
          
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
            Save {discountPercentage}%
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/30 border border-purple-500/30">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

// CourseCarousel Component
const CourseCarousel = () => {
  const [activeCategory, setActiveCategory] = useState("All courses");
  const [courses, setCourses] = useState([]);
  const { course, getCourses, loading } = useCourse();

  const courseItems = [
    { 
      name: "All courses", 
      className: "from-purple-500 via-purple-600 to-indigo-700",
      icon: "📚",
      bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-100"
    },
    { 
      name: "Frontend", 
      className: "from-red-400 via-red-500 to-pink-600",
      icon: "⚡",
      bgGradient: "bg-gradient-to-br from-red-50 to-pink-100"
    },
    { 
      name: "Backend", 
      className: "from-orange-400 via-orange-500 to-red-600",
      icon: "🔧",
      bgGradient: "bg-gradient-to-br from-orange-50 to-red-100"
    },
    { 
      name: "Data Science", 
      className: "from-yellow-400 via-yellow-500 to-orange-600",
      icon: "📊",
      bgGradient: "bg-gradient-to-br from-yellow-50 to-orange-100"
    },
    { 
      name: "Data Analytics", 
      className: "from-green-400 via-green-500 to-teal-600",
      icon: "📈",
      bgGradient: "bg-gradient-to-br from-green-50 to-teal-100"
    },
    { 
      name: "UI/UX", 
      className: "from-teal-400 via-teal-500 to-cyan-600",
      icon: "🎨",
      bgGradient: "bg-gradient-to-br from-teal-50 to-cyan-100"
    },
    { 
      name: "Full Stack", 
      className: "from-blue-400 via-blue-500 to-indigo-600",
      icon: "🌐",
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-100"
    },
    { 
      name: "Mobile Dev", 
      className: "from-indigo-400 via-indigo-500 to-purple-600",
      icon: "📱",
      bgGradient: "bg-gradient-to-br from-indigo-50 to-purple-100"
    },
    { 
      name: "DevOps", 
      className: "from-purple-400 via-purple-500 to-pink-600",
      icon: "🔄",
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-100"
    },
    { 
      name: "Cloud", 
      className: "from-pink-400 via-pink-500 to-rose-600",
      icon: "☁️",
      bgGradient: "bg-gradient-to-br from-pink-50 to-rose-100"
    },
    { 
      name: "AI/ML", 
      className: "from-rose-400 via-rose-500 to-red-600",
      icon: "🤖",
      bgGradient: "bg-gradient-to-br from-rose-50 to-red-100"
    },
    { 
      name: "Cybersecurity", 
      className: "from-amber-400 via-amber-500 to-yellow-600",
      icon: "🔒",
      bgGradient: "bg-gradient-to-br from-amber-50 to-yellow-100"
    },
    { 
      name: "Blockchain", 
      className: "from-lime-400 via-lime-500 to-green-600",
      icon: "⛓️",
      bgGradient: "bg-gradient-to-br from-lime-50 to-green-100"
    },
  ];

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (activeCategory === "All courses") {
      setCourses(course);
    } else {
      const filteredCourses = course.filter((courseItem) => 
        courseItem.typeOfCourse === activeCategory
      );
      setCourses(filteredCourses);
    }
  }, [activeCategory, course]);

  const handleCourse = (courseName) => {
    setActiveCategory(courseName);
  };

  const getActiveCategoryBg = () => {
    const activeItem = courseItems.find(item => item.name === activeCategory);
    return activeItem ? activeItem.bgGradient : "bg-gradient-to-br from-gray-50 to-gray-100";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading amazing courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${getActiveCategoryBg()}`}>
      <div className="relative overflow-hidden py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Discover Your Path
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our comprehensive collection of courses designed to transform your career. 
            From beginner to expert level, we've got you covered.
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {courseItems.map((item, index) => (
            <div 
              key={index}
              className="absolute rounded-full opacity-10 animate-pulse"
              style={{
                background: `linear-gradient(45deg, var(--${item.className.split(' ')[1]?.replace('from-', '') || 'purple'}-500), var(--${item.className.split(' ')[3]?.replace('to-', '') || 'blue'}-500))`,
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${index * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-6 mb-8">
          {courseItems.map((courseItem) => (
            <button 
              key={courseItem.name}
              className={`
                group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 
                transform hover:scale-105 hover:shadow-2xl active:scale-95 h-28
                flex flex-col items-center justify-center border-2 backdrop-blur-sm
                ${activeCategory === courseItem.name 
                  ? `bg-gradient-to-r ${courseItem.className} shadow-xl scale-105 border-transparent text-white` 
                  : 'bg-white/80 shadow-lg hover:bg-white border-gray-200 text-gray-700'
                }
              `}
              onClick={() => handleCourse(courseItem.name)}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${courseItem.className}`} />
              
              <div className={`relative z-10 text-2xl mb-2 p-3 rounded-2xl transition-all duration-300 ${
                activeCategory === courseItem.name 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-white/20'
              }`}>
                {courseItem.icon}
              </div>
              
              <span className="relative z-10 font-semibold text-sm text-center leading-tight">
                {courseItem.name}
              </span>
              
              {activeCategory === courseItem.name && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Category Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Exploring: <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {activeCategory}
              </span>
            </h2>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 font-semibold whitespace-nowrap">
              {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
            </span>
          </div>
          <p className="text-gray-600 text-lg">
            Dive into our carefully curated selection of {activeCategory.toLowerCase()} courses. 
            Each course is designed by industry experts to provide you with practical, real-world skills.
          </p>
        </div>

        {/* Courses Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500 ${
          courses.length === 0 ? 'opacity-50' : 'opacity-100'
        }`}>
          {courses.length > 0 ? (
            courses.map((courseItem) => (
              <div 
                key={courseItem._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <CourseCard
                  title={courseItem.title}
                  description={courseItem.description}
                  isActive={courseItem.isActive}
                  basePrice={courseItem.basePrice}
                  offer={courseItem.offer}
                  finalPrice={courseItem.finalPrice}
                  thumbnail={courseItem.thumbnail}
                  typeOfCourse={courseItem.typeOfCourse}
                  owner={courseItem.owner?.username}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                {activeCategory === "All courses" 
                  ? "We're adding new courses every day. Check back soon!" 
                  : `No ${activeCategory} courses available at the moment. Try another category!`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Courses Component
function Courses() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800'>
      <Navbar/>
      <CourseCarousel/>
    </div>
  );
}

export default Courses;