import { useState } from "react";
import { Search, Filter, Plus, Calendar, Users, Clock, Play, Pause, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
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

// Mock interview data
const interviews = [
  {
    id: 1,
    title: "Senior Accountant Assessment",
    type: "Accounting",
    created: "2024-01-15",
    status: "in-progress" as Status,
    candidates: 12,
    duration: "45 min",
    voiceType: "Professional Female",
    communications: { email: true, phone: true, sms: false }
  },
  {
    id: 2,
    title: "Tax Consultant Evaluation",
    type: "Taxation", 
    created: "2024-01-14",
    status: "completed" as Status,
    candidates: 8,
    duration: "60 min",
    voiceType: "Professional Male",
    communications: { email: true, phone: false, sms: true }
  },
  {
    id: 3,
    title: "Business Consultant Screen",
    type: "Consulting",
    created: "2024-01-13",
    status: "pending" as Status,
    candidates: 0,
    duration: "30 min",
    voiceType: "Friendly Female",
    communications: { email: true, phone: true, sms: true }
  },
  {
    id: 4,
    title: "Financial Analyst Review",
    type: "Accounting",
    created: "2024-01-12",
    status: "cancelled" as Status,
    candidates: 15,
    duration: "50 min",
    voiceType: "Professional Male",
    communications: { email: true, phone: false, sms: false }
  }
];

export default function ManageInterviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { toast } = useToast();

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         interview.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || interview.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  const handleAction = (action: string, interviewId: number, title: string) => {
    toast({
      title: `Interview ${action}`,
      description: `"${title}" has been ${action.toLowerCase()}.`,
    });
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'accounting': return 'bg-brand-primary-light text-brand-primary-dark';
      case 'taxation': return 'bg-brand-secondary-light text-brand-secondary-dark';
      case 'consulting': return 'bg-brand-accent-light text-brand-accent-dark';
      default: return 'bg-muted text-foreground-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Interviews</h1>
          <p className="text-foreground-muted mt-2">
            Monitor and control all your AI interviews in one place.
          </p>
        </div>
        <Button className="bg-gradient-primary border-0 shadow-brand">
          <Plus className="w-4 h-4 mr-2" />
          Create New Interview
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-primary-light rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-foreground-muted">Active Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-secondary-light rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-brand-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">35</p>
                <p className="text-sm text-foreground-muted">Total Candidates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent-light rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-brand-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-foreground-muted">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">47</p>
                <p className="text-sm text-foreground-muted">Avg. Duration (min)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-foreground-muted" />
              <Input
                placeholder="Search interviews by title or type..."
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Interviews ({filteredInterviews.length})</CardTitle>
          <CardDescription>
            Manage your AI interviews, monitor progress, and control settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interview</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Candidates</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Voice</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{interview.title}</div>
                      <div className="text-sm text-foreground-muted">
                        ID: #{interview.id.toString().padStart(3, '0')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(interview.type)}`}>
                      {interview.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={interview.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-foreground-muted" />
                      <span className="font-medium text-foreground">{interview.candidates}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground-muted">
                    {interview.duration}
                  </TableCell>
                  <TableCell className="text-foreground-muted">
                    {interview.voiceType}
                  </TableCell>
                  <TableCell className="text-foreground-muted">
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
                          onClick={() => handleAction("viewed", interview.id, interview.title)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("edited", interview.id, interview.title)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Interview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {interview.status === "in-progress" ? (
                          <DropdownMenuItem
                            onClick={() => handleAction("paused", interview.id, interview.title)}
                            className="cursor-pointer text-warning"
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Interview
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleAction("activated", interview.id, interview.title)}
                            className="cursor-pointer text-success"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Activate Interview
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleAction("deleted", interview.id, interview.title)}
                          className="cursor-pointer text-error"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Interview
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