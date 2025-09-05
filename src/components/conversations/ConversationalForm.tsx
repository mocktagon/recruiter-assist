import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface ConversationStep {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  field?: string;
  suggestions?: string[];
  completed?: boolean;
}

interface ConversationalFormProps {
  title: string;
  onComplete: (data: Record<string, any>) => void;
}

export function ConversationalForm({ title, onComplete }: ConversationalFormProps) {
  const [steps, setSteps] = useState<ConversationStep[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! I'm here to help you create "${title}". Let's start with the basics. What would you like to name this interview?`,
      timestamp: new Date(),
      field: 'title',
      suggestions: ['Senior Accountant Assessment', 'Tax Consultant Interview', 'Financial Analyst Screening']
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentField, setCurrentField] = useState('title');
  const scrollRef = useRef<HTMLDivElement>(null);

  const formFlow = [
    { field: 'title', question: 'What would you like to name this interview?', type: 'text' },
    { field: 'type', question: 'What type of interview is this?', type: 'select', options: ['Accounting', 'Taxation', 'Consulting', 'Financial Analysis'] },
    { field: 'duration', question: 'How long should each interview session be?', type: 'select', options: ['30 minutes', '45 minutes', '60 minutes', '75 minutes'] },
    { field: 'description', question: 'Can you describe what this interview should focus on?', type: 'text' },
    { field: 'voiceType', question: 'What kind of voice should the AI interviewer have?', type: 'select', options: ['Professional Female', 'Professional Male', 'Friendly Female', 'Friendly Male'] }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [steps]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userStep: ConversationStep = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      field: currentField
    };

    setSteps(prev => [...prev, userStep]);
    
    // Update form data
    const newFormData = { ...formData, [currentField]: currentMessage };
    setFormData(newFormData);
    
    setCurrentMessage("");

    // Determine next question
    const currentIndex = formFlow.findIndex(step => step.field === currentField);
    const nextIndex = currentIndex + 1;

    setTimeout(() => {
      if (nextIndex < formFlow.length) {
        const nextStep = formFlow[nextIndex];
        setCurrentField(nextStep.field);
        
        const aiResponse: ConversationStep = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Great! ${nextStep.question}`,
          timestamp: new Date(),
          field: nextStep.field,
          suggestions: nextStep.options || []
        };
        
        setSteps(prev => [...prev, aiResponse]);
      } else {
        // Form complete
        const completionStep: ConversationStep = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `Perfect! I have all the information needed to create your interview. Let me set this up for you now.`,
          timestamp: new Date(),
          completed: true
        };
        
        setSteps(prev => [...prev, completionStep]);
        
        setTimeout(() => {
          onComplete(newFormData);
        }, 1500);
      }
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentMessage(suggestion);
  };

  const isCompleted = steps.some(step => step.completed);

  return (
    <GlassCard variant="neural" className="h-[600px] flex flex-col">
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
          AI Interview Builder
          <Badge variant="outline" className="ml-auto border-brand-primary/30 text-brand-primary">
            Conversational Mode
          </Badge>
        </GlassCardTitle>
      </GlassCardHeader>
      
      <GlassCardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex items-start gap-3 ${step.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.type === 'user' 
                      ? 'bg-gradient-primary' 
                      : 'bg-gradient-neural'
                  }`}>
                    {step.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  {/* Message */}
                  <div className={`p-4 rounded-2xl ${
                    step.type === 'user' 
                      ? 'bg-gradient-primary text-white' 
                      : 'bg-surface-neural border border-brand-secondary/30'
                  }`}>
                    <p className="text-sm">{step.content}</p>
                    
                    {/* Suggestions */}
                    {step.suggestions && step.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {step.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs border-brand-primary/30 hover:bg-brand-primary/10 text-foreground-ai"
                            disabled={isCompleted}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isCompleted && (
              <div className="text-center py-4">
                <div className="animate-ai-pulse">
                  <Bot className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                  <p className="text-sm text-foreground-muted">Creating your interview...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        {!isCompleted && (
          <div className="p-4 border-t border-brand-primary/20">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your answer..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-surface-neural border-brand-primary/30 text-foreground-ai placeholder:text-foreground-muted"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-primary border-0 hover:scale-105 transition-transform"
                disabled={!currentMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
}