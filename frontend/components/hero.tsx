import React from "react";
import Image from "next/image";
import styles from "@/styles/hero.module.css";
import Link from "next/link";

interface HeroProps {
  image: React.ComponentProps<typeof Image>["src"];
  imageAlt: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  compact?: boolean;
  priority?: boolean;
  href?: string;
}

const Hero = ({
  image,
  imageAlt,
  title,
  description,
  compact = false,
  priority = false,
  href,
}: HeroProps) => {
  const sizeClass = compact ? styles.compact : styles.tall;

  const content = (
    <header className={`${styles.hero} ${sizeClass}`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className={styles.heroImage}
        priority={priority}
      />
      <div className={styles.overlay}></div>

      {title && (
        <div className={styles.container}>
          <div className={styles.text}>
            <h1 className={styles.title}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
      )}
    </header>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }

  return content;
};

export default Hero;
