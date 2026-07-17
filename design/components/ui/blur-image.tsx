"use client";

import NextImage, { ImageProps } from "next/image";
import { useState } from "react";
import "@/styles/blur-image.css";

export default function BlurImage(props: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <NextImage
      {...props}
      className={`${props.className || ""} blur-image-transition ${
        isLoading ? "image-loading" : "image-loaded"
      }`}
      onLoad={(e) => {
        setLoading(false);
        if (props.onLoad) {
          props.onLoad(e);
        }
      }}
      onError={() => {
        setLoading(false); // Remove blur if image fails to load
      }}
    />
  );
}
