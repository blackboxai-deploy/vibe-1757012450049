"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function SkillTestPage() {
  const params = useParams();
  const router = useRouter();
  const skill = Array.isArray(params.skill) ? params.skill[0] : params.skill;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Sample questions - in real app this would come from API
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: "What is the main advantage of using React hooks over class components?",
      options: [
        "Better performance in all cases",
        "Simpler state management and lifecycle handling",
        "Automatic memory management", 
        "Built-in error boundaries"
      ],
      correctAnswer: 1,
      explanation: "React hooks provide a simpler way to manage state and lifecycle methods without the complexity of class components."
    },
    {
      id: 2,
      question: "Which hook is used for performing side effects in functional components?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctAnswer: 1,
      explanation: "useEffect is the hook designed for side effects like API calls, subscriptions, and DOM manipulation."
    },
    {
      id: 3,
      question: "What does the dependency array in useEffect control?",
      options: [
        "The number of times the component renders",
        "When the effect runs based on state changes",
        "The order of hooks execution",
        "The component's props validation"
      ],
      correctAnswer: 1,
      explanation: "The dependency array determines when useEffect runs by comparing the current values with previous values."
    },
    {
      id: 4,
      question: "How do you prevent infinite loops in useEffect?",
      options: [
        "Use setTimeout inside useEffect",
        "Provide proper dependencies or empty array",
        "Use useCallback for all functions",
        "Always use async/await"
      ],
      correctAnswer: 1,
      explanation: "Proper dependency management prevents useEffect from running on every render, avoiding infinite loops."
    },
    {
      id: 5,
      question: "What is the purpose of the key prop in React lists?",
      options: [
        "To style list items",
        "To help React identify which items have changed",
        "To sort the list items",
        "To validate list data"
      ],
      correctAnswer: 1,
      explanation: "The key prop helps React efficiently update the DOM by identifying which list items have changed, been added, or removed."
    }
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !testCompleted) {
      handleSubmitTest();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, testStarted, testCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerChange = (questionId: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitTest = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = (correctAnswers / questions.length) * 100;
    setScore(Math.round(finalScore));
    setTestCompleted(true);
  };

  const progress = testStarted ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const isPassed = score >= 80;

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation isLoggedIn />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {skill?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Certification Test
              </CardTitle>
              <div className="space-y-4 mt-4">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  80% Score Required to Pass
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-sm text-blue-800">Questions</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">30</div>
                  <div className="text-sm text-green-800">Minutes</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Test Instructions:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Answer all {questions.length} questions within 30 minutes</li>
                  <li>• You need to score at least 80% to pass and get certified</li>
                  <li>• You can retake the test if you don't pass</li>
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• Review your answers before submitting</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleStartTest} className="flex-1">
                  Start Test
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation isLoggedIn />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Test Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                  {score}%
                </div>
                <Badge variant={isPassed ? "default" : "destructive"} className="text-lg px-4 py-2 mt-4">
                  {isPassed ? "✅ Passed - Certified!" : "❌ Failed - Try Again"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold">{Object.keys(answers).length}</div>
                  <div className="text-sm text-gray-600">Answered</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    {Math.round((score / 100) * questions.length)}
                  </div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
              </div>

              {isPassed ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <h3 className="font-semibold text-green-800 mb-2">Congratulations! 🎉</h3>
                    <p className="text-green-700 text-sm">
                      You're now certified to teach {skill?.replace(/-/g, ' ')} on SkillSwap. 
                      You can start accepting barter requests and earn credits!
                    </p>
                  </div>
                  <Button onClick={() => router.push('/')} className="w-full">
                    Start Teaching & Earning
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <h3 className="font-semibold text-red-800 mb-2">Keep Learning! 📚</h3>
                    <p className="text-red-700 text-sm">
                      You need 80% to pass. Review the material and try again when ready.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={() => {
                      setTestStarted(false);
                      setTestCompleted(false);
                      setCurrentQuestion(0);
                      setAnswers({});
                      setTimeLeft(1800);
                    }} className="flex-1">
                      Retake Test
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/')}>
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isLoggedIn />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  Time remaining: {formatTime(timeLeft)}
                </div>
              </div>
              <Badge variant="outline">
                {Object.keys(answers).length}/{questions.length} Answered
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">
              {currentQ.question}
            </div>

            <RadioGroup
              value={answers[currentQ.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(currentQ.id, parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={!answers[currentQ.id]}
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitTest}
                  disabled={Object.keys(answers).length !== questions.length}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Test
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}