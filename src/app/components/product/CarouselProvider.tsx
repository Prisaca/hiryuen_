"use client";

import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";

const OPTIONS: EmblaOptionsType = { axis: "y", loop: true, draggable: true };

export default function CarouselProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emblaRef] = useEmblaCarousel(OPTIONS);
  return (
    <div className="flex flex-col h-full overflow-y-hidden w-24">
      <nav
        id="gallery-images"
        aria-label="Gallery-images"
        className="flex flex-col gap-2 mt-2 h-full"
      >
        {children}
      </nav>
    </div>
  );
}
