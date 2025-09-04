import { useState } from "react";
import { ArrowLeft, Save, Users, Bot, Volume2, Mail, Phone, MessageSquare, Upload, Download, FileSpreadsheet, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function CreateInterview() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    duration: "45",
    voiceType: "professional-female",
    voiceSpeed: "normal",
    voiceAccent: "neutral",
    communications: {
      email: true,
      phone: true,
      sms: false
    },
    candidateUpload: {
      method: "manual", // manual, sheet, file
      googleSheetUrl: "",
      uploadedFile: null as File | null
    }
  });

  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.title || !formData.type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Interview Created Successfully!",
      description: `"${formData.title}" has been created and is ready for candidates.`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        candidateUpload: {
          ...prev.candidateUpload,
          uploadedFile: file
        }
      }));
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const downloadSampleTemplate = () => {
    toast({
      title: "Download Started",
      description: "Sample candidate template is being downloaded.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Interview</h1>
          <p className="text-foreground-muted mt-2">
            Set up an AI-powered interview with candidate management and voice customization.
          </p>
        </div>
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-primary border-0 shadow-brand"
        >
          <Save className="w-4 h-4 mr-2" />
          Create Interview
        </Button>
      </div>

      {/* Main Form */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Details</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="voice">Voice & AI</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
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
              <div>
                <Label htmlFor="title">Interview Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Accountant Assessment"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label>Interview Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select interview type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="taxation">Taxation</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the interview objectives and what candidates can expect..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="75">75 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-primary" />
                Add Candidates
              </CardTitle>
              <CardDescription>
                Upload candidate information using various methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Upload Method</Label>
                <Select
                  value={formData.candidateUpload.method}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    candidateUpload: { ...prev.candidateUpload, method: value }
                  }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                    <SelectItem value="sheet">Google Sheets</SelectItem>
                    <SelectItem value="file">Excel/CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.candidateUpload.method === "sheet" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="googleSheet">Google Sheets URL</Label>
                    <Input
                      id="googleSheet"
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      value={formData.candidateUpload.googleSheetUrl}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        candidateUpload: { ...prev.candidateUpload, googleSheetUrl: e.target.value }
                      }))}
                      className="mt-2"
                    />
                  </div>
                  <div className="p-4 bg-brand-primary-light/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Google Sheets Setup:</h4>
                    <ol className="text-sm text-foreground-muted space-y-1 list-decimal list-inside">
                      <li>Make sure your Google Sheet is public or shared with view access</li>
                      <li>Use the required column format (download template below)</li>
                      <li>Copy the sheet URL and paste it above</li>
                    </ol>
                  </div>
                </div>
              )}

              {formData.candidateUpload.method === "file" && (
                <div className="space-y-4">
                  <div>
                    <Label>Upload Excel/CSV File</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-brand-primary opacity-60 mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-foreground-muted">
                          Drop your Excel or CSV file here, or click to browse
                        </p>
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="fileUpload"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('fileUpload')?.click()}
                        >
                          Choose File
                        </Button>
                        {formData.candidateUpload.uploadedFile && (
                          <p className="text-sm text-success font-medium">
                            ✓ {formData.candidateUpload.uploadedFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(formData.candidateUpload.method === "sheet" || formData.candidateUpload.method === "file") && (
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-8 h-8 text-brand-primary" />
                      <div>
                        <p className="font-medium text-foreground">Sample Template</p>
                        <p className="text-sm text-foreground-muted">
                          Download the required format with sample data
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={downloadSampleTemplate}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                  <div className="p-4 bg-info-light/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Required Columns:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-foreground-muted">
                      <div>• Name (required)</div>
                      <div>• Email (required)</div>
                      <div>• Phone (optional)</div>
                      <div>• Position (optional)</div>
                      <div>• Experience (optional)</div>
                      <div>• Resume URL (optional)</div>
                    </div>
                  </div>
                </div>
              )}

              {formData.candidateUpload.method === "manual" && (
                <div className="p-8 text-center border-2 border-dashed border-border rounded-lg">
                  <Users className="w-16 h-16 text-brand-primary opacity-60 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Manual Candidate Entry</h3>
                  <p className="text-foreground-muted mb-6">
                    After creating the interview, you can manually add candidates one by one from the manage interviews page.
                  </p>
                  <Button variant="outline">
                    Add Candidates Later
                  </Button>
                </div>
              )}
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
                  value={formData.voiceType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, voiceType: value }))}
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
                  value={formData.voiceSpeed}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, voiceSpeed: value }))}
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
                  value={formData.voiceAccent}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, voiceAccent: value }))}
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

        <TabsContent value="communications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-primary" />
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
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-foreground-muted">Send interview invites via email</p>
                  </div>
                </div>
                <Switch
                  checked={formData.communications.email}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    communications: { ...prev.communications, email: checked }
                  }))}
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
                  checked={formData.communications.phone}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    communications: { ...prev.communications, phone: checked }
                  }))}
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
                  checked={formData.communications.sms}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    communications: { ...prev.communications, sms: checked }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}