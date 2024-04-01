"use client";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Flag from "@/public/flag.svg";
import React, {
  LegacyRef,
  createRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Detection } from "@/lib/interfaces";

interface VisGlMapProps {
  geoJson: object;
  mapStyle: object;
  position: google.maps.LatLngLiteral;
  onClickTrack: (trackId: string) => void;
  detections: Array<Detection>;
  selectedTrackId?: string;
  selectedRunId?: string;
  onClickDetectionMarker: (id: string) => void;
  selectedDetectionId?: string;
}

interface GoogleMapEvent {
  latLng: google.maps.LatLng;
  feature: google.maps.Data.Feature;
}

const AdvancedMarkerColorVariants: any = {
  body: {
    destructive:
      "rounded-md min-w-8 min-h-6 flex bg-red-600 justify-center items-center relative z-10 p-2 text-white font-medium",
    secondary:
      "rounded-md min-w-8 min-h-6 flex bg-gray-300 justify-center items-center relative z-10 p-2 text-black font-medium",
  },
  contentVisibility: {
    hidden: "hidden group-hover:block",
    visible: "block",
  },
  arrow: {
    destructive: "w-3 h-3 -mt-2 mx-auto bg-red-600 rotate-45",
    secondary: "w-3 h-3 -mt-2 mx-auto bg-gray-300 rotate-45",
  },
};

const VisGlMap: React.FC<VisGlMapProps> = ({
  geoJson,
  mapStyle,
  position,
  onClickTrack,
  selectedTrackId,
  selectedRunId,
  detections,
  onClickDetectionMarker,
  selectedDetectionId,
}) => {
  const map = useMap();
  const [trackHoverData, setTrackHoverData] = useState<GoogleMapEvent>();

  const isVisibleTrackInfoCard = useMemo(() => {
    if (!trackHoverData) return false;
    if (trackHoverData.feature.getId() !== selectedTrackId || !selectedRunId)
      return true;
    return detections.length === 0;
  }, [trackHoverData, selectedTrackId, selectedRunId, detections]);

  const onClick = (event: GoogleMapEvent) => {
    console.log("click", event.latLng.toJSON());
    const trackId = event.feature.getId();

    if (typeof trackId === "string") {
      onClickTrack(trackId);
    }
  };

  const onHover = (event: GoogleMapEvent) => {
    setTrackHoverData(event);
  };

  useEffect(() => {
    if (!map) return;

    map.data.addGeoJson(geoJson);

    map.data.setStyle((feature) => {
      const strokeColor = feature.getProperty("strokeColor") as string;

      return {
        cursor: "pointer",
        strokeColor: strokeColor || "black",
      };
    });

    const gme = google.maps.event;
    gme.addListener(map.data, "click", onClick);
    gme.addListener(map.data, "mouseover", onHover);
    const mapData = map.data;
    return () => {
      gme.clearInstanceListeners(mapData);
    };
  }, [map, geoJson]);

  return (
    <Map defaultCenter={position} defaultZoom={12} mapId="fa6d42066208f3c7">
      {detections.map((detection, index) => (
        <AdvancedMarker
          key={`advancedMarker-${detection.id}`}
          position={{
            lat: detection.coordinate.latitude,
            lng: detection.coordinate.longitude,
          }}
          onClick={() => onClickDetectionMarker(detection.id)}
        >
          <div className="group">
            <div
              className={AdvancedMarkerColorVariants.body[detection.variant]}
            >
              <div
                className={
                  AdvancedMarkerColorVariants.contentVisibility[
                    selectedDetectionId === detection?.id ? "visible" : "hidden"
                  ]
                }
              >
                {detection.title}
              </div>
            </div>
            <div
              className={AdvancedMarkerColorVariants.arrow[detection.variant]}
            ></div>
          </div>
        </AdvancedMarker>
      ))}
      {trackHoverData && isVisibleTrackInfoCard && (
        <InfoWindow
          position={trackHoverData.latLng.toJSON()}
          onCloseClick={() => setTrackHoverData(undefined)}
        >
          <div>
            <div className="text-base font-medium">
              {trackHoverData.feature.getProperty("name") as string}
            </div>
            <div
              className="cursor-pointer text-xs font-medium text-blue-500 hover:text-blue-900 mt-2 text-center"
              onClick={() => {
                onClickTrack(trackHoverData.feature.getId() as string);
                setTrackHoverData(undefined);
              }}
            >
              View Details
            </div>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export default VisGlMap;
