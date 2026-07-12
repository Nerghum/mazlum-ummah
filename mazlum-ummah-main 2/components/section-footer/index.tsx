import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./style.css";

const SectionFooter = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link className="section-footer__link" tabIndex={0} href={href}>
      {label}
      <span className="section-footer__icon">
        <ChevronRight className="section-footer__svg" size={20} strokeWidth={2} />
      </span>
    </Link>
  );
};

export default SectionFooter;
