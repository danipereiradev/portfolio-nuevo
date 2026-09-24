import type { CSSProperties, ImgHTMLAttributes } from 'react';

const pngToWebp = (src: string) => src.replace(/\.png$/i, '.webp');

type PictureImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

/** Sirve WebP cuando el src es PNG y existe el .webp gemelo. PNG queda de fallback. */
export const PictureImg = ({
  src,
  alt = '',
  width,
  height,
  decoding = 'async',
  style,
  ...imgProps
}: PictureImgProps) => {
  const aspectStyle: CSSProperties | undefined =
    width && height && !style?.aspectRatio
      ? { aspectRatio: `${width} / ${height}`, ...style }
      : style;

  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding={decoding}
      style={aspectStyle}
      {...imgProps}
    />
  );
  if (!/\.png$/i.test(src)) return img;

  return (
    <picture className='contents'>
      <source type='image/webp' srcSet={pngToWebp(src)} />
      {img}
    </picture>
  );
};
