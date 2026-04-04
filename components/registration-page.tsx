'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function RegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store registration data and redirect to pass page
    sessionStorage.setItem('registration', JSON.stringify({
      ...formData,
      passId: `PASS-${Date.now()}`,
    }))
    
    setIsLoading(false)
    router.push('/pass')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen gradient-animate relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl float animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl float animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <nav className="relative z-20 flex items-center px-6 py-6 md:px-12">
        <Link href="/">
          <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </Link>
      </nav>

      {/* Registration Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="glass-card rounded-3xl border border-purple-500/30 glow-purple">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Create Your Pass</h2>
              <p className="text-white/60">Fill in your details to register</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-purple-500/50 focus:glow-border transition-all duration-300 h-11"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-purple-500/50 focus:glow-border transition-all duration-300 h-11"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-purple-500/50 focus:glow-border transition-all duration-300 h-11"
                />
              </div>

              {/* Event Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Select Event</label>
                <Select value={formData.event} onValueChange={(value) => setFormData(prev => ({ ...prev, event: value }))}>
                  <SelectTrigger className="bg-white/5 border-white/10 rounded-xl text-white h-11">
                    <SelectValue placeholder="Choose an event..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-white/10">
                    <SelectItem value="tech-summit-2024">Tech Summit 2024</SelectItem>
                    <SelectItem value="web3-conf">Web3 Conference</SelectItem>
                    <SelectItem value="ai-expo">AI Expo</SelectItem>
                    <SelectItem value="startup-pitch">Startup Pitch Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.event}
                className="w-full h-12 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border border-purple-400/30 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed glow-purple"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Generate My Pass'
                )}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-white/40 text-sm mt-6">
              Already have a pass? <a href="/admin" className="text-purple-400 hover:text-purple-300 transition-colors">Verify here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
