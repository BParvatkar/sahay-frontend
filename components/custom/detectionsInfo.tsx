"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge, badgeVariants } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { type VariantProps } from "class-variance-authority";
import TrackInfoCard from "@/components/custom/trackInfoCard";
import Calendar from "@/public/calendar.svg";
import Location from "@/public/location.svg";
import { useEffect, useState } from "react";

interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface DetectionProps extends VariantProps<typeof badgeVariants> {
  id: string;
  title: string;
  variantLabel: string;
  detectionDate: string;
  coordinate: Coordinate;
}

interface DetectionInfoProps extends VariantProps<typeof badgeVariants> {
  detections: Array<DetectionProps>;
}

export const DetectionInfo: React.FC<DetectionInfoProps> = ({ detections }) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (a, b) => {
      console.log("selected", a.selectedScrollSnap());
      console.log("selected", b);
      // Do something on select.
    });
  }, [api]);
  return (
    <Accordion type="single" collapsible className="w-full">
      {detections.map((detection) => (
        <AccordionItem key={detection.id} value={detection.id}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex">
              <Badge variant={detection.variant}>
                {detection.variantLabel}
              </Badge>
              <div>{detection.title}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-4">
              <TrackInfoCard
                icon={<Calendar height="1rem" width="1rem" fill="#000" />}
                title="Detected At"
                label={detection.detectionDate}
              />
              <TrackInfoCard
                icon={<Location height="1rem" width="1rem" fill="#000" />}
                title="Coordinate"
                label={`${detection.coordinate.longitude}, ${detection.coordinate.latitude}`}
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-4 items-center">
              <div className="font-medium">Status: </div>
              <Select value="reviewed">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="pending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="repaired">Repaired</SelectItem>
                  <SelectItem value="false-positive">False Positive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">Images</div>
            <div className="flex justify-center">
              <Carousel className="w-full max-w-xs" setApi={setApi}>
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 cursor-pointer">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span
                              onClick={() => {}}
                              className="text-4xl font-semibold"
                            >
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
