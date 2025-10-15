import React, { useState, useEffect, useRef, useCallback } from 'react';
import UserReviewCard from './UserReviewCard';

const ReviewList = () => {
    const reviews = [
        {
            id: 1,
            courseName: "Full Stack Development",
            title: "Life-changing course!",
            reviewMsg: "This course completely transformed my career. The instructors are incredibly knowledgeable and the curriculum is perfectly structured. I went from zero coding experience to landing a job as a junior developer in just 6 months. The projects were challenging but extremely rewarding.",
            userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            userName: "Sarah Chen",
            rating: 5,
            date: "2 weeks ago",
            helpfulCount: 24,
            verified: true
        },
        {
            id: 2,
            courseName: "Data Science",
            title: "Comprehensive and well-structured",
            reviewMsg: "As someone with some programming background, I found this course to be the perfect balance of theory and practical application. The machine learning modules are particularly strong, and the capstone project helped me build an impressive portfolio piece.",
            userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            userName: "Marcus Johnson",
            rating: 4,
            date: "1 month ago",
            helpfulCount: 18,
            verified: true
        },
        {
            id: 3,
            courseName: "UX/UI Design",
            title: "Great for beginners",
            reviewMsg: "The course starts from the very basics and gradually builds up to advanced concepts. I appreciated the hands-on approach with real-world design challenges. The feedback from instructors was always constructive and timely.",
            userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            userName: "Emily Rodriguez",
            rating: 5,
            date: "3 days ago",
            helpfulCount: 9,
            verified: true
        },
        {
            id: 4,
            courseName: "Cyber Security",
            title: "Industry-relevant content",
            reviewMsg: "The cybersecurity course provided up-to-date information and practical skills that are directly applicable in today's job market. The labs were challenging but incredibly valuable for building real-world skills.",
            userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            userName: "Alex Thompson",
            rating: 4,
            date: "2 months ago",
            helpfulCount: 15,
            verified: true
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const slideInterval = useRef(null);
    const containerRef = useRef(null);

    const totalSlides = reviews.length;
    const minSwipeDistance = 50;


    const startAutoPlay = useCallback(() => {
        if (isAutoPlaying) {
            slideInterval.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % totalSlides);
            }, 5000);
        }
    }, [isAutoPlaying, totalSlides]);

    useEffect(() => {
        startAutoPlay();
        return () => {
            if (slideInterval.current) {
                clearInterval(slideInterval.current);
            }
        };
    }, [startAutoPlay]);

    const navigateSlide = useCallback((direction) => {
        if (direction === 'next') {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        } else {
            setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
        }
        resetAutoPlay();
    }, [totalSlides]);

    const resetAutoPlay = useCallback(() => {
        setIsAutoPlaying(false);
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
        setTimeout(() => {
            setIsAutoPlaying(true);
        }, 10000);
    }, []);

    const goToSlide = useCallback((index) => {
        setCurrentSlide(index);
        resetAutoPlay();
    }, [resetAutoPlay]);

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

 
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            navigateSlide('next');
        } else if (isRightSwipe) {
            navigateSlide('prev');
        }
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                navigateSlide('prev');
            } else if (e.key === 'ArrowRight') {
                navigateSlide('next');
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleAutoPlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigateSlide]);

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
                        What Our Students Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Don't just take our word for it. Here's what thousands of students 
                        have to say about their transformative learning experience.
                    </p>
                </div>

                <div 
                    ref={containerRef}
                    className="relative max-w-6xl mx-auto"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
     
                    <button 
                        onClick={() => navigateSlide('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Previous reviews"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button 
                        onClick={() => navigateSlide('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Next reviews"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

       
                    <div className="overflow-hidden px-16">
                        <div 
                            className="transition-transform duration-500 ease-out flex"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {reviews.map((review) => (
                                <div key={review.id} className="w-full flex-shrink-0 px-4">
                                    <UserReviewCard {...review} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={toggleAutoPlay}
                                className={`p-3 rounded-full border transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    isAutoPlaying 
                                        ? 'bg-green-100 border-green-300 text-green-600 focus:ring-green-500' 
                                        : 'bg-red-100 border-red-300 text-red-600 focus:ring-red-500'
                                }`}
                                aria-label={isAutoPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
                            >
                                {isAutoPlaying ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    </svg>
                                )}
                            </button>

                            <div className="flex space-x-3">
                                {reviews.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                            index === currentSlide 
                                                ? 'bg-blue-600 scale-125' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Go to review ${index + 1}`}
                                        aria-current={index === currentSlide ? 'true' : 'false'}
                                    />
                                ))}
                            </div>
                        </div>

                        <span className="text-lg font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                            {currentSlide + 1} <span className="text-gray-500">/ {totalSlides}</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewList;