import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Users, 
  TrendingUp, 
  Play, 
  Pause, 
  Settings, 
  Eye,
  Calendar,
  Bot
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface InterviewCardProps {
  interview: {
    id: string;
    title: string;
    type: string;
    status: 'active' | 'paused' | 'completed' | 'draft';
    candidates: number;
    completed: number;
    averageScore?: number;
    createdAt: string;
    duration: string;
  };
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-status-in-progress text-white';
    case 'paused': return 'bg-status-pending text-white';
    case 'completed': return 'bg-status-completed text-white';
    case 'draft': return 'bg-foreground-muted text-white';
    default: return 'bg-foreground-muted text-white';
  }
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'accounting': return 'border-brand-primary/30 text-brand-primary bg-brand-primary/10';
    case 'taxation': return 'border-brand-secondary/30 text-brand-secondary bg-brand-secondary/10';
    case 'consulting': return 'border-brand-electric/30 text-brand-electric bg-brand-electric/10';
    default: return 'border-brand-primary/30 text-brand-primary bg-brand-primary/10';
  }
};

export function InterviewCard({ interview, onView, onEdit, onToggleStatus }: InterviewCardProps) {
  const completionRate = interview.candidates > 0 ? (interview.completed / interview.candidates) * 100 : 0;
  
  return (
    <GlassCard variant="neural" className="hover:ai-glow transition-all duration-300 group">
      <GlassCardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <GlassCardTitle className="text-lg group-hover:text-brand-primary transition-colors">
              {interview.title}
            </GlassCardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor(interview.type)}>
                <Bot className="w-3 h-3 mr-1" />
                {interview.type}
              </Badge>
              <Badge className={getStatusColor(interview.status)}>
                {interview.status}
              </Badge>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-brand-primary/30 hover:bg-brand-primary/10">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass">
              <DropdownMenuItem onClick={() => onView(interview.id)}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(interview.id)}>
                <Settings className="w-4 h-4 mr-2" />
                Edit Interview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(interview.id)}>
                {interview.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Interview
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Activate Interview
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </GlassCardHeader>
      
      <GlassCardContent>
        <div className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-surface-elevated/50">
              <Users className="w-5 h-5 text-brand-primary mx-auto mb-1" />
              <div className="text-lg font-semibold text-foreground-ai">{interview.candidates}</div>
              <div className="text-xs text-foreground-muted">Candidates</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-surface-elevated/50">
              <TrendingUp className="w-5 h-5 text-brand-secondary mx-auto mb-1" />
              <div className="text-lg font-semibold text-foreground-ai">{interview.completed}</div>
              <div className="text-xs text-foreground-muted">Completed</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-surface-elevated/50">
              <Clock className="w-5 h-5 text-brand-electric mx-auto mb-1" />
              <div className="text-lg font-semibold text-foreground-ai">{interview.duration}m</div>
              <div className="text-xs text-foreground-muted">Duration</div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Completion Progress</span>
              <span className="text-foreground-ai font-medium">{Math.round(completionRate)}%</span>
            </div>
            <Progress 
              value={completionRate} 
              className="h-2" 
            />
          </div>
          
          {/* Average Score */}
          {interview.averageScore && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-primary/10 border border-brand-primary/20">
              <span className="text-sm text-foreground-ai">Average Score</span>
              <span className="text-lg font-bold text-brand-primary">{interview.averageScore}%</span>
            </div>
          )}
          
          {/* Created Date */}
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Calendar className="w-3 h-3" />
            Created {interview.createdAt}
          </div>
          
          {/* Action Button */}
          <Button 
            onClick={() => onView(interview.id)}
            className="w-full bg-gradient-primary border-0 hover:scale-105 transition-transform"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Interview
          </Button>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}