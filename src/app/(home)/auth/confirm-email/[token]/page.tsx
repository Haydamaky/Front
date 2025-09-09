'use client';

import { client } from '@/api';
import { api } from '@/api/build/api';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmEmail({
  params,
}: {
  params: { token: string };
}) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (params?.token) {
      setToken(params.token);
    }
  }, [params]);

  const onConfirm = async () => {
    if (!token) return;
    try {
      const res = await api.confirmEmail(token);
      router.replace('/');
    } catch (error) {
      console.error('Error while confirming email:', error);
    }
  };

  return (
    <main className="w-full pt-16">
      <div className="text-center">
        <h1 className="font-custom text-4xl text-primary">
          Confirm Email Address
        </h1>
        <Button size="lg" onClick={onConfirm} disabled={!token}>
          Confirm
        </Button>
      </div>
    </main>
  );
}
