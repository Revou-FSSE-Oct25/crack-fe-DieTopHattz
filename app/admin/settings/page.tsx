"use client";

import { useState } from 'react';
import { 
  Save, 
  Bell, 
  CreditCard,
  Globe,
  Ticket,
  DollarSign,
  Mail,
  Phone,
  Clock,
  Users,
  Car,
  Wallet,
  Shield,
  Settings as SettingsIcon,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function AdminSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'FerryGo',
    siteDescription: 'Book your ferry tickets easily and securely',
    contactEmail: 'support@ferrygo.com',
    contactPhone: '+62 123 4567 890',
    timezone: 'Asia/Jakarta',
  });

  // Booking Settings
  const [bookingSettings, setBookingSettings] = useState({
    maxPassengersPerBooking: 10,
    maxVehiclesPerBooking: 5,
    cancellationHours: 24,
    allowSameDayBooking: true,
    autoConfirmBookings: true,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    enableCreditCard: true,
    enableBankTransfer: true,
    enableQRIS: true,
    enableEWallet: true,
  });

  // Fee Settings
  const [feeSettings, setFeeSettings] = useState({
    serviceFee: 5000,
    vehicleFeeMotorcycle: 50000,
    vehicleFeeCar: 100000,
    vehicleFeeTruck: 200000,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    bookingConfirmationEmail: true,
    cancellationEmail: true,
    paymentReceiptEmail: true,
    adminNewBookingAlert: true,
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSuccess('');
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess('Settings saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const categories = [
    { id: 'general', label: 'General', icon: Globe, color: 'blue', description: 'Site name, contact info, timezone' },
    { id: 'booking', label: 'Booking', icon: Ticket, color: 'green', description: 'Passenger limits, cancellation policy' },
    { id: 'payment', label: 'Payment', icon: CreditCard, color: 'purple', description: 'Cards, bank transfer, e-wallets' },
    { id: 'fees', label: 'Fees', icon: DollarSign, color: 'orange', description: 'Service fees, vehicle rates' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'yellow', description: 'Email alerts and confirmations' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 mt-1">Configure your ferry booking system</p>
        </div>
        <Button 
          onClick={handleSaveSettings} 
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 gap-2 px-6"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      {/* Container 1: Setting Categories - Horizontal Cards */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            const colorClasses = {
              blue: isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
              green: isActive ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300',
              purple: isActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300',
              orange: isActive ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300',
              yellow: isActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300',
            };
            const textColorClasses = {
              blue: isActive ? 'text-blue-700' : 'text-gray-600',
              green: isActive ? 'text-green-700' : 'text-gray-600',
              purple: isActive ? 'text-purple-700' : 'text-gray-600',
              orange: isActive ? 'text-orange-700' : 'text-gray-600',
              yellow: isActive ? 'text-yellow-700' : 'text-gray-600',
            };
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all min-w-[200px] text-left ${
                  colorClasses[category.color as keyof typeof colorClasses]
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isActive ? `bg-${category.color}-100` : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${textColorClasses[category.color as keyof typeof textColorClasses]}`} />
                </div>
                <div>
                  <p className={`font-semibold ${textColorClasses[category.color as keyof typeof textColorClasses]}`}>
                    {category.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{category.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Container 2: Settings Form - Separate Container */}
      <Card className="border-0 shadow-lg">
        {/* General Settings */}
        {activeCategory === 'general' && (
          <>
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                General Settings
              </CardTitle>
              <CardDescription>Configure basic site information and preferences</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Select value={generalSettings.timezone} onValueChange={(v) => setGeneralSettings({ ...generalSettings, timezone: v })}>
                      <SelectTrigger className="pl-9 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                        <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                        <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Site Description</Label>
                  <Input
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Booking Settings */}
        {activeCategory === 'booking' && (
          <>
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <Ticket className="h-5 w-5 text-green-600" />
                Booking Settings
              </CardTitle>
              <CardDescription>Configure booking rules and limits</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Max Passengers Per Booking</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={bookingSettings.maxPassengersPerBooking}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, maxPassengersPerBooking: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Max Vehicles Per Booking</Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={bookingSettings.maxVehiclesPerBooking}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, maxVehiclesPerBooking: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cancellation Window (Hours)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={bookingSettings.cancellationHours}
                      onChange={(e) => setBookingSettings({ ...bookingSettings, cancellationHours: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Hours before departure that cancellation is allowed</p>
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Allow Same Day Booking</Label>
                    <p className="text-sm text-gray-500">Allow customers to book for same day departure</p>
                  </div>
                  <Switch
                    checked={bookingSettings.allowSameDayBooking}
                    onCheckedChange={(checked) => setBookingSettings({ ...bookingSettings, allowSameDayBooking: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Auto Confirm Bookings</Label>
                    <p className="text-sm text-gray-500">Automatically confirm bookings after payment</p>
                  </div>
                  <Switch
                    checked={bookingSettings.autoConfirmBookings}
                    onCheckedChange={(checked) => setBookingSettings({ ...bookingSettings, autoConfirmBookings: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Payment Settings */}
        {activeCategory === 'payment' && (
          <>
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment methods and options</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Credit / Debit Card</Label>
                    <p className="text-sm text-gray-500">Visa, Mastercard, JCB</p>
                  </div>
                  <Switch
                    checked={paymentSettings.enableCreditCard}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableCreditCard: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Bank Transfer</Label>
                    <p className="text-sm text-gray-500">BCA, Mandiri, BRI, BNI</p>
                  </div>
                  <Switch
                    checked={paymentSettings.enableBankTransfer}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableBankTransfer: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">QRIS</Label>
                    <p className="text-sm text-gray-500">Scan with any payment app</p>
                  </div>
                  <Switch
                    checked={paymentSettings.enableQRIS}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableQRIS: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">E-Wallet</Label>
                    <p className="text-sm text-gray-500">GoPay, OVO, Dana, LinkAja</p>
                  </div>
                  <Switch
                    checked={paymentSettings.enableEWallet}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableEWallet: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Fees Settings */}
        {activeCategory === 'fees' && (
          <>
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-orange-600" />
                Fee Settings
              </CardTitle>
              <CardDescription>Configure service fees and vehicle rates</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Service Fee (per ticket)</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={feeSettings.serviceFee}
                      onChange={(e) => setFeeSettings({ ...feeSettings, serviceFee: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Fee - Motorcycle</Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={feeSettings.vehicleFeeMotorcycle}
                      onChange={(e) => setFeeSettings({ ...feeSettings, vehicleFeeMotorcycle: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Fee - Car</Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={feeSettings.vehicleFeeCar}
                      onChange={(e) => setFeeSettings({ ...feeSettings, vehicleFeeCar: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Fee - Truck</Label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="number"
                      value={feeSettings.vehicleFeeTruck}
                      onChange={(e) => setFeeSettings({ ...feeSettings, vehicleFeeTruck: parseInt(e.target.value) })}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Notifications Settings */}
        {activeCategory === 'notifications' && (
          <>
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure email notifications</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Booking Confirmation Email</Label>
                    <p className="text-sm text-gray-500">Send email when booking is confirmed</p>
                  </div>
                  <Switch
                    checked={notificationSettings.bookingConfirmationEmail}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, bookingConfirmationEmail: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Cancellation Confirmation</Label>
                    <p className="text-sm text-gray-500">Send email when booking is cancelled</p>
                  </div>
                  <Switch
                    checked={notificationSettings.cancellationEmail}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, cancellationEmail: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Payment Receipt</Label>
                    <p className="text-sm text-gray-500">Send receipt after successful payment</p>
                  </div>
                  <Switch
                    checked={notificationSettings.paymentReceiptEmail}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, paymentReceiptEmail: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label className="text-base">Admin New Booking Alert</Label>
                    <p className="text-sm text-gray-500">Notify admin when new booking is made</p>
                  </div>
                  <Switch
                    checked={notificationSettings.adminNewBookingAlert}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, adminNewBookingAlert: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}