import { fetchCategory } from "@/lib/cms";
import { notFound } from "next/navigation";
import React from "react";

export default async function NewsCategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const category = await fetchCategory("news", slug);
  if (!category) {
    notFound();
  }

  return <>{children}</>;
}
