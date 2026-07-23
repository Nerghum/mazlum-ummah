import Image from "next/image";


export default function Loading() {
  return (
    <div className="loading-container">
      <div>
        <Image
          src="/logo.png"
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
