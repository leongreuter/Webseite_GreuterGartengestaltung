import type { ImgHTMLAttributes } from 'react'
import { imageInfo } from '../data/images'
import { asset } from '../lib/base'

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string
  alt: string
  /** CSS object-position, e.g. "50% 60%". */
  position?: string
  /** Rendered width hint for the browser, default: full viewport. */
  sizes?: string
}

/**
 * Image with intrinsic size (prevents layout shift) and an automatic srcset
 * when `npm run images` produced a smaller variant.
 */
export function Img({ src, alt, position, sizes = '100vw', style, loading = 'lazy', ...rest }: Props) {
  const info = imageInfo(src)
  const srcSet = info?.small ? `${asset(info.small)} 960w, ${asset(src)} ${info.width}w` : undefined
  return (
    <img
      src={asset(src)}
      alt={alt}
      width={info?.width}
      height={info?.height}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      loading={loading}
      decoding="async"
      style={position ? { ...style, objectPosition: position } : style}
      {...rest}
    />
  )
}
