"use client"

import { Card, CardContent } from "@/components/ui/card";

export function StatsSection() {
  const stats = [
    {
      number: "25,000+",
      label: "Active Learners",
      description: "Growing community of skill seekers"
    },
    {
      number: "15,000+",
      label: "Verified Teachers",
      description: "Expert instructors with 80%+ test scores"
    },
    {
      number: "₹50L+",
      label: "Credits Converted",
      description: "Real money earned by our community"
    },
    {
      number: "100,000+",
      label: "Skills Exchanged",
      description: "Successful learning sessions completed"
    },
    {
      number: "4.9/5",
      label: "Average Rating",
      description: "User satisfaction score"
    },
    {
      number: "200+",
      label: "Skill Categories",
      description: "From tech to creative arts"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Thousands of 
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Learners & Teachers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See the impact we're making in the global learning community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1 text-sm md:text-base">
                  {stat.label}
                </div>
                <div className="text-gray-400 text-xs md:text-sm">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  name: "Priya Sharma",
                  skill: "Learned Python",
                  taught: "Digital Marketing",
                  earnings: "₹15,000",
                  quote: "Exchanged my marketing skills for Python knowledge and earned real money!"
                },
                {
                  name: "Rahul Gupta",
                  skill: "Learned Guitar",
                  taught: "Web Development",
                  earnings: "₹12,500",
                  quote: "Perfect platform to monetize my coding skills while learning music."
                },
                {
                  name: "Anita Patel",
                  skill: "Learned Photography",
                  taught: "Graphic Design",
                  earnings: "₹18,000",
                  quote: "Found amazing photography mentors and made good money teaching design."
                }
              ].map((story, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4 text-left">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{story.name}</div>
                      <div className="text-green-400 text-xs">{story.earnings} earned</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic mb-2">"{story.quote}"</p>
                  <div className="text-xs text-gray-400">
                    Learned {story.skill} • Taught {story.taught}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}