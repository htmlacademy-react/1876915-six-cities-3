export const capitalizeFirstLetter = (line: string) => line?.replace(/^./i, (char) => char.toUpperCase());

export const pluralize = (word: string, count: number) => count > 1 ? `${word}s` : word;
