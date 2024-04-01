export interface TrackInfo {
  id: string;
  name: string;
  health: number;
  total_faults: number;
  total_objects: number;
}

export interface TrackRun {
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
  image: string;
}
