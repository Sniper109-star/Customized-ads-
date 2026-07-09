import { LoginForm } from "@/app/login/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage your ads</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link href="/register" className="text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
