import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Trophy, 
  Users, 
  Shield, 
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
  Waves,
  Layers,
  Cpu,
  Brain,
  Rocket,
  Infinity
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time collaboration with instant updates and zero-latency interactions",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    glow: "shadow-amber-500/20"
  },
  {
    icon: Shield,
    title: "AI-Powered Security",
    description: "Advanced plagiarism detection using machine learning and content analysis",
    gradient: "from-purple-400 via-pink-500 to-red-500",
    badge: "AI",
    glow: "shadow-purple-500/20"
  },
  {
    icon: Crown,
    title: "Web3 Integration",
    description: "Blockchain-based achievements with NFT certificates and POAP rewards",
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    badge: "Web3",
    glow: "shadow-blue-500/20"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive insights with predictive analytics and performance metrics",
    gradient: "from-emerald-400 via-cyan-500 to-blue-500",
    badge: "Pro",
    glow: "shadow-emerald-500/20"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless team management with integrated chat and project tracking",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Trophy,
    title: "Live Leaderboards",
    description: "Dynamic rankings with real-time scoring and achievement tracking",
    gradient: "from-red-500 to-pink-500",
    badge: "Live"
  }
];

const stats = [
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "1.2K+", label: "Hackathons", icon: Code },
  { value: "25K+", label: "Projects", icon: Target },
  { value: "99.9%", label: "Uptime", icon: TrendingUp },
];

const testimonials = [
  {
    quote: "SynapHack transformed our hackathon experience. The AI plagiarism detection is game-changing.",
    author: "Sarah Chen",
    role: "Lead Organizer @ TechCorp",
    avatar: "SC"
  },
  {
    quote: "The Web3 integration and POAP system created an amazing engagement boost for participants.",
    author: "Marcus Rodriguez",
    role: "Community Manager @ DevDAO",
    avatar: "MR"
  },
  {
    quote: "Best hackathon platform we've used. The analytics insights helped us improve every event.",
    author: "Emily Watson",
    role: "Event Director @ InnovateLab",
    avatar: "EW"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Organic Fluid Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        {/* Animated Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* River-like Flowing Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <path d="M0,500 Q250,300 500,500 T1000,500" stroke="url(#gradient1)" strokeWidth="2" fill="none" className="animate-pulse">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" 
              values="M0,500 Q250,300 500,500 T1000,500;M0,500 Q250,700 500,500 T1000,500;M0,500 Q250,300 500,500 T1000,500"/>
          </path>
          <path d="M0,300 Q500,100 1000,300" stroke="url(#gradient2)" strokeWidth="1" fill="none" className="animate-pulse delay-500">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" 
              values="M0,300 Q500,100 1000,300;M0,300 Q500,500 1000,300;M0,300 Q500,100 1000,300"/>
          </path>
          <path d="M0,700 Q500,900 1000,700" stroke="url(#gradient3)" strokeWidth="1" fill="none" className="animate-pulse delay-1000">
            <animate attributeName="d" dur="12s" repeatCount="indefinite" 
              values="M0,700 Q500,900 1000,700;M0,700 Q500,500 1000,700;M0,700 Q500,900 1000,700"/>
          </path>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(168 85 247)" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="rgb(236 72 153)" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="rgb(168 85 247)" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section with Organic Design */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto text-center space-y-12 max-w-6xl">
          
          {/* Floating Badge with Entropy Effect */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl scale-150 animate-pulse"></div>
            <div className="relative inline-flex items-center gap-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/90">Introducing SynapHack 3.0</span>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                Revolutionary
              </Badge>
            </div>
          </div>
          
          {/* Main Headline with Liquid Typography */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-white leading-none">
              <span className="block">The </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse bg-300% bg-gradient-x">
                Future
              </span>
              <span className="block">of Hackathons</span>
            </h1>
            
            <div className="relative">
              <p className="text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
                Where innovation flows like rivers through digital landscapes. Experience hackathons 
                reimagined with AI consciousness, Web3 reality, and organic collaboration.
              </p>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg blur-sm"></div>
            </div>
          </div>
          
          {/* Organic CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
              <Button size="lg" className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl px-8 py-6 text-lg font-semibold transform transition-all duration-300 hover:scale-105">
                <Rocket className="w-5 h-5 mr-2" />
                Launch Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-sm"></div>
              <Button variant="outline" size="lg" className="relative bg-black/20 backdrop-blur-xl border-white/20 text-white hover:bg-black/30 rounded-2xl px-8 py-6 text-lg font-semibold transform transition-all duration-300 hover:scale-105">
                <Brain className="w-5 h-5 mr-2" />
                Experience Demo
              </Button>
            </div>
          </div>
          
          {/* Floating Stats with Organic Shapes */}
          <div className="pt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center transform transition-all duration-300 hover:scale-105">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mx-auto animate-bounce"></div>
          </div>
        </div>
      </section>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">50+ Countries</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="text-sm px-3 py-1">Features</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Everything You Need to{" "}
              <span className="text-gradient-primary">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to elevate your hackathon experience from start to finish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover-lift card-gradient border-gradient animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="text-sm px-3 py-1">Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Loved by{" "}
              <span className="text-gradient-primary">Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what hackathon organizers and participants are saying about SynapHack.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift card-glass animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-base italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold">
                Ready to{" "}
                <span className="text-gradient-primary">Transform</span>{" "}
                Your Hackathons?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of organizers who trust SynapHack to deliver exceptional hackathon experiences.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/dashboard">
                <Button size="lg" className="btn-gradient text-lg px-10 py-6 group">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 hover-lift">
                Schedule Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}