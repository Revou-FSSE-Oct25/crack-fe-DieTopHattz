"use client";

import { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  CreditCard, 
  XCircle, 
  Download, 
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpTopicCard } from '@/components/help/HelpTopicCard';
import { FAQItem } from '@/components/help/FAQItem';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faq');
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  // Help topics
  const helpTopics = [
    {
      icon: BookOpen,
      title: 'Booking Guide',
      description: 'How to book your ferry ticket',
      action: () => document.getElementById('faq-booking')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Payment options and security',
      action: () => document.getElementById('faq-payment')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: XCircle,
      title: 'Cancellation Policy',
      description: 'Cancel or modify your booking',
      action: () => document.getElementById('faq-cancellation')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      icon: Download,
      title: 'Download Ticket',
      description: 'How to get your ticket',
      action: () => document.getElementById('faq-ticket')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ];

  // FAQ data
  const faqs = [
    {
      id: 'booking',
      question: 'How do I book a ferry ticket?',
      answer: 'To book a ferry ticket, simply go to the Find Ferries page, select your route, date, and passenger count, then choose your preferred class. Fill in passenger details, make payment, and you\'ll receive a confirmation email with your ticket.',
    },
    {
      id: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept Credit/Debit Cards (Visa, Mastercard, JCB), Bank Transfer (BCA, Mandiri, BRI, BNI), QRIS, and E-Wallets (GoPay, OVO, Dana, LinkAja). All payments are secure and encrypted.',
    },
    {
      id: 'cancellation',
      question: 'How do I cancel my booking?',
      answer: 'You can cancel your booking from the My Bookings page. Find your booking and click "Cancel". Cancellations made 24 hours before departure receive a full refund. Cancellations within 24 hours are subject to a 50% cancellation fee.',
    },
    {
      id: 'ticket',
      question: 'How do I download my ticket?',
      answer: 'After successful payment, you can download your ticket from the Success page or from My Bookings page. Click "Download Ticket" to get your PDF ticket. You can also print it directly.',
    },
    {
      id: 'refund',
      question: 'How long does refund take?',
      answer: 'Refunds are processed within 5-7 business days after cancellation confirmation. The time it takes to appear in your account depends on your bank or payment provider.',
    },
    {
      id: 'change',
      question: 'Can I change my booking date?',
      answer: 'Yes, you can modify your booking up to 48 hours before departure. Please contact our support team at support@ferrygo.com with your booking ID and requested changes.',
    },
    {
      id: 'vehicle',
      question: 'Can I bring a vehicle on the ferry?',
      answer: 'Yes, we have passenger-vehicle ferries on selected routes. When searching, select "Passenger + Vehicle" ship type. You\'ll be asked about vehicle details during the booking process.',
    },
    {
      id: 'children',
      question: 'Are there discounts for children?',
      answer: 'Children under 5 years old travel free. Children aged 5-12 receive 50% discount on economy class tickets. Please contact support for child ticket booking assistance.',
    },
  ];

  // Filter FAQs based on search
  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  // Contact methods
  const contactMethods = [
    { icon: Mail, label: 'Email Support', value: 'support@ferrygo.com', action: 'mailto:support@ferrygo.com' },
    { icon: Phone, label: 'Call Us', value: '+62 123 4567 890', action: 'tel:+621234567890' },
    { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7', action: '#' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Search */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm mb-4">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help Center</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-blue-100 mb-8">Find answers to common questions or contact our support team</p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base bg-white text-gray-800 border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Help Topics Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Browse Help Topics</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {helpTopics.map((topic, index) => (
              <HelpTopicCard
                key={index}
                icon={topic.icon}
                title={topic.title}
                description={topic.description}
                onClick={topic.action}
              />
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16" id="faq-section">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find quick answers to common questions</p>
          </div>
          
          {filteredFaqs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-1">Try different keywords or browse the categories below</p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  value={`item-${index}`}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </Accordion>
          )}
        </div>
        
        {/* Contact Section - Horizontal Layout like My Bookings */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Still need help?</h2>
            <p className="text-gray-500">Our support team is ready to assist you</p>
          </div>
          
          {/* Horizontal Filter Tabs */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  activeTab === 'faq'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium">FAQ</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  activeTab === 'contact'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium">Contact Form</span>
              </button>
              <button
                onClick={() => setActiveTab('methods')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  activeTab === 'methods'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">Contact Methods</span>
              </button>
            </div>
          </div>
          
          {/* FAQ Content */}
          {activeTab === 'faq' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-3">
                    {filteredFaqs.slice(0, 5).map((faq, index) => (
                      <FAQItem
                        key={index}
                        value={`contact-faq-${index}`}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    ))}
                    {filteredFaqs.length > 5 && (
                      <div className="text-center pt-4">
                        <Button variant="link" onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}>
                          View all FAQs <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Contact Form Content */}
          {activeTab === 'contact' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {submitted ? (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-700">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your issue or question..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Mail className="mr-2 h-4 w-4" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Contact Methods Content */}
          {activeTab === 'methods' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.action}
                        className="flex flex-col items-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 text-center"
                      >
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{method.label}</h3>
                        <p className="text-sm text-gray-500">{method.value}</p>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}