import { useEffect, useState } from 'react';
import ASCIIText from '@/components/ASCIIText';
import logo from '@/assets/pxl8-logo.svg';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* ASCII Background */}
      <div className="absolute inset-0 w-full h-full opacity-25">
        <ASCIIText
          text="PIXEL"
          enableWaves={false}
          asciiFontSize={2}
          textFontSize={900}
          planeBaseHeight={32}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Learn More Side Panel */}
        <div className={`fixed right-0 top-0 h-full w-96 bg-background/95 backdrop-blur-sm border-l border-foreground/20 z-20 transition-all duration-700 ease-out transform ${
          showLearnMore ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } shadow-2xl flex flex-col`}>
          <div className="p-6 flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground/20 hover:scrollbar-thumb-foreground/30">
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
                <div>
                  <h2 className="text-2xl font-light text-foreground">About PXL8</h2>
                  <p className="text-xs text-foreground/40 uppercase tracking-wider mt-1">Passionate Generalists</p>
                </div>
                <button 
                  onClick={() => setShowLearnMore(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors text-foreground/50 hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              
              {/* Story */}
              <div className="bg-foreground/5 rounded-lg p-4 border border-foreground/10">
                <h3 className="text-sm font-medium text-foreground mb-3 uppercase tracking-wider">Our Story</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  We're a team of passionate generalists who've been exploring diverse creative territories for years. We thrive on tackling new challenges, adapting quickly, and bringing fresh perspectives to every project we undertake.
                </p>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-6 uppercase tracking-wider">Services</h3>
                <div className="space-y-4">
                  <div className="group p-4 rounded-xl border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300">
                    <div>
                      <h4 className="text-base font-medium text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
                        Brand Identity & Visual Design
                      </h4>
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        Creating memorable brand experiences through strategic design and visual storytelling.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group p-4 rounded-xl border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300">
                    <div>
                      <h4 className="text-base font-medium text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
                        Web & Mobile Development
                      </h4>
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        Building responsive, performant applications that work seamlessly across all devices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group p-4 rounded-xl border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300">
                    <div>
                      <h4 className="text-base font-medium text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
                        User Experience Design
                      </h4>
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        Crafting intuitive interfaces that delight users and drive meaningful engagement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="group p-4 rounded-xl border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-300">
                    <div>
                      <h4 className="text-base font-medium text-foreground mb-2 group-hover:text-foreground/90 transition-colors">
                        Digital Strategy & Consulting
                      </h4>
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        Strategic guidance to help your business thrive in the digital landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sticky CTA */}
          <div className="p-6 border-t border-foreground/10 bg-background/95">
            <a 
              href="mailto:pxl8dotstudio@gmail.com"
              className="block w-full px-4 py-3 bg-foreground hover:bg-foreground/90 text-background text-sm font-medium transition-colors rounded-lg text-center"
            >
              Start Your Project
            </a>
          </div>
        </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="pt-6 md:pt-12 px-6 md:px-16">
          <nav className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center justify-between">
              <img 
                src={logo} 
                alt="pxl8.studio" 
                className="h-6 md:h-7 w-auto transition-opacity hover:opacity-70 cursor-pointer"
              />
              <div className="flex gap-6 md:gap-8 items-center">
                <a 
                  href="mailto:pxl8dotstudio@gmail.com"
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-start md:items-center justify-start px-6 md:px-16 pt-20 md:pt-0">
          <div className={`max-w-5xl w-full transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-foreground tracking-tighter leading-[0.9]">
                Design<br />
                Studio
              </h1>
              <p className="text-base md:text-xl text-foreground/40 max-w-2xl font-light leading-relaxed tracking-wide">
                We bring fresh perspectives to digital challenges, crafting experiences that matter through curiosity and collaboration.
              </p>
            </div>
            
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:pxl8dotstudio@gmail.com"
                className="group relative px-9 py-3.5 overflow-hidden bg-foreground hover:bg-foreground/90 transition-colors"
              >
                <span className="relative text-background text-sm font-medium tracking-wide">Contact</span>
              </a>
              <button 
                onClick={() => setShowLearnMore(!showLearnMore)}
                className="group px-9 py-3.5 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-2"
              >
                {showLearnMore ? 'Show Less' : 'Learn More'}
                <span className={`group-hover:translate-x-1 transition-transform ${showLearnMore ? 'rotate-180' : ''}`}>→</span>
              </button>
            </div>


            {/* Stats or Features */}
            <div className={`mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>
              <div>
                <div className="text-2xl md:text-4xl font-light mb-1">1:1</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Collaboration</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-light mb-1">100%</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Transparency</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-2xl md:text-4xl font-light mb-1">∞</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Creativity</div>
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
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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

export default Index;
