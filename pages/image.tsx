import type { CSSProperties, ImgHTMLAttributes } from 'react';

type ImageSource = string | { src: string };
type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: ImageSource;
  fill?: boolean;
  priority?: boolean;
};

export default function Image({ src, fill, priority: _priority, style, ...props }: ImageProps) {
  const rawSource = typeof src === 'string' ? src : src.src;
  const resolvedSource = rawSource.startsWith('/')
    ? `${import.meta.env.BASE_URL}${rawSource.slice(1)}`
    : rawSource;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }
    : style;

  return <img {...props} src={resolvedSource} style={fillStyle} />;
}
