"use client";
import VisGlMap from "@/components/custom/VisGlMap";
import {
  DetectionInfo,
  DetectionProps,
} from "@/components/custom/detectionsInfo";
import { SelectRun } from "@/components/custom/selectRun";
import Sidebar from "@/components/custom/sidebar";
import TrackInfoCard from "@/components/custom/trackInfoCard";
import { Button } from "@/components/ui/button";
import MedKit from "@/public/med-kit.svg";
import WarningFilled from "@/public/warning-filled.svg";
import Warning from "@/public/warning.svg";
import { APIProvider } from "@vis.gl/react-google-maps";
import GeoJSONTest from "@/data/test.geo.json";
import {
  useFetchTrackDetections,
  useFetchTrackInfo,
  useFetchTrackRuns,
  useTrackData,
} from "./hooks";
import { useMemo, useState } from "react";
import NavigationBar from "@/components/custom/navigationBar";
import CrossIcon from "@/public/cross.svg";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-4">
      {title}
    </h4>
  );
};

const MapStyles = {
  fullScreen: "h-screen w-screen",
  trackSelected: "h-screen w-1/2 lg:w-2/3",
};

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const {
    selectedTrackId,
    selectedRunId,
    onSelectTrackId,
    onSelectRunId,
    selectedDetectionId,
    onSelectDetection,
  } = useTrackData();
  const { data: trackInfo } = useFetchTrackInfo(selectedTrackId);
  const { data: trackRuns } = useFetchTrackRuns(selectedTrackId);
  const { data: trackDetections } = useFetchTrackDetections(
    selectedTrackId,
    selectedRunId
  );

  const isSidebarOpen = useMemo(
    () => selectedTrackId !== undefined,
    [selectedTrackId]
  );

  const handleOnClickTrack = (trackId: string) => {
    onSelectTrackId(trackId);
  };

  const handleOnSelectRun = (runValue: string) => {
    onSelectRunId(runValue);
  };

  const handleCloseSidebar = () => {
    onSelectTrackId();
  };
  return (
    <main>
      <NavigationBar />
      <APIProvider apiKey={apiKey || ""}>
        <div
          className={
            isSidebarOpen ? MapStyles.trackSelected : MapStyles.fullScreen
          }
        >
          <VisGlMap
            geoJson={GeoJSONTest}
            position={{ lat: 39.9727508, lng: -75.2364587 }}
            onClickTrack={handleOnClickTrack}
            detections={trackDetections || []}
            selectedTrackId={selectedTrackId}
            selectedRunId={selectedRunId}
            onClickDetectionMarker={onSelectDetection}
            selectedDetectionId={selectedDetectionId}
          />
        </div>
        <Sidebar isOpen={isSidebarOpen}>
          {trackInfo !== undefined && (
            <>
              <div className="sticky top-0 bg-white py-2 px-4 border-b border-slate-200 z-10">
                <div className="flex justify-between items-center">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {trackInfo.name}
                  </h3>
                  <CrossIcon
                    className="h-5 w-5 cursor-pointer fill-gray-700"
                    onClick={handleCloseSidebar}
                  />
                </div>
              </div>
              <div className="px-4">
                <div className="flex flex-wrap gap-x-12">
                  <TrackInfoCard
                    icon={<MedKit height="1rem" width="1rem" />}
                    title="Track Health"
                    label="8"
                  />
                  <TrackInfoCard
                    icon={
                      <WarningFilled
                        height="1rem"
                        width="1rem"
                        color="rgb(225 29 72)"
                      />
                    }
                    title="Total Faults"
                    label={`${trackInfo.total_faults}`}
                  />
                  <TrackInfoCard
                    icon={<Warning height="1rem" width="1rem" color="#000" />}
                    title="Total Objects"
                    label={`${trackInfo.total_objects}`}
                  />
                </div>
              </div>
            </>
          )}
          {trackRuns !== undefined && (
            <div className="px-4">
              <SectionTitle title="Inspection Runs" />
              <SelectRun
                placeholder="Select a run"
                emptySearchLabel="No runs found"
                runs={trackRuns}
                selectedRun={selectedRunId}
                onSelectedRun={handleOnSelectRun}
              />
            </div>
          )}
          {trackDetections !== undefined && (
            <div className="px-4">
              <SectionTitle title="Detections" />
              <DetectionInfo
                selectedTrackId={selectedTrackId}
                selectedRunId={selectedRunId}
                detections={trackDetections.map((detection) => ({
                  id: detection.id,
                  title: detection.title,
                  detectionDate: detection.detectionDate,
                  coordinate: detection.coordinate,
                  variantLabel: detection.variantLabel,
                  variant: detection.variant as
                    | "default"
                    | "secondary"
                    | "destructive"
                    | "outline"
                    | null
                    | undefined,
                }))}
                openDetection={selectedDetectionId}
                onClickDetection={onSelectDetection}
              />
            </div>
          )}
        </Sidebar>
      </APIProvider>
    </main>
  );
}
