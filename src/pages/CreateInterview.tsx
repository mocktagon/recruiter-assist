import { useState } from "react";
import { ArrowLeft, Save, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationalForm } from "@/components/conversations/ConversationalForm";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function CreateInterview() {
  const [mode, setMode] = useState<'conversational' | 'advanced'>('conversational');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConversationalComplete = (data: Record<string, any>) => {
    toast({
      title: "✨ Interview Created Successfully!",
      description: `"${data.title}" has been created using AI assistance.`,
    });
    
    setTimeout(() => {
      navigate('/interviews/manage');
    }, 1500);
  };

  const handleAdvancedSubmit = () => {
    toast({
      title: "Interview Created Successfully!",
      description: "Your interview has been configured and is ready for candidates.",
    });
    
    setTimeout(() => {
      navigate('/interviews/manage');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* AI-Native Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground-ai bg-gradient-primary bg-clip-text text-transparent">
            Create AI Interview
          </h1>
          <p className="text-foreground-muted mt-2 text-lg">
            Let our AI guide you through the interview creation process
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="border-brand-primary/30 hover:bg-brand-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex justify-center">
        <GlassCard variant="neural" className="w-fit">
          <GlassCardContent className="p-2">
            <Tabs value={mode} onValueChange={(value) => setMode(value as 'conversational' | 'advanced')}>
              <TabsList className="grid w-full grid-cols-2 bg-surface-neural">
                <TabsTrigger 
                  value="conversational" 
                  className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Assistant
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced"
                  className="data-[state=active]:bg-gradient-neural data-[state=active]:text-white"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Advanced Mode
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Content based on mode */}
      {mode === 'conversational' ? (
        <div className="max-w-4xl mx-auto">
          <ConversationalForm 
            title="New AI Interview"
            onComplete={handleConversationalComplete}
          />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <GlassCard variant="neural">
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-brand-primary" />
                Advanced Interview Setup
              </GlassCardTitle>
              <GlassCardDescription>
                Configure detailed interview settings manually
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent className="space-y-6">
              <p className="text-foreground-muted">
                Advanced mode allows you to configure all interview settings manually. 
                This includes detailed voice settings, candidate management options, and communication preferences.
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleAdvancedSubmit}
                  className="bg-gradient-primary border-0 shadow-brand hover:scale-105 transition-transform"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Interview
                </Button>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      )}
    </div>
  );
}