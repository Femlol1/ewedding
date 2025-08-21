import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const CarouselClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const router = useRouter(); // Initialize the router

  const handleClose = () => {
    // Navigate away from the carousel, you can adjust the route
    router.push("/story"); // Navigate to the home page or any other page
  };

  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn(
        "absolute top-2 right-2 h-8 w-8 rounded-full",
        className
      )}
      onClick={handleClose}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close carousel</span>
    </Button>
  );
});

CarouselClose.displayName = "CarouselClose";

export { CarouselClose };
