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
import { Link } from '@nextui-org/link';

import { FC, useState } from 'react';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { client } from '@/client';
import { setUserState, User } from '@/store/slices/user';
import { useAppDispatch } from '@/hooks/store';
import { useRouter } from 'next/router';

export const formSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address' }),
  username: z
    .string()
    .min(4, { message: 'Name should contain atleast 4 symbols' }),
  password: z.string().min(2),
});

export const SignUpForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isReveal, setIsReveal] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await client.post('/auth/local/signup', values);
      if (res.status === 200) {
        dispatch(setUserState(res.data.user as User));
        router.push('/login');
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
      >
        <p className="text-center text-2xl font-bold">Create An Account</p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="your.email@address.com"
                  isClearable
                  onClear={() => form.resetField('email')}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="Shun12"
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
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  type={isReveal ? 'text' : 'password'}
                  placeholder="Choose your password"
                  {...field}
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
          type="submit"
          size="lg"
          className="w-full bg-zinc-200 text-large font-bold text-black"
        >
          Sign Up
        </Button>
        <footer className="flex flex-col items-center justify-center text-center">
          <p>By signing up you agree to</p>
          <Link href={'/'}>
            <span className="ml-1 text-green-500">Terms & Privacy</span>
          </Link>
        </footer>
      </form>
    </Form>
  );
};
