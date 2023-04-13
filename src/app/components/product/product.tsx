import Image from "next/image";

import clsx from "clsx";

import { StarIcon } from "@heroicons/react/20/solid";
import { formatCurrency } from "../../../lib/utils";
import GalleryImageButton from "./GalleryImageButton";
import { Product } from "swell-js";
import MainImage from "./MainImage";
import SubmitButton from "./SubmitButton";
import ProductDetails from "./ProductDetails";
import CarouselProvider from "./CarouselProvider";

const Product = ({ product }: { product: Product }) => {
  return (
    <main className="py-24">
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <section
            id="gallery-wrapper"
            aria-labelledby="gallery-wrapper"
            className="flex flex-row aspect-square gap-2"
          >
            <CarouselProvider>
              {product.images &&
                product.images.map((image, i) => (
                  <GalleryImageButton
                    image={image}
                    key={image.id}
                    first={i === 0}
                  >
                    {image?.file?.url && (
                      <Image
                        src={image?.file?.url}
                        key={image.id}
                        width={image?.file?.width ?? 1000}
                        height={image?.file?.height ?? 1000}
                        alt={image?.caption ?? ""}
                        className="w-[150px] aspect-square"
                      />
                    )}
                  </GalleryImageButton>
                ))}
            </CarouselProvider>

            <div className="grow">
              <MainImage />
            </div>
          </section>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-stone-900">
              {product.name}
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-stone-900">
                {formatCurrency({ amount: product.price })}
              </p>
            </div>
            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={clsx(
                        4 > rating ? "text-yellow-500" : "text-stone-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{4} out of 5 stars</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              {product.description && (
                <div
                  className="space-y-6 text-base text-stone-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
            </div>
            <SubmitButton product={product} />
            <ProductDetails />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
