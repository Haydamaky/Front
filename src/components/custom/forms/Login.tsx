'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/react';
import { FC, useState } from 'react';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { client } from '@/client';
import { useAppDispatch } from '@/hooks/store';
import { setUserState, User } from '@/store/slices/user';
import { useRouter } from 'next/navigation';
export const formSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(2),
});

export const LogInForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isReveal, setIsReveal] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await client.post('/auth/local/signin');
      if (res.status === 200) {
        dispatch(setUserState(res.data.user as User));
        router.push('/');
      } else
        throw new Error(res.data?.message || 'Some error occured, try later');
    } catch (error: any) {
      form.setError('root', { message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-16 w-[10rem] space-y-8 rounded-2xl border-2 p-8 lg:w-[26rem]"
        autoFocus
      >
        <p className="text-center text-2xl font-bold">Log In</p>
        <div className="flex flex-col gap-4">
          <Button
            radius="sm"
            size="lg"
            className="w-full bg-zinc-200 text-large font-bold text-black"
            // startContent={<AppleIcon />}
          >
            Log In with Apple
          </Button>

          <Button
            radius="sm"
            size="lg"
            className="w-full bg-zinc-200 text-large font-bold text-black"
            // startContent={<GoogleIcon />}
          >
            Log In with Google
          </Button>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="shadcn"
                  isClearable
                  onClear={() => form.resetField('username')}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between">
                <FormLabel className="capitalize">{field.name}</FormLabel>
                <FormLabel>
                  <Link className="text-sm text-zinc-400" href="/">
                    Forgot Password?
                  </Link>
                </FormLabel>
              </div>
              <FormControl>
                <Input
                  size="lg"
                  type={isReveal ? 'text' : 'password'}
                  placeholder="password..."
                  endContent={
                    isReveal ? (
                      <EyeIcon
                        className="cursor-pointer"
                        onClick={() => setIsReveal(curr => !curr)}
                      />
                    ) : (
                      <EyeClosedIcon
                        className="cursor-pointer"
                        onClick={() => setIsReveal(curr => !curr)}
                      />
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          radius="sm"
          isLoading={isLoading}
          type="submit"
          size="lg"
          className="w-full bg-zinc-200 text-large font-bold text-black"
        >
          Log In
        </Button>
        <footer className="text-center">
          Don`t have an account?{' '}
          <Link href={'/signup'}>
            <span className="ml-1 text-green-400">Sign Up</span>
          </Link>
        </footer>
      </form>
    </Form>
  );
};
