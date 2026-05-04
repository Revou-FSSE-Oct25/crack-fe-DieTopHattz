"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Building, QrCode, Wallet, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ProgressIndicator } from '@/components/booking/ProgressIndicator';
import { BookingSummarySidebar } from '@/components/booking/BookingSummarySidebar';
import { getShipById } from '@/lib/mock-db';

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<any>(null);
  const [ship, setShip] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const steps = ['Select Ticket', 'Passenger Details', 'Payment'];
  
  useEffect(() => {
    const savedBooking = sessionStorage.getItem('bookingData');
    if (!savedBooking) {
      router.push('/booking');
      return;
    }
    
    const parsed = JSON.parse(savedBooking);
    setBookingData(parsed);
    
    const fetchedShip = getShipById(parsed.shipId);
    if (!fetchedShip) {
      router.push('/booking');
      return;
    }
    
    setShip(fetchedShip);
    setLoading(false);
  }, [router]);
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking ID
    const bookingId = `FRY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Save to sessionStorage for success page
    const confirmationData = {
      ...bookingData,
      bookingId,
      paymentMethod,
      paymentDate: new Date().toISOString(),
    };
    sessionStorage.setItem('bookingConfirmation', JSON.stringify(confirmationData));
    
    setIsProcessing(false);
    
    // Navigate to success page
    router.push('/booking/success');
  };
  
  const handleBack = () => {
    router.push('/booking/passenger');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          Loading...
        </div>
      </div>
    );
  }
  
  // Extract data from bookingData
  const className = bookingData?.selectedClass || 'Standard';
  const classPrice = bookingData?.selectedClassPrice || 0;
  const passengerCount = bookingData?.passengers || 1;
  
  // Calculate totals
  const passengerTotal = classPrice * passengerCount;
  const vehicleFee = bookingData?.vehicle?.hasVehicle ? 100000 : 0;
  const total = passengerTotal + vehicleFee;
  
  // Payment methods array for easier mapping
  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, JCB' },
    { id: 'bank', name: 'Bank Transfer', icon: Building, description: 'BCA, Mandiri, BRI, BNI' },
    { id: 'qris', name: 'QRIS', icon: QrCode, description: 'Scan with any payment app' },
    { id: 'ewallet', name: 'E-Wallet', icon: Wallet, description: 'GoPay, OVO, Dana, LinkAja' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
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
            
            {/* Payment Methods - Using native radio buttons (same pattern that works) */}
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
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all ${
                        paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="h-4 w-4 text-blue-600 accent-blue-600"
                        />
                        <Icon className="h-5 w-5 text-gray-500" />
                        <div>
                          <span className="font-medium">{method.name}</span>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                ← Back to Passenger Details
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <>
                    <Lock className="mr-2 h-4 w-4 animate-pulse" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay IDR {total.toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Summary Sidebar */}
          <div>
            <BookingSummarySidebar
              shipName={ship?.name || ''}
              shipType={ship?.type === 'passenger-vehicle' ? 'Passenger + Vehicle Ferry' : 'Passenger Only Ferry'}
              routeFrom={ship?.route.from || ''}
              routeTo={ship?.route.to || ''}
              departureTime={ship?.departureTime || ''}
              selectedClassName={className}
              price={classPrice}
              passengerCount={passengerCount}
              vehicleFee={vehicleFee}
            />
          </div>
        </div>
      </div>
    </div>
  );
}