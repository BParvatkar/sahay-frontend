import { Detection, TrackInfo, TrackRun } from "@/lib/interfaces";
import CrossIcon from "@/public/cross.svg";
import TrackInfoCard from "./trackInfoCard";
import MedKit from "@/public/med-kit.svg";
import WarningFilled from "@/public/warning-filled.svg";
import Warning from "@/public/warning.svg";
import UserSettings from "@/public/user-settings.svg";
import PageSearch from "@/public/page_search.svg";
import { SelectRun } from "./selectRun";
import { DetectionInfo } from "./detectionsInfo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  trackInfo?: TrackInfo;
  handleCloseSidebar: () => void;
  trackRuns?: Array<TrackRun>;
  selectedRunId?: string;
  handleOnSelectRun: (runValue: string) => void;
  trackDetections?: Array<Detection>;
  selectedTrackId?: string;
  selectedDetectionId: string;
  onSelectDetection: (detectionId: string) => void;
}

const SidebarStyles = {
  visible:
    "bg-white absolute top-0 right-0 h-full w-1/2 lg:w-1/3 overflow-auto border-l overscroll-contain",
  hidden:
    "bg-white fixed top-0 right-0 h-screen w-0 overflow-hidden overscroll-contain",
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-4">
      {title}
    </h4>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  trackInfo,
  handleCloseSidebar,
  trackRuns,
  selectedRunId,
  handleOnSelectRun,
  trackDetections,
  selectedTrackId,
  selectedDetectionId,
  onSelectDetection,
}) => {
  return (
    <div className={isOpen ? SidebarStyles.visible : SidebarStyles.hidden}>
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
                label="8/10"
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
          <TrackInfoCard
            icon={<UserSettings height="1rem" width="1rem" />}
            title="Inspector Name"
            label="John Doe"
            className="pt-0 pb-4"
          />
          <SelectRun
            placeholder="Select a run"
            emptySearchLabel="No runs found"
            runs={trackRuns}
            selectedRun={selectedRunId}
            onSelectedRun={handleOnSelectRun}
          />
        </div>
      )}
      {trackDetections === undefined && (
        <div className="flex flex-col items-center justify-center mt-16 text-black">
          <PageSearch color="rgb(156 163 175)" />
          <div className="text-3xl mt-4">No run selected</div>
          <div className="text-base mt-2">
            Please select a run to view detections
          </div>
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
              image: detection.image,
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
    </div>
  );
};

export default Sidebar;
