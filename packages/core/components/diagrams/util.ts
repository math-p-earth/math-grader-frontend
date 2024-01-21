
export function isDiagramPlaceholderExist(source: string, index: number): boolean {
	return new RegExp(getDiagramPlaceholder(index)).test(source)
}

export function getDiagramPlaceholder(index: number): string {
	return `<${index + 1}>`
}