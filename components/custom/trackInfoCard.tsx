import { cn } from "@/lib/utils";

interface TrackInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  label: string;
}
const TrackInfoCard: React.FC<TrackInfoCardProps> = ({
  icon,
  title,
  label,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2 py-2", className)}>
      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 shado-sm">
        {icon}
      </div>
      <div className="grid gap-1.5">
        <p className="text-base font-medium tracking-tighter">{title}</p>
        <p className="text-sm leading-none text-gray-500">{label}</p>
      </div>
    </div>
  );
};
export default TrackInfoCard;
