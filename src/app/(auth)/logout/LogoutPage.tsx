"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "@/lib/auth/client";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({
      fetchOptions: {
        onError: (error) => {
          console.log(error);
          router.replace("/login"); // Redirect a/c to your needs
        },
        onSuccess: () => {
          router.replace("/login"); // Redirect a/c to your needs
        },
      },
    });
  }, [router.replace]);

  return null;
}
