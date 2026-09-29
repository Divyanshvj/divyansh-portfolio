"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

/**
 * The only client component in the Contact section. Copies the address to
 * the clipboard and confirms it, so a visitor can grab the email without
 * leaving the page or opening a mail client.
 *
 * Degrades safely: if the Clipboard API is unavailable or denied, the
 * button simply reports nothing copied and the mailto CTA still works.
 */
export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  /* Reset the confirmation after a moment. */
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* Clipboard unavailable or blocked - the mailto link still works. */
      setCopied(false);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
        "border border-line text-muted transition-colors duration-200",
        "hover:border-line-strong hover:text-foreground",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="sr-only">
        {copied ? "Email address copied" : `Copy email address ${email}`}
      </span>
    </button>
  );
}
