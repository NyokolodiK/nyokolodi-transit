"use client";

import { useForm } from "react-hook-form";
import { ArrowRight, Building2 } from "lucide-react";
import { QuoteNotification } from "@/lib/notification";
import { quoteWhatsAppLink } from "@/lib/messages";
import { QuoteSummary } from "@/lib/quote";
import { useNotificationSubmit } from "@/hooks/useNotificationSubmit";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";

interface QuoteFormValues {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  serviceType: string;
  estimatedVehicles: string;
  notes: string;
}

const DEFAULT_VALUES: QuoteFormValues = {
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  serviceType: "Corporate Employee Commute",
  estimatedVehicles: "1 - 2 Sedans",
  notes: "",
};

interface QuoteFormProps {
  onSuccess: (summary: QuoteSummary) => void;
}

export default function QuoteForm({ onSuccess }: QuoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>({ defaultValues: DEFAULT_VALUES });

  const { submit, isSubmitting, error } = useNotificationSubmit();

  const onSubmit = async (data: QuoteFormValues) => {
    const quoteId = `QT-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload: QuoteNotification = {
      type: "quote",
      quoteId,
      companyName: data.companyName,
      contactName: data.contactName,
      phone: data.phone,
      email: data.email,
      serviceType: data.serviceType,
      estimatedVehicles: data.estimatedVehicles,
      notes: data.notes,
    };

    const result = await submit(payload);

    onSuccess({
      quoteId,
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      serviceType: data.serviceType,
      warning: result.ok ? undefined : result.error,
      whatsAppLink: quoteWhatsAppLink({ ...payload }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field label="Company / Organization Name" error={errors.companyName?.message}>
        <Input
          type="text"
          placeholder="e.g. Corporate Head Office / Agency"
          icon={<Building2 className="w-4 h-4" />}
          {...register("companyName", { required: "Company name is required" })}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Contact Person" error={errors.contactName?.message}>
          <Input
            type="text"
            placeholder="e.g. Thabo Nkosi"
            {...register("contactName", { required: "Contact person is required" })}
          />
        </Field>

        <Field label="Phone / WhatsApp (+27)" error={errors.phone?.message}>
          <Input
            type="tel"
            placeholder="e.g. 082 000 0000"
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 9, message: "Enter a valid phone number" },
            })}
          />
        </Field>
      </div>

      <Field label="Official Email Address" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="contact@company.co.za"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Service Required">
          <Select {...register("serviceType")}>
            <option value="Corporate Employee Commute">
              Corporate Staff Commutes
            </option>
            <option value="VIP & Executive Chauffeur">
              VIP &amp; Executive Chauffeur
            </option>
            <option value="Conference & Event Transport">
              Conference &amp; Event Fleet
            </option>
            <option value="Long-term Dedicated Fleet">
              Monthly Dedicated Vehicle Lease
            </option>
          </Select>
        </Field>

        <Field label="Fleet Size Needed">
          <Select {...register("estimatedVehicles")}>
            <option value="1 - 2 Sedans">1 - 2 Suzuki Dzires</option>
            <option value="3 - 5 Vehicles">3 - 5 Sedans</option>
            <option value="Group Shuttle (Minibus)">Group Shuttle (14 Seater)</option>
            <option value="Multi-vehicle Fleet">Full Fleet (10+ Vehicles)</option>
          </Select>
        </Field>
      </div>

      <Field label="Additional Details / Routing Needs">
        <TextArea
          rows={3}
          placeholder="Tell us about your routes, schedule frequency, and billing preferences in South Africa..."
          {...register("notes")}
        />
      </Field>

      {error && <Alert>{error}</Alert>}

      <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full">
        <span>Submit Quote Request</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}
