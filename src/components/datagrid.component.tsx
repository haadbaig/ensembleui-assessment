import { useEffect, useRef, useState } from "react";
import { DataGridProps } from "../interfaces/IGlobal";
import {JSONPath} from 'jsonpath-plus';
import axios from "axios";
import { convertArrayInObject } from "../common/utilities.common";
import GraphPlotly from "./graph.component";


const DataGrid: React.FC<DataGridProps> = ({columns, apiLink, jsonPathsForColumns, xAxisColumn, yAxisColumn, graphType}) => {
  const [selectedDataObjectArray, setSelectedDataObjectArray] = useState<any[]>([]);
  const [selectedDataArrays, setSelectedDataArrays] = useState<{key: string, data: any}[]>([]);
  const [rawData, setRawData] = useState<any>();
  const [axes, setAxes] = useState<string[]>([]);
  const isLoading = useRef(false);
  
  useEffect(() => {
    if(!isLoading.current){
      isLoading.current = true;
      try {
        axios
        .get(apiLink)
        .then(res => {
          if(res?.data) {
            setRawData(res.data);
          };
          isLoading.current = false;
        });
      } catch (e: any) {
        console.log(e.message);
      }
    };
  },[apiLink])

  useEffect(() => {
    if(jsonPathsForColumns.length > 0){
      filterData();
    }
  },[jsonPathsForColumns])

  useEffect(() => {
    if(xAxisColumn && yAxisColumn) {
      setAxes([]);
      axes.push(xAxisColumn);
      axes.push(yAxisColumn);
    }
  },[xAxisColumn, yAxisColumn, graphType])

  const filterData = () => {
    setSelectedDataArrays([]);
    jsonPathsForColumns
    .forEach(path => {
      let findName = path.split('.');
      let data = {key: findName[findName.length-1], data:JSONPath({path:path, json: rawData})};
      selectedDataArrays.push(data);
    });
    setSelectedDataObjectArray(convertArrayInObject(selectedDataArrays))
  }


  return (
    <div className='w-full'>
      <table className="w-full table-fixed">
        <tr className="bg-slate-300 border border-slate-700">
          {columns?.map(col => 
            <th className="border border-slate-700 h-10" key={col.key}>
              {col.name}
            </th>)
          }
        </tr>
        { selectedDataObjectArray.map((tableObject) => (
          <tr className="h-[50px]">
            {columns.map((key) => (
              <td className="px-5 border border-slate-300">{tableObject[key.key] ? tableObject[key.key] : ""}</td>
            ))}
          </tr>
        ))}
      </table>
      {(xAxisColumn && yAxisColumn && graphType !== undefined) ? <div className="w-full flex flex-row justify-center align-center">
        <GraphPlotly
          xAxisData={selectedDataArrays.find(x => x.key === axes[0])?.data}
          yAxisData={selectedDataArrays.find(y => y.key === axes[1])?.data}
          graphType={graphType}
        />
      </div> : ""}
    </div>
  )
}

export default DataGrid;