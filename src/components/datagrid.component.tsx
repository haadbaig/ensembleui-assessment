import { useEffect, useRef, useState } from "react";
import { DataGridProps } from "../interfaces/IGlobal";
import {JSONPath} from 'jsonpath-plus';
import axios from "axios";
import { capitalizeWords } from "../common/utilities.common";
import { ColumnDTO } from "../dtos/column.dto";


const DataGrid: React.FC<DataGridProps> = ({columns, apiLink, jsonPathsForColumns}) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [dataCount, setDataCount] = useState<number[]>([]);
  const isLoading = useRef(false);
  // let testobj = [
  //   {
  //     "id": 8,
  //     "account_id": 5,
  //     "item_id": 1,
  //     "user_id": 1,
  //     "name": "CREDIT CARD 3333 PAYMENT 1",
  //     "type": "special",
  //     "date": "2022-09-02T00:00:00.000Z",
  //     "category": "Payment",
  //     "amount": 25,
  //     "created_at": "2022-09-07T19:42:29.165Z",
  //     "updated_at": "2022-09-07T19:42:34.885Z"
  //   },
  //   {
  //     "id": 8,
  //     "account_id": 5,
  //     "item_id": 1,
  //     "user_id": 4,
  //     "name": "CREDIT CARD 3333 PAYMENT 2",
  //     "type": "special",
  //     "date": "2022-09-02T00:00:00.000Z",
  //     "category": "Payment",
  //     "amount": 25,
  //     "created_at": "2022-09-07T19:42:29.165Z",
  //     "updated_at": "2022-09-07T19:42:34.885Z"
  //   },
  //   {
  //     "id": 8,
  //     "account_id": 5,
  //     "item_id": 1,
  //     "user_id": 2,
  //     "name": "CREDIT CARD 3333 PAYMENT 5",
  //     "type": "special",
  //     "date": "2022-09-02T00:00:00.000Z",
  //     "category": "Payment",
  //     "amount": 25,
  //     "created_at": "2022-09-07T19:42:29.165Z",
  //     "updated_at": "2022-09-07T19:42:34.885Z"
  //   },
  //   {
  //     "id": 8,
  //     "account_id": 5,
  //     "item_id": 1,
  //     "user_id": 3,
  //     "name": "CREDIT CARD 3333 PAYMENT 3",
  //     "type": "special",
  //     "date": "2022-09-02T00:00:00.000Z",
  //     "category": "Payment",
  //     "amount": 25,
  //     "created_at": "2022-09-07T19:42:29.165Z",
  //     "updated_at": "2022-09-07T19:42:34.885Z"
  //   },
  // ]
  useEffect(() => {
    if(!isLoading.current && tableData.length < 1){
      isLoading.current = true;
      axios
      .get(apiLink)
      .then(res => {
        let selectedDataArrays: any[] = [];
        if(res?.data?.data[0]) {
          jsonPathsForColumns
            .forEach(path => {
              let data = JSONPath({path:path, json: res?.data?.data});
              selectedDataArrays.push(data);
            }
          );
        };
        setDataCount(Array.from({ length: selectedDataArrays.length > 0 ? selectedDataArrays.length : 0 }, (_, index) => index));
        setTableData(selectedDataArrays);
        isLoading.current = false;
      });
    };
    
    // console.log(JSONPath({path:`$.[*].name`, json: testobj}))
    // console.log(JSONPath({path:`$.[*].user_id`, json: testobj}))
  },[])


  return (
    <div className='w-full h-full'>
      <table className="w-full table-auto">
        <tr className="bg-slate-300 border border-slate-700">
          {columns?.map(col => 
            <th className="h-10" key={col.key}>
              {col.name}
            </th>)
          }
        </tr>
        {tableData.map((columnDataArray, columnIndex) => (
          <tr className="border border-slate-700 h-[50px]" key={columnIndex}>
            {dataCount.map((index) => (
              <td key={index}>{columnDataArray[index]}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  )
}

export default DataGrid;