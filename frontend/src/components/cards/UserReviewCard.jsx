import React, { useState, useCallback, memo } from 'react';

const UserReviewCard = memo(({
    courseName = "Full Stack Development",
    title = "Excellent Course",
    reviewMsg = "This course provided comprehensive learning materials and practical experience that greatly enhanced my skills.",
    userAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    userName = "John Patrick",
    rating = 5,
    date = "2 weeks ago",
    helpfulCount = 12,
    verified = true
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [helpful, setHelpful] = useState(helpfulCount);
    const [userVoted, setUserVoted] = useState(false);
    const [imageError, setImageError] = useState(false);

    const shouldTruncate = reviewMsg.length > 200;
    const displayText = isExpanded ? reviewMsg : `${reviewMsg.substring(0, 200)}${shouldTruncate ? '...' : ''}`;

    // Memoized star rendering function
    const renderStars = useCallback((rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-6 h-6 flex-shrink-0 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    }, []);

    const toggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const handleHelpful = useCallback(() => {
        setHelpful(prev => userVoted ? prev - 1 : prev + 1);
        setUserVoted(prev => !prev);
    }, [userVoted]);

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";

    return (
        <article className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200/80 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50">
                    {courseName}
                </span>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={date}>{date}</time>
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
                <div className="flex" aria-label={`Rated ${rating} out of 5 stars`}>
                    {renderStars(rating)}
                </div>
                <span className="text-lg font-semibold text-gray-900">{rating}.0</span>
            </div>

            {/* Review Content */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{title}</h3>
                <div className="text-gray-700 leading-relaxed text-lg">
                    <p id={`review-${courseName.replace(/\s+/g, '-')}`}>
                        {displayText}
                    </p>
                </div>
                {shouldTruncate && (
                    <button 
                        onClick={toggleExpand}
                        className="mt-3 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                        aria-expanded={isExpanded}
                        aria-controls={`review-${courseName.replace(/\s+/g, '-')}`}
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-gray-100 gap-4">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img 
                            src={imageError ? defaultAvatar : userAvatar}
                            alt={`${userName}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            loading="lazy"
                            onError={handleImageError}
                        />
                        {verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1" title="Verified Student">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{userName}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                            {verified && (
                                <>
                                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Verified Student
                                </>
                            )}
                        </p>
                    </div>
                </div>
                
                <button 
                    onClick={handleHelpful}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        userVoted 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                    aria-pressed={userVoted}
                >
                    <svg 
                        className={`w-5 h-5 transition-transform duration-200 ${userVoted ? 'scale-110 text-blue-600' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="font-medium">Helpful ({helpful})</span>
                </button>
            </div>
        </article>
    );
});

UserReviewCard.displayName = 'UserReviewCard';

export default UserReviewCard;