export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${src}`;
}
