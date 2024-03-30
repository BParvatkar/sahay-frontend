import { useQuery } from "@tanstack/react-query";
import TrackInfo from "@/data/trackInfo.json";
import Runs from "@/data/runs.json";
import Detections from "@/data/detections.json";
import ImageDetections from "@/data/imageDetections.json";
import { useEffect, useState } from "react";

interface TrackInfo {
  id: string;
  name: string;
  health: number;
  total_faults: number;
  total_objects: number;
}

interface TrackRun {
  label: string;
  value: string;
}

export interface Detection {
  id: string;
  title: string;
  variant: string;
  variantLabel: string;
  detectionDate: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export interface ImageDetection {
  id: string;
  detection_id: string;
  title: string;
  variant: string;
  variantLabel: string;
  status: string;
}
export interface ImageDetectionResponse {
  image_id: string;
  detections: Array<ImageDetection>;
}

export const useFetchTrackInfo = (trackId?: string) =>
  useQuery({
    queryKey: ["trackInfo", trackId],
    queryFn: () => {
      return new Promise<TrackInfo>((resolve, reject) => {
        setTimeout(() => {
          const trackInfo = TrackInfo.find((track) => track.id === trackId);
          if (!trackInfo) {
            reject("No track found");
          } else {
            resolve(trackInfo as TrackInfo);
          }
        }, 300);
      });
    },
    enabled: !!trackId,
  });

export const useFetchTrackRuns = (trackId?: string) =>
  useQuery({
    queryKey: ["trackRuns", trackId],
    queryFn: () => {
      return new Promise<Array<TrackRun>>((resolve, reject) => {
        setTimeout(() => {
          resolve(Runs);
        }, 300);
      });
    },
    enabled: !!trackId,
  });

export const useFetchTrackDetections = (trackId?: string, runId?: string) =>
  useQuery({
    queryKey: ["trackDetections", trackId, runId],
    queryFn: () => {
      return new Promise<Array<Detection>>((resolve, reject) => {
        setTimeout(() => {
          const trackDetections = Detections.find(
            (trackData) => trackData.trackId === trackId
          );
          if (!trackDetections) {
            reject("No track found");
          } else {
            resolve(trackDetections.detections);
          }
        }, 300);
      });
    },
    enabled: !!trackId && !!runId,
  });

export const useFetchImageDetections = (
  trackId?: string,
  runId?: string,
  imageId?: number
) =>
  useQuery({
    queryKey: ["imageDetections", trackId, runId, imageId],
    queryFn: () => {
      return new Promise<ImageDetectionResponse>((resolve) => {
        setTimeout(() => {
          resolve(ImageDetections);
        }, 300);
      });
    },
    enabled: !!trackId && !!runId && imageId !== undefined,
  });
export const useTrackData = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>();
  const [selectedRunId, setSelectedRunId] = useState<string>();
  const [selectedDetectionId, setSelectedDetectionId] = useState<string>("");

  const onSelectTrackId = (trackId?: string) => {
    setSelectedTrackId(trackId);
    setSelectedRunId(undefined);
    setSelectedDetectionId("");
  };

  const onSelectRunId = (runId: string) => {
    setSelectedRunId(runId);
  };

  const onSelectDetection = (detectionId: string) => {
    setSelectedDetectionId((prevValue) => (!!prevValue ? "" : detectionId));
  };
  return {
    selectedTrackId,
    selectedRunId,
    selectedDetectionId,
    onSelectTrackId,
    onSelectRunId,
    onSelectDetection,
  };
};
