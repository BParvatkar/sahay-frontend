interface TrackInfoCardProps {
  icon: React.ReactNode;
  title: string;
  label: string;
}
const TrackInfoCard: React.FC<TrackInfoCardProps> = ({
  icon,
  title,
  label,
}) => {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 shado-sm">
        {icon}
      </div>
      <div className="grid gap-1.5">
        <h3 className="text-sm font-medium tracking-tighter">{title}</h3>
        <p className="text-sm leading-none text-gray-500">{label}</p>
      </div>
    </div>
  );
};
export default TrackInfoCard;
