"use client";

import React from "react";
import NewsList from "./components/newslist";

type NewsCategoryClientPageProps = {
  slug: string;
};

const NewsCategoryClientPage = ({ slug }: NewsCategoryClientPageProps) => {
  return (
    <NewsList slug={slug} />
  );
};

export default NewsCategoryClientPage;
