'use client';

import { GoogleIcon } from '@/components/icons';
import { siteConfig } from '@/config/site';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Mail } from 'lucide-react';

function JoinForm() {
  return (
    <div>
      <div className="mt-16 w-[10rem] space-y-8 rounded-2xl border-2 p-8 lg:w-[26rem]">
        <p className="text-center text-2xl font-bold">Join Us</p>
        <div className="flex flex-col">
          <Button
            radius="sm"
            size="lg"
            className="w-full bg-zinc-200 text-large font-bold text-black"
            endContent={<GoogleIcon />}
          >
            Continue with Google
          </Button>
        </div>

        <Button
          radius="sm"
          size="lg"
          as={Link}
          href={siteConfig.links.signup + '?custom=true'}
          className="w-full bg-zinc-200 text-large font-bold text-black"
          endContent={<Mail size={26} />}
        >
          Use Email
        </Button>

        <footer className="text-center">
          Already have an account?
          <Link href={siteConfig.links.login}>
            <span className="ml-1 text-green-600">Log in</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default JoinForm;
