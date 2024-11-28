'use client';
import { Button, Link } from '@nextui-org/react';

import { FC } from 'react';

export const Header: FC = () => {
  return (
    <div className="flex gap-4">
      <Button variant="solid" size="lg" as={Link} href={'login'}>
        <p className="font-semibold">Log In</p>
      </Button>

      <Button
        as={Link}
        href={'/signup'}
        variant="solid"
        size="lg"
        className="bg-slate-50 uppercase"
      >
        <p className="font-bold uppercase text-black">Get started</p>
      </Button>
    </div>
  );
};
