import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Play, Bot, Users, Target, BarChart3, CheckCircle, Clock, FileText, Phone, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tourSteps = [
  {
    id: 1,
    title: "Welcome to AI Recruiter",
    subtitle: "Your Complete AI-Powered Interview Solution",
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg text-foreground-muted">
            Transform your hiring process with AI-powered interviews that scale with your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="w-6 h-6 text-success mt-1" />
            <div>
              <h4 className="font-semibold">Automated Screening</h4>
              <p className="text-sm text-foreground-muted">AI conducts initial interviews automatically</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-info/10 rounded-lg border border-info/20">
            <BarChart3 className="w-6 h-6 text-info mt-1" />
            <div>
              <h4 className="font-semibold">Smart Analytics</h4>
              <p className="text-sm text-foreground-muted">Get detailed insights and scoring</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <Target className="w-6 h-6 text-warning mt-1" />
            <div>
              <h4 className="font-semibold">Role-Specific Fitment</h4>
              <p className="text-sm text-foreground-muted">Assess candidates for specific positions</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
            <Clock className="w-6 h-6 text-brand-primary mt-1" />
            <div>
              <h4 className="font-semibold">Save Time</h4>
              <p className="text-sm text-foreground-muted">Reduce screening time by 80%</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Scenario 1: Mass Recruitment",
    subtitle: "Screening 500+ Candidates for Accounting Roles",
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-subtle p-6 rounded-lg">
          <h4 className="font-bold text-lg mb-2">The Challenge</h4>
          <p className="text-foreground-muted mb-4">
            TechCorp needs to hire 50 junior accountants from 500+ applications. Traditional interviews would take months.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-error/10 p-4 rounded-lg border border-error/20">
              <h5 className="font-semibold text-error mb-2">Traditional Approach</h5>
              <ul className="text-sm space-y-1 text-foreground-muted">
                <li>• 500 applications to review manually</li>
                <li>• 200+ phone screenings (40 hours)</li>
                <li>• 100+ in-person interviews (80 hours)</li>
                <li>• 3-4 months timeline</li>
                <li>• High interviewer fatigue</li>
              </ul>
            </div>
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <h5 className="font-semibold text-success mb-2">AI Recruiter Solution</h5>
              <ul className="text-sm space-y-1 text-foreground-muted">
                <li>• AI screens all 500 candidates</li>
                <li>• Automated scoring and ranking</li>
                <li>• Focus on top 50 candidates only</li>
                <li>• 2-3 weeks timeline</li>
                <li>• Consistent evaluation criteria</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">How It Works:</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <p className="font-medium">Create Accounting Interview</p>
                <p className="text-sm text-foreground-muted">Set up questions covering tax, financial reporting, and analytical skills</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <p className="font-medium">Bulk Import Candidates</p>
                <p className="text-sm text-foreground-muted">Upload CSV/Excel with 500 candidate details</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <p className="font-medium">AI Conducts Interviews</p>
                <p className="text-sm text-foreground-muted">Each candidate gets personalized phone/video interview</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <div>
                <p className="font-medium">Review Results</p>
                <p className="text-sm text-foreground-muted">Get scored candidates ranked by performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Scenario 2: Specialized Role Fitment",
    subtitle: "Finding the Perfect Senior Developer",
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-subtle p-6 rounded-lg">
          <h4 className="font-bold text-lg mb-2">The Challenge</h4>
          <p className="text-foreground-muted mb-4">
            StartupXYZ needs a Senior React Developer with specific skills in TypeScript, Node.js, and cloud architecture.
          </p>
          
          <div className="bg-info/10 p-4 rounded-lg border border-info/20">
            <h5 className="font-semibold text-info mb-2">The Opportunity</h5>
            <p className="text-sm text-foreground-muted">
              You already have 50 candidates from previous general developer interviews. Instead of starting from scratch, 
              use fitment interviews to assess their specific match for this role.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Fitment Interview Process:</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <p className="font-medium">Upload Job Description</p>
                <p className="text-sm text-foreground-muted">Paste the specific Senior React Developer requirements</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <p className="font-medium">Auto-Shortlist or Manual Select</p>
                <p className="text-sm text-foreground-muted">Choose high-scoring candidates or manually select specific ones</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <p className="font-medium">AI Generates Role-Specific Questions</p>
                <p className="text-sm text-foreground-muted">Creates questions about React hooks, TypeScript patterns, cloud deployment</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
              <div>
                <p className="font-medium">Get Fitment Scores</p>
                <p className="text-sm text-foreground-muted">Each candidate gets a role-specific fitment score (0-100%)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-success/10 p-4 rounded-lg border border-success/20">
          <h5 className="font-semibold text-success mb-2">Multiple Fitment Interviews</h5>
          <p className="text-sm text-foreground-muted">
            The same candidate pool can be assessed for different roles - Frontend Developer, Full-Stack Developer, 
            Tech Lead - each with its own fitment interview and scoring.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Key Features Walkthrough",
    subtitle: "Master the Platform",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="w-5 h-5 text-brand-primary" />
                Interview Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-foreground-muted">
                <li>• Choose from Accounting, Taxation, or Consulting</li>
                <li>• Set interview duration (15-60 minutes)</li>
                <li>• Select AI voice type (Male/Female, Professional/Friendly)</li>
                <li>• Configure communication channels (Email, Phone, SMS)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5 text-info" />
                Candidate Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-foreground-muted">
                <li>• Bulk import via CSV/Excel</li>
                <li>• Google Sheets integration</li>
                <li>• Manual candidate addition</li>
                <li>• Real-time status tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-warning" />
                Fitment Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-foreground-muted">
                <li>• Upload job descriptions</li>
                <li>• Auto-generate role-specific questions</li>
                <li>• Multiple fitment interviews per candidate</li>
                <li>• Detailed compatibility scoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-5 h-5 text-success" />
                Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-foreground-muted">
                <li>• Interview completion rates</li>
                <li>• Candidate performance scoring</li>
                <li>• Time-to-hire metrics</li>
                <li>• Comparative analysis</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-primary/10 p-6 rounded-lg border border-brand-primary/20">
          <h4 className="font-bold text-lg mb-2 text-brand-primary">Communication Channels</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-brand-primary" />
              <div>
                <p className="font-medium">Email Invitations</p>
                <p className="text-sm text-foreground-muted">Automated personalized emails</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-brand-primary" />
              <div>
                <p className="font-medium">Phone Interviews</p>
                <p className="text-sm text-foreground-muted">AI-powered voice calls</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-brand-primary" />
              <div>
                <p className="font-medium">SMS Reminders</p>
                <p className="text-sm text-foreground-muted">Automated follow-ups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Ready to Get Started?",
    subtitle: "Begin Your AI-Powered Recruitment Journey",
    content: (
      <div className="space-y-6 text-center">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-2">You're All Set!</h3>
          <p className="text-lg text-foreground-muted">
            Now you understand how to leverage AI Recruiter for efficient, scalable hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="p-6 bg-gradient-subtle rounded-lg border">
            <h4 className="font-bold mb-2">Quick Start</h4>
            <p className="text-sm text-foreground-muted mb-4">
              Create your first interview in under 5 minutes
            </p>
            <Button className="w-full">Create Interview</Button>
          </div>
          <div className="p-6 bg-gradient-subtle rounded-lg border">
            <h4 className="font-bold mb-2">Explore Dashboard</h4>
            <p className="text-sm text-foreground-muted mb-4">
              View sample data and get familiar with the interface
            </p>
            <Button variant="outline" className="w-full">View Dashboard</Button>
          </div>
        </div>

        <div className="bg-info/10 p-6 rounded-lg border border-info/20 max-w-2xl mx-auto">
          <h4 className="font-semibold text-info mb-2">Pro Tips for Success</h4>
          <ul className="text-sm text-left space-y-2 text-foreground-muted">
            <li>• Start with a small batch (10-20 candidates) to test your interview setup</li>
            <li>• Use clear, specific job descriptions for better fitment interview results</li>
            <li>• Set up multiple communication channels to maximize candidate response rates</li>
            <li>• Review and adjust AI voice settings based on your company culture</li>
            <li>• Use bulk import features for large-scale recruitment drives</li>
          </ul>
        </div>
      </div>
    )
  }
];

export default function QuickTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const currentStepData = tourSteps[currentStep];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Quick Tour</h1>
          <p className="text-foreground-muted mt-2">
            Learn how to maximize your hiring efficiency with AI Recruiter
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-foreground-muted">
          <span>Step {currentStep + 1} of {tourSteps.length}</span>
          <span>{Math.round(((currentStep + 1) / tourSteps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Navigation Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tourSteps.map((step, index) => (
          <Button
            key={step.id}
            variant={index === currentStep ? "default" : "outline"}
            size="sm"
            onClick={() => handleStepClick(index)}
            className={index === currentStep ? "bg-gradient-primary border-0" : ""}
          >
            <span className="hidden sm:inline">{step.title}</span>
            <span className="sm:hidden">{index + 1}</span>
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <Card className="min-h-96">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="secondary">Step {currentStep + 1}</Badge>
          </div>
          <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
          <CardDescription className="text-lg">{currentStepData.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStepData.content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep === tourSteps.length - 1 ? (
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/interviews/create")}
                className="bg-gradient-primary border-0 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Create First Interview
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}