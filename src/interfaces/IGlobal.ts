import { ColumnDTO } from "../dtos/column.dto";

export interface DataGridProps {
  columns: ColumnDTO[];
  apiLink: string;
  jsonPathsForColumns: string[]
}