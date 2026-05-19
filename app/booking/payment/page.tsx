"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Building, QrCode, Wallet, Shield, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressIndicator } from '@/components/booking/ProgressIndicator';
import { api } from '@/lib/api';

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingAmount, setBookingAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('CREDIT_CARD');
  const [error, setError] = useState<string>('');
  
  const steps = ['Select Ticket', 'Passenger Details', 'Payment'];

  useEffect(() => {
    console.log('🔍 Payment page loaded');
    
    // Get booking ID from sessionStorage
    const storedBookingId = sessionStorage.getItem('currentBookingId');
    const storedAmount = sessionStorage.getItem('currentBookingAmount');
    
    console.log('📦 Retrieved booking ID:', storedBookingId);
    console.log('📦 Retrieved amount:', storedAmount);
    
    if (!storedBookingId) {
      console.error('❌ No booking ID found, redirecting to booking');
      router.push('/booking');
      return;
    }
    
    setBookingId(storedBookingId);
    setBookingAmount(storedAmount ? Number(storedAmount) : 0);
    setLoading(false);
  }, [router]);

  const handlePayment = async () => {
    if (!bookingId) {
      setError('No booking found. Please try again.');
      return;
    }
    
    setProcessing(true);
    setError('');
    
    try {
      console.log('💳 Creating payment intent for booking:', bookingId);
      console.log('💰 Amount:', bookingAmount);
      console.log('💳 Method:', paymentMethod);
      
      // Create payment intent
      const payment = await api.createPaymentIntent(bookingId, bookingAmount, paymentMethod);
      console.log('✅ Payment intent created:', payment);
      
      // If there's a checkout URL, redirect to Xendit
      if (payment.checkoutUrl) {
        console.log('🔀 Redirecting to Xendit checkout:', payment.checkoutUrl);
        window.location.href = payment.checkoutUrl;
      } else if (payment.paymentId) {
        // Otherwise go to success page
        console.log('🔀 Redirecting to success page');
        router.push(`/booking/success?bookingId=${bookingId}`);
      } else {
        throw new Error('No checkout URL or payment ID returned');
      }
      
    } catch (err: any) {
      console.error('❌ Payment failed:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleBack = () => {
    router.push('/booking/passenger');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'CREDIT_CARD', name: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, JCB' },
    { id: 'BANK_TRANSFER', name: 'Bank Transfer', icon: Building, description: 'BCA, Mandiri, BRI, BNI' },
    { id: 'QRIS', name: 'QRIS', icon: QrCode, description: 'Scan with any payment app' },
    { id: 'EWALLET', name: 'E-Wallet', icon: Wallet, description: 'GoPay, OVO, Dana, LinkAja' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Payment</h1>
          <p className="text-blue-100">Complete your booking securely</p>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="container mx-auto px-4 mt-6">
        <ProgressIndicator currentStep={3} steps={steps} />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form Section */}
          <div className="lg:col-span-2">
            {/* Security Notice */}
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Secure Payment</p>
                    <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={isSelected}
                          onChange={() => setPaymentMethod(method.id)}
                          className="h-4 w-4 text-blue-600 accent-blue-600"
                        />
                        <Icon className="h-5 w-5 text-gray-500" />
                        <div>
                          <span className="font-medium">{method.name}</span>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={processing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Lock className="mr-2 h-4 w-4" />
                {processing ? 'Processing...' : `Pay IDR ${bookingAmount.toLocaleString()}`}
              </Button>
            </div>
          </div>
          
          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-mono text-sm font-medium">{bookingId}</p>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Payment</span>
                    <span className="text-blue-600">IDR {bookingAmount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center pt-2">
                  You will be redirected to complete payment
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}