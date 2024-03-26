"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-fit flex flex-col justify-center pt-20">
        <h2 className="font-bold">Úps! Eitthvað klikkaði!</h2>
        <Button variant="outline" onClick={() => reset()}>
          Reyna aftur
        </Button>
      </div>
    </main>
  );
}
