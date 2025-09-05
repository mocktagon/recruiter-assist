import { Users, Bot, Calendar, TrendingUp, UserCheck, Clock, Star, Plus } from "lucide-react";
import { StatsGlassCard } from "@/components/dashboard/StatsGlassCard";
import { InterviewCard } from "@/components/dashboard/InterviewCard";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data with enhanced structure
const recentInterviews = [
  { 
    id: "1", 
    title: "Senior Accountant Assessment",
    type: "Accounting", 
    status: "active" as const,
    candidates: 24,
    completed: 18,
    averageScore: 87,
    createdAt: "Jan 15, 2024",
    duration: "45"
  },
  { 
    id: "2", 
    title: "Tax Consultant Interview",
    type: "Taxation", 
    status: "active" as const,
    candidates: 12,
    completed: 8,
    averageScore: 82,
    createdAt: "Jan 12, 2024",
    duration: "60"
  },
  { 
    id: "3", 
    title: "Financial Analyst Screening",
    type: "Consulting", 
    status: "paused" as const,
    candidates: 18,
    completed: 5,
    averageScore: 79,
    createdAt: "Jan 10, 2024",
    duration: "45"
  }
];

const topCandidates = [
  { name: "James Wilson", position: "Audit Manager", score: 92, status: "shortlisted" },
  { name: "Sarah Johnson", position: "Senior Accountant", score: 87, status: "completed" },
  { name: "David Kim", position: "Tax Specialist", score: 85, status: "shortlisted" },
  { name: "Maria Garcia", position: "Financial Analyst", score: 83, status: "completed" }
];

export default function Dashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInterviewAction = (action: string, id?: string) => {
    toast({
      title: "Action Completed",
      description: `Interview ${action} successfully.`,
    });
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground-ai bg-gradient-primary bg-clip-text text-transparent">
            AI Recruiter Dashboard
          </h1>
          <p className="text-foreground-muted mt-2 text-lg">
            Intelligent interview management at your fingertips
          </p>
        </div>
        <Button 
          onClick={() => navigate('/interviews/create')}
          className="bg-gradient-primary border-0 shadow-brand hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Interview
        </Button>
      </div>

      {/* AI-Native Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsGlassCard
          title="Active Interviews"
          value={12}
          change={{ value: "+3 from last week", positive: true }}
          icon={Bot}
          variant="primary"
          trend={[65, 72, 68, 78, 82, 87, 91]}
        />
        <StatsGlassCard
          title="Total Candidates"
          value={248}
          change={{ value: "+18 this month", positive: true }}
          icon={Users}
          variant="secondary"
          trend={[45, 52, 58, 64, 71, 76, 83]}
        />
        <StatsGlassCard
          title="Completed Interviews"
          value={187}
          change={{ value: "85% completion rate", positive: true }}
          icon={UserCheck}
          variant="success"
          trend={[34, 41, 38, 45, 52, 58, 65]}
        />
        <StatsGlassCard
          title="AI Efficiency"
          value="94.2%"
          change={{ value: "+2.1% this week", positive: true }}
          icon={TrendingUp}
          variant="neural"
          trend={[78, 82, 85, 88, 91, 93, 94]}
        />
      </div>

      {/* Active Interviews Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground-ai">Active Interviews</h2>
            <p className="text-foreground-muted">Manage your AI-powered interview sessions</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/interviews/manage')}
            className="border-brand-primary/30 hover:bg-brand-primary/10"
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              interview={interview}
              onView={(id) => navigate(`/interviews/${id}`)}
              onEdit={(id) => handleInterviewAction('edited', id)}
              onToggleStatus={(id) => handleInterviewAction('status updated', id)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Insights */}
        <GlassCard variant="neural">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-primary animate-pulse" />
              AI Insights
            </GlassCardTitle>
            <GlassCardDescription>
              Real-time intelligence from your interview data
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-primary/10 border border-brand-primary/20">
                <h4 className="font-semibold text-brand-primary mb-2">🎯 Recommendation</h4>
                <p className="text-sm text-foreground-muted">
                  Consider increasing interview duration for Accounting roles - candidates scoring 90+ typically need 5-10 more minutes to fully showcase their expertise.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-neural/10 border border-brand-secondary/20">
                <h4 className="font-semibold text-brand-secondary mb-2">📊 Trend Alert</h4>
                <p className="text-sm text-foreground-muted">
                  Taxation interviews show 23% higher completion rates when scheduled between 10 AM - 2 PM.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <h4 className="font-semibold text-success mb-2">✨ Success Pattern</h4>
                <p className="text-sm text-foreground-muted">
                  Candidates with technical certification mentions score 18% higher on average.
                </p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Top Performers */}
        <GlassCard variant="ai-glow">
          <GlassCardHeader>
            <GlassCardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-brand-primary animate-pulse" />
              Top Performers
            </GlassCardTitle>
            <GlassCardDescription>
              Highest scoring candidates from recent interviews
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {topCandidates.map((candidate, index) => (
                <div key={candidate.name} className="group flex items-center justify-between p-4 rounded-lg bg-surface-elevated/50 hover:bg-surface-neural/30 transition-all duration-300 border border-transparent hover:border-brand-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center shadow-lg">
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-neural rounded-full flex items-center justify-center">
                          <Star className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground-ai group-hover:text-brand-primary transition-colors">{candidate.name}</p>
                      <p className="text-sm text-foreground-muted">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-xl text-brand-primary group-hover:animate-ai-pulse">{candidate.score}%</div>
                      <div className="text-xs text-foreground-muted">AI Score</div>
                    </div>
                    <StatusBadge status={candidate.status as any} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}