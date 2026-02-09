'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Clock,
  XCircle,
  Sparkles,
  Building2,
  Calculator,
  Download,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { metaTrack } from '@/lib/meta-pixel';

// ====== FEATURES DATA ======
const features = [
  {
    icon: Zap,
    title: 'Lightning-Fast BOQ Builder',
    description:
      'Create categories and items with instant totals. No formulas, no errors—just fast estimation that wins projects.',
  },
  {
    icon: FileCheck,
    title: 'Professional PDF Export',
    description:
      'Generate clean, A4-formatted PDFs ready for clients. Cover pages and item details exported in seconds.',
  },
  {
    icon: Palette,
    title: 'Custom Templates & Themes',
    description:
      'Start projects faster with reusable templates. Customize colors for consistent, professional branding.',
  },
  {
    icon: FileText,
    title: 'Notes & Specifications',
    description:
      'Add detailed notes and specifications to any item. Keep all project details organized in one place.',
  },
  {
    icon: Users,
    title: 'Customer Management',
    description:
      'Track all your clients effortlessly. Quickly assign customers to new BOQs with one click.',
  },
  {
    icon: Shield,
    title: 'Secure & Multi-tenant',
    description:
      'Your data is isolated and secure. Invite team members to collaborate on estimates together.',
  },
];

// ====== PAIN POINTS / SOLUTIONS ======
const painPoints = [
  {
    pain: 'Hours spent in Excel fixing formula errors',
    solution: 'Automatic calculations with zero errors',
    icon: XCircle,
  },
  {
    pain: 'Unprofessional quotes losing you contracts',
    solution: 'Polished PDFs that impress clients',
    icon: XCircle,
  },
  {
    pain: 'Starting from scratch on every project',
    solution: 'Reusable templates save hours',
    icon: XCircle,
  },
];

// ====== HOW IT WORKS STEPS ======
const steps = [
  {
    step: '1',
    title: 'Create Your BOQ',
    description: 'Add categories and items with quantities and rates. Totals calculate automatically.',
    icon: Calculator,
  },
  {
    step: '2',
    title: 'Customize & Brand',
    description: 'Add your logo, customize cover pages, and apply your color theme.',
    icon: Palette,
  },
  {
    step: '3',
    title: 'Export Professional PDF',
    description: 'Generate a polished A4 document ready to send to clients in seconds.',
    icon: Download,
  },
];

// ====== FAQs ======
const faqs = [
  {
    question: 'What is a Bill of Quantities (BOQ)?',
    answer:
      'A Bill of Quantities is a document used in construction that lists all materials, parts, and labor with their costs. It helps contractors provide accurate project estimates and win more bids.',
  },
  {
    question: 'Can I customize the PDF output?',
    answer:
      'Yes! You can customize cover pages with your logo, project details, and styling. Apply color themes to match your company branding across all exports.',
  },
  {
    question: 'Is my data secure?',
    answer:
      "Absolutely. Each company's data is completely isolated using row-level security. We use industry-standard encryption and security practices to protect your information.",
  },
  {
    question: 'Can I invite team members?',
    answer:
      'Yes, you can invite team members to your company workspace. Everyone shares access to BOQs, customers, and templates while maintaining data security.',
  },
  {
    question: 'Is there a free plan available?',
    answer:
      'Yes! Our Free Forever plan lets you create unlimited BOQs with up to 15 items each. Perfect for trying out MakeEstimate or for small projects.',
  },
];

// ====== ANIMATED SECTION WRAPPER ======
function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ====== FAQ ACCORDION ITEM ======
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-purple-100">
      <button
        className="w-full py-5 flex items-center justify-between text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-foreground group-hover:text-purple-600 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-purple-400 transition-transform duration-300',
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
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

