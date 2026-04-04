'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Check, X } from 'lucide-react'
import Link from 'next/link'

interface VerificationResult {
  valid: boolean
  message: string
  details?: {
    name: string
    email: string
    event: string
  }
}

export function AdminPanel() {
  const [passId, setPassId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Mock verification logic
    if (passId.startsWith('PASS-')) {
      setResult({
        valid: true,
        message: 'Pass Verified Successfully',
        details: {
          name: 'John Doe',
          email: 'john@example.com',
          event: 'Tech Summit 2024',
        },
      })
    } else {
      setResult({
        valid: false,
        message: 'Invalid or Expired Pass',
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen gradient-animate relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl float animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl float animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <nav className="relative z-20 flex items-center gap-4 px-6 py-6 md:px-12">
        <Link href="/">
          <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            Admin Panel
          </h1>
          <p className="text-xs text-white/60">Pass Verification System</p>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="w-full max-w-2xl">
          <div className="glass-card rounded-3xl border border-cyan-500/30 glow-cyan">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Verify Passes</h2>
              <p className="text-white/60">Enter a pass ID to verify attendance</p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-6 mb-8">
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/80">Pass ID</label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Enter pass ID (e.g., PASS-1234567890)"
                    value={passId}
                    onChange={(e) => setPassId(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-cyan-500/50 transition-all duration-300 flex-1 h-12"
                  />
                  <Button
                    type="submit"
                    disabled={!passId || isLoading}
                    className="h-12 px-6 rounded-xl font-semibold bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 border border-cyan-400/30 text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed glow-cyan"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {/* Results */}
            {result && (
              <div className={`p-6 rounded-2xl border-2 transition-all duration-500 animate-in fade-in ${
                result.valid
                  ? 'bg-green-500/10 border-green-500/50 glow-border'
                  : 'bg-red-500/10 border-red-500/50 glow-border'
              }`}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    result.valid
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                  }`}>
                    {result.valid ? (
                      <Check className="w-6 h-6 text-green-400" />
                    ) : (
                      <X className="w-6 h-6 text-red-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${
                      result.valid ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.message}
                    </h3>

                    {result.valid && result.details && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Attendee</p>
                          <p className="text-white font-semibold">{result.details.name}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Email</p>
                          <p className="text-white font-semibold text-sm">{result.details.email}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Event</p>
                          <p className="text-white font-semibold text-sm">{result.details.event}</p>
                        </div>
                      </div>
                    )}

                    {!result.valid && (
                      <p className="text-white/70 text-sm">
                        Please check the pass ID and try again. Contact support if the issue persists.
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    setResult(null)
                    setPassId('')
                  }}
                  className="mt-4 w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors border border-white/10"
                >
                  Verify Another Pass
                </button>
              </div>
            )}

            {/* Info Cards */}
            {!result && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card !p-4 rounded-xl border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Quick Tips</h4>
                  <ul className="space-y-1 text-xs text-white/60">
                    <li>• Pass IDs start with &apos;PASS-&apos;</li>
                    <li>• Each pass is unique per attendee</li>
                    <li>• Verification is instant</li>
                  </ul>
                </div>
                <div className="glass-card !p-4 rounded-xl border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Statistics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-cyan-400 font-bold text-lg">1,247</p>
                      <p className="text-white/60">Verified Today</p>
                    </div>
                    <div>
                      <p className="text-pink-400 font-bold text-lg">98.5%</p>
                      <p className="text-white/60">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
