'use client';

import { client } from '@/client';
import { siteConfig } from '@/config/site';
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
      const res = await client.get(
        `${process.env.API_URL}/auth/confirm-email/${token}`,
      );
      if ([200, 201].includes(res.status)) {
        router.replace(siteConfig.links.login);
      }
    } catch (error) {
      console.error('Error confirming email:', error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="font-custom text-4xl text-primary">
        Confirm Email Address
      </h1>
      <Button size="lg" onClick={onConfirm} disabled={!token}>
        Confirm
      </Button>
    </div>
  );
}
