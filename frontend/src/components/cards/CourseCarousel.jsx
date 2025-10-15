import React, { useEffect, useState } from 'react';
import { useCourse } from './../hook/useCourse';
import CourseCard from './CourseCard';

const CourseCarousel = () => {
  const [activeCategory, setActiveCategory] = useState("All courses");
  const [courses, setCourses] = useState([]);
  const { course, getCourses } = useCourse();

  // console.log(course?[0]?.owner?.username);

  // course.map((items)=> console.log(items?.owner?.username))
  

  const courseItems = [

    
    { 
      name: "All courses", 
      className: "from-purple-500 via-purple-600 to-indigo-700",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-purple-50 to-indigo-100"
    },
    { 
      name: "Frontend", 
      className: "from-red-400 via-red-500 to-pink-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.308.617a1 1 0 11-1.776.92L7.833 11.5H5a2 2 0 01-2-2V5zm5.242 9.708a1 1 0 001.414 0l3.536-3.535a1 1 0 00-1.414-1.414L10 12.586l-2.828-2.829a1 1 0 00-1.414 1.414l3.536 3.535z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-red-50 to-pink-100"
    },
    { 
      name: "Backend", 
      className: "from-orange-400 via-orange-500 to-red-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-orange-50 to-red-100"
    },
    { 
      name: "Data Science", 
      className: "from-yellow-400 via-yellow-500 to-orange-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-yellow-50 to-orange-100"
    },
    { 
      name: "Data Analytics", 
      className: "from-green-400 via-green-500 to-teal-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-green-50 to-teal-100"
    },
    { 
      name: "UI/UX", 
      className: "from-teal-400 via-teal-500 to-cyan-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-teal-50 to-cyan-100"
    },
    { 
      name: "Full Stack", 
      className: "from-blue-400 via-blue-500 to-indigo-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-100"
    },
    { 
      name: "Mobile Dev", 
      className: "from-indigo-400 via-indigo-500 to-purple-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-indigo-50 to-purple-100"
    },
    { 
      name: "DevOps", 
      className: "from-purple-400 via-purple-500 to-pink-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-100"
    },
    { 
      name: "Cloud", 
      className: "from-pink-400 via-pink-500 to-rose-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-pink-50 to-rose-100"
    },
    { 
      name: "AI/ML", 
      className: "from-rose-400 via-rose-500 to-red-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-rose-50 to-red-100"
    },
    { 
      name: "Cybersecurity", 
      className: "from-amber-400 via-amber-500 to-yellow-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-amber-50 to-yellow-100"
    },
    { 
      name: "Blockchain", 
      className: "from-lime-400 via-lime-500 to-green-600",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V5h2a1 1 0 110 2H9a1 1 0 01-1-1V3a1 1 0 011-1h1zm-6 8a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 11.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 019 21a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L5 12.477V11a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ),
      bgGradient: "bg-gradient-to-br from-lime-50 to-green-100"
    },
  ];

  useEffect(() => {
    getCourses();
  }, []);

  const handleCourse = (courseName) => {
    setActiveCategory(courseName);
    
    if (courseName === "All courses") {
      setCourses(course);
    } else {
      const filteredCourses = course.filter((courseItem) => 
        courseItem.typeOfCourse === courseName
      );
      setCourses(filteredCourses);
    }
  };

  const getActiveCategoryBg = () => {
    const activeItem = courseItems.find(item => item.name === activeCategory);
    return activeItem ? activeItem.bgGradient : "bg-gradient-to-br from-gray-50 to-gray-100";
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {courseItems.map((courseItem) => (
            <button 
              key={courseItem.name}
              className={`
                group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 
                transform hover:scale-105 hover:shadow-2xl active:scale-95 h-28
                flex flex-col items-center justify-center border-2
                ${activeCategory === courseItem.name 
                  ? `bg-gradient-to-r ${courseItem.className} shadow-xl scale-105 border-transparent text-white` 
                  : 'bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white border-gray-200 text-gray-700'
                }
              `}
              onClick={() => handleCourse(courseItem.name)}
            >
              
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${courseItem.className}`} />
              
           
              <div className={`relative z-10 mb-2 p-3 rounded-2xl transition-all duration-300 ${
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

       
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Exploring: <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {activeCategory}
              </span>
            </h2>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 font-semibold">
              {courses.length} courses available
            </span>
          </div>
          <p className="text-gray-600 text-lg">
            Dive into our carefully curated selection of {activeCategory.toLowerCase()} courses. 
            Each course is designed by industry experts to provide you with practical, real-world skills.
          </p>
        </div>


        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500 ${
          courses.length === 0 ? 'opacity-50' : 'opacity-100'
        }`}>
          {courses.length > 0 ? (
            courses.map((courseItem, index) => (
              <div 
                key={courseItem._id || index}
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

export default CourseCarousel;