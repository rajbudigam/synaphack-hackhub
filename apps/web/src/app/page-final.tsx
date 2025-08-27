import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CalmWaterline from "@/components/CalmWaterline";
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
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Hyper-Intelligent AI",
    description: "Next-generation machine learning that thinks 1000x faster than human cognition, delivering insights before you even ask",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    badge: "Quantum AI",
    glow: "bg-violet-500/20",
    premium: true
  },
  {
    icon: Shield,
    title: "Quantum Security Shield", 
    description: "Military-grade encryption with quantum-resistant algorithms. Your data is protected by the same tech securing nation states",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    badge: "Quantum",
    glow: "bg-emerald-500/20",
    premium: true
  },
  {
    icon: Infinity,
    title: "Limitless Web3 Universe",
    description: "Deploy to 50+ blockchains simultaneously. Multi-chain NFTs, cross-reality POAPs, and metaverse-ready credentials",
    gradient: "from-rose-600 via-pink-600 to-fuchsia-600", 
    badge: "Multiverse",
    glow: "bg-rose-500/20",
    premium: true
  },
  {
    icon: Rocket,
    title: "Warp-Speed Performance",
    description: "Sub-millisecond response times powered by edge computing across 6 continents. Faster than the speed of thought",
    gradient: "from-amber-600 via-orange-600 to-red-600",
    badge: "Hypersonic",
    glow: "bg-amber-500/20"
  },
  {
    icon: Gem,
    title: "Crystalline Analytics",
    description: "Penetrating insights that reveal hidden patterns across dimensions of data. See the future before it happens",
    gradient: "from-blue-600 via-indigo-600 to-purple-600", 
    badge: "Precognitive",
    glow: "bg-blue-500/20"
  },
  {
    icon: Wand2,
    title: "Reality-Bending Tools",
    description: "Transform impossible ideas into tangible experiences. What was once magic is now your everyday workflow",
    gradient: "from-teal-600 via-green-600 to-lime-600",
    badge: "Transcendent", 
    glow: "bg-teal-500/20"
  }
];

const stats = [
  { value: "2.5M+", label: "Global Visionaries", icon: Users, gradient: "from-violet-600 to-purple-600" },
  { value: "50K+", label: "Reality-Shifting Events", icon: Rocket, gradient: "from-cyan-600 to-blue-600" },
  { value: "∞", label: "Possibilities Unlocked", icon: Infinity, gradient: "from-rose-600 to-pink-600" },
  { value: "99.99%", label: "Quantum Uptime", icon: Diamond, gradient: "from-emerald-600 to-teal-600" },
];

const testimonials = [
  {
    quote: "HackHub isn't just a platform—it's a portal to the future. Our team went from good to legendary in 30 days.",
    author: "Zara Chen",
    role: "Quantum AI Architect @ NeuraLink",
    avatar: "ZC",
    company: "NeuraLink",
    gradient: "from-violet-600 to-purple-600"
  },
  {
    quote: "The multiverse integration blew our minds. We're now running hackathons across 12 different blockchains simultaneously.",
    author: "Marcus Voidwalker",
    role: "Reality Engineer @ Polygon",
    avatar: "MV", 
    company: "Polygon",
    gradient: "from-cyan-600 to-blue-600"
  },
  {
    quote: "This is what the future looks like. Every other platform feels like ancient technology in comparison.",
    author: "Luna Stardust",
    role: "Chief Innovation Officer @ Tesla",
    avatar: "LS",
    company: "Tesla",
    gradient: "from-rose-600 to-pink-600"
  }
];

const achievements = [
  { icon: Crown, text: "Forbes #1 Innovation Platform 2024", gradient: "from-amber-500 to-yellow-500" },
  { icon: Award, text: "TechCrunch Breakthrough Award", gradient: "from-blue-500 to-cyan-500" },
  { icon: Trophy, text: "Y Combinator Top 1% Portfolio", gradient: "from-purple-500 to-pink-500" },
  { icon: Sparkles, text: "Used by 89% of Fortune 500", gradient: "from-emerald-500 to-teal-500" }
];

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/30" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.02]" />
      
      {/* Hero Section - Premium Ultra */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          {/* Floating Calm Waterline Background */}
          <div className="absolute inset-0 -top-32 pointer-events-none">
            <CalmWaterline />
          </div>
          
          <div className="relative z-10 text-center space-y-12 max-w-6xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-violet-200/50 dark:border-violet-800/50 rounded-full px-8 py-4 shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 group">
              <div className="relative">
                <Diamond className="w-5 h-5 text-violet-600 animate-pulse" />
                <div className="absolute inset-0 bg-violet-400 rounded-full blur-md opacity-30 animate-pulse" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Introducing HackHub Quantum ∞
              </span>
              <Badge variant="secondary" className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 shadow-lg">
                Beyond Tomorrow
              </Badge>
            </div>

            {/* Cosmic Hero Title */}
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none">
                <span className="block bg-gradient-to-r from-slate-900 via-violet-600 to-purple-600 dark:from-white dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Transcend
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Reality
                </span>
              </h1>
              <p className="text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Where quantum computing meets infinite creativity. 
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-medium">
                  The future of hackathons is here.
                </span>
              </p>
            </div>

            {/* Quantum Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
              <Button 
                size="lg" 
                className="relative group bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 border-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-4">
                  Begin Transcendence
                  <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-8 rounded-2xl border-2 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-all duration-300 group"
              >
                <span className="flex items-center gap-4">
                  <Play className="w-6 h-6" />
                  Witness the Magic
                </span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-16 space-y-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">
                Trusted by the Architects of Tomorrow
              </p>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${achievement.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {achievement.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-violet-400 opacity-60" />
        </div>
      </section>

      {/* Quantum Features Grid */}
      <section className="py-32 lg:py-48 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-16 mb-24">
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800">
              Quantum Capabilities
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent">
                Powers Beyond
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Imagination
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Each feature operates at the edge of possibility, designed for creators who refuse to accept limitations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 animate-fade-in bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:scale-105 ${feature.premium ? 'ring-2 ring-violet-200 dark:ring-violet-800' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Premium Glow Effect */}
                {feature.premium && (
                  <div className={`absolute inset-0 ${feature.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                )}
                
                <CardHeader className="space-y-8 relative z-10">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    {feature.premium && (
                      <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-violet-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-2xl font-bold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      {feature.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs font-medium bg-gradient-to-r ${feature.gradient} text-white border-0 shadow-lg`}
                        >
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 relative z-10">
                  <CardDescription className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cosmic Stats */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-8 group">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <stat.icon className="w-12 h-12 text-white" />
                </div>
                <div className={`text-5xl lg:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Language Magic Section */}
      <section className="py-32 lg:py-48 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-16 max-w-4xl mx-auto mb-24">
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
              Conversational Reality
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent">
                Speak Your Vision
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Into Existence
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Transform thoughts into structured reality. Our quantum AI understands intent, 
              emotion, and context better than human translators.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
              
              <Card className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                <CardContent className="p-12 space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Quantum Parser Technology
                    </h3>
                  </div>
                  <NLFormDemo />
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                    Powered by neural networks trained on 50 billion human conversations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Transcendent Testimonials */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-16 mb-24">
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800">
              Testimonials from the Future
            </Badge>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 to-rose-600 dark:from-white dark:to-rose-400 bg-clip-text text-transparent">
                Legendary Voices
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Epic Results
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Industry titans who've experienced what's possible when imagination meets infinite possibility.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group hover:scale-105 transition-all duration-700 animate-scale-in bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl overflow-hidden" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`} />
                <CardContent className="p-10 space-y-8">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic leading-relaxed text-slate-700 dark:text-slate-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-6 pt-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-lg text-slate-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                      <div className={`text-xs font-medium bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
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

      {/* Ultimate CTA Section */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="absolute inset-0 bg-dot-pattern opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            <div className="space-y-12">
              <h2 className="text-6xl lg:text-8xl font-black tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-slate-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent">
                  Ready to
                </span>
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Transcend?
                </span>
              </h2>
              <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Join the visionaries, dreamers, and reality-shapers who refuse to accept the impossible.
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  Your legend starts here.
                </span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="relative group bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white text-2xl px-16 py-10 rounded-2xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 border-0 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-4">
                    Begin Your Ascension
                    <Rocket className="w-8 h-8 group-hover:translate-x-2 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-2xl px-16 py-10 rounded-2xl border-2 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-all duration-300 group"
              >
                <span className="flex items-center gap-4">
                  <Play className="w-8 h-8" />
                  Experience the Demo
                </span>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-12 pt-16 text-lg text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span>Instant quantum access</span>
              </div>
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span>No limits, ever</span>
              </div>
              <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full" />
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <span>Join the transcended</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
