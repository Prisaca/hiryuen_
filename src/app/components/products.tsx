import { formatCurrency } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "swell-js";

const Products = ({ products }: { products: Product[] }) => {
  return (
    <div className="py-24">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold">Products</h1>

        <div className="mt-20 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="aspect-[1/1.25] h-min-full w-min-full overflow-hidden rounded-lg bg-stone-200">
                {product?.images?.[0].file?.url && <Image
                  src={product?.images?.[0]?.file?.url}
                  alt={""}
                  width={500}
                  height={750}
                  className="h-min-full object-cover object-center aspect-[1/1.25] transition-opacity group-hover:opacity-75"
                />}
              </div>
              <h3 className="mt-4 text-sm text-stone-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-stone-900">
                {formatCurrency({ amount: product.price })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
