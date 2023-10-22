import React from 'react'

import Image from 'next/image'

import { getMediaById } from '~/api/media/getMediaById'
import { DiagramImageBlock, Media } from '~/types/payload-types'

interface DiagramImageProps {
  diagram: DiagramImageBlock
}

export const DiagramImage: React.FC<DiagramImageProps> = async ({ diagram }) => {
  const image =
    typeof diagram.image === 'string' ? await getMediaById(diagram.image) : diagram.image

  const [width, height] = getComputedWidthHeight(image, diagram.width, diagram.height)
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <Image
        className="object-contain"
        src={image.url ?? ''}
        alt={image.filename ?? ''}
        width={width}
        height={height}
        style={{ width, height }}
      />
      {diagram.caption && <div className="text-sm italic">{diagram.caption}</div>}
    </div>
  )
}

/**
 * Calculate the width and height of the image based on the given width and height. The aspect ratio is preserved if possible.
 */
function getComputedWidthHeight(image: Media, width?: number, height?: number): [number, number] {
  const imageWidth = image.width ?? 400
  const imageHeight = image.height ?? 400

  const aspectRatio = imageWidth / imageHeight
  if (typeof width === 'undefined' && typeof height === 'undefined') {
    return [imageWidth, imageHeight]
  } else if (typeof width === 'number' && typeof height === 'number') {
    return [width, height]
  }

  if (typeof width === 'number') {
    height = width / aspectRatio
  } else if (typeof height === 'number') {
    width = height * aspectRatio
  }
  return [width as number, height as number]
}
