import JoinForm from '@/components/custom/forms/JoinForm';
import { SignUpForm } from '@/components/custom/forms/Signup';

interface PageProps {
  searchParams: { custom: string };
}

export default async function Page({ searchParams }: PageProps) {
  const { custom } = await searchParams;

  return (
    <div className="flex w-full items-center justify-center">
      {!custom ? <JoinForm /> : <SignUpForm />}
    </div>
  );
}
