import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FlowingRiver from "@/components/FlowingRiver";
import NLFormDemo from "@/components/NLFormDemo";
import {
  Zap,
  Trophy,
  Users,
  BarChart3,
  Crown,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Code,
  Award,
  Target,
  Shield,
  Brain,
  Rocket,
  Gem,
  Infinity,
  Diamond,
  Layers,
  Lightbulb,
  Palette,
  Play,
  ChevronDown,
  Grid3X3,
  Hexagon,
  Wand2,
  Waves,
  Compass,
  Zap as Lightning,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Quantum Intelligence",
    description: "Experience AI that thinks beyond human limitations, processing infinite possibilities in microseconds to deliver breakthrough insights",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    badge: "Neural∞",
    glow: "bg-violet-500/20",
    premium: true
  },
  {
    icon: Shield,
    title: "Dimensional Security", 
    description: "Multi-dimensional encryption that exists across parallel realities, protecting your innovations with quantum-resistant algorithms",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    badge: "Quantum Shield",
    glow: "bg-emerald-500/20",
    premium: true
  },
  {
    icon: Infinity,
    title: "Infinite Metaverse",
    description: "Deploy across unlimited blockchains simultaneously, creating cross-dimensional experiences that transcend reality",
    gradient: "from-rose-600 via-pink-600 to-fuchsia-600", 
    badge: "Omniverse",
    glow: "bg-rose-500/20",
    premium: true
  },
  {
    icon: Lightning,
    title: "Lightning Velocity",
    description: "Achieve impossible speeds with quantum processing that operates faster than the speed of consciousness itself",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    badge: "Supersonic",
    glow: "bg-amber-500/20"
  },
  {
    icon: Gem,
    title: "Crystal Vision Analytics",
    description: "Peer through the fabric of data itself, revealing hidden patterns and future possibilities with mystical clarity",
    gradient: "from-blue-600 via-indigo-600 to-purple-600", 
    badge: "Prescient",
    glow: "bg-blue-500/20"
  },
  {
    icon: Wand2,
    title: "Reality Weaving Engine",
    description: "Transform impossible dreams into tangible experiences using advanced quantum manipulation technologies",
    gradient: "from-teal-600 via-green-600 to-lime-600",
    badge: "Transcendent", 
    glow: "bg-teal-500/20"
  }
];

const stats = [
  { value: "∞+", label: "Infinite Creators", icon: Users, gradient: "from-violet-600 to-purple-600" },
  { value: "100K+", label: "Reality-Shifting Events", icon: Waves, gradient: "from-cyan-600 to-blue-600" },
  { value: "∞", label: "Boundless Possibilities", icon: Infinity, gradient: "from-rose-600 to-pink-600" },
  { value: "100%", label: "Quantum Reliability", icon: Diamond, gradient: "from-emerald-600 to-teal-600" },
];

const testimonials = [
  {
    quote: "HackHub isn't just a platform—it's a gateway to infinite dimensions. Our team transcended reality and achieved the impossible.",
    author: "Aria Stellar",
    role: "Quantum Reality Architect @ Meta",
    avatar: "AS",
    company: "Meta",
    gradient: "from-violet-600 to-purple-600"
  },
  {
    quote: "The omniverse integration shattered our understanding of what's possible. We're now creating across infinite parallel blockchains.",
    author: "Zion Voidwalker",
    role: "Dimensional Engineer @ Microsoft",
    avatar: "ZV", 
    company: "Microsoft",
    gradient: "from-cyan-600 to-blue-600"
  },
  {
    quote: "This transcends technology—it's pure magic. Every other platform feels like ancient relics from a forgotten age.",
    author: "Luna Transcendence",
    role: "Chief Mystical Officer @ Apple",
    avatar: "LT",
    company: "Apple",
    gradient: "from-rose-600 to-pink-600"
  }
];

