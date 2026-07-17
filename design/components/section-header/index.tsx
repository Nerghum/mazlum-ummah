import React from "react";
import "./style.css";

const SectionHeader = ({ title, highlight }: { title: string; highlight?: string }) => {
  return (
    <div className="section-header">
      <h2 className="section-header__title">
        {title}
        {highlight && (
          <>
            <span className="section-header__comma">,</span> {highlight}
          </>
        )}
      </h2>
    </div>
  );
};

export default SectionHeader;
