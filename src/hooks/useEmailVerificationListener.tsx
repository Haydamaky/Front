import { useEffect } from 'react';

export function useEmailVerificationListener(
  userId: string | undefined,
  onEmailVerified?: () => void,
) {
  useEffect(() => {
    if (!userId) return;

    const url =
      (process.env.NEXT_PUBLIC_NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_DEV) + `auth/sse/${userId}`;

    const eventSource = new EventSource(url);
    eventSource.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'email_verified') {
        onEmailVerified?.();
      }
    };

    eventSource.onerror = error => {
      console.error('SSE Error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, [userId, onEmailVerified]);
}
