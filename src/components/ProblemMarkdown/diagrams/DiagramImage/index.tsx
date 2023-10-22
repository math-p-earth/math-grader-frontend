'use client'

import React from 'react'

import Image from 'next/image'

import { DiagramImageBlock } from '~/types/payload-types'

import { useQueryMedia } from '../../../../hooks/useQueryMedia'

interface DiagramImageProps {
  diagram: DiagramImageBlock
}

export const DiagramImage: React.FC<DiagramImageProps> = ({ diagram }) => {
  const { query } = useQueryMedia({ image: diagram.image as string })
  if (!query.isSuccess) {
    return null
  }
  const image = query.data

  const width = diagram.width ?? image.width ?? 200
  const height = diagram.height ?? image.height ?? 200
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
