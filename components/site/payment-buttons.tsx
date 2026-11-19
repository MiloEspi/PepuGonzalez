import { PrimaryButton } from "@/components/site/primary-button";
import type { DigitalProductPayment } from "@/data/digital-products";
import { getWhatsAppUrl } from "@/data/offers";
import { cn } from "@/lib/utils";

export function PaymentButtons({
  payment,
  className,
  compact = false,
}: {
  payment: DigitalProductPayment;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", compact ? "gap-2.5" : "gap-3", className)}>
      <PrimaryButton href={payment.argentinaUrl} newTab={false} className={compact ? "px-5 py-2.5 text-sm" : undefined}>
        Pagar desde Argentina
      </PrimaryButton>
      <p className="max-w-[300px] text-xs leading-relaxed text-[var(--texto-gris)]">
        Después de pagar,{" "}
        <a
          href={getWhatsAppUrl(payment.receiptMessage)}
          target="_blank"
          rel="noreferrer"
          className="text-[var(--dorado)] underline underline-offset-2"
        >
          mandame el comprobante por WhatsApp
        </a>{" "}
        y te paso el PDF.
      </p>
      <a
        href={payment.exteriorUrl}
        className="text-sm font-semibold text-[var(--texto)] underline underline-offset-4 transition-colors duration-200 hover:text-[var(--dorado)]"
      >
        Pagar desde otro país
      </a>
    </div>
  );
}
