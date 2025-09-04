import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bot, Settings, Users, Mail, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateInterview() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    position: "",
    department: "accounting",
    difficulty: "intermediate",
    duration: "30",
    voiceType: "professional",
    emailEnabled: true,
    smsEnabled: true,
    phoneEnabled: false
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Interview Created",
      description: "Your AI interview has been successfully created and is ready for candidates.",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Interview</h1>
        <p className="text-foreground-muted mt-2">
          Set up an AI-powered interview for your candidates with customizable settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-primary" />
              Interview Details
            </CardTitle>
            <CardDescription>
              Configure the basic information about your interview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Interview Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Accountant Assessment"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="e.g., Senior Accountant"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the interview objectives and what candidates can expect..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="border-border min-h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="taxation">Taxation</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="expert">Expert Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-primary" />
              AI Configuration
            </CardTitle>
            <CardDescription>
              Customize the AI interviewer's voice and behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voiceType">Voice Type</Label>
                <Select value={formData.voiceType} onValueChange={(value) => handleInputChange("voiceType", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional - Clear and formal</SelectItem>
                    <SelectItem value="friendly">Friendly - Warm and approachable</SelectItem>
                    <SelectItem value="neutral">Neutral - Balanced tone</SelectItem>
                    <SelectItem value="authoritative">Authoritative - Confident and direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-brand-primary" />
              Communication Settings
            </CardTitle>
            <CardDescription>
              Configure how candidates will be contacted and receive updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary" />
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-foreground-muted">Send interview invitations and results via email</p>
                </div>
              </div>
              <Switch
                checked={formData.emailEnabled}
                onCheckedChange={(checked) => handleInputChange("emailEnabled", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-brand-primary" />
                <div>
                  <Label className="text-base font-medium">SMS Notifications</Label>
                  <p className="text-sm text-foreground-muted">Send quick updates and reminders via SMS</p>
                </div>
              </div>
              <Switch
                checked={formData.smsEnabled}
                onCheckedChange={(checked) => handleInputChange("smsEnabled", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-primary" />
                <div>
                  <Label className="text-base font-medium">Phone Interviews</Label>
                  <p className="text-sm text-foreground-muted">Allow candidates to take interviews via phone call</p>
                </div>
              </div>
              <Switch
                checked={formData.phoneEnabled}
                onCheckedChange={(checked) => handleInputChange("phoneEnabled", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-gradient-primary border-0 shadow-brand">
            Create Interview
          </Button>
        </div>
      </form>
    </div>
  );
}