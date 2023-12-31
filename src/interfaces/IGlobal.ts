import { PlotType } from "plotly.js";
import { ColumnDTO } from "../dtos/column.dto";

export interface DataGridProps {
  columns: ColumnDTO[];
  apiLink: string;
  jsonPathsForColumns: string[]
  xAxisColumn?: string; 
  yAxisColumn?: string;
  graphType?: PlotType;
}

export interface PlotlyProps {
  xAxisData?: any[];
  yAxisData?: any;
  graphType?: PlotType;
  color?: string;
  title?: string;
}

export interface TextFieldProp {
  id?: string;
  label?: string;
  width?: string;
  value?: string;
  onChange?: (e: any) => any;
}