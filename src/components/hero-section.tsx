"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 text-blue-600 border-blue-200">
            🚀 Revolutionary Skill Exchange Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Exchange Skills,
            <br />
            Earn Credits,
            <br />
            Grow Together
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners and teachers in our skill bartering ecosystem. 
            Share what you know, learn what you need, and build a sustainable income stream.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={onGetStarted} className="px-8">
              Start Skill Bartering
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Watch How It Works
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">📚</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn & Teach</h3>
                <p className="text-gray-600">
                  Exchange skills with verified experts. Pass our 80% skill tests to start teaching.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">💰</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Credits</h3>
                <p className="text-gray-600">
                  Gain 1000 credits per session. Convert 10,000 credits to ₹1000 cash.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🤝</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                <p className="text-gray-600">
                  AI-powered system finds perfect skill exchange partners for mutual growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}