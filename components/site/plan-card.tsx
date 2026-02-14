import Link from "next/link";

import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GOAL_LABELS, LEVEL_LABELS, getWhatsAppUrl, type Plan } from "@/data/plans";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  plan: Plan;
  className?: string;
}

export function PlanCard({ plan, className }: PlanCardProps) {
  return (
    <Card className={cn("h-full rounded-2xl border-border/80 bg-card shadow-sm", className)}>
      <CardHeader className="space-y-3 pb-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{GOAL_LABELS[plan.goal]}</Badge>
          <Badge variant="outline">{LEVEL_LABELS[plan.level]}</Badge>
          <Badge variant="outline">{plan.daysPerWeek} dias</Badge>
        </div>
        <CardTitle className="text-xl">{plan.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{plan.tagline}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{plan.description}</p>
        <p className="font-semibold text-foreground">{plan.priceLabel}</p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-2">
        <Button asChild size="sm" className="rounded-full">
          <Link href={`/planes/${plan.slug}`}>Ver detalle</Link>
        </Button>
        <WhatsAppButton href={getWhatsAppUrl(plan.whatsappMessage)} size="sm">
          WhatsApp
        </WhatsAppButton>
      </CardFooter>
    </Card>
  );
}
