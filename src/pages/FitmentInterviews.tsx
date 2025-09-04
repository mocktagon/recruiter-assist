import { useState } from "react";
import { Search, Upload, FileText, UserCheck, Clock, Target, MoreHorizontal, Eye, Download } from "lucide-react";
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
import { StatusBadge, Status } from "@/components/dashboard/StatusBadge";
import { useToast } from "@/hooks/use-toast";

// Mock fitment interview data
const fitmentInterviews = [
  {
    id: 1,
    title: "Senior Accountant Fitment",
    originalInterview: "Senior Accountant Assessment",
    candidate: "Sarah Johnson",
    position: "Senior Accountant - ABC Corp",
    jobDescription: "senior_accountant_jd.pdf",
    status: "completed" as Status,
    fitmentScore: 92,
    created: "2024-01-16",
    completedDate: "2024-01-16"
  },
  {
    id: 2,
    title: "Tax Consultant Fitment",
    originalInterview: "Tax Consultant Evaluation", 
    candidate: "James Wilson",
    position: "Tax Manager - XYZ Ltd",
    jobDescription: "tax_manager_jd.pdf",
    status: "in-progress" as Status,
    fitmentScore: null,
    created: "2024-01-15",
    completedDate: null
  },
  {
    id: 3,
    title: "Business Consultant Fitment",
    originalInterview: "Business Consultant Screen",
    candidate: "David Kim",
    position: "Senior Consultant - DEF Inc",
    jobDescription: "consultant_jd.pdf", 
    status: "scheduled" as Status,
    fitmentScore: null,
    created: "2024-01-14",
    completedDate: null
  },
  {
    id: 4,
    title: "Financial Analyst Fitment",
    originalInterview: "Financial Analyst Review",
    candidate: "Lisa Rodriguez",
    position: "Financial Analyst - GHI Corp",
    jobDescription: "financial_analyst_jd.pdf",
    status: "completed" as Status,
    fitmentScore: 88,
    created: "2024-01-13",
    completedDate: "2024-01-14"
  }
];

export default function FitmentInterviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredInterviews = fitmentInterviews.filter(interview => {
    return interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           interview.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
           interview.position.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleViewDetails = (interviewId: number) => {
    toast({
      title: "View Fitment Details",
      description: "Opening detailed fitment interview analysis...",
    });
  };

  const handleUploadJD = () => {
    toast({
      title: "Upload Job Description",
      description: "Opening file upload dialog...",
    });
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
        <Button 
          onClick={handleUploadJD}
          className="bg-gradient-primary border-0 shadow-brand"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Job Description
        </Button>
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
          <CardTitle>Fitment Interviews ({filteredInterviews.length})</CardTitle>
          <CardDescription>
            Role-specific interviews based on uploaded job descriptions and requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate & Position</TableHead>
                <TableHead>Original Interview</TableHead>
                <TableHead>Job Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fitment Score</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{interview.candidate}</div>
                      <div className="text-sm text-foreground-muted">{interview.position}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{interview.title}</div>
                      <div className="text-foreground-muted">from {interview.originalInterview}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-primary" />
                      <span className="text-sm text-foreground-muted">{interview.jobDescription}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={interview.status} />
                  </TableCell>
                  <TableCell>
                    {interview.fitmentScore ? (
                      <span className={getFitmentScoreColor(interview.fitmentScore)}>
                        {interview.fitmentScore}%
                      </span>
                    ) : (
                      <span className="text-foreground-muted">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-foreground-muted text-sm">
                    {interview.created}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-surface border-border">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(interview.id)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Fitment Report
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Job Description
                        </DropdownMenuItem>
                        {interview.status === "completed" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-success">
                              <UserCheck className="mr-2 h-4 w-4" />
                              Recommend for Hire
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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