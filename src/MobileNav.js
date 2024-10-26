import React, { useState, useEffect, useRef } from 'react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const teamMembersRef = useRef([]);

  const navItems = [
    { name: "Store", description: "Shop our products and get expert advice" },
    { name: "Mac", description: "Powerful and beautiful computers" },
    { name: "iPad", description: "Like a computer. Unlike any computer" },
    { name: "iPhone", description: "The ultimate smartphone" },
    { name: "Watch", description: "Adventure awaits" },
    { name: "Vision", description: "Welcome to spatial computing" },
    { name: "AirPods", description: "Magic like you've never heard" }
  ];

  useEffect(() => {
    const toggleHeaderTransparency = () => {
      const scrollThreshold = 50;
      if (headerRef.current) {
        if (window.scrollY > scrollThreshold) {
          headerRef.current.classList.add('transparent');
        } else {
          headerRef.current.classList.remove('transparent');
        }
      }
    };
    window.addEventListener('scroll', toggleHeaderTransparency);
    return () => window.removeEventListener('scroll', toggleHeaderTransparency);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    teamMembersRef.current.forEach(member => {
      if (member) observer.observe(member);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      >
        <div className="relative font-sans antialiased">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-50 p-4 focus:outline-none hamburger ${isOpen ? 'active' : ''}`}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col justify-between w-6 h-5">
              <span
                className={`block h-0.5 w-6 bg-black transform transition-all duration-500 ease-out
                ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}
              />
              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-400 ease-out
                ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}
              />
              <span
                className={`block h-0.5 w-6 bg-black transform transition-all duration-500 ease-out
                ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-lg transition-all duration-500
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
          />
          <nav
            className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-sm transform
            transition-all duration-600 ease-out nav-links
            ${isOpen ? 'translate-y-0 active' : '-translate-y-full'}`}
          >
            <div className="pt-20 px-8">
              <ul className="space-y-5">
                {navItems.map((item, index) => (
                  <li
                    key={item.name}
                    className="overflow-hidden team-member"
                    ref={el => teamMembersRef.current[index] = el}
                  >
                    <div
                      className={`transform transition-all duration-500 ease-out
                      ${isOpen
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0'}`}
                      style={{ transitionDelay: `${index * 70}ms` }}
                    >
                      <a href="#" className="block group">
                        <div className="overflow-hidden relative">
                          <div
                            className={`transform transition-all duration-500 ease-out
                            ${isOpen
                              ? 'translate-y-0'
                              : 'translate-y-full'}`}
                            style={{ transitionDelay: `${(index * 70) + 150}ms` }}
                          >
                            <span className="block text-2xl font-semibold text-gray-900 tracking-tight
                              transition-all duration-300 ease-out group-hover:text-gray-600">
                              {item.name}
                            </span>
                          </div>
                          <div
                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform
                            origin-left transition-transform duration-300 ease-out scale-x-0
                            group-hover:scale-x-100`}
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div
                            className={`transform transition-all duration-500 ease-out mt-2
                            ${isOpen
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-full opacity-0'}`}
                            style={{ transitionDelay: `${(index * 70) + 250}ms` }}
                          >
                            <p className="text-sm text-gray-500">
                              {item.description.split(' ').map((word, wordIndex) => (
                                <span
                                  key={wordIndex}
                                  className="inline-block mr-1"
                                  style={{
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                    transition: 'all 0.5s ease-out',
                                    transitionDelay: `${(index * 70) + (wordIndex * 35) + 300}ms`
                                  }}
                                >
                                  {word}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`fixed bottom-8 left-0 w-full px-8 transform transition-all duration-500 ease-out
              ${isOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3
                transform transition-all duration-300 hover:bg-gray-200/80">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search apple.com"
                  className="bg-transparent w-full text-base text-gray-900 placeholder-gray-400
                    focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          </nav>
        </div>
      </header>
      <style jsx>{`
        .team-member {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        .team-member.show {
          opacity: 1;
          transform: translateY(0);
        }
        .transparent {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default MobileNav;
