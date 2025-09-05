import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI assistant. I can help you create interviews, manage candidates, and optimize your hiring process. What would you like to do?',
      timestamp: new Date(),
      suggestions: ['Create new interview', 'Upload candidates', 'View analytics', 'Optimize workflow']
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I understand you want to ' + message.toLowerCase() + '. Let me help you with that...',
        timestamp: new Date(),
        suggestions: ['Show me how', 'More details', 'Skip for now']
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-neural shadow-neural-glow border-0 ai-glow animate-ai-pulse hover:scale-105 transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </Button>
      </div>

      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] z-50 animate-fade-in-up">
          <Card className="glass neural-glow h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground-ai">
                <Sparkles className="w-5 h-5 text-brand-primary animate-pulse" />
                AI Assistant
                <Badge variant="outline" className="ml-auto text-xs border-brand-primary/30 text-brand-primary">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-gradient-primary text-background' 
                          : 'bg-surface-neural border border-brand-secondary/30 text-foreground-ai'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        {msg.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {msg.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs border-brand-primary/30 hover:bg-brand-primary/10"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-brand-primary/20">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-surface-neural border-brand-primary/30 text-foreground-ai placeholder:text-foreground-muted"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-primary border-0 hover:scale-105 transition-transform"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}