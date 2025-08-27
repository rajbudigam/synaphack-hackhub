"use client";

export default function AuroraFX() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none" 
      aria-hidden="true"
    >
      {/* Aurora Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cyan Aurora */}
        <div 
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 opacity-20 animate-aurora-drift-slow"
          style={{
            background: 'radial-gradient(ellipse 800px 600px at 50% 50%, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 70%)',
            animationDuration: '45s'
          }}
        />
        
        {/* Magenta Aurora */}
        <div 
          className="absolute w-[200%] h-[200%] -top-1/2 -right-1/2 opacity-15 animate-aurora-drift-reverse"
          style={{
            background: 'radial-gradient(ellipse 600px 800px at 50% 50%, rgba(219, 39, 119, 0.3) 0%, rgba(219, 39, 119, 0.1) 35%, transparent 70%)',
            animationDuration: '60s'
          }}
        />
        
        {/* Purple Aurora - Third Layer */}
        <div 
          className="absolute w-[180%] h-[180%] -top-1/4 -left-1/4 opacity-10 animate-aurora-pulse"
          style={{
            background: 'radial-gradient(ellipse 700px 500px at 50% 50%, rgba(147, 51, 234, 0.25) 0%, rgba(147, 51, 234, 0.05) 40%, transparent 70%)',
            animationDuration: '40s'
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      {/* Data Streams */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stream 1 */}
        <div 
          className="absolute w-full h-full animate-stream-flow-1"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent 0px, transparent 100px, rgba(6, 182, 212, 0.08) 100px, rgba(6, 182, 212, 0.08) 102px, transparent 102px, transparent 200px)',
            animationDuration: '18s'
          }}
        />
        
        {/* Stream 2 */}
        <div 
          className="absolute w-full h-full animate-stream-flow-2"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent 0px, transparent 150px, rgba(219, 39, 119, 0.06) 150px, rgba(219, 39, 119, 0.06) 151px, transparent 151px, transparent 300px)',
            animationDuration: '22s'
          }}
        />
        
        {/* Stream 3 */}
        <div 
          className="absolute w-full h-full animate-stream-flow-3"
          style={{
            background: 'repeating-linear-gradient(135deg, transparent 0px, transparent 80px, rgba(147, 51, 234, 0.05) 80px, rgba(147, 51, 234, 0.05) 81px, transparent 81px, transparent 160px)',
            animationDuration: '15s'
          }}
        />
      </div>

      {/* Readability Fade Mask */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.05) 100%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.3) 0%, transparent 50%, rgba(15,23,42,0.2) 100%)',
        }}
      />
    </div>
  );
}
