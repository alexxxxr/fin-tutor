"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import React from "react";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" aria-disabled={pending}>
      {children}
    </Button>
  );
}
