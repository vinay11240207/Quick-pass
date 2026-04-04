'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import Link from 'next/link'
import QRCode from 'react-qr-code'

interface PassData {
  name: string
  email: string
  phone: string
  event: string
  passId: string
}

export function PassPage() {
  const router = useRouter()
  const [passData, setPassData] = useState<PassData | null>(null)
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('registration')
    if (!stored) {
      router.push('/register')
      return
    }
    setPassData(JSON.parse(stored))
    setIsShowing(true)
  }, [router])

  const handleDownload = () => {
    const element = document.getElementById('pass-card')
    if (element) {
      const canvas = document.querySelector('#pass-card canvas') as HTMLCanvasElement
      if (canvas) {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `${passData?.passId || 'pass'}.png`
        link.click()
      }
    }
  }

  const handleShare = () => {
    if (navigator.share && passData) {
      navigator.share({
        title: 'My Event Pass',
        text: `Check out my pass for ${passData.event}`,
        url: window.location.href,
      }).catch(err => console.log('Share failed:', err))
    }
  }

  if (!passData) {
    return (
      <div className="min-h-screen gradient-animate flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    )
  }

  const eventNames: Record<string, string> = {
    'tech-summit-2024': 'Tech Summit 2024',
    'web3-conf': 'Web3 Conference',
    'ai-expo': 'AI Expo',
    'startup-pitch': 'Startup Pitch Night',
  }

  return (
    <div className="min-h-screen gradient-animate relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl float animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl float animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/">
          <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Home
          </button>
        </Link>
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
          Your Digital Pass
        </h1>
      </nav>

      {/* Pass Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className={`w-full max-w-md transition-all duration-700 transform ${isShowing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div id="pass-card" className="relative group">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card content */}
            <div className="relative glass-card rounded-3xl border-2 border-transparent bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-20 pointer-events-none" />

              {/* Pass background pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.1),transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2 pb-4 border-b border-white/10">
                  <div className="text-xs font-mono text-purple-400/70 tracking-widest">DIGITAL PASS</div>
                  <h2 className="text-2xl font-bold text-white">{eventNames[passData.event] || passData.event}</h2>
                </div>

                {/* User Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{passData.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/60 uppercase tracking-wide">Attendee</p>
                      <p className="text-white font-semibold truncate">{passData.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card !p-3 rounded-xl text-center">
                      <p className="text-xs text-white/60 mb-1">Email</p>
                      <p className="text-xs text-white truncate">{passData.email}</p>
                    </div>
                    <div className="glass-card !p-3 rounded-xl text-center">
                      <p className="text-xs text-white/60 mb-1">Phone</p>
                      <p className="text-xs text-white">{passData.phone}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center py-6 space-y-3 border-y border-white/10">
                  <p className="text-xs text-white/60 uppercase tracking-wide">Scan to Verify</p>
                  <div className="p-4 bg-white rounded-xl shadow-lg shadow-purple-500/50 glow-purple">
                    <QRCode
                      value={`${passData.passId}|${passData.email}`}
                      size={160}
                      level="H"
                      includeMargin={false}
                      fgColor="#000000"
                      bgColor="#ffffff"
                    />
                  </div>
                </div>

                {/* Pass ID */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs text-white/60 uppercase tracking-wide">Pass ID</span>
                  <span className="font-mono text-sm text-cyan-400 font-semibold">{passData.passId}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 h-11 rounded-xl font-semibold bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 border border-cyan-400/30 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 glow-cyan flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button
                    onClick={handleShare}
                    className="flex-1 h-11 rounded-xl font-semibold bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 border border-pink-400/30 text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 glow-pink flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p className="text-center text-white/40 text-sm mt-8">
            Your pass has been generated. Show this at the event entrance.
          </p>
        </div>
      </div>
    </div>
  )
}
