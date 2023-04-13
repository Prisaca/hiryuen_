"use client";

import Image from "next/image";
import { useProductSliderStore } from "./ProductSliderStore";

export default function MainImage() {
  const selectedImage = useProductSliderStore((state) => state.selectedImage);

  return (
    <>
      <p className="sr-only">Selected Image</p>
      <Image
        id="main-image"
        src={selectedImage.file?.url ?? ""}
        width={selectedImage.file?.width ?? 1000}
        height={selectedImage.file?.height ?? 1000}
        alt={selectedImage.file?.filename ?? "unknown image"}
        className="w-full object-cover h-full"
      />
    </>
  );
}
