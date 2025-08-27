"use client";
import { useEffect, useState } from "react";

export default function FlowingRiver() {
  const [animationId, setAnimationId] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationId(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Flowing River Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* Multiple flowing layers for depth */}
        <div className="absolute inset-0">
          {/* Base gradient flow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30" />
          
          {/* Animated flowing streams */}
          <div className="absolute inset-0">
            {/* Stream 1 - Main flow */}
            <div 
              className="absolute w-[200%] h-32 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -rotate-12 animate-flow-right"
              style={{ 
                top: '20%',
                left: '-50%',
                animationDuration: '20s',
                animationDelay: '0s'
              }}
            />
            
            {/* Stream 2 - Secondary flow */}
            <div 
              className="absolute w-[200%] h-24 bg-gradient-to-r from-transparent via-indigo-200/15 to-transparent transform -rotate-12 animate-flow-right"
              style={{ 
                top: '40%',
                left: '-50%',
                animationDuration: '25s',
                animationDelay: '-5s'
              }}
            />
            
            {/* Stream 3 - Tertiary flow */}
            <div 
              className="absolute w-[200%] h-20 bg-gradient-to-r from-transparent via-purple-200/10 to-transparent transform -rotate-12 animate-flow-right"
              style={{ 
                top: '60%',
                left: '-50%',
                animationDuration: '30s',
                animationDelay: '-10s'
              }}
            />
            
            {/* Stream 4 - Bottom flow */}
            <div 
              className="absolute w-[200%] h-16 bg-gradient-to-r from-transparent via-pink-200/8 to-transparent transform -rotate-12 animate-flow-right"
              style={{ 
                top: '80%',
                left: '-50%',
                animationDuration: '35s',
                animationDelay: '-15s'
              }}
            />
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${8 + Math.random() * 8}s`,
                  animationDelay: `${Math.random() * 8}s`,
                }}
              />
            ))}
          </div>
          
          {/* Shimmer effects */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent animate-shimmer" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent animate-shimmer-delayed" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent animate-shimmer-delayed-2" />
          </div>
        </div>
      </div>
      
      {/* Enhanced magical background overlay */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/80 to-violet-50/90 dark:from-slate-950/90 dark:via-slate-900/80 dark:to-violet-950/90" />
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />
      </div>
    </>
  );
}
