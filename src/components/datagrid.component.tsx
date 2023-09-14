import { useEffect, useRef, useState } from "react";
import { DataGridProps } from "../interfaces/IGlobal";
import {JSONPath} from 'jsonpath-plus';
import axios from "axios";
import { convertArrayInObject } from "../common/utilities.common";
import GraphPlotly from "./graph.component";


const DataGrid: React.FC<DataGridProps> = ({columns, apiLink, jsonPathsForColumns, xAxisColumn, yAxisColumn, graphType}) => {
  const [selectedDataObjectArray, setSelectedDataObjectArray] = useState<any[]>([]);
  const [selectedDataArrays] = useState<{key: string, data: any}[]>([]);
  const isLoading = useRef(false);
  
  useEffect(() => {
    if(!isLoading.current && selectedDataObjectArray.length < 1){
      isLoading.current = true;
      axios
      .get(apiLink)
      .then(res => {
        if(res?.data?.data[0]) {
          jsonPathsForColumns
            .forEach(path => {
              let findName = path.split('.');
              let data = {key: findName[findName.length-1], data:JSONPath({path:path, json: res?.data?.data})};
              selectedDataArrays.push(data);
            }
          );
        };
        setSelectedDataObjectArray(convertArrayInObject(selectedDataArrays));
        isLoading.current = false;
      });
    };
  },[apiLink, jsonPathsForColumns, selectedDataObjectArray, selectedDataArrays])


  return (
    <div className='w-full h-full'>
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
      <div className="w-full flex flex-row justify-center align-center">
        <GraphPlotly
          xAxisData={selectedDataArrays.find(x => x.key === xAxisColumn)?.data}
          yAxisData={selectedDataArrays.find(y => y.key === yAxisColumn)?.data}
          graphType={graphType}
        />
      </div>
    </div>
  )
}

export default DataGrid;
{/* <table className="w-full table-auto">
  <tr className="bg-slate-300 border border-slate-700">
    {columns?.map(col => 
      <th className="h-10" key={col.key}>
        {col.name}
      </th>)
    }
  </tr>
  {dataCount.map((index) => (
    <tr className="border border-slate-700 h-[50px]">
      {tableData.map((columnDataArray) => (
        <td>{columnDataArray[index]}</td>
      ))}
    </tr>
  ))}
</table> */}