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
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time collaboration with instant updates and zero-latency interactions",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "AI-Powered Security",
    description: "Advanced plagiarism detection using machine learning and content analysis",
    gradient: "from-purple-500 to-pink-500",
    badge: "AI"
  },
  {
    icon: Crown,
    title: "Web3 Integration",
    description: "Blockchain-based achievements with NFT certificates and POAP rewards",
    gradient: "from-blue-500 to-cyan-500",
    badge: "Web3"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive insights with predictive analytics and performance metrics",
    gradient: "from-green-500 to-emerald-500",
    badge: "Pro"
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
  quote: "HackHub transformed our hackathon experience. The AI plagiarism detection is game-changing.",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <CalmWaterline />
        </div>
        <div className="container mx-auto px-4 pb-24">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-full px-6 py-3 shadow-lg">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Introducing HackHub 3.0</span>
              <Badge variant="secondary" className="text-xs">New</Badge>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
              The Future of <span className="text-gradient-primary">Hackathons</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI-native, Web3-enabled, and calm by design.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Button size="lg" className="btn-gradient text-lg px-10 py-6 group">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 hover-lift">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 lg:py-56">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-12 mb-32">
            <Badge variant="secondary" className="text-sm px-4 py-2">Features</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-16 mb-12">
              Everything You Need to{" "}
              <span className="text-gradient-primary">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to elevate your hackathon experience from start to finish.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {features.map((feature, index) => (
              <Card key={index} className="group hover-lift card-gradient border-gradient animate-fade-in card-spacing-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="space-y-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-3">
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
                <CardContent className="pt-4">
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
      <section className="py-48 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-8 group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gradient-primary">
                  {stat.value}
                </div>
                <div className="text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NL One-Box demo section: feel the magic */}
      <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-10 max-w-3xl mx-auto">
            <Badge variant="secondary" className="text-sm px-4 py-2">Create in Natural Language</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">Tell us, we’ll structure it</h2>
            <p className="text-lg text-muted-foreground">Replace forms with a sentence. We parse the rest.</p>
          </div>
          <div className="max-w-3xl mx-auto mt-16 card-gradient border-gradient rounded-3xl p-8">
            <NLFormDemo />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-40 lg:py-56">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-12 mb-32">
            <Badge variant="secondary" className="text-sm px-4 py-2">Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mt-16 mb-12">
              Loved by{" "}
              <span className="text-gradient-primary">Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what hackathon organizers and participants are saying about HackHub.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift card-glass animate-scale-in card-spacing-lg" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8 space-y-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold text-sm">
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
                Join thousands of organizers who trust HackHub to deliver exceptional hackathon experiences.
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