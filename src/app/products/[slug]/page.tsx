import { getProductBySlugOrId } from "@/lib/swell/products";
import Product from "@/components/product/product";

const Page = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductBySlugOrId(params.slug);

  return <Product product={product} />;
};

export default Page;
