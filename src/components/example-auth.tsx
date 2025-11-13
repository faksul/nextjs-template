"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth/client";

export function ExampleAuth() {
  const router = useRouter();
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
              onClick={() => router.push("/logout")}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <div className="space-y-2">
            <Button
              onClick={() => {
                // Implement your sign in logic here
                router.push("/login");
              }}
              className="w-full"
            >
              Login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