const achievements = [
  { icon: Crown, text: "Universe's #1 Reality Platform 2025", gradient: "from-amber-500 to-yellow-500" },
  { icon: Award, text: "Interdimensional Innovation Award", gradient: "from-blue-500 to-cyan-500" },
  { icon: Trophy, text: "Quantum Accelerator Alumni", gradient: "from-purple-500 to-pink-500" },
  { icon: Sparkles, text: "Powers 99% of All Realities", gradient: "from-emerald-500 to-teal-500" }
];

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Magical Flowing River Background */}
      <FlowingRiver />
      
      {/* Hero Section - Transcendent Ultra */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative z-10 text-center space-y-20 max-w-7xl mx-auto">
            
            {/* Mystical Premium Badge */}
            <div className="inline-flex items-center gap-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-2 border-violet-200/60 dark:border-violet-800/60 rounded-full px-12 py-6 shadow-2xl hover:shadow-violet-500/30 transition-all duration-700 group animate-magical-glow">
              <div className="relative">
                <Diamond className="w-8 h-8 text-violet-600 animate-pulse" />
                <div className="absolute inset-0 bg-violet-400 rounded-full blur-lg opacity-40 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Introducing HackHub Quantum ∞
              </span>
              <Badge variant="secondary" className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white border-0 shadow-xl text-lg px-4 py-2">
                Beyond Reality
              </Badge>
            </div>

            {/* Cosmic Hero Title with Massive Spacing */}
            <div className="space-y-16">
              <h1 className="text-7xl lg:text-9xl xl:text-[12rem] font-black tracking-tighter leading-none">
                <span className="block mb-8 bg-gradient-to-r from-slate-900 via-violet-600 to-purple-600 dark:from-white dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent animate-magical-pulse">
                  Transcend
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-magical-pulse">
                  Reality
                </span>
              </h1>
              
              <div className="space-y-12 max-w-6xl mx-auto">
                <p className="text-3xl lg:text-4xl xl:text-5xl text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  Where quantum computing meets infinite creativity
                </p>
                <p className="text-2xl lg:text-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                  The future of reality creation is here
                </p>
              </div>
            </div>

            {/* Quantum Action Buttons with Enhanced Spacing */}
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center pt-20">
              <Button 
                size="lg" 
                className="relative group bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white text-2xl lg:text-3xl px-16 py-10 lg:px-20 lg:py-12 rounded-3xl shadow-2xl hover:shadow-violet-500/60 transition-all duration-700 border-0 overflow-hidden animate-magical-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                <span className="relative z-10 flex items-center gap-6">
                  Begin Transcendence
                  <Rocket className="w-8 h-8 lg:w-10 lg:h-10 group-hover:translate-x-2 group-hover:rotate-12 transition-transform duration-500" />
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-2xl lg:text-3xl px-16 py-10 lg:px-20 lg:py-12 rounded-3xl border-3 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-all duration-500 group backdrop-blur-xl"
              >
                <span className="flex items-center gap-6">
                  <Play className="w-8 h-8 lg:w-10 lg:h-10" />
                  Witness the Magic
                </span>
              </Button>
            </div>

            {/* Trust Indicators with Massive Spacing */}
            <div className="pt-24 space-y-16">
              <p className="text-lg text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase">
                Trusted by the Architects of Tomorrow
              </p>
              <div className="flex flex-wrap justify-center gap-16 opacity-70 hover:opacity-100 transition-opacity duration-500">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-6 group">
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                      <achievement.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-slate-600 dark:text-slate-300">
                      {achievement.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-12 h-12 text-violet-400 opacity-60" />
        </div>
      </section>

      {/* Quantum Features Grid with Enhanced Spacing */}
      <section className="py-48 lg:py-64 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-24 mb-32">
            <Badge variant="secondary" className="text-2xl px-10 py-5 bg-gradient-to-r from-violet-100/80 to-purple-100/80 dark:from-violet-900/80 dark:to-purple-900/80 text-violet-700 dark:text-violet-300 border-2 border-violet-200 dark:border-violet-800 backdrop-blur-xl">
              Quantum Capabilities
            </Badge>
            
            <div className="space-y-16">
              <h2 className="text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
                <span className="block mb-8 bg-gradient-to-r from-slate-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent">
                  Powers Beyond
                </span>
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Imagination
                </span>
              </h2>
              
              <p className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-5xl mx-auto leading-relaxed">
                Each capability operates at the edge of possibility, designed for visionaries who refuse to accept limitations
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-1000 animate-fade-in bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl hover:scale-105 rounded-3xl ${feature.premium ? 'ring-4 ring-violet-200 dark:ring-violet-800 animate-magical-glow' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Premium Glow Effect */}
                {feature.premium && (
                  <div className={`absolute inset-0 ${feature.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                )}
                
                <CardHeader className="space-y-12 relative z-10 p-10">
                  <div className="relative">
                    <div className={`w-28 h-28 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                      <feature.icon className="w-14 h-14 lg:w-16 lg:h-16 text-white" />
                    </div>
                    {feature.premium && (
                      <div className="absolute -top-3 -right-3">
                        <Sparkles className="w-10 h-10 text-violet-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                      <CardTitle className="text-3xl lg:text-4xl font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-500">
                        {feature.title}
                      </CardTitle>
                      {feature.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`text-base font-semibold bg-gradient-to-r ${feature.gradient} text-white border-0 shadow-xl px-4 py-2 self-start`}
                        >
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6 pb-10 px-10 relative z-10">
                  <CardDescription className="text-xl lg:text-2xl leading-relaxed text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmic Stats with Enhanced Spacing */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-24">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-12 group">
                <div className={`w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 animate-magical-glow`}>
                  <stat.icon className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                </div>
                <div className={`text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Language Magic Section with Enhanced Spacing */}
      <section className="py-48 lg:py-64 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-24 max-w-6xl mx-auto mb-32">
            <Badge variant="secondary" className="text-2xl px-10 py-5 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 dark:from-emerald-900/80 dark:to-teal-900/80 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-200 dark:border-emerald-800 backdrop-blur-xl">
              Conversational Reality
            </Badge>
            
            <div className="space-y-16">
              <h2 className="text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
                <span className="block mb-8 bg-gradient-to-r from-slate-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent">
                  Speak Your Vision
                </span>
                <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Into Existence
                </span>
              </h2>
              
              <p className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-5xl mx-auto">
                Transform thoughts into structured reality. Our quantum AI understands intent, 
                emotion, and context better than human translators
              </p>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Enhanced Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-3xl animate-magical-pulse" />
              
              <Card className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-emerald-200/60 dark:border-emerald-800/60 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-700 overflow-hidden rounded-3xl animate-magical-glow">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                
                <CardContent className="p-16 lg:p-20 space-y-12">
                  <div className="flex items-center gap-8 mb-12">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl animate-magical-pulse">
                      <Lightbulb className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                      Quantum Parser Technology
                    </h3>
                  </div>
                  
                  <div className="py-8">
                    <NLFormDemo />
                  </div>
                  
                  <p className="text-lg text-slate-500 dark:text-slate-400 text-center">
                    Powered by neural networks trained on infinite human conversations across all realities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Transcendent Testimonials with Enhanced Spacing */}
      <section className="py-48 lg:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/60 to-transparent dark:via-slate-900/60" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-24 mb-32">
            <Badge variant="secondary" className="text-2xl px-10 py-5 bg-gradient-to-r from-rose-100/80 to-pink-100/80 dark:from-rose-900/80 dark:to-pink-900/80 text-rose-700 dark:text-rose-300 border-2 border-rose-200 dark:border-rose-800 backdrop-blur-xl">
              Testimonials from the Future
            </Badge>
            
            <div className="space-y-16">
              <h2 className="text-6xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none">
                <span className="block mb-8 bg-gradient-to-r from-slate-900 to-rose-600 dark:from-white dark:to-rose-400 bg-clip-text text-transparent">
                  Legendary Voices
                </span>
                <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Epic Results
                </span>
              </h2>
              
              <p className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-5xl mx-auto leading-relaxed">
                Industry titans who've experienced what's possible when imagination meets infinite possibility
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 lg:gap-20">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group hover:scale-105 transition-all duration-1000 animate-scale-in bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-0 shadow-2xl hover:shadow-3xl overflow-hidden rounded-3xl animate-magical-glow" 
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${testimonial.gradient}`} />
                
                <CardContent className="p-12 lg:p-16 space-y-12">
                  <div className="flex items-center gap-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl lg:text-2xl italic leading-relaxed text-slate-700 dark:text-slate-300">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-8 pt-8">
                    <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-xl lg:text-2xl shadow-2xl`}>
                      {testimonial.avatar}
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-xl lg:text-2xl text-slate-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-lg text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                      <div className={`text-base font-semibold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section with Enhanced Spacing */}
      <section className="py-48 lg:py-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-purple-600/15 to-pink-600/15" />
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto text-center space-y-24">
            <div className="space-y-20">
              <h2 className="text-7xl lg:text-9xl xl:text-[12rem] font-black tracking-tight leading-none">
                <span className="block mb-12 bg-gradient-to-r from-slate-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent animate-magical-pulse">
                  Ready to
                </span>
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-magical-pulse">
                  Transcend?
                </span>
              </h2>
              
              <div className="space-y-12 max-w-6xl mx-auto">
                <p className="text-3xl lg:text-4xl xl:text-5xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  Join the visionaries, dreamers, and reality-shapers who refuse to accept the impossible
                </p>
                <p className="text-2xl lg:text-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  Your legend starts here
                </p>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center pt-20">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="relative group bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white text-3xl lg:text-4xl px-20 py-12 lg:px-24 lg:py-16 rounded-3xl shadow-2xl hover:shadow-violet-500/60 transition-all duration-700 border-0 overflow-hidden animate-magical-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                  <span className="relative z-10 flex items-center gap-8">
                    Begin Your Ascension
                    <Rocket className="w-12 h-12 lg:w-16 lg:h-16 group-hover:translate-x-3 group-hover:rotate-12 transition-transform duration-700" />
                  </span>
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-3xl lg:text-4xl px-20 py-12 lg:px-24 lg:py-16 rounded-3xl border-4 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-all duration-700 group backdrop-blur-2xl"
              >
                <span className="flex items-center gap-8">
                  <Play className="w-12 h-12 lg:w-16 lg:h-16" />
                  Experience the Demo
                </span>
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 pt-24 text-xl lg:text-2xl text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
                <span>Instant quantum access</span>
              </div>
              <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full" />
              <div className="flex items-center gap-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
                <span>No limits, ever</span>
              </div>
              <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full" />
              <div className="flex items-center gap-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
                <span>Join the transcended</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
