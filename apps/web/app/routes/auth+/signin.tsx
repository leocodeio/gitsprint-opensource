// imports
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// remix
import { Link } from "@remix-run/react";

// loader
import { loader as signinLoader } from "@/routes/loader+/auth+/signin";
import { GoogleSignInButton } from "~/components/auth/providers/google";
import { GitHubSignInButton } from "~/components/auth/providers/github";

export const loader = signinLoader;

export default function Signin() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Choose your preferred authentication provider to access GitSprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <GoogleSignInButton />
            <GitHubSignInButton />

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>

            <Button variant="outline" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
