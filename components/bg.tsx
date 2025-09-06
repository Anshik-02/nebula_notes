import React from 'react'

export default function Background() {
  return (
    <div>{/* Animated Star Field Background */}
<div className="fixed inset-0 z-0">
  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-blue-950/30" />
  
  {/* Floating Stars */}
  {[...Array(50)].map((_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    />
  ))}
  
  {/* Larger Glowing Stars */}
  {[...Array(20)].map((_, i) => (
    <div
      key={`glow-${i}`}
      className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
      }}
    />
  ))}
  
  {/* Nebula Clouds */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
  <div
    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
    style={{ animationDelay: "2s" }}
  />
</div></div>
  )
}
