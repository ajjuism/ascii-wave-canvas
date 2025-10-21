import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ASCIIText from '@/components/ASCIIText';
import logo from '@/assets/pxl8-logo.svg';

const NotFound = () => {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    setIsLoaded(true);
  }, [location.pathname]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* ASCII Background */}
      <div className="absolute inset-0 w-full h-full opacity-25">
        <ASCIIText
          text="404"
          enableWaves={false}
          asciiFontSize={2}
          textFontSize={800}
          planeBaseHeight={32}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="pt-6 md:pt-12 px-6 md:px-16">
          <nav className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center justify-between">
              <a href="/">
                <img 
                  src={logo} 
                  alt="pxl8.studio" 
                  className="h-6 md:h-7 w-auto transition-opacity hover:opacity-70 cursor-pointer"
                />
              </a>
              <a 
                href="mailto:pxl8dotstudio@gmail.com"
                className="text-sm text-foreground/50 hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-16">
          <div className={`max-w-4xl w-full text-center transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-8">
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-extralight text-foreground tracking-tighter leading-[0.9]">
                404
              </h1>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-light text-foreground">
                  Lost in the digital realm
                </h2>
                <p className="text-base md:text-lg text-foreground/40 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                  Looks like this page wandered off into the creative void. Even passionate generalists get lost sometimes.
                </p>
              </div>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="/"
                className="group relative px-9 py-3.5 overflow-hidden bg-foreground hover:bg-foreground/90 transition-colors"
              >
                <span className="relative text-background text-sm font-medium tracking-wide">Back to Home</span>
              </a>
              <a 
                href="mailto:pxl8dotstudio@gmail.com"
                className="group px-9 py-3.5 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-2"
              >
                Get Help 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Fun Stats */}
            <div className={`mt-16 grid grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-foreground">∞</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Ways to get lost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-foreground">1</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Way back home</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-foreground">100%</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Chance we'll help</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`pb-6 md:pb-12 px-6 md:px-16 transition-all duration-700 delay-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-foreground/30">
            <div className="flex gap-6">
              <a 
                href="https://www.instagram.com/pxl8.studio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground/60 transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-6.98 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>
            <div className="flex gap-6">
              <p>Based in the digital realm</p>
              <p>© 2025</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
    </div>
  );
};

export default NotFound;
