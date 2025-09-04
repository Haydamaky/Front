'use client';

import { useAppSelector } from '@/hooks/store';
import { useEmailVerificationListener } from '@/hooks/useEmailVerificationListener';
import { useRouter } from 'next/navigation';

export default function ConfirmEmail() {
  const router = useRouter();
  const user = useAppSelector(state => state.user);
  const handleEmailVerified = () => {
    router.replace('/');
  };
  useEmailVerificationListener(user?.data?.id, handleEmailVerified);
  return (
    <main className="w-full pt-16">
      <div className="text-center">
        <h1 className="font-custom text-4xl text-primary">
          Check Email Address
        </h1>
      </div>
    </main>
  );
}
