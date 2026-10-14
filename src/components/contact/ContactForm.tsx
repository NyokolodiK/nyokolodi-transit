"use client";

import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { ContactNotification } from "@/lib/notification";
import { contactWhatsAppLink } from "@/lib/messages";
import { ContactSummary } from "@/lib/contact";
import { useNotificationSubmit } from "@/hooks/useNotificationSubmit";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const DEFAULT_VALUES: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  subject: "General Inquiry",
  message: "",
};

interface ContactFormProps {
  onSuccess: (summary: ContactSummary) => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({ defaultValues: DEFAULT_VALUES });

  const { submit, isSubmitting, error } = useNotificationSubmit();

  const onSubmit = async (data: ContactFormValues) => {
    const payload: ContactNotification = { type: "contact", ...data };
    const result = await submit(payload);

    onSuccess({
      name: data.name,
      email: data.email,
      subject: data.subject,
      warning: result.ok ? undefined : result.error,
      whatsAppLink: contactWhatsAppLink({ ...data }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your Name" error={errors.name?.message}>
          <Input
            type="text"
            placeholder="e.g. Kagiso Nyokolodi"
            {...register("name", { required: "Your name is required" })}
          />
        </Field>

        <Field label="Phone / WhatsApp" error={errors.phone?.message}>
          <Input
            type="tel"
            placeholder="e.g. 082 123 4567"
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 9, message: "Enter a valid phone number" },
            })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email Address" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="name@domain.co.za"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </Field>

        <Field label="Topic">
          <Select {...register("subject")}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Airport Transfer">Airport Transfer</option>
            <option value="Corporate Account">Corporate Account</option>
            <option value="Lost Property">Lost Property</option>
            <option value="Feedback / Compliment">Feedback / Compliment</option>
          </Select>
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <TextArea
          rows={4}
          placeholder="How can we assist you with your journey today?"
          {...register("message", { required: "Please enter a message" })}
        />
      </Field>

      {error && <Alert>{error}</Alert>}

      <Button
        type="submit"
        variant="success"
        isLoading={isSubmitting}
        className="w-full sm:w-auto px-8"
      >
        <span>Send Message</span>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
