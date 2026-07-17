import React, { FC } from "react";
import Image from "@/components/ui/blur-image";
import "./style.css";

type NoContentProps = {
  title: string;
  description: string;
};

const NoContent: FC<NoContentProps> = ({ title, description }) => {
  return (
    <section className="no-content">
      <div className="no-content__container">
        <div className="no-content__content">
          <span className="no-content__image-wrapper">
            <Image
              src="/no-content.svg"
              alt="Empty content"
              fill
              sizes="160px"
              style={{ objectFit: "cover" }}
            />
          </span>
          <h5 className="no-content__title">{title}</h5>
          <p className="no-content__description">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default NoContent;
