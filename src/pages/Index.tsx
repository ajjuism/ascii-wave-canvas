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
      <div className="absolute inset-0 w-full h-full">
        <ASCIIText
          text="pxl8.studio"
          enableWaves={true}
          asciiFontSize={6}
          textFontSize={300}
          planeBaseHeight={12}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <div className={`flex flex-col items-center space-y-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Logo */}
          <div className="animate-float">
            <img 
              src={logo} 
              alt="pxl8.studio" 
              className="w-64 md:w-80 lg:w-96 h-auto"
            />
          </div>

          {/* Tagline */}
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground tracking-wide">
              Creative Design Studio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Crafting pixel-perfect experiences
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              View Work
            </button>
            <button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 pointer-events-none" />
    </div>
  );
};

export default Index;
