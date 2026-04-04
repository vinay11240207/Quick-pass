'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen gradient-animate relative overflow-hidden">
      {/* Floating glowing orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl float animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl float animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl float animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(102,51,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(102,51,153,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
          QuickPass
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-white/70 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">About</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Main heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
              Register.
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
              Generate.
            </span>{' '}
            <span className="text-white">
              Enter.
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Seamless event registration with instant QR code generation. Get verified in seconds, enter with confidence.
          </p>
        </div>

        {/* CTA Button */}
        <Link href="/register">
          <Button
            size="lg"
            className="group relative glow-purple px-8 py-6 text-lg h-auto rounded-full font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border border-purple-400/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="flex items-center gap-2">
              Register Now
              <ArrowRight className={`w-5 h-5 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
          </Button>
        </Link>

        {/* Secondary CTA */}
        <Link href="/admin">
          <button className="mt-6 glass rounded-full px-6 py-3 text-white/80 hover:text-white transition-all hover:border-white/20 border border-white/10">
            Admin Panel
          </button>
        </Link>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          {[
            { number: '10K+', label: 'Events Hosted' },
            { number: '1M+', label: 'Passes Generated' },
            { number: '100K+', label: 'Happy Users' },
          ].map((stat, i) => (
            <div key={i} className="glass-card text-center group hover:glow-border transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                {stat.number}
              </div>
              <p className="text-white/60 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce text-white/40">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
