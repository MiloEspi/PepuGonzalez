import { redirect } from "next/navigation";

interface LegacyPlanDetailRedirectProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyPlanDetailRedirectPage({ params }: LegacyPlanDetailRedirectProps) {
  const { slug } = await params;
  redirect(`/programas/${slug}`);
}
