import React from 'react'

const CourseCard = ({
    title = "Full-Stack Web Development: Master Frontend and Backend Skills",
    description = "Learn frontend, backend, databases, and deployment to build complete modern web applications",
    basePrice = "16000",
    offer = "20",
    finalPrice = "12800",
    typeOfCourse = "Full Stack",
    thumbnail = "https://i.pinimg.com/736x/de/ef/50/deef500591c4959336c2631d8ccbbe4a.jpg",
    owner = "JS_GURU",    
}) => {
    const discountPercentage = Math.round((1 - finalPrice / basePrice) * 100);

    return (
        <div className="max-w-fit bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 border border-gray-700">

            <div className="relative overflow-hidden">
                <img 
                    src={thumbnail} 
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" 
                    alt={title}
                />
                
                <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {typeOfCourse}
                    </span>
                </div>
                
   
                <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold shadow-lg">
                        {offer}% OFF
                    </span>
                </div>
            </div>

   
            <div className="p-6">
           
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-sm font-bold uppercase">{owner.charAt(0)}</span>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">By {owner}</span>
                </div>


                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
                    {title}
                </h2>


                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {description}
                </p>


                <div className="flex items-center justify-between mb-4 gap-3">
                    <div className="flex items-center space-x-2">
    
                        <span className="text-2xl font-bold text-white">
                            ₹{finalPrice}
                        </span>
                        

                        <span className="text-lg text-gray-400 line-through">
                            ₹{basePrice}
                        </span>
                    </div>
                    
          
                    <div className="bg-green-500/20 gap-1 text-center flex text-green-400 px-2 py-1 rounded text-[13px] font-semibold">
                        <span>Save</span> {discountPercentage}%
                    </div>
                </div>

       
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/30">
                    Enroll Now
                </button>
            </div>
        </div>
    )
}

export default CourseCard