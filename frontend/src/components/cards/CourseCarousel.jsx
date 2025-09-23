import React from 'react';


const CourseCarousel = () => {

const courseItems = [
  { name: "Frontend", className: "border-red-500 text-red-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-red-100 hover:shadow-xl focus:ring-2 focus:ring-red-400 focus:outline-none" },
  { name: "Backend", className: "border-orange-500 text-orange-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-orange-100 hover:shadow-xl focus:ring-2 focus:ring-orange-400 focus:outline-none" },
  { name: "Data Science", className: "border-yellow-500 text-yellow-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-yellow-100 hover:shadow-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none" },
  { name: "Data Analytics", className: "border-green-500 text-green-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-green-100 hover:shadow-xl focus:ring-2 focus:ring-green-400 focus:outline-none" },
  { name: "UI/UX", className: "border-teal-500 text-teal-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-teal-100 hover:shadow-xl focus:ring-2 focus:ring-teal-400 focus:outline-none" },
  { name: "Full Stack", className: "border-sky-500 text-sky-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-sky-100 hover:shadow-xl focus:ring-2 focus:ring-sky-400 focus:outline-none" },
  { name: "Mobile Dev", className: "border-indigo-500 text-indigo-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-indigo-100 hover:shadow-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none" },
  { name: "DevOps", className: "border-purple-500 text-purple-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-purple-100 hover:shadow-xl focus:ring-2 focus:ring-purple-400 focus:outline-none" },
  { name: "Cloud", className: "border-pink-500 text-pink-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-pink-100 hover:shadow-xl focus:ring-2 focus:ring-pink-400 focus:outline-none" },
  { name: "AI/ML", className: "border-rose-500 text-rose-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-rose-100 hover:shadow-xl focus:ring-2 focus:ring-rose-400 focus:outline-none" },
  { name: "Cybersecurity", className: "border-amber-500 text-amber-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-amber-100 hover:shadow-xl focus:ring-2 focus:ring-amber-400 focus:outline-none" },
  { name: "Blockchain", className: "border-lime-500 text-lime-500 rounded-xl py-4 px-4 bg-white transition-all duration-300 hover:scale-90 hover:bg-lime-100 hover:shadow-xl focus:ring-2 focus:ring-lime-400 focus:outline-none" },
]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-xl shadow-lg">
                                           {courseItems.map((course) => (
                                             <button className={`rounded-[3px] border text-2xl font-semibold ${course.className}`} key={course.name}>
                                               {course.name}
                                             </button>
                                           ))}
    </div>
  );
};

export default CourseCarousel;