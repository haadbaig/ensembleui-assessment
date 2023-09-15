import { useState } from 'react';
import DataGrid from './components/datagrid.component';
import CustomTextField from './components/text-field.component';
import { ColumnDTO } from './dtos/column.dto';

function App() {
  // let columns: ColumnDTO[] = [
  //   {name: 'Flavor Text', key: 'flavor_text', type: 'string'},
  //   {name: 'Name', key: 'name', type: 'string'},
  //   {name: 'Category', key: 'category', type: 'string'},
  //   {name: 'Amount', key: 'amount', type: 'number'},
  // ]
  // `$.flavor_text_entries.[*].flavor_text`,`$.flavor_text_entries.[*].language.name`

  const [JSONPaths, setJSONPaths] = useState<string[]>([]);
  const [columns, setColumns] = useState<ColumnDTO[]>([]);
  const [path, setPath] = useState('');
  const [api, setApi] = useState('');
  const [columnName, setColumnName] = useState('');
  const [columnKey, setColumnKey] = useState('');
  const [columnType, setColumnType] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  const handleJSONPath = (e: any) => {
    e.preventDefault();
    setJSONPaths([...JSONPaths, path]);
    setPath('');
  }

  const handleAddColumn = (e: any) => {
    e.preventDefault();
    let newColumn = {
      name: columnName,
      key: columnKey,
      type: columnType
    }
    setColumns([...columns, newColumn]);
    setColumnName('');
    setColumnKey('');
    setColumnType('');
  }

  const removePath = (jsonPath: string) => {
    const index = JSONPaths.indexOf(jsonPath);
    if (index > -1) {
      JSONPaths.splice(index, 1);
      setJSONPaths([...JSONPaths]);
    }
  }

  const removeColumn = (col: ColumnDTO) => {
    const index = columns.findIndex(c => c.key === col.key);
    if (index > -1) {
      columns.splice(index, 1);
      setColumns([...columns]);
    }
  }
  
  return (
  <div className='w-full h-full'>
    <div className='p-5 w-full flex flex-col'>
      <form className='flex flex-col'>
        <CustomTextField id="api_link" value={api} label='API Link' width='w-1/2' onChange={(e) => setApi(e.target.value)} />
        <div className='flex flex-col w-1/2'>
          <div className='flex flex-row w-full'>
            <CustomTextField id="json-path" value={path} label='JSON Path' width='w-full' onChange={(e) => setPath(e.target.value)} />
            <button disabled={path === ''} className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white' onClick={handleJSONPath}>Add</button>
          </div>
          <div className='my-5 flex flex-row overflow-scroll w-full'>
            {JSONPaths.map(jp =>
              <div onClick={() => removePath(jp)} className='cursor-pointer px-3 bg-slate-300 border border-slate-200 rounded-lg h-[25px]'>
                {jp}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col w-1/2'>
          <div className='flex flex-row w-full'>
            <CustomTextField id="name" value={columnName} label='Name' width='w-full' onChange={(e) => setColumnName(e.target.value)} />
            <CustomTextField id="key" value={columnKey} label='Key' width='w-full' onChange={(e) => setColumnKey(e.target.value)} />
            <CustomTextField id="type" value={columnType} label='Type' width='w-full' onChange={(e) => setColumnType(e.target.value)} />
            <button disabled={columnName === '' || columnKey === '' || columnType === ''} className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white' onClick={handleAddColumn}>Add</button>
          </div>
          <div className='my-5 flex flex-col overflow-scroll w-full'>
            {columns.map(col =>
              <div 
                onClick={() => removeColumn(col)} 
                className='flex flex-row justify-between cursor-pointer px-3 bg-slate-300 border border-slate-200 rounded-lg h-[25px]'
              >
                <span>Name: {col.name}</span><span>Key: {col.key}</span><span>Type: {col.type}</span>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col w-1/2'>
          <div className='flex flex-row w-full'>
            <CustomTextField id="xaxis" value={columnName} label='X-Axis' width='w-full' onChange={(e) => setXAxis(e.target.value)} />
            <CustomTextField id="yaxis" value={columnKey} label='Y-Axis' width='w-full' onChange={(e) => setYAxis(e.target.value)} />
            <button disabled={columnName === '' || columnKey === '' || columnType === ''} className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white' onClick={handleAddColumn}>Add</button>
          </div>
          <div className='my-5 flex flex-col overflow-scroll w-full'>
            {columns.map(col =>
              <div 
                onClick={() => removeColumn(col)} 
                className='flex flex-row justify-between cursor-pointer px-3 bg-slate-300 border border-slate-200 rounded-lg h-[25px]'
              >
                <span>Name: {col.name}</span><span>Key: {col.key}</span><span>Type: {col.type}</span>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
    <DataGrid 
      columns={columns} 
      apiLink={api}
      jsonPathsForColumns={JSONPaths}
      xAxisColumn={xAxis}
      yAxisColumn={yAxis}
      graphType="bar"
    />
  </div>
  );
}

export default App;
