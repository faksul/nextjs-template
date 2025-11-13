"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut, useSession } from "@/lib/auth/client";

export function ExampleAuth() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Authentication Status</CardTitle>
        <CardDescription>
          Better Auth integration with email/password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {session ? (
          <>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Signed in as:</p>
              <p className="font-medium">{session.user?.email}</p>
            </div>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Not authenticated. Configure Better Auth and sign in.
            </p>
            <Button
              onClick={() => {
                // Implement your sign in logic here
                console.log("Sign in clicked");
              }}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
