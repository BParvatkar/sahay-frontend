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

const runs = [
  {
    label: "01 Mar 24",
    value: "01 Mar 24",
  },
  {
    label: "02 Mar 24",
    value: "02 Mar 24",
  },
  {
    label: "03 Mar 24",
    value: "03 Mar 24",
  },
  {
    label: "04 Mar 24",
    value: "04 Mar 24",
  },
  {
    label: "05 Mar 24",
    value: "05 Mar 24",
  },
  {
    label: "06 Mar 24",
    value: "06 Mar 24",
  },
];

const detections: Array<DetectionProps> = [
  {
    id: "1",
    title: "Tree on track",
    variant: "destructive",
    variantLabel: "Fault",
    detectionDate: "01 Mar 24",
    coordinate: {
      latitude: 23.34,
      longitude: 43.54,
    },
  },
  {
    id: "2",
    title: "Tree on track",
    variant: "destructive",
    variantLabel: "Fault",
    detectionDate: "01 Mar 24",
    coordinate: {
      latitude: 23.34,
      longitude: 43.54,
    },
  },
  {
    id: "3",
    title: "Tree on track",
    variant: "secondary",
    variantLabel: "Object",
    detectionDate: "01 Mar 24",
    coordinate: {
      latitude: 23.34,
      longitude: 43.54,
    },
  },
  {
    id: "4",
    title: "Tree on track",
    variant: "secondary",
    variantLabel: "Object",
    detectionDate: "01 Mar 24",
    coordinate: {
      latitude: 23.34,
      longitude: 43.54,
    },
  },
  {
    id: "5",
    title: "Tree on track",
    variant: "secondary",
    variantLabel: "Object",
    detectionDate: "01 Mar 24",
    coordinate: {
      latitude: 23.34,
      longitude: 43.54,
    },
  },
];

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-4">
      {title}
    </h4>
  );
};

export default function Home() {
  return (
    <main>
      <Sidebar>
        <div className="sticky top-0 bg-white py-2 px-4 border-indigo-500">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Market Frankford Line (L)
          </h3>
        </div>
        <div className="px-4">
          <div className="flex flex-wrap gap-4">
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
              label="8"
            />
            <TrackInfoCard
              icon={<Warning height="1rem" width="1rem" color="#000" />}
              title="Total Objects"
              label="8"
            />
          </div>
          <SectionTitle title="Runs" />
          <SelectRun
            placeholder="Select a run"
            emptySearchLabel="No runs found"
            runs={runs}
          />
          <SectionTitle title="Detections" />
          <DetectionInfo detections={detections} />
        </div>
      </Sidebar>
    </main>
  );
}
