import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Dumbbell, Gauge, LineChart, ShieldCheck, Sparkles } from "lucide-react";

import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GOAL_LABELS, LEVEL_LABELS, WHATSAPP_DIRECT_URL, getPlanBySlug, plans } from "@/data/plans";

interface PlanDetailPageProps {
  params: Promise<{ slug: string }>;
}

const includeIcons = [Dumbbell, Gauge, ShieldCheck, Sparkles, LineChart, CheckCircle2];

function EditorialDivider({ label }: { label: string }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5">
      <p className="shrink-0 text-xs font-semibold tracking-[0.18em] text-muted-foreground">{label}</p>
      <Separator className="bg-border/80" />
    </div>
  );
}

export async function generateStaticParams() {
  return plans.map((plan) => ({ slug: plan.slug }));
}

export async function generateMetadata({ params }: PlanDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) return {};
  return {
    title: `${plan.title} | Pepu Gonzalez`,
    description: plan.description,
  };
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) notFound();

  const keyOutcomes = [
    { label: "Frecuencia", value: `${plan.daysPerWeek} dias por semana` },
    { label: "Nivel recomendado", value: LEVEL_LABELS[plan.level] },
    { label: "Objetivo principal", value: GOAL_LABELS[plan.goal] },
  ];

  return (
    <main className="pb-16 pt-6">
      <section className="mx-auto w-full max-w-6xl px-5 py-10">
        <Link href="/planes" className="text-sm text-muted-foreground hover:text-foreground">
          Volver a planes
        </Link>

        <div className="mt-5 rounded-3xl border border-border/80 bg-card p-6 shadow-[0_20px_40px_-34px_hsl(212_40%_25%)] md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{GOAL_LABELS[plan.goal]}</Badge>
            <Badge variant="outline">{LEVEL_LABELS[plan.level]}</Badge>
            <Badge variant="outline">{plan.daysPerWeek} dias por semana</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">{plan.title}</h1>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground">{plan.description}</p>
          <p className="mt-4 text-lg font-semibold text-foreground">{plan.priceLabel}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton href={WHATSAPP_DIRECT_URL}>Hablar por WhatsApp</WhatsAppButton>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/#encontra-tu-plan">Encontra tu plan</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5">
        <div className="grid gap-3 rounded-2xl border border-border/80 bg-secondary/40 p-5 md:grid-cols-3">
          {keyOutcomes.map((item) => (
            <article key={item.label} className="rounded-xl border border-border/75 bg-background/70 p-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">{item.label}</p>
              <p className="mt-2 font-heading text-lg font-semibold">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <EditorialDivider label="WHAT YOU GET" />
      </section>

      <section className="mx-auto mt-6 w-full max-w-6xl px-5">
        <div className="grid gap-4 md:grid-cols-2">
          {plan.includes.map((item, index) => {
            const Icon = includeIcons[index % includeIcons.length];
            return (
              <article
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border/80 bg-card px-4 py-4 shadow-[0_12px_24px_-26px_hsl(212_40%_25%)]"
              >
                <div className="rounded-lg border border-primary/20 bg-primary/8 p-2">
                  <Icon className="size-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{item}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <EditorialDivider label="FIT MATCH" />
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-6xl gap-5 px-5 md:grid-cols-2">
        <article className="rounded-2xl border border-primary/40 bg-primary/5 p-5">
          <h2 className="text-lg font-semibold">Ideal para</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {plan.forWho.map((item) => (
              <li key={item} className="rounded-lg border border-primary/25 bg-background/80 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-400/45 bg-slate-100/55 p-5">
          <h2 className="text-lg font-semibold">No ideal para</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {plan.notFor.map((item) => (
              <li key={item} className="rounded-lg border border-slate-300/70 bg-background/80 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-10">
        <EditorialDivider label="FAQ" />
      </section>

      <section className="mx-auto mt-6 w-full max-w-6xl px-5">
        <div className="rounded-2xl border border-border/80 bg-card px-6">
          <h2 className="pt-6 text-2xl font-semibold">Preguntas frecuentes del plan</h2>
          <Accordion type="single" collapsible className="mt-2">
            {plan.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`${plan.slug}-faq-${index}`}>
                <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
