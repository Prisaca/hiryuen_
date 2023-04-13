"use client";

import { useEffect } from "react";
import { useProductSliderStore } from "./ProductSliderStore";
import clsx from "clsx";

const GalleryImageButton = ({
  image,
  children,
  first,
}: {
  children: React.ReactNode;
  image: any;
  first: boolean;
}) => {
  const setSelectedImage = useProductSliderStore(
    (state) => state.setSelectedImage
  );
  const selectedImage = useProductSliderStore((state) => state.selectedImage);

  useEffect(() => {
    if (first) {
      setSelectedImage(image);
    }
  }, []);

  return (
    <button
      onClick={() => setSelectedImage(image)}
      className={clsx(
        selectedImage === image
          ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-stone-50 p-1 m-1 w-[90%]"
          : "",
        " transition-all duration-200 relative flex items-center justify-center w-20 h-20 rounded-md bg-white border border-transparent focus:outline-none text-sm font-medium uppercase text-stone-900 hover:bg-stone-50"
      )}
    >
      <span className="sr-only">{image.alt}</span>
      {children}
    </button>
  );
};

export default GalleryImageButton;
