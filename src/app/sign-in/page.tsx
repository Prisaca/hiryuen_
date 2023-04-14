import { SignIn } from "@clerk/nextjs/app-beta";

const Page = async ({
  searchParams,
}: {
  searchParams: { redirectUrl: string };
}) => {
  const { redirectUrl } = searchParams;

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <SignIn redirectUrl={redirectUrl || "/"} />
        </div>
      </div>
    </section>
  );
};

export default Page;
