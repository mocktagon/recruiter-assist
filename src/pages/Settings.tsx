import { useState } from "react";
import { Save, User, Mail, Phone, MessageSquare, Volume2, Shield, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [settings, setSettings] = useState({
    profile: {
      name: "John Recruiter",
      email: "john@company.com", 
      phone: "+1 (555) 123-4567",
      company: "Talent Solutions Inc."
    },
    communications: {
      email: true,
      sms: false,
      phone: true,
      whatsapp: false
    },
    voice: {
      type: "professional-female",
      speed: "normal",
      accent: "neutral"
    },
    notifications: {
      interviewComplete: true,
      candidateShortlisted: true,
      lowScoreAlert: false,
      dailyDigest: true
    },
    appearance: {
      theme: "light",
      compactMode: false
    }
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-foreground-muted mt-2">
            Configure your AI interviewer preferences and account settings.
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-primary border-0 shadow-brand">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="voice">Voice & AI</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal and company information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={settings.profile.company}
                    onChange={(e) => updateSetting('profile', 'company', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-primary" />
                Communication Channels
              </CardTitle>
              <CardDescription>
                Configure how candidates can be reached for interviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-foreground-muted">Send interview invites via email</p>
                  </div>
                </div>
                <Switch
                  checked={settings.communications.email}
                  onCheckedChange={(checked) => updateSetting('communications', 'email', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-primary" />
                  <div>
                    <p className="font-medium text-foreground">Phone Calls</p>
                    <p className="text-sm text-foreground-muted">Enable phone-based interviews</p>
                  </div>
                </div>
                <Switch
                  checked={settings.communications.phone}
                  onCheckedChange={(checked) => updateSetting('communications', 'phone', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-brand-primary" />
                  <div>
                    <p className="font-medium text-foreground">SMS Messages</p>
                    <p className="text-sm text-foreground-muted">Send reminders and updates via SMS</p>
                  </div>
                </div>
                <Switch
                  checked={settings.communications.sms}
                  onCheckedChange={(checked) => updateSetting('communications', 'sms', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-brand-primary" />
                Voice Calibration
              </CardTitle>
              <CardDescription>
                Customize the AI interviewer's voice characteristics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Voice Type</Label>
                <Select
                  value={settings.voice.type}
                  onValueChange={(value) => updateSetting('voice', 'type', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional-female">Professional Female</SelectItem>
                    <SelectItem value="professional-male">Professional Male</SelectItem>
                    <SelectItem value="friendly-female">Friendly Female</SelectItem>
                    <SelectItem value="friendly-male">Friendly Male</SelectItem>
                    <SelectItem value="authoritative-male">Authoritative Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Speaking Speed</Label>
                <Select
                  value={settings.voice.speed}
                  onValueChange={(value) => updateSetting('voice', 'speed', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Accent</Label>
                <Select
                  value={settings.voice.accent}
                  onValueChange={(value) => updateSetting('voice', 'accent', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="british">British</SelectItem>
                    <SelectItem value="australian">Australian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose when and how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Interview Completed</p>
                  <p className="text-sm text-foreground-muted">Get notified when interviews are finished</p>
                </div>
                <Switch
                  checked={settings.notifications.interviewComplete}
                  onCheckedChange={(checked) => updateSetting('notifications', 'interviewComplete', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Candidate Shortlisted</p>
                  <p className="text-sm text-foreground-muted">Get notified when candidates are shortlisted</p>
                </div>
                <Switch
                  checked={settings.notifications.candidateShortlisted}
                  onCheckedChange={(checked) => updateSetting('notifications', 'candidateShortlisted', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Low Score Alerts</p>
                  <p className="text-sm text-foreground-muted">Get alerted for interviews with low scores</p>
                </div>
                <Switch
                  checked={settings.notifications.lowScoreAlert}
                  onCheckedChange={(checked) => updateSetting('notifications', 'lowScoreAlert', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Daily Digest</p>
                  <p className="text-sm text-foreground-muted">Receive daily summary of activities</p>
                </div>
                <Switch
                  checked={settings.notifications.dailyDigest}
                  onCheckedChange={(checked) => updateSetting('notifications', 'dailyDigest', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-brand-primary" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Compact Mode</p>
                  <p className="text-sm text-foreground-muted">Use a more compact layout to fit more content</p>
                </div>
                <Switch
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(checked) => updateSetting('appearance', 'compactMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}