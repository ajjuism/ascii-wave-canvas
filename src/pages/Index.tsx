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
      <div className="absolute inset-0 w-full h-full opacity-30">
        <ASCIIText
          text="PIXEL"
          enableWaves={true}
          asciiFontSize={3}
          textFontSize={800}
          planeBaseHeight={28}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="pt-8 px-8 md:px-16">
          <nav className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center justify-between">
              <img 
                src={logo} 
                alt="pxl8.studio" 
                className="h-8 md:h-10 w-auto"
              />
              <button className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Contact
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-8">
          <div className={`max-w-4xl transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-6 tracking-tight">
              Design<br />
              Studio
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 max-w-md font-light leading-relaxed">
              We craft exceptional digital experiences through bold creativity and precision.
            </p>
            
            <div className="mt-12 flex gap-4">
              <button className="group relative px-8 py-3 overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-foreground transition-transform group-hover:scale-105" />
                <span className="relative text-background text-sm font-medium">View Projects</span>
              </button>
              <button className="px-8 py-3 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
                Learn More →
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`pb-8 px-8 md:px-16 transition-all duration-700 delay-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center justify-between text-xs text-foreground/40">
            <p>Based in the digital realm</p>
            <p>2025</p>
          </div>
        </footer>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
    </div>
  );
};

export default Index;
