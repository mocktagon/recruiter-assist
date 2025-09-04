import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Calendar, Phone, Mail, MessageSquare, UserCheck, Upload, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge, Status } from "@/components/dashboard/StatusBadge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Filter, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Manual candidate selection component
function ManualCandidateSelection({ 
  interview, 
  selectedCandidates, 
  onCandidateSelect 
}: {
  interview: any;
  selectedCandidates: number[];
  onCandidateSelect: (id: number, checked: boolean) => void;
}) {
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [candidateFilter, setCandidateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredCandidates = interview.candidates.filter((candidate: any) => {
    const matchesName = candidate.name.toLowerCase().includes(candidateFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || !statusFilter || candidate.status === statusFilter;
    return matchesName && matchesStatus;
  });

  const uniqueStatuses = [...new Set(interview.candidates.map((c: any) => c.status))];

  const handleSelectAllFiltered = (checked: boolean) => {
    filteredCandidates.forEach((candidate: any) => {
      onCandidateSelect(candidate.id, checked);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Or Select Manually</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsManualOpen(!isManualOpen)}
        >
          <Filter className="w-4 h-4 mr-2" />
          {isManualOpen ? "Hide" : "Show"} All Candidates
        </Button>
      </div>

      {isManualOpen && (
        <div className="border rounded-lg p-4 space-y-4 bg-accent/20">
          {/* Filters */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search candidates..."
                value={candidateFilter}
                onChange={(e) => setCandidateFilter(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map((status: string) => (
                  <SelectItem key={status} value={status}>
                    {(status as string).charAt(0).toUpperCase() + (status as string).slice(1).replace("-", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(candidateFilter || statusFilter) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCandidateFilter("");
                  setStatusFilter("");
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Select All Filtered */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all-filtered"
              checked={filteredCandidates.every((c: any) => selectedCandidates.includes(c.id))}
              onCheckedChange={handleSelectAllFiltered}
            />
            <Label htmlFor="select-all-filtered" className="font-medium">
              Select All Filtered ({filteredCandidates.length})
            </Label>
          </div>

          {/* Candidate List */}
          <div className="max-h-48 overflow-y-auto space-y-2">
            {filteredCandidates.map((candidate: any) => (
              <div key={candidate.id} className="flex items-center justify-between p-2 hover:bg-background rounded">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`manual-candidate-${candidate.id}`}
                    checked={selectedCandidates.includes(candidate.id)}
                    onCheckedChange={(checked) => onCandidateSelect(candidate.id, checked as boolean)}
                  />
                  <div>
                    <Label htmlFor={`manual-candidate-${candidate.id}`} className="font-medium">
                      {candidate.name}
                    </Label>
                    <div className="text-sm text-foreground-muted">
                      {candidate.email} • {candidate.phone}
                    </div>
                    {candidate.score && (
                      <div className="text-xs text-foreground-muted">
                        Score: {candidate.score}%
                      </div>
                    )}
                  </div>
                </div>
                <StatusBadge status={candidate.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mock interview data
const interviewData = {
  1: {
    id: 1,
    title: "Senior Accountant Assessment",
    type: "Accounting",
    created: "2024-01-15",
    status: "in-progress" as Status,
    duration: "45 min",
    voiceType: "Professional Female",
    description: "Comprehensive assessment for senior accounting positions covering financial reporting, tax compliance, and analytical skills.",
    communications: { email: true, phone: true, sms: false },
    candidates: [
      { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1-555-0101", status: "completed" as Status, score: 87, completedAt: "2024-01-16 14:30", duration: "43 min" },
      { id: 2, name: "Michael Chen", email: "m.chen@email.com", phone: "+1-555-0102", status: "in-progress" as Status, score: null, completedAt: null, duration: null },
      { id: 3, name: "Emily Davis", email: "emily.d@email.com", phone: "+1-555-0103", status: "scheduled" as Status, score: null, completedAt: null, duration: null },
      { id: 4, name: "James Wilson", email: "j.wilson@email.com", phone: "+1-555-0104", status: "completed" as Status, score: 92, completedAt: "2024-01-16 10:15", duration: "41 min" },
      { id: 5, name: "Lisa Rodriguez", email: "l.rodriguez@email.com", phone: "+1-555-0105", status: "under-review" as Status, score: 78, completedAt: "2024-01-15 16:45", duration: "47 min" },
      { id: 6, name: "David Kim", email: "d.kim@email.com", phone: "+1-555-0106", status: "completed" as Status, score: 85, completedAt: "2024-01-15 11:20", duration: "44 min" },
      { id: 7, name: "Rachel Brown", email: "r.brown@email.com", phone: "+1-555-0107", status: "scheduled" as Status, score: null, completedAt: null, duration: null },
      { id: 8, name: "Alex Thompson", email: "a.thompson@email.com", phone: "+1-555-0108", status: "pending" as Status, score: null, completedAt: null, duration: null },
      { id: 9, name: "Maria Garcia", email: "m.garcia@email.com", phone: "+1-555-0109", status: "completed" as Status, score: 83, completedAt: "2024-01-14 15:30", duration: "45 min" }
    ]
  }
};

export default function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [isCreateFitmentOpen, setIsCreateFitmentOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);

  const interview = interviewData[parseInt(id || "1") as keyof typeof interviewData];

  if (!interview) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground">Interview Not Found</h2>
        <Button onClick={() => navigate("/interviews/manage")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Manage Interviews
        </Button>
      </div>
    );
  }

  const completedCandidates = interview.candidates.filter(c => c.status === "completed");
  const eligibleForShortlist = completedCandidates.filter(c => c.score && c.score >= 75);
  const participationRate = Math.round((interview.candidates.filter(c => c.status !== "pending").length / interview.candidates.length) * 100);

  const handleCandidateSelect = (candidateId: number, checked: boolean) => {
    setSelectedCandidates(prev => 
      checked 
        ? [...prev, candidateId]
        : prev.filter(id => id !== candidateId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCandidates(checked ? eligibleForShortlist.map(c => c.id) : []);
  };

  const handleCreateFitmentInterview = () => {
    if (selectedCandidates.length === 0) {
      toast({
        title: "No Candidates Selected",
        description: "Please select at least one candidate to create a fitment interview.",
        variant: "destructive"
      });
      return;
    }

    if (!jobDescription.trim() && !jobDescriptionFile) {
      toast({
        title: "Job Description Required",
        description: "Please provide a job description or upload a file.",
        variant: "destructive"
      });
      return;
    }

    const selectedNames = interview.candidates
      .filter(c => selectedCandidates.includes(c.id))
      .map(c => c.name)
      .join(", ");

    toast({
      title: "Fitment Interview Created!",
      description: `Created fitment interview for ${selectedCandidates.length} candidates: ${selectedNames}`,
    });

    setIsCreateFitmentOpen(false);
    setSelectedCandidates([]);
    setJobDescription("");
    setJobDescriptionFile(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJobDescriptionFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success font-bold";
    if (score >= 80) return "text-info font-semibold";
    if (score >= 70) return "text-warning font-medium";
    return "text-error font-medium";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/interviews/manage")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{interview.title}</h1>
          <p className="text-foreground-muted mt-2">
            {interview.type} • Created {interview.created} • {participationRate}% participation rate
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isCreateFitmentOpen} onOpenChange={setIsCreateFitmentOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-primary border-0 shadow-brand"
                disabled={eligibleForShortlist.length === 0}
              >
                <Target className="w-4 h-4 mr-2" />
                Create Fitment Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Fitment Interview</DialogTitle>
                <DialogDescription>
                  Select candidates and provide job description for role-specific assessment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Select Candidates</Label>
                  
                  {/* Quick Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Shortlisted Candidates (Score ≥ 75%)</Label>
                      <span className="text-sm text-foreground-muted">{eligibleForShortlist.length} eligible</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="select-all"
                          checked={selectedCandidates.length === eligibleForShortlist.length && eligibleForShortlist.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                        <Label htmlFor="select-all" className="font-medium">
                          Select All Shortlisted ({eligibleForShortlist.length})
                        </Label>
                      </div>
                      {eligibleForShortlist.map((candidate) => (
                        <div key={candidate.id} className="flex items-center space-x-2 pl-6">
                          <Checkbox
                            id={`candidate-${candidate.id}`}
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={(checked) => handleCandidateSelect(candidate.id, checked as boolean)}
                          />
                          <Label htmlFor={`candidate-${candidate.id}`} className="flex-1">
                            {candidate.name} ({candidate.score}%)
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Manual Selection */}
                  <div className="border-t pt-4">
                    <ManualCandidateSelection 
                      interview={interview}
                      selectedCandidates={selectedCandidates}
                      onCandidateSelect={handleCandidateSelect}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description and role requirements here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-2 min-h-32"
                  />
                </div>

                <div>
                  <Label>Or Upload Job Description File</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-brand-primary opacity-60 mx-auto mb-2" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="jobDescFile"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('jobDescFile')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    {jobDescriptionFile && (
                      <p className="text-sm text-success font-medium mt-2">
                        ✓ {jobDescriptionFile.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateFitmentOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFitmentInterview} className="bg-gradient-primary border-0">
                    Create Fitment Interview
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary-light rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{interview.candidates.length}</p>
                <p className="text-sm text-foreground-muted">Total Candidates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCandidates.length}</p>
                <p className="text-sm text-foreground-muted">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-info-light rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{eligibleForShortlist.length}</p>
                <p className="text-sm text-foreground-muted">Eligible for Fitment</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{participationRate}%</p>
                <p className="text-sm text-foreground-muted">Participation Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interview Details */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Configuration</CardTitle>
          <CardDescription>Current settings and communication preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground-muted">Type</Label>
                <p className="text-foreground">{interview.type}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground-muted">Duration</Label>
                <p className="text-foreground">{interview.duration}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground-muted">Voice Type</Label>
                <p className="text-foreground">{interview.voiceType}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground-muted">Communications</Label>
                <div className="flex gap-4 mt-1">
                  {interview.communications.email && (
                    <div className="flex items-center gap-1 text-success">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </div>
                  )}
                  {interview.communications.phone && (
                    <div className="flex items-center gap-1 text-success">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Phone</span>
                    </div>
                  )}
                  {interview.communications.sms && (
                    <div className="flex items-center gap-1 text-success">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">SMS</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground-muted">Description</Label>
                <p className="text-foreground text-sm">{interview.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Results</CardTitle>
          <CardDescription>
            Detailed view of all candidates and their interview performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interview.candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">
                    {candidate.name}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-foreground-muted">{candidate.email}</div>
                      <div className="text-foreground-muted">{candidate.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={candidate.status} />
                  </TableCell>
                  <TableCell>
                    {candidate.score ? (
                      <span className={getScoreColor(candidate.score)}>
                        {candidate.score}%
                      </span>
                    ) : (
                      <span className="text-foreground-muted">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-foreground-muted">
                    {candidate.duration || "-"}
                  </TableCell>
                  <TableCell className="text-foreground-muted text-sm">
                    {candidate.completedAt || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}