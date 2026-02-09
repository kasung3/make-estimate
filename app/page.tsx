'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';
import {
  FileText,
  Zap,
  Palette,
  FileCheck,
  Users,
  Shield,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'Fast BOQ Builder',
    description:
      'Create categories and items with instant totals. No formulas, no errors—just fast estimation.',
  },
  {
    icon: FileCheck,
    title: 'Professional PDF Export',
    description:
      'Generate clean, A4-formatted PDFs ready for clients. Cover pages and item details in seconds.',
  },
  {
    icon: Palette,
    title: 'Templates & Themes',
    description:
      'Start projects faster with reusable templates. Customize colors for consistent branding.',
  },
  {
    icon: FileText,
    title: 'Notes & Specifications',
    description:
      'Add detailed notes and specifications to any item. Keep all project details in one place.',
  },
  {
    icon: Users,
    title: 'Customer Management',
    description:
      'Track all your clients in one place. Quickly assign customers to new BOQs.',
  },
  {
    icon: Shield,
    title: 'Secure & Multi-tenant',
    description:
      'Your data is isolated and secure. Invite team members to collaborate on estimates.',
  },
];

const faqs = [
  {
    question: 'What is a Bill of Quantities (BOQ)?',
    answer:
      'A Bill of Quantities is a document used in construction that lists all materials, parts, and labor with their costs. It helps contractors provide accurate project estimates.',
  },
  {
    question: 'Can I customize the PDF output?',
    answer:
      'Yes! You can customize cover pages with your logo, project details, and styling. You can also apply color themes to match your company branding.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. Each company\'s data is completely isolated. We use industry-standard encryption and security practices to protect your information.',
  },
  {
    question: 'Can I invite team members?',
    answer:
      'Yes, you can invite team members to your company workspace. Everyone shares access to BOQs, customers, and templates.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-5 flex items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-gray-500 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-40 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNavbar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-white to-teal-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated gradient blob */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-200/40 to-teal-200/40 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-200/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Win More Construction Projects by{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Creating BOQs Faster
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Start with templates and generate professional BOQs within minutes—no Excel, no spreadsheets.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/register">
                <Button size="lg" className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="text-base px-8 py-6">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero illustration placeholder */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <p className="mt-4 text-gray-500 font-medium">Your Professional BOQ Dashboard</p>
                  <div className="mt-6 flex justify-center gap-4 flex-wrap">
                    <div className="px-4 py-2 bg-cyan-50 rounded-lg text-cyan-700 text-sm font-medium">
                      Categories
                    </div>
                    <div className="px-4 py-2 bg-teal-50 rounded-lg text-teal-700 text-sm font-medium">
                      Items
                    </div>
                    <div className="px-4 py-2 bg-emerald-50 rounded-lg text-emerald-700 text-sm font-medium">
                      Totals
                    </div>
                    <div className="px-4 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium">
                      PDF Export
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything you need for{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                professional estimates
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built specifically for quantity surveyors, contractors, and project managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium text-gray-700">
            Built for <span className="text-cyan-600">Quantity Surveyors</span>,{' '}
            <span className="text-teal-600">Contractors</span>, and{' '}
            <span className="text-cyan-600">Project Managers</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {['Fast Setup', 'No Excel Needed', 'Cloud-Based', 'Secure'].map((item) => (
              <div key={item} className="flex items-center space-x-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to create your first BOQ?
          </h2>
          <p className="mt-4 text-lg text-cyan-100">
            Join professionals who are winning more projects with faster, cleaner estimates.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base px-8 py-6 bg-white text-cyan-600 hover:bg-gray-100">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
