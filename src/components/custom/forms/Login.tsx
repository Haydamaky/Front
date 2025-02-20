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
import { Link } from '@nextui-org/react';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { client } from '@/client';
import { useAppDispatch } from '@/hooks/store';
import { setUserState, User } from '@/store/slices/user';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons';
import { socket } from '@/socket';
export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export const LogInForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
      const res = await client.post<{
        message?: string;
        user?: User;
      }>('auth/local/signin', values);

      if (res.status === 200 && res.data.user) {
        dispatch(setUserState(res.data.user));
        socket.recconect();
        router.replace('/');
      }
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
        password: string;
      },
      'email' | 'password'
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
        autoFocus
      >
        <p className="text-center text-2xl font-bold">Log In</p>
        <div className="flex flex-col gap-4">
          <Button
            radius="sm"
            size="lg"
            className="w-full bg-zinc-200 text-large font-bold text-black"
            startContent={<GoogleIcon />}
          >
            Log in with Google
          </Button>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Email</FormLabel>
              <FormControl>
                <Input
                  size="lg"
                  placeholder="youremail@email.com"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between">
                <FormLabel className="capitalize">Password</FormLabel>
                <FormLabel>
                  <Link className="text-sm text-zinc-500" href="/">
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
          isLoading={isLoading}
          type="submit"
          size="lg"
          className="w-full bg-zinc-200 text-large font-bold text-black"
        >
          Log In
        </Button>
        {form.formState.errors.root && (
          <p className="text-center text-red-600">
            {form.formState.errors.root.message}
          </p>
        )}
        <footer className="text-center">
          Don't have an account?{' '}
          <Link href={'/signup'}>
            <span className="ml-1 font-semibold text-green-600">Sign Up</span>
          </Link>
        </footer>
      </form>
    </Form>
  );
};
