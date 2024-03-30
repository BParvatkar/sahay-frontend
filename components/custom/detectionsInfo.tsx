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
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchImageDetections } from "@/app/hooks";

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
  selectedTrackId?: string;
  selectedRunId?: string;
  detections: Array<DetectionProps>;
  openDetection: string;
  onClickDetection: (id: string) => void;
}

export const DetectionInfo: React.FC<DetectionInfoProps> = ({
  selectedTrackId,
  selectedRunId,
  detections,
  openDetection,
  onClickDetection,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();
  const updateImageIndexRef = useRef<(index: number) => void>();
  const { data: imageDetectionsData } = useFetchImageDetections(
    selectedTrackId,
    selectedRunId,
    selectedImageIndex
  );

  const handleChangeSelectedImageIndex = (index: number) => {
    console.log("selectedImageIndex", selectedImageIndex);
    if (selectedImageIndex === index) {
      console.log("handleChangeSelectedImageIndex clicked");
      setSelectedImageIndex(undefined);
    } else {
      console.log("handleChangeSelectedImageIndex new");
      setSelectedImageIndex(index);
    }
  };

  useEffect(() => {
    updateImageIndexRef.current = handleChangeSelectedImageIndex;
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", (a) => {
      console.log("selected", a.selectedScrollSnap());
      console.log("selected");
      // Do something on select.
    });
    api.on("pointerDown", (a) => {
      if (!updateImageIndexRef.current) {
        return;
      }
      updateImageIndexRef.current(a.selectedScrollSnap());
      // Do something on select.
    });
  }, [api]);

  const handleOnClickDetection = (detectionId: string) => {
    onClickDetection(detectionId);
    setSelectedImageIndex(undefined);
  };
  return (
    <Accordion
      value={openDetection}
      onValueChange={handleOnClickDetection}
      type="single"
      collapsible
      className="w-full"
    >
      {detections.map((detection) => (
        <AccordionItem key={detection.id} value={detection.id}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex">
              <div className="flex justify-start w-16">
                <Badge variant={detection.variant}>
                  {detection.variantLabel}
                </Badge>
              </div>
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
              <div className="font-medium">Status:</div>
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
            <div className="font-medium mt-4">Images:</div>
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
                <div className="flex justify-center">
                  <CarouselPrevious className="relative top-0 left-0 translate-y-0" />
                  <CarouselNext className="relative top-0 right-0 translate-y-0 ml-2" />
                </div>
              </Carousel>
            </div>
            <div className="text-center	italic font-light text-xs">
              Click on the image to view other detections
            </div>
            {selectedImageIndex !== undefined &&
              imageDetectionsData &&
              imageDetectionsData.detections.length > 0 && (
                <>
                  <div className="font-medium my-4">Other detections:</div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {imageDetectionsData.detections.map((imageDetection) => (
                        <TableRow key={imageDetection.id}>
                          <TableCell>
                            <Badge
                              variant={
                                imageDetection.variant as
                                  | "default"
                                  | "secondary"
                                  | "destructive"
                                  | "outline"
                                  | null
                                  | undefined
                              }
                            >
                              {imageDetection.variantLabel}
                            </Badge>
                          </TableCell>
                          <TableCell>{imageDetection.title}</TableCell>
                          <TableCell>{imageDetection.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
