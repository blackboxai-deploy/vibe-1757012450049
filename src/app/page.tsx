"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Navigation } from "@/components/navigation";
import { AuthModal } from "@/components/auth-modal";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { StatsSection } from "@/components/stats-section";

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <DashboardView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation onAuthClick={() => setIsAuthOpen(true)} />
      <HeroSection onGetStarted={() => setIsAuthOpen(true)} />
      <FeaturesSection />
      <StatsSection />
      <AuthModal 
        open={isAuthOpen} 
        onOpenChange={setIsAuthOpen}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}

function DashboardView() {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    credits: 7500,
    skillsOffered: ["JavaScript", "React", "Node.js"],
    skillsLearning: ["Python", "Machine Learning"],
    completedSessions: 15,
    rating: 4.8,
    certifications: 8
  });

  const [activeProposals] = useState([
    {
      id: 1,
      skill: "Python Fundamentals",
      partner: "Sarah Chen",
      mySkill: "React Development",
      status: "pending",
      proposedDate: "2024-01-15"
    },
    {
      id: 2,
      skill: "Machine Learning Basics",
      partner: "Michael Rodriguez",
      mySkill: "JavaScript",
      status: "accepted",
      proposedDate: "2024-01-18"
    }
  ]);

  const creditProgress = (user.credits / 10000) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isLoggedIn />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Ready to learn something new or share your expertise?
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Credits</CardTitle>
              <div className="text-2xl font-bold text-green-600">
                {user.credits.toLocaleString()}
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={creditProgress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor((10000 - user.credits) / 1000)} sessions to ₹1000
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <div className="text-2xl font-bold text-blue-600">
                {user.rating} ⭐
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                Based on {user.completedSessions} sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <div className="text-2xl font-bold text-purple-600">
                {user.certifications}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Skills verified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sessions</CardTitle>
              <div className="text-2xl font-bold text-orange-600">
                {user.completedSessions}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">Completed successfully</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="barters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="barters">Active Barters</TabsTrigger>
            <TabsTrigger value="skills">My Skills</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="tests">Take Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="barters" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Barter Proposals</h2>
              <Button>New Proposal</Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {activeProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{proposal.skill}</CardTitle>
                        <CardDescription>with {proposal.partner}</CardDescription>
                      </div>
                      <Badge variant={proposal.status === "accepted" ? "default" : "secondary"}>
                        {proposal.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">You teach:</span> {proposal.mySkill}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Proposed date:</span> {proposal.proposedDate}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {proposal.status === "pending" && (
                        <Button variant="outline" size="sm">View Details</Button>
                      )}
                      {proposal.status === "accepted" && (
                        <Button size="sm">Start Session</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Skills</h2>
              <Button>Add New Skill</Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills I Can Teach</CardTitle>
                  <CardDescription>Verified skills available for bartering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.skillsOffered.map((skill, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="font-medium">{skill}</span>
                        <Badge variant="outline" className="text-green-600">Certified</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills I Want to Learn</CardTitle>
                  <CardDescription>Skills you're interested in acquiring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.skillsLearning.map((skill, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="font-medium">{skill}</span>
                        <Badge variant="secondary">Seeking</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Skill Marketplace</h2>
              <Button variant="outline">Filter Skills</Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {["Web Development", "Data Science", "Graphic Design", "Photography", "Music Production", "Digital Marketing"].map((skill, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{skill}</CardTitle>
                    <CardDescription>15 teachers available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Avg. Rating: 4.7 ⭐
                      </div>
                      <Button variant="outline" size="sm">
                        View Teachers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Skill Certification Tests</h2>
              <div className="text-sm text-gray-600">
                80% score required to pass
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {["Python Fundamentals", "React Development", "UI/UX Design", "Project Management"].map((test, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{test}</CardTitle>
                    <CardDescription>
                      20 questions • 30 minutes • Multiple attempts allowed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm">
                        <div className="font-medium mb-1">Previous Attempts:</div>
                        <div className="text-gray-600">
                          {index === 0 ? "Best Score: 76% (Failed)" : "Not attempted yet"}
                        </div>
                      </div>
                      <Button className="w-full">
                        {index === 0 ? "Retake Test" : "Start Test"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}