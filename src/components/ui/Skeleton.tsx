import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Card";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}

function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center bg-cynical-900">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-8 w-24 mx-auto bg-cynical-700" />
          <Skeleton className="h-16 w-3/4 mx-auto bg-cynical-700" />
          <Skeleton className="h-6 w-2/3 mx-auto bg-cynical-700" />
          <Skeleton className="h-32 w-96 mx-auto bg-cynical-700" />
        </div>
      </Container>
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}

export { Skeleton, HeroSkeleton, CardSkeleton };
