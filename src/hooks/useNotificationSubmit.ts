"use client";

import { useCallback, useState } from "react";
import { NotificationPayload, submitNotification } from "@/lib/notification";

interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Encapsulates the "post a notification" concern so forms stay focused on
 * rendering and validation. Surfaces an inline error and a loading flag.
 */
export function useNotificationSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = useCallback(
    async (payload: NotificationPayload): Promise<SubmitResult> => {
      setIsSubmitting(true);
      setError("");
      const message = await submitNotification(payload);
      setIsSubmitting(false);

      if (message) {
        setError(message);
        return { ok: false, error: message };
      }
      return { ok: true };
    },
    []
  );

  return { submit, isSubmitting, error };
}
