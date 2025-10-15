import React from 'react'

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className='group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'>
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <img 
          src={blog.image} 
          alt={blog.title}
          className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
        />
        <div className='absolute top-4 left-4'>
          <span className='px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full'>
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <div className='flex items-center justify-between text-sm text-gray-400 mb-3'>
          <span className='flex items-center gap-1'>
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            {blog.readTime}
          </span>
          <span>{formatDate(blog.date)}</span>
        </div>

        <h3 className='text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2'>
          {blog.title}
        </h3>

        <p className='text-gray-300 mb-4 line-clamp-3'>
          {blog.excerpt}
        </p>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold'>
              {blog.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span className='text-sm text-gray-300'>{blog.author}</span>
          </div>
          
          <button className='text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1 group/btn'>
            Read More
            <svg className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default BlogCard