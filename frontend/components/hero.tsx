import React from "react";
import Image from "next/image";
import styles from "@/styles/hero.module.css";

interface HeroProps {
  image: React.ComponentProps<typeof Image>["src"];
  imageAlt: string;
  title: React.ReactNode;
  description: React.ReactNode;
  badge?: string;
  compact?: boolean;
  priority?: boolean;
}

const Hero = ({
  image,
  imageAlt,
  title,
  description,
  badge,
  compact = false,
  priority = false,
}: HeroProps) => {
  const sizeClass = compact ? styles.compact : styles.tall;

  return (
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

      <div className={styles.container}>
        <div className={styles.text}>
          {badge && (
            <span className={styles.badge}>
              <span className={styles.badgeDot}></span> {badge}
            </span>
          )}

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </header>
  );
};

export default Hero;
