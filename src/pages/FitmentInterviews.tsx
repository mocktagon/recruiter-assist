import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Upload, FileText, UserCheck, Clock, Target, MoreHorizontal, Eye, Download, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge, Status } from "@/components/dashboard/StatusBadge";
import { useToast } from "@/hooks/use-toast";

// Mock fitment interview data grouped by original interview
const fitmentInterviews = [
  {
    id: 1,
    interviewName: "Senior Accountant Assessment",
    interviewId: 1,
    candidates: [
      {
        id: 1,
        candidate: "Sarah Johnson",
        position: "Senior Accountant - ABC Corp",
        jobDescription: "senior_accountant_jd.pdf",
        status: "completed" as Status,
        fitmentScore: 92,
        created: "2024-01-16",
        completedDate: "2024-01-16"
      }
    ]
  },
  {
    id: 2,
    interviewName: "Tax Consultant Evaluation",
    interviewId: 2,
    candidates: [
      {
        id: 2,
        candidate: "James Wilson",
        position: "Tax Manager - XYZ Ltd",
        jobDescription: "tax_manager_jd.pdf",
        status: "in-progress" as Status,
        fitmentScore: null,
        created: "2024-01-15",
        completedDate: null
      }
    ]
  },
  {
    id: 3,
    interviewName: "Business Consultant Screen",
    interviewId: 3,
    candidates: [
      {
        id: 3,
        candidate: "David Kim",
        position: "Senior Consultant - DEF Inc",
        jobDescription: "consultant_jd.pdf",
        status: "scheduled" as Status,
        fitmentScore: null,
        created: "2024-01-14",
        completedDate: null
      }
    ]
  },
  {
    id: 4,
    interviewName: "Financial Analyst Review",
    interviewId: 4,
    candidates: [
      {
        id: 4,
        candidate: "Lisa Rodriguez", 
        position: "Financial Analyst - GHI Corp",
        jobDescription: "financial_analyst_jd.pdf",
        status: "completed" as Status,
        fitmentScore: 88,
        created: "2024-01-13",
        completedDate: "2024-01-14"
      }
    ]
  }
];

// Mock all candidates data for manual selection
const allCandidates = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1-555-0101", interview: "Senior Accountant Assessment", status: "completed" as Status, score: 87 },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", phone: "+1-555-0102", interview: "Senior Accountant Assessment", status: "completed" as Status, score: 92 },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", phone: "+1-555-0103", interview: "Tax Consultant Evaluation", status: "completed" as Status, score: 78 },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", phone: "+1-555-0104", interview: "Tax Consultant Evaluation", status: "completed" as Status, score: 85 },
  { id: 5, name: "Lisa Rodriguez", email: "l.rodriguez@email.com", phone: "+1-555-0105", interview: "Financial Analyst Review", status: "completed" as Status, score: 88 },
  { id: 6, name: "David Kim", email: "d.kim@email.com", phone: "+1-555-0106", interview: "Business Consultant Screen", status: "completed" as Status, score: 83 },
  { id: 7, name: "Rachel Brown", email: "r.brown@email.com", phone: "+1-555-0107", interview: "Marketing Manager Screen", status: "completed" as Status, score: 91 },
  { id: 8, name: "Alex Thompson", email: "a.thompson@email.com", phone: "+1-555-0108", interview: "Marketing Manager Screen", status: "completed" as Status, score: 76 }
];

