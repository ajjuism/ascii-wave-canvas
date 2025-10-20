import { useEffect, useState } from 'react';
import ASCIIText from '@/components/ASCIIText';
import logo from '@/assets/pxl8-logo.svg';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="pt-8 md:pt-12 px-8 md:px-16">
          <nav className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center justify-between">
              <img 
                src={logo} 
                alt="pxl8.studio" 
                className="h-9 md:h-12 w-auto transition-opacity hover:opacity-70 cursor-pointer"
              />
              <div className="flex gap-8 items-center">
                <button className="hidden md:block text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Work
                </button>
                <button className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-8 md:px-16">
          <div className={`max-w-5xl w-full transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-foreground tracking-tighter leading-[0.9]">
                Design<br />
                Studio
              </h1>
              <p className="text-base md:text-lg text-foreground/40 max-w-lg font-light leading-relaxed tracking-wide">
                We craft exceptional digital experiences through bold creativity and precision engineering.
              </p>
            </div>
            
            <div className="mt-16 flex flex-wrap gap-4">
              <button className="group relative px-9 py-3.5 overflow-hidden bg-foreground hover:bg-foreground/90 transition-colors">
                <span className="relative text-background text-sm font-medium tracking-wide">View Projects</span>
              </button>
              <button className="group px-9 py-3.5 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-2">
                Learn More 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Stats or Features */}
            <div className={`mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>
              <div>
                <div className="text-3xl md:text-4xl font-light mb-1">50+</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Projects</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-light mb-1">12</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Countries</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-light mb-1">5yr</div>
                <div className="text-xs text-foreground/40 uppercase tracking-wider">Experience</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`pb-8 md:pb-12 px-8 md:px-16 transition-all duration-700 delay-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-foreground/30">
            <div className="flex gap-6">
              <button className="hover:text-foreground/60 transition-colors">Instagram</button>
              <button className="hover:text-foreground/60 transition-colors">Behance</button>
              <button className="hover:text-foreground/60 transition-colors">LinkedIn</button>
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
