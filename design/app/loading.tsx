import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Loading() {
  return (
    <div className="loading-container">
      <div>
        <Image
          src={logo}
          alt="Mazlum Ummah"
          width={120}
          height={120}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
