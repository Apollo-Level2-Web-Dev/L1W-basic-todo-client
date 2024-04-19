import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    //! This is only for development,
    //! Please remove this before shipping to production
    defaultValues: {
      email: 'john.doe@gmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');

    const userData = { ...data };

    console.log(userData);

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error(`Login failed`);
      }

      const data = await res.json();

      if (data.message === 'Logged In Successfully') {
        localStorage.setItem('accessToken', data.data.accessToken);
      } else {
        throw new Error(data.message);
      }

      toast.success('Logged in', { id: toastId });
      navigate('/');
    } catch (err) {
      console.log('While logging in', err);
      toast.error(`${err.message}`, { id: toastId });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register('email')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have have any account?{' '}
              <Link to="/register">Register</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
