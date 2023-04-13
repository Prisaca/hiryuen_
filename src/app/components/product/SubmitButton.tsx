"use client";

import { addToCart } from "@/lib/swell/cart";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { Product } from "swell-js";
import { useSWRConfig } from "swr";
import { Blinker } from "../ui/loading";
import * as Toast from "@radix-ui/react-toast";
import Link from "next/link";
import { XMarkIcon, CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function SubmitButton({ product }: { product: Product }) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // Toast
  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const isMutating = loading || isPending;

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    await addToCart({
      product_id: product.id,
      quantity: 1,
    }).then((res) => {
      if ("errors" in res) {
        setError(true);
      } else {
        setError(false);
      }
    });

    setLoading(false);
    setOpen(false);
    timerRef.current = window.setTimeout(() => {
      eventDateRef.current = oneWeekAway();
      setOpen(true);
    }, 100);
    mutate("cart");
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="sm:flex-col1 mt-10 flex">
        <Toast.Provider swipeDirection="right">
          <button
            type="submit"
            disabled={isMutating}
            className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-stone-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-full"
          >
            {isMutating ? <Blinker /> : "Add to Cart"}
          </button>
          <Toast.Root
            className={clsx(
              error ? "bg-red-100" : "bg-green-100",
              "rounded-md shadow-[hsl(206_22%_7%_/_15%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
            )}
            open={open}
            onOpenChange={setOpen}
          >
            <Toast.Title className="[grid-area:_title] flex flex-row gap-4 mb-[5px] font-medium text-slate12 text-[15px]">
              {error ? (
                <XMarkIcon className="text-red-600 w-6" />
              ) : (
                <CheckIcon className="text-green-600 w-6" />
              )}
              {error ? "There was an error" : "Product was added to cart"}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </Toast.Provider>
      </div>
    </form>
  );
}

function oneWeekAway() {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
