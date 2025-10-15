import React from 'react'
import Navbar from '../common/Navbar'
import BlogCard from '../cards/BlogCard';

function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Mastering CSS Grid Layout",
      excerpt: "A comprehensive guide to creating modern, responsive layouts using CSS Grid with practical examples.",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "CSS",
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "JavaScript ES2023 Features",
      excerpt: "Explore the latest JavaScript features and how they can improve your development workflow.",
      author: "Alex Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "JavaScript",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Building Scalable APIs with Node.js",
      excerpt: "Learn best practices for creating robust and scalable REST APIs using Node.js and Express.",
      author: "Emily Watson",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      title: "Introduction to TypeScript",
      excerpt: "Discover how TypeScript can help you write more maintainable and error-free JavaScript code.",
      author: "David Kim",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      title: "Mobile-First Design Principles",
      excerpt: "Learn why mobile-first design is crucial in today's web development and how to implement it effectively.",
      author: "Lisa Thompson",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className='min-h-screen w-full bg-gray-950 text-white'>
      <Navbar />
      
      {/* Header Section */}
      <div className='pt-20 pb-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-6'>
            Our Blog
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Discover the latest insights, tutorials, and best practices in web development, 
            design, and technology.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className='px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='max-w-7xl mx-auto'>
          {/* Categories Filter */}
          <div className='flex flex-wrap justify-center gap-4 mb-12'>
            <button className='px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'>
              All Posts
            </button>
            <button className='px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors'>
              React
            </button>
            <button className='px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors'>
              JavaScript
            </button>
            <button className='px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors'>
              CSS
            </button>
            <button className='px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors'>
              Backend
            </button>
          </div>

          {/* Blog Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogPosts.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Load More Button */}
          <div className='text-center mt-12'>
            <button className='px-8 py-3 border-2 border-blue-600 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold'>
              Load More Articles
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='bg-gray-900 py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Stay Updated
          </h2>
          <p className='text-gray-300 mb-8'>
            Get the latest articles and news delivered to your inbox every week.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input 
              type='email' 
              placeholder='Enter your email'
              className='flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
            />
            <button className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs