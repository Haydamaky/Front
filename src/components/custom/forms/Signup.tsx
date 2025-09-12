'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
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

import { ChangeEvent, FC, useState } from 'react';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { client } from '@/api';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/store';
import { setUserState, User } from '@/store/slices/user';
import { api } from '@/api/build/api';
import { AxiosResponse } from 'axios';

export const formSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address' }),
  nickname: z
    .string()
    .min(4, { message: 'Name should contain at least 4 symbols' }),
  password: z.string().min(2),
});

export const SignUpForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isReveal, setIsReveal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await api.signup<
        AxiosResponse<{
          user: User;
        }>
      >('auth/local/signup', values);
      if (res.data.user) {
        dispatch(setUserState(res.data.user));
      }
      router.replace('/auth/check-email');
    } catch (error: any) {
      form.setError('root', {
        type: 'value',
        message:
          error.response.data.message instanceof Array
            ? error.response.data.message[0]
            : error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        email: string;
        nickname: string;
        password: string;
      },
      'email' | 'password' | 'nickname'
    >,
  ) => {
    field.onChange(e);
    form.clearErrors('root');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-16 w-[10rem] space-y-8 rounded-2xl border-2 p-8 lg:w-[26rem]"
      >
        <p className="text-center text-2xl font-bold">Create an Account</p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Email</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="your.email@address.com"
                  isClearable
                  onClear={() => form.resetField('email')}
                  {...field}
                  onChange={e => onChange(e, field)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Nickname</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="Shun12"
                  isClearable
                  onClear={() => form.resetField('nickname')}
                  {...field}
                  onChange={e => onChange(e, field)}
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
              <FormLabel className="capitalize">Password</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  type={isReveal ? 'text' : 'password'}
                  placeholder="Choose your password"
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
                  {...field}
                  onChange={e => onChange(e, field)}
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
          isLoading={isLoading}
          className="w-full bg-zinc-200 text-large font-bold text-black"
        >
          Sign Up
        </Button>
        {form.formState.errors.root && (
          <p className="text-center text-red-600">
            {form.formState.errors.root.message}
          </p>
        )}
        <footer className="flex flex-col items-center justify-center text-center">
          <p>By signing up, you agree to our</p>
          <Link href={'/'}>
            <span className="ml-1 text-green-500">Terms & Privacy</span>
          </Link>
        </footer>
      </form>
    </Form>
  );
};
