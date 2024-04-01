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
import UserSettings from "@/public/user-settings.svg";
import { APIProvider } from "@vis.gl/react-google-maps";
import GeoJSONTest from "@/data/test.geo.json";
import MapStyle from "@/data/mapStyle.json";
import {
  useFetchTrackDetections,
  useFetchTrackInfo,
  useFetchTrackRuns,
  useTrackData,
} from "./hooks";
import { useEffect, useMemo, useState } from "react";
import NavigationBar from "@/components/custom/navigationBar";
import CrossIcon from "@/public/cross.svg";
import { cn } from "@/lib/utils";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-4">
      {title}
    </h4>
  );
};

const MapStyles = {
  fullScreen: "h-[calc(100vh-4rem-2px)] w-screen",
  trackSelected: "h-[calc(100vh-4rem-2px)] w-1/2 lg:w-2/3",
};

const MapPathStyles: Record<string, string> = {
  "Market-Frankford Line": "bg-[#019ade]",
  "Broad Street Local": "bg-[#fa6400]",
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
  const [isOpenToast, setIsOpenToast] = useState(false);

  const isSidebarOpen = useMemo(
    () => selectedTrackId !== undefined,
    [selectedTrackId]
  );

  useEffect(() => {
    setIsOpenToast(true);
  }, []);
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
        <div className="w-full relative">
          <div
            className={cn([
              isSidebarOpen ? MapStyles.trackSelected : MapStyles.fullScreen,
              "relative",
            ])}
          >
            {isOpenToast && (
              <div className="relative">
                <div className="absolute top-2 ml-auto mr-auto bg-white text-center z-20 inset-0 w-max bg-white h-min px-3 py-3 rounded-md font-medium drop-shadow-lg ">
                  <div className="flex items-center">
                    <div className="mr-2">Please hover on a track</div>
                    <CrossIcon
                      fill="gray-600"
                      height="16"
                      className="cursor-pointer"
                      onClick={() => setIsOpenToast(false)}
                    />
                  </div>
                </div>
              </div>
            )}
            <VisGlMap
              geoJson={GeoJSONTest}
              mapStyle={MapStyle}
              position={{ lat: 39.9727508, lng: -75.1364587 }}
              onClickTrack={handleOnClickTrack}
              detections={trackDetections || []}
              selectedTrackId={selectedTrackId}
              selectedRunId={selectedRunId}
              onClickDetectionMarker={onSelectDetection}
              selectedDetectionId={selectedDetectionId}
            />
          </div>

          <Sidebar
            isOpen={isSidebarOpen}
            trackInfo={trackInfo}
            handleCloseSidebar={handleCloseSidebar}
            trackRuns={trackRuns}
            selectedRunId={selectedRunId}
            handleOnSelectRun={handleOnSelectRun}
            trackDetections={trackDetections}
            selectedTrackId={selectedTrackId}
            selectedDetectionId={selectedDetectionId}
            onSelectDetection={onSelectDetection}
          />
          <div className="absolute left-0 bottom-0 bg-white p-4 text-sm shadow-lg shadow-gray-400">
            <div className="font-semibold">Legends</div>
            <div className="flex flex-col gap-y-2 mt-2">
              {GeoJSONTest.features.map((feature) => (
                <div key={feature.id} className="flex items-center">
                  <div
                    className={cn([
                      "w-8 h-1  ",
                      MapPathStyles[feature.properties.name],
                    ])}
                  />
                  <div className="ml-2"> {feature.properties.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </APIProvider>
    </main>
  );
}
