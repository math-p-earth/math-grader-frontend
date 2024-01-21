import React from 'react'

import { Media } from '../../../payload-types'

interface DiagramImageProps {
	image: Media
	caption?: string
	width?: number
	height?: number
}

export const DiagramImage: React.FC<DiagramImageProps> = ({ image, caption, width, height }) => {
	const [computedWidth, computedHeight] = getComputedWidthHeight(image, width, height)
	return (
		<div className="flex flex-col items-center">
			<img
				className="object-contain"
				src={image.url}
				alt={image.filename}
				width={computedWidth}
				height={computedHeight}
				style={{ width: computedWidth, height: computedHeight }}
			/>
			{caption && <caption className="text-sm italic">{caption}</caption>}
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
