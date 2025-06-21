'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookOpen,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Code,
  Building2,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Company-Specific
              </span>{' '}
              LeetCode Problems
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Track your progress on problems asked by top tech companies. Get
              hired at your dream company by practicing the right problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Link href="/problems">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-3 cursor-pointer"
                  >
                    Continue Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-3 cursor-pointer"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-3 cursor-pointer"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Code className="h-16 w-16 text-blue-500" />
        </div>
        <div className="absolute top-40 right-10 opacity-20">
          <Target className="h-12 w-12 text-purple-500" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <TrendingUp className="h-14 w-14 text-indigo-500" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the competitive edge you need with our comprehensive tracking
              system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Company-Focused</CardTitle>
                <CardDescription>
                  Practice problems specifically asked by companies you want to
                  join
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access curated problem sets from Google, Amazon, Microsoft,
                  and 100+ other top tech companies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Keep track of completed problems and ones that need more
                  practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mark problems as done or redo, visualize your progress, and
                  stay motivated on your journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Get insights into your preparation with detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track completion rates, identify weak areas, and optimize your
                  study plan for maximum impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Thousands of Successful Candidates
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our platform has helped countless developers land their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-blue-100">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">20000+</div>
              <div className="text-blue-100">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">3</div>
              <div className="text-blue-100">Difficulty Levels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Companies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Practice for Top Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get ready for interviews at the world&apos;s most prestigious tech
              companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Google',
              'Amazon',
              'Microsoft',
              'Apple',
              'Facebook',
              'Netflix',
              'Tesla',
              'Uber',
              'Airbnb',
              'LinkedIn',
              'Twitter',
              'Spotify',
            ].map((company) => (
              <Card
                key={company}
                className="text-center p-4 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-gray-800">{company}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who have successfully prepared for
            their interviews using our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link href="/problems">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-3 cursor-pointer"
                  >
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-3 cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">AlgoMark</span>
            </div>
            <div className="text-gray-400">
              © 2024 AlgoMark. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
