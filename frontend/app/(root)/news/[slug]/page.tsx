import React from "react";
import { Metadata } from "next";
import { fetchCategory, generateSeoMetadata, mediaUrl } from "@/lib/cms";
import NewsCategoryClientPage from "./client-page";

type NewsCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: NewsCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategory("news", slug);

  if (!category) {
    return generateSeoMetadata();
  }

  const actualTitle = category.seoTitle || category.nameBn || category.name;
  const actualDescription = category.seoDescription || category.description;
  const actualImage = category.image ? mediaUrl(category.image) : null;
  
  return generateSeoMetadata(actualTitle, actualDescription, actualImage, category.seoKeywords);
}

const NewsCategoryPage = async ({ params }: NewsCategoryPageProps) => {
  const { slug } = await params;

  return (
    <NewsCategoryClientPage slug={slug} />
  );
};

export default NewsCategoryPage;