export default function FitmentInterviews() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadJDOpen, setIsUploadJDOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [candidateFilter, setCandidateFilter] = useState("");
  const [interviewFilter, setInterviewFilter] = useState("");
  const { toast } = useToast();

  const filteredInterviews = fitmentInterviews.filter(interview => {
    return interview.interviewName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           interview.candidates.some(c => 
             c.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
             c.position.toLowerCase().includes(searchQuery.toLowerCase())
           );
  });

  const filteredCandidatesForSelection = allCandidates.filter(candidate => {
    const matchesName = candidate.name.toLowerCase().includes(candidateFilter.toLowerCase());
    const matchesInterview = !interviewFilter || candidate.interview === interviewFilter;
    return matchesName && matchesInterview;
  });

  const uniqueInterviews = [...new Set(allCandidates.map(c => c.interview))];

  const handleRowClick = (interview: typeof fitmentInterviews[0]) => {
    navigate(`/interviews/${interview.interviewId}`);
  };

  const handleCandidateSelect = (candidateId: number, checked: boolean) => {
    setSelectedCandidates(prev =>
      checked
        ? [...prev, candidateId]
        : prev.filter(id => id !== candidateId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedCandidates(checked ? filteredCandidatesForSelection.map(c => c.id) : []);
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

  const handleCreateFitmentFromUpload = () => {
    if (!jobDescription.trim() && !jobDescriptionFile) {
      toast({
        title: "Job Description Required",
        description: "Please provide a job description or upload a file.",
        variant: "destructive"
      });
      return;
    }

    if (selectedCandidates.length === 0) {
      toast({
        title: "No Candidates Selected",
        description: "Please select at least one candidate to create a fitment interview.",
        variant: "destructive"
      });
      return;
    }

    const selectedNames = allCandidates
      .filter(c => selectedCandidates.includes(c.id))
      .map(c => c.name)
      .join(", ");

    toast({
      title: "Fitment Interview Created!",
      description: `Created fitment interview for ${selectedCandidates.length} candidates: ${selectedNames}`,
    });

    setIsUploadJDOpen(false);
    setSelectedCandidates([]);
    setJobDescription("");
    setJobDescriptionFile(null);
    setCandidateFilter("");
    setInterviewFilter("");
  };

  const getFitmentScoreColor = (score: number) => {
    if (score >= 90) return "text-success font-bold";
    if (score >= 80) return "text-info font-semibold";
    if (score >= 70) return "text-warning font-medium";
    return "text-error font-medium";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fitment Interviews</h1>
          <p className="text-foreground-muted mt-2">
            Specialized interviews tailored to specific job roles and requirements.
          </p>
        </div>
        <Dialog open={isUploadJDOpen} onOpenChange={setIsUploadJDOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary border-0 shadow-brand">
              <Upload className="w-4 h-4 mr-2" />
              Upload Job Description
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Fitment Interview with Job Description</DialogTitle>
              <DialogDescription>
                Upload job description and select candidates for role-specific assessment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
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

              <div>
                <Label className="text-base font-medium">Select Candidates</Label>
                <div className="mt-3 space-y-4">
                  {/* Filters */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Filter by candidate name..."
                        value={candidateFilter}
                        onChange={(e) => setCandidateFilter(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={interviewFilter} onValueChange={setInterviewFilter}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Filter by interview" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Interviews</SelectItem>
                        {uniqueInterviews.map(interview => (
                          <SelectItem key={interview} value={interview}>
                            {interview}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {(candidateFilter || interviewFilter) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCandidateFilter("");
                          setInterviewFilter("");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Select All */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-upload"
                      checked={selectedCandidates.length === filteredCandidatesForSelection.length && filteredCandidatesForSelection.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label htmlFor="select-all-upload" className="font-medium">
                      Select All ({filteredCandidatesForSelection.length} candidates)
                    </Label>
                  </div>

                  {/* Candidate List */}
                  <div className="max-h-60 overflow-y-auto space-y-2 border rounded-md p-3">
                    {filteredCandidatesForSelection.map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-2 hover:bg-accent rounded">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`candidate-upload-${candidate.id}`}
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={(checked) => handleCandidateSelect(candidate.id, checked as boolean)}
                          />
                          <div>
                            <Label htmlFor={`candidate-upload-${candidate.id}`} className="font-medium">
                              {candidate.name}
                            </Label>
                            <div className="text-sm text-foreground-muted">
                              {candidate.email} • Score: {candidate.score}%
                            </div>
                            <div className="text-xs text-foreground-muted">
                              {candidate.interview}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={candidate.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsUploadJDOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFitmentFromUpload} className="bg-gradient-primary border-0">
                  Create Fitment Interview ({selectedCandidates.length} candidates)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary-light rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-foreground-muted">Total Fitments</p>
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
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-foreground-muted">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent-light rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-brand-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-foreground-muted">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-info-light rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">90</p>
                <p className="text-sm text-foreground-muted">Avg. Fitment Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How Fitment Works */}
      <Card className="border-brand-primary-light bg-gradient-to-r from-brand-primary-light/20 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">How Fitment Interviews Work</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Fitment interviews are created automatically when you shortlist candidates from regular interviews. 
                Upload the specific job description and role requirements, and our AI will conduct a targeted interview 
                focusing on role-specific competencies and job fit. The fitment score indicates how well the candidate 
                matches the specific position requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-foreground-muted" />
            <Input
              placeholder="Search fitment interviews by candidate, position, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fitment Interviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fitment Interviews by Interview ({filteredInterviews.length})</CardTitle>
          <CardDescription>
            Role-specific interviews grouped by original interview name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interview Name</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead>Status Summary</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Avg. Fitment Score</TableHead>
                <TableHead>Recent Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.map((interview) => {
                const totalCandidates = interview.candidates.length;
                const completedCandidates = interview.candidates.filter(c => c.status === "completed");
                const avgScore = completedCandidates.length > 0 
                  ? Math.round(completedCandidates.reduce((sum, c) => sum + (c.fitmentScore || 0), 0) / completedCandidates.length)
                  : null;
                const completionRate = Math.round((completedCandidates.length / totalCandidates) * 100);

                return (
                  <TableRow 
                    key={interview.id} 
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => handleRowClick(interview)}
                  >
                    <TableCell>
                      <div className="font-medium text-foreground">{interview.interviewName}</div>
                      <div className="text-sm text-foreground-muted">
                        Interview ID: {interview.interviewId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-foreground">{totalCandidates} candidates</div>
                        <div className="text-foreground-muted">
                          {interview.candidates.slice(0, 2).map(c => c.candidate).join(", ")}
                          {totalCandidates > 2 && ` +${totalCandidates - 2} more`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {completedCandidates.length > 0 && (
                          <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">
                            {completedCandidates.length} completed
                          </span>
                        )}
                        {interview.candidates.filter(c => c.status === "in-progress").length > 0 && (
                          <span className="text-xs bg-info/20 text-info px-2 py-1 rounded">
                            {interview.candidates.filter(c => c.status === "in-progress").length} in progress
                          </span>
                        )}
                        {interview.candidates.filter(c => c.status === "scheduled").length > 0 && (
                          <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                            {interview.candidates.filter(c => c.status === "scheduled").length} scheduled
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{completionRate}%</span>
                        <div className="w-20 bg-accent rounded-full h-2">
                          <div 
                            className="bg-brand-primary h-2 rounded-full" 
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {avgScore ? (
                        <span className={getFitmentScoreColor(avgScore)}>
                          {avgScore}%
                        </span>
                      ) : (
                        <span className="text-foreground-muted">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-foreground-muted">
                        {interview.candidates
                          .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())[0]?.created}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}