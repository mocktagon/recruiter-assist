import { useState } from "react";
import { Search, Filter, Download, UserPlus, MoreHorizontal, Eye, UserCheck, X } from "lucide-react";
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

// Mock candidate data
const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Accountant", 
    interviewDate: "2024-01-15",
    status: "completed" as Status,
    score: 87,
    experience: "5 years"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com", 
    phone: "+1 (555) 234-5678",
    position: "Tax Consultant",
    interviewDate: "2024-01-15",
    status: "in-progress" as Status,
    score: null,
    experience: "3 years"
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789", 
    position: "Financial Analyst",
    interviewDate: "2024-01-16",
    status: "scheduled" as Status,
    score: null,
    experience: "4 years"
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    position: "Audit Manager",
    interviewDate: "2024-01-14", 
    status: "completed" as Status,
    score: 92,
    experience: "8 years"
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@email.com",
    phone: "+1 (555) 567-8901",
    position: "Bookkeeper",
    interviewDate: "2024-01-13",
    status: "under-review" as Status,
    score: 78,
    experience: "2 years"
  },
  {
    id: 6,
    name: "David Kim", 
    email: "david.kim@email.com",
    phone: "+1 (555) 678-9012",
    position: "Tax Specialist",
    interviewDate: "2024-01-12",
    status: "shortlisted" as Status,
    score: 85,
    experience: "6 years"
  }
];

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");
  const { toast } = useToast();

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || candidate.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleShortlist = (candidateId: number, candidateName: string) => {
    toast({
      title: "Candidate Shortlisted",
      description: `${candidateName} has been added to the shortlist for fitment interviews.`,
    });
  };

  const handleViewDetails = (candidateId: number) => {
    toast({
      title: "View Details",
      description: "Opening detailed candidate profile...",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-info";
    if (score >= 70) return "text-warning";
    return "text-error";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
          <p className="text-foreground-muted mt-2">
            Manage and review all candidates who have taken AI interviews.
          </p>
        </div>
        <Button className="bg-gradient-primary border-0 shadow-brand">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-foreground-muted" />
              <Input
                placeholder="Search candidates by name, email, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Candidates ({filteredCandidates.length})</CardTitle>
          <CardDescription>
            Complete list of candidates with their interview status and scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Interview Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{candidate.name}</div>
                      <div className="text-sm text-foreground-muted">{candidate.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground-muted">
                    {candidate.position}
                  </TableCell>
                  <TableCell className="text-foreground-muted">
                    {candidate.interviewDate}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={candidate.status} />
                  </TableCell>
                  <TableCell>
                    {candidate.score ? (
                      <span className={`font-semibold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}%
                      </span>
                    ) : (
                      <span className="text-foreground-muted">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-foreground-muted">
                    {candidate.experience}
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
                          onClick={() => handleViewDetails(candidate.id)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {candidate.status === "completed" && candidate.score && candidate.score >= 75 && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleShortlist(candidate.id, candidate.name)}
                              className="cursor-pointer text-success"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Shortlist for Fitment
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-error">
                          <X className="mr-2 h-4 w-4" />
                          Remove Candidate
                        </DropdownMenuItem>
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