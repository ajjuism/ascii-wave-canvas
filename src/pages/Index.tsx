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
      {/* ASCII Background - Aggressively Scaled */}
      <div className="absolute inset-0 w-full h-full">
        <ASCIIText
          text="pxl8.studio"
          enableWaves={true}
          asciiFontSize={4}
          textFontSize={600}
          planeBaseHeight={24}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div className={`flex flex-col items-center space-y-10 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Logo */}
          <div className="animate-float drop-shadow-2xl">
            <img 
              src={logo} 
              alt="pxl8.studio" 
              className="w-72 md:w-96 lg:w-[500px] h-auto"
            />
          </div>

          {/* Tagline */}
          <div className="text-center space-y-5 max-w-3xl backdrop-blur-sm bg-background/5 p-8 rounded-2xl border border-foreground/5">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-wider uppercase">
              Creative Design Studio
            </h1>
            <div className="h-px w-24 mx-auto bg-gradient-primary" />
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-light tracking-wide">
              Crafting pixel-perfect digital experiences
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="px-10 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 hover:scale-105 transition-all shadow-glow uppercase tracking-wide text-sm">
              View Work
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-foreground/20 text-foreground rounded-xl font-medium hover:border-foreground/40 hover:bg-foreground/5 transition-all uppercase tracking-wide text-sm">
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50 pointer-events-none" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
};

export default Index;