// ====== MAIN HOME PAGE ======
export default function HomePage() {
  const router = useRouter();

  // Track Lead event and navigate to register
  const handleStartFree = useCallback((source: string) => {
    metaTrack('Lead', { content_name: 'StartFree', source });
    router.push('/register');
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNavbar />

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-hero">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-lavender-200/30 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: '1.5s' }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Built for Construction Professionals</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Win More Projects by{' '}
                <span className="gradient-text">Creating BOQs Faster</span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Create professional Bills of Quantities in minutes—not hours.
              No Excel, no formulas, no errors. Just fast, clean estimates
              that help you win contracts.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={() => handleStartFree('hero')}
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="text-base px-8 py-6">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero visual placeholder */}
          <motion.div
            className="mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-white rounded-3xl shadow-xl border border-purple-100/50 p-4 sm:p-6">
              <div className="aspect-video bg-gradient-to-br from-purple-50 to-lavender-50 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <p className="mt-4 text-muted-foreground font-medium">Your Professional BOQ Dashboard</p>
                  <div className="mt-6 flex justify-center gap-3 flex-wrap">
                    {['Categories', 'Items', 'Totals', 'PDF Export'].map((label, i) => (
                      <div
                        key={label}
                        className={cn(
                          'px-4 py-2 rounded-xl text-sm font-medium',
                          i === 0 && 'bg-purple-100 text-purple-700',
                          i === 1 && 'bg-lavender-100 text-lavender-600',
                          i === 2 && 'bg-emerald-100 text-emerald-700',
                          i === 3 && 'bg-blue-100 text-blue-700'
                        )}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF STRIP ============ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-purple-100/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Built for{' '}
            <span className="text-purple-600">Quantity Surveyors</span>,{' '}
            <span className="text-lavender-600">Contractors</span>, and{' '}
            <span className="text-purple-600">Project Managers</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['Fast Setup', 'No Excel Needed', 'Cloud-Based', 'Secure Data'].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM → SOLUTION SECTION ============ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Stop Wasting Time on{' '}
              <span className="gradient-text">Broken Spreadsheets</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Traditional methods are costing you projects. MakeEstimate solves the
              problems that hold back construction professionals.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl border border-purple-100/50 p-6 shadow-card hover:shadow-card-hover transition-all duration-200">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-red-600 font-medium text-sm line-through decoration-red-300">
                      {item.pain}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-emerald-700 font-medium text-sm">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50/50 to-background"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything You Need for{' '}
              <span className="gradient-text">Professional Estimates</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed specifically for construction
              professionals who want to create better estimates, faster.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.1}>
                <div className="p-6 bg-white rounded-2xl border border-purple-100/50 shadow-card hover:shadow-card-hover transition-all duration-200 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-lavender-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS SECTION ============ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Get Started in{' '}
              <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From empty document to professional PDF in minutes, not hours.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.15}>
                <div className="relative text-center">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-lavender-200" />
                  )}
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-lavender-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="mt-1 -translate-y-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-white border-2 border-purple-200 rounded-full text-purple-600 font-bold text-sm shadow-sm">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING TEASER SECTION ============ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-lavender-600">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Start free and upgrade as you grow. No hidden fees, no surprises.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 text-white">
                <div className="text-3xl font-bold">$0</div>
                <div className="text-purple-100">Free Forever Plan</div>
              </div>
              <div className="text-white text-2xl hidden sm:block">→</div>
              <div className="bg-white rounded-2xl px-8 py-4 text-purple-700 shadow-lg">
                <div className="text-3xl font-bold">From $19</div>
                <div className="text-purple-500">Pro Plans</div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-base shadow-lg"
                >
                  View All Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-purple-100/50 p-6 sm:p-8 shadow-card">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ FINAL CTA SECTION ============ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="bg-white rounded-3xl border border-purple-100/50 p-8 sm:p-12 shadow-xl">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-lavender-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-foreground">
                Ready to Win More Projects?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of construction professionals who save hours
                every week with MakeEstimate. Start creating professional
                BOQs today—completely free.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-base shadow-lg"
                  onClick={() => handleStartFree('final_cta')}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="px-8 py-6 text-base">
                    Compare Plans
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required • Free forever plan available
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
