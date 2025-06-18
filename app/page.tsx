"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background with inline styles */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/tumblr_mr99hzFQWw1rb76ono1_400.gif')",
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          backgroundSize: 'auto',
          zIndex: 0,
        }}
      />
      
      {/* Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="text-white text-8xl font-bold mb-8 drop-shadow-2xl">Dave</h1>
        <Link 
          href="/about"
          className="text-white text-xl border-2 border-white px-8 py-3 hover:bg-white hover:text-black transition-colors"
        >
          enter
        </Link>
      </div>
    </div>
  );
}
