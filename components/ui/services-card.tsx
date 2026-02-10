"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

type CarouselApi = EmblaCarouselType | undefined;

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within Carousel");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});

CarouselItem.displayName = "CarouselItem";

const CarouselPrev = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        "absolute h-10 w-10 rounded-full bg-foreground/10 hover:bg-foreground/20",
        "left-2 top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
});

CarouselPrev.displayName = "CarouselPrev";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "absolute h-10 w-10 rounded-full bg-foreground/10 hover:bg-foreground/20",
        "right-2 top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
    </button>
  );
});

CarouselNext.displayName = "CarouselNext";

/* ================= SERVICE CARDS ================= */

export interface Service {
  number: string;
  title: string;
  description: string;
  icon?: React.ElementType;
  gradient: string;
}

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative flex h-[450px] w-full flex-col justify-between overflow-hidden rounded-3xl p-8 bg-gradient-to-r",
        service.gradient
      )}
    >
      <div className="z-10">
        <span className="text-sm font-mono text-blue-900">
          ({service.number})
        </span>
        {Icon && <Icon className="mt-4 h-12 w-12 text-blue-900" />}
      </div>

      <div className="z-10">
        <h3 className="text-lg font-semibold uppercase text-blue-900">
          {service.title}
        </h3>
        <p className="text-sm text-blue-800">{service.description}</p>
      </div>
    </motion.div>
  );
};

export const ServiceCarousel = ({ services }: { services: Service[] }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="w-full px-4">
      <Carousel ref={ref} opts={{ loop: true }} className="relative">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <ServiceCard service={service} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>

        <CarouselPrev />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
