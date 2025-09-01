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
import { loader as signupLoader } from "@/routes/loader+/auth+/signup";
import { GoogleSignInButton } from "~/components/auth/providers/google";
import { GitHubSignInButton } from "~/components/auth/providers/github";

export const loader = signupLoader;

export default function Signup() {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Choose your preferred authentication provider to get started with
            GitSprint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <GoogleSignInButton />
            <GitHubSignInButton />

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/signin" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>

            <Button variant="outline" type="button" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
