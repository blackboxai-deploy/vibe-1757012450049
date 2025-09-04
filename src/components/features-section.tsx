"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturesSection() {
  const features = [
    {
      title: "Skill Verification System",
      description: "Take standardized tests with 80% pass rate to verify your expertise and start teaching",
      icon: "🎯",
      highlight: "80% Pass Rate Required"
    },
    {
      title: "Video Learning Sessions",
      description: "Interactive video sessions with session recording and progress tracking",
      icon: "📹",
      highlight: "HD Quality Sessions"
    },
    {
      title: "Credit Economy",
      description: "Earn 1000 credits per session, convert 10,000 credits to ₹1000 real money",
      icon: "⚡",
      highlight: "Real Cash Conversion"
    },
    {
      title: "AI-Powered Matching",
      description: "Smart algorithms find the perfect skill exchange partners based on your needs",
      icon: "🤖",
      highlight: "Intelligent Pairing"
    },
    {
      title: "Progress Analytics",
      description: "Detailed insights into your learning journey and teaching effectiveness",
      icon: "📊",
      highlight: "Performance Insights"
    },
    {
      title: "Community Ratings",
      description: "Transparent rating system ensures quality teachers and engaged learners",
      icon: "⭐",
      highlight: "Trust & Quality"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-purple-600 border-purple-200">
            ✨ Platform Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need for
            <span className="block text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Successful Skill Exchange
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all tools needed for effective skill bartering and learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-4xl">{feature.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Skill Journey?</h3>
            <p className="text-gray-600 mb-6">
              Join our growing community of learners and teachers making education accessible and rewarding
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>✓ Free registration</span>
                <span>✓ No hidden fees</span>
                <span>✓ Instant matching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}