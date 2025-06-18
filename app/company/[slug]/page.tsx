'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  RotateCcw,
  Circle,
} from 'lucide-react';
import Link from 'next/link';

interface Problem {
  id: number;
  leetcodeId: number;
  title: string;
  acceptance: string;
  difficulty: string;
  frequency: number;
  link: string;
  userStatus: Array<{ status: string }>;
}

interface Company {
  id: number;
  name: string;
  problems: Problem[];
}

export default function CompanyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanyProblems = useCallback(async () => {
    try {
      const response = await fetch(`/api/companies/${slug}/problems`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
      }
    } catch (error) {
      console.error('Error fetching company problems:', error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (slug) {
      fetchCompanyProblems();
    }
  }, [slug, session, status, router, fetchCompanyProblems]);

  const updateProgress = async (problemId: number, status: string) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problemId.toString(),
          status,
        }),
      });

      // Refresh the data
      fetchCompanyProblems();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'DONE':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'REDO':
        return <RotateCcw className="h-5 w-5 text-orange-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading problems...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Company not found</p>
            <Link href="/">
              <Button className="mt-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completedCount = company.problems.filter(
    (p) => p.userStatus[0]?.status === 'DONE'
  ).length;
  const redoCount = company.problems.filter(
    (p) => p.userStatus[0]?.status === 'REDO'
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {company.name.replace(/-/g, ' ')}
              </h1>
              <p className="text-gray-600">
                {company.problems.length} problems available
              </p>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Circle className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-lg font-semibold">
                    {company.problems.length - completedCount - redoCount}
                  </p>
                  <p className="text-sm text-gray-600">Todo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{completedCount}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-orange-600 mr-2" />
                <div>
                  <p className="text-lg font-semibold">{redoCount}</p>
                  <p className="text-sm text-gray-600">Redo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div>
                <p className="text-lg font-semibold">
                  {company.problems.length > 0
                    ? Math.round(
                        (completedCount / company.problems.length) * 100
                      )
                    : 0}
                  %
                </p>
                <p className="text-sm text-gray-600">Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {company.problems.map((problem) => {
            const currentStatus = problem.userStatus[0]?.status;
            return (
              <Card
                key={problem.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(currentStatus)}
                        <span className="font-mono text-sm text-gray-500">
                          #{problem.leetcodeId}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {problem.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={getDifficultyColor(problem.difficulty)}
                          >
                            {problem.difficulty}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {problem.acceptance} acceptance
                          </span>
                          <span className="text-sm text-gray-500">
                            Frequency: {problem.frequency.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={
                          currentStatus === 'DONE' ? 'default' : 'outline'
                        }
                        onClick={() =>
                          updateProgress(
                            problem.id,
                            currentStatus === 'DONE' ? 'TODO' : 'DONE'
                          )
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Done
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          currentStatus === 'REDO' ? 'default' : 'outline'
                        }
                        onClick={() =>
                          updateProgress(
                            problem.id,
                            currentStatus === 'REDO' ? 'TODO' : 'REDO'
                          )
                        }
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Redo
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {company.problems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No problems found for this company.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
