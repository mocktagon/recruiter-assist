import { useState } from "react";
import { Calendar, TrendingUp, Users, Clock, Target, BarChart3, PieChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatsCard } from "@/components/dashboard/StatsCard";

// Mock analytics data
const performanceMetrics = {
  totalInterviews: 45,
  completionRate: 87.3,
  averageScore: 78.5,
  averageDuration: 42,
  topPerformingType: "Accounting",
  candidateFlow: {
    applied: 248,
    interviewed: 187,
    shortlisted: 47,
    hired: 12
  }
};

const monthlyData = [
  { month: "Jan", interviews: 32, completion: 85, avgScore: 76 },
  { month: "Feb", interviews: 28, completion: 89, avgScore: 78 },
  { month: "Mar", interviews: 45, completion: 87, avgScore: 79 },
  { month: "Apr", interviews: 38, completion: 91, avgScore: 81 },
  { month: "May", interviews: 52, completion: 88, avgScore: 80 },
  { month: "Jun", interviews: 41, completion: 86, avgScore: 77 }
];

const interviewTypeData = [
  { type: "Accounting", interviews: 25, avgScore: 81, completion: 89 },
  { type: "Taxation", interviews: 15, avgScore: 76, completion: 85 },
  { type: "Consulting", interviews: 12, avgScore: 83, completion: 92 }
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("interviews");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-foreground-muted mt-2">
            Comprehensive insights into your AI interviewer performance and candidate metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Interviews"
          value={performanceMetrics.totalInterviews}
          change={{ value: "+12 from last month", positive: true }}
          icon={BarChart3}
          variant="primary"
        />
        <StatsCard
          title="Completion Rate"
          value={`${performanceMetrics.completionRate}%`}
          change={{ value: "+3.2% improvement", positive: true }}
          icon={Target}
          variant="success"
        />
        <StatsCard
          title="Average Score"
          value={performanceMetrics.averageScore}
          change={{ value: "+2.1 points", positive: true }}
          icon={TrendingUp}
        />
        <StatsCard
          title="Avg Duration"
          value={`${performanceMetrics.averageDuration} min`}
          change={{ value: "-3 min optimization", positive: true }}
          icon={Clock}
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Candidate Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-primary" />
                Candidate Flow Analysis
              </CardTitle>
              <CardDescription>
                Track candidates through your recruitment funnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-brand-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{performanceMetrics.candidateFlow.applied}</p>
                  <p className="text-sm text-foreground-muted">Applied</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-secondary-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-8 h-8 text-brand-secondary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{performanceMetrics.candidateFlow.interviewed}</p>
                  <p className="text-sm text-foreground-muted">Interviewed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-accent-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-brand-accent" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{performanceMetrics.candidateFlow.shortlisted}</p>
                  <p className="text-sm text-foreground-muted">Shortlisted</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{performanceMetrics.candidateFlow.hired}</p>
                  <p className="text-sm text-foreground-muted">Hired</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Types Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-brand-primary" />
                Interview Type Performance
              </CardTitle>
              <CardDescription>
                Compare performance across different interview types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviewTypeData.map((type) => (
                  <div key={type.type} className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{type.type}</p>
                        <p className="text-sm text-foreground-muted">{type.interviews} interviews</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{type.avgScore}% avg score</p>
                      <p className="text-sm text-success">{type.completion}% completion</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-16 h-16 text-brand-primary opacity-60 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Performance Charts</h3>
              <p className="text-foreground-muted mb-6">
                Detailed performance charts and visualizations will be displayed here.
              </p>
              <Button className="bg-gradient-primary border-0 shadow-brand">
                View Detailed Charts
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-brand-primary opacity-60 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Candidate Analytics</h3>
              <p className="text-foreground-muted mb-6">
                In-depth candidate performance analysis and demographic insights.
              </p>
              <Button className="bg-gradient-primary border-0 shadow-brand">
                Explore Candidate Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-16 h-16 text-brand-primary opacity-60 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Trend Analysis</h3>
              <p className="text-foreground-muted mb-6">
                Historical trends and predictive analytics for your recruitment process.
              </p>
              <Button className="bg-gradient-primary border-0 shadow-brand">
                View Trends
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}