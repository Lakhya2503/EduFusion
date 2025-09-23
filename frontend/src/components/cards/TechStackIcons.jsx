import React from "react";

const TechStackIcons = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-2">My Tech Stack</h2>
      <p className="text-gray-400 mb-8">Technologies I work with</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-4xl w-full">
        {/* JavaScript */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#F7DF1E] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 630 630">
              <rect width="630" height="630" fill="#F7DF1E"/>
              <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.18v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">JavaScript</span>
        </div>

        {/* React */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#20232A] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="11.4" fill="#61DAFB"/>
              <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.9 1.5-7.4 1.2-7.6.6-15.5-2.9-22.5-2.2-4.4-5.5-8.3-9.7-11.2-7.5-5.2-17.2-6.7-26-4.8-5.2 1.1-10.1 3.5-14.2 7-4.1 3.5-7.3 8-9.3 13-2 5-2.8 10.4-2.5 15.8.2 3.2.9 6.4 1.9 9.5-2.4.7-4.7 1.5-7 2.3C15.4 52.6 6.4 64.1 6.4 77.5c0 14.4 11.5 26.1 25.6 26.1 2.3 0 4.6-.3 6.9-.9 3.5 5.8 8.2 10.8 13.9 14.5 6.8 4.3 15 6.2 23.2 5.3 8.2-.9 15.9-4.2 21.8-9.5 5.9-5.3 9.8-12.3 11.1-20.1 1.3-7.8-.1-15.8-3.9-22.6 2.2-.8 4.5-1.6 6.9-2.3 11.5-4.1 19.1-15 19.1-27.3.1-12.3-7.5-23.2-19-27.3zM22.4 77.5c0-12.3 11.5-22.3 25.6-22.3 2.3 0 4.6.3 6.9.9-3.5 5.8-5.8 12.3-6.6 19.1-.9 6.8.1 13.7 2.9 20.1-2.4.7-4.7 1.5-7 2.3-11.5 4.1-19.1 15-19.1 27.3 0 12.3 7.5 23.2 19.1 27.3 2.2.8 4.5 1.6 6.9 2.3-5.8 9.8-16.3 16.3-28.1 16.3-17.7 0-32-14.3-32-32zm64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm21.9-96.8c-2.2-.8-4.5-1.6-6.9-2.3-3.5 5.8-5.8 12.3-6.6 19.1-.9 6.8.1 13.7 2.9 20.1-2.4.7-4.7 1.5-7 2.3-11.5 4.1-19.1 15-19.1 27.3 0 12.3 7.5 23.2 19.1 27.3 2.2.8 4.5 1.6 6.9 2.3 3.5-5.8 5.8-12.3 6.6-19.1.9-6.8-.1-13.7-2.9-20.1 2.4-.7 4.7-1.5 7-2.3 11.5-4.1 19.1-15 19.1-27.3 0-12.3-7.5-23.2-19.1-27.3z" fill="#61DAFB"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">React</span>
        </div>

        {/* Angular */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#DD0031] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 250 250">
              <path d="M125 30L125 30 31.9 63.2 46.1 186.3 125 230 125 230 203.9 186.3 218.1 63.2z" fill="#B3B3B3"/>
              <path d="M125 30L125 30 125 230 125 230 203.9 186.3 218.1 63.2z" fill="#A6120D"/>
              <path d="M125 30L31.9 63.2 46.1 186.3 125 230z" fill="#DD1B16"/>
              <path d="M125 30L218.1 63.2 203.9 186.3 125 230z" fill="#DD1B16"/>
              <path d="M125 135.4L163.2 176.6 203.9 186.3 125 230z" fill="#990100"/>
              <path d="M125 135.4L86.8 176.6 46.1 186.3 125 230z" fill="#990100"/>
              <path d="M163.2 76.8L125 135.4 125 135.4 125 30z" fill="#FFFFFF"/>
              <path d="M86.8 76.8L125 135.4 125 135.4 125 30z" fill="#FFFFFF"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">Angular</span>
        </div>

        {/* Express.js */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-800 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <path d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.84-41.9L66.33 29.71c4.31-1.16 6.87-.51 9.32 3.45 5.83 9.49 12.26 18.57 18.67 27.68C98.5 55.7 104.86 64.92 111.2 74.1c2.13 3.12 3.61 3.62 7.16 2.34-3.25 5.26-6.41 10.35-9.56 15.45-3.18 5.15-6.33 10.33-9.56 15.46h13.87c2.67-4.36 5.3-8.74 7.99-13.09 2.71-4.37 5.41-8.74 8.17-13.17 1.5.71 2.99 1.36 4.2 2.25zM1.33 61.74c.72-3.61 1.2-7.29 2.1-10.84 3.33-13.18 10.99-22.83 22.23-29.39 9.4-5.52 19.75-7.6 30.84-6.31 4.64.54 9.19 1.69 13.77 2.56v9.69c-4.19-.64-8.36-1.47-12.55-1.97-11.75-1.41-22.5 1.2-31.53 8.96-7.52 6.48-11.93 14.96-13.11 25.04-.4 3.41-.46 6.9-.69 10.35-.01 1.7-.33 3.42-.33 5.13 0 3.37.21 6.74.41 10.1.28 4.71 1.11 9.38 2.47 13.96 2.7 9.12 7.87 16.57 15.71 21.83 8.59 5.73 18.19 7.59 28.43 6.1 4.21-.61 8.36-1.7 12.54-2.58v-9.69c-4.38.86-8.73 1.95-13.1 2.57-10.27 1.47-19.85-.15-27.95-6.85-7.02-5.78-11.13-13.21-12.81-22.15-1.46-7.71-1.34-15.47-.9-23.23.12-2.11.36-4.22.36-6.33z" fill="#fff"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">Express.js</span>
        </div>

        {/* Kotlin */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#7F52FF] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <linearGradient id="kotlin-a" gradientUnits="userSpaceOnUse" x1="41.052" y1="15.979" x2="95.511" y2="118.021">
                <stop offset="0" stop-color="#5c5cff"/>
                <stop offset=".232" stop-color="#5757ff"/>
                <stop offset=".392" stop-color="#4848ff"/>
                <stop offset=".533" stop-color="#2f2fff"/>
                <stop offset=".664" stop-color="#0d0dff"/>
                <stop offset=".738" stop-color="#0000f2"/>
                <stop offset=".809" stop-color="#0000d9"/>
                <stop offset=".878" stop-color="#0000b8"/>
                <stop offset=".945" stop-color="#00008f"/>
                <stop offset="1" stop-color="#00005e"/>
              </linearGradient>
              <path d="M13.5 13.5L64 64 13.5 114.5V13.5z" fill="url(#kotlin-a)"/>
              <linearGradient id="kotlin-b" gradientUnits="userSpaceOnUse" x1="63.5" y1="13.5" x2="63.5" y2="114.5">
                <stop offset="0" stop-color="#ff64bc"/>
                <stop offset=".135" stop-color="#ff61c1"/>
                <stop offset=".288" stop-color="#ff58cf"/>
                <stop offset=".453" stop-color="#ff48e5"/>
                <stop offset=".626" stop-color="#ff32ff"/>
                <stop offset=".691" stop-color="#f22fff"/>
                <stop offset=".754" stop-color="#dc2aff"/>
                <stop offset=".816" stop-color="#bd23ff"/>
                <stop offset=".877" stop-color="#951aff"/>
                <stop offset=".937" stop-color="#6410ff"/>
                <stop offset=".995" stop-color="#2a04ff"/>
              </linearGradient>
              <path d="M13.5 114.5L64 64l50.5 50.5H13.5z" fill="url(#kotlin-b)"/>
              <linearGradient id="kotlin-c" gradientUnits="userSpaceOnUse" x1="113.5" y1="13.5" x2="113.5" y2="114.5">
                <stop offset="0" stop-color="#00afff"/>
                <stop offset=".068" stop-color="#00b1ff"/>
                <stop offset=".188" stop-color="#00b9ff"/>
                <stop offset=".322" stop-color="#00c5ff"/>
                <stop offset=".466" stop-color="#00d6ff"/>
                <stop offset=".618" stop-color="#00ebff"/>
                <stop offset=".718" stop-color="#00f9ff"/>
                <stop offset=".774" stop-color="#00fcf9"/>
                <stop offset=".829" stop-color="#00fde8"/>
                <stop offset=".883" stop-color="#00fecd"/>
                <stop offset=".936" stop-color="#00ffa8"/>
                <stop offset=".988" stop-color="#00ff78"/>
                <stop offset="1" stop-color="#00ff75"/>
              </linearGradient>
              <path d="M64 64l50.5-50.5v101L64 64z" fill="url(#kotlin-c)"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">Kotlin</span>
        </div>

        {/* HTML */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#E34F26] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
              <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.653H64z"/>
              <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.92H64v-13.756zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
              <path fill="#fff" d="M63.952 52.455v13.756h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.692h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">HTML</span>
        </div>

        {/* CSS */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#1572B6] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
              <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/>
              <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/>
              <path fill="#EBEBEB" d="M64.083 87.349l-.061.017-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.017v-14.39z"/>
              <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.868.208-2.337 2.406-26.881z"/>
              <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.33-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">CSS</span>
        </div>

        {/* Java */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#007396] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <path fill="#007396" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
              <path fill="#007396" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
              <path fill="#007396" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-31.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.291 0 0 5.253-3.539 19.644-5.31zm63.231-22.774c-3.339-4.233-13.92-7.726-13.92-7.726s1.37 4.316 4.697 7.858c3.322 3.436 13.92 7.726 13.92 7.726s-1.367-4.315-4.697-7.858z"/>
              <path fill="#007396" d="M76.491 1.587S89.459 14.563 64.188 34.51c-22.14 17.583-43.6 17.393-43.6 17.393s9.048-10.237 25.697-19.746C65.984 21.791 76.491 1.587 76.491 1.587z"/>
              <path fill="#007396" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.487.874 0 .001 2.875 2.381 17.247 3.331z"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">Java</span>
        </div>

        {/* C++ */}
        <div className="group relative flex flex-col items-center">
          <div className="w-20 h-20 bg-[#00599C] rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <svg className="w-12 h-12" viewBox="0 0 128 128">
              <path fill="#D26383" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4.7 3.4l106.8-62c-.5-1.2-.7-2.3-.7-3.4V36.1c0-1.9-1.1-4.4-2.8-5.4zm-4.8 7.5l-50.5 29.3c-.8.5-1.9.7-3.1.7-1.2 0-2.3-.3-3.1-.7l-50.5-29.3v-4.7l50.5 29.3c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l50.5-29.3v4.7z"/>
              <path fill="#00599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62v28.7c0 1.1.2 2.3.7 3.3zm106.1-59.2v55.7c0 1.1-.2 2.3-.7 3.3l-50.5-29.3V67.5l50.5-29.3c.5.8.7 1.9.7 2.9z"/>
              <path fill="#00599C" d="M117.3 23.5c.9 1.2 1.4 2.6 1.4 4.1v55.7c0 1.9-1.1 4.4-2.8 5.4L67.1 116.7c-.8.5-1.9.7-3.1.7-1.2 0-2.3-.3-3.1-.7l-48-27.9c-1.7-1-2.9-3.5-2.9-5.4V27.6c0-1.5.5-2.9 1.4-4.1l52.6 30.5c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l52.6-30.5z"/>
            </svg>
          </div>
          <span className="text-white text-sm mt-2 font-medium">C++</span>
        </div>
      </div>
    </div>
  );
};

export default TechStackIcons;