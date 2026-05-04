import { LoginForm } from '@/components/auth/LoginForm';
import { Ship } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Ship className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">FerryGo</h1>
        <p className="text-gray-500 mt-1">Book your island adventure</p>
      </div>
      
      <LoginForm />
    </div>
  );
}