import { ColumnDTO } from "../dtos/column.dto";

export function capitalizeWords(inputString: string) {
  return inputString
    .split(' ')
    .map(word => {
      if (word.length === 0) {
        return '';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
