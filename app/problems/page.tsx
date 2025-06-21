'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  BookOpen,
  CheckCircle,
  RotateCcw,
  Circle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Company } from '@/interface/Company';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchCompanies();
  }, [session, status, router]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        toast.error('Failed to load companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading problems...</p>
        </div>
      </div>
    );
  }

  // Calculate overall stats
  const totalProblems = companies.reduce(
    (sum, company) => sum + company.stats.total,
    0
  );
  const totalCompleted = companies.reduce(
    (sum, company) => sum + company.stats.completed,
    0
  );
  const totalRedo = companies.reduce(
    (sum, company) => sum + company.stats.redo,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your progress on company-specific LeetCode problems. Select a
            company to start practicing!
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.length}
                </p>
                <p className="text-gray-600">Companies</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <BookOpen className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalProblems}
                </p>
                <p className="text-gray-600">Total Problems</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCompleted}
                </p>
                <p className="text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <RotateCcw className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalRedo}</p>
                <p className="text-gray-600">Need Review</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card
              key={company.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize">
                    {company.name.replace(/-/g, ' ')}
                  </span>
                  <Badge variant="secondary">{company._count.problems}</Badge>
                </CardTitle>
                <CardDescription>
                  {company._count.problems} problems available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">
                      {company.stats.progress}%
                    </span>
                  </div>
                  <Progress value={company.stats.progress} className="h-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="flex items-center space-x-1">
                      <Circle className="h-3 w-3 text-gray-400" />
                      <span className="text-sm font-medium">
                        {company.stats.todo}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Todo</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span
                        className={`text-sm font-medium ${
                          company.stats.completed === 0
                            ? 'text-black'
                            : 'text-green-600'
                        }`}
                      >
                        {company.stats.completed}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Done</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <div className="flex items-center space-x-1">
                      <RotateCcw className="h-3 w-3 text-orange-600" />
                      <span
                        className={`text-sm font-medium ${
                          company.stats.redo === 0
                            ? 'text-black'
                            : 'text-orange-600'
                        }`}
                      >
                        {company.stats.redo}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Redo</span>
                  </div>
                </div>

                <Button
                  className="w-full cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/company/${company.name}`)
                  }
                  variant={company.stats.completed > 0 ? 'default' : 'outline'}
                >
                  {company.stats.completed > 0 ? 'Continue' : 'Start'}{' '}
                  Practicing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No companies found. Please seed the database first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
