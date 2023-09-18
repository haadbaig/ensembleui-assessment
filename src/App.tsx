import { PlotType } from 'plotly.js';
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
  // https://pokeapi.co/api/v2/ability/1/

  const [JSONPaths, setJSONPaths] = useState<string[]>([]);
  const [columns, setColumns] = useState<ColumnDTO[]>([]);
  const [path, setPath] = useState('');
  const [api, setApi] = useState('');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chart, setChart] = useState<PlotType>();

  const handleJSONPath = (e: any) => {
    e.preventDefault();
    setJSONPaths([...JSONPaths, e.target[0].value]);
    setPath('');
  }

  const handleAddColumn = (e: any) => {
    e.preventDefault();
    
    if (e.target[0].value === '' || e.target[1].value === '' || e.target[2].value === '') {
      return;
    }

    let newColumn = {
      name: e.target[0]?.value,
      key: e.target[1]?.value,
      type: e.target[2]?.value
    }
    e.target[0].value = ''
    e.target[1].value = ''
    e.target[2].value = ''
    setColumns([...columns, newColumn]);
  }

  const handleAddAxes = (e: any) => {
    e.preventDefault();
    setXAxis(e.target[0].value);
    setYAxis(e.target[1].value);
    e.target[0].value = '';
    e.target[1].value = '';
  }

  const handleAPIChange = (e: any) => {
    e.preventDefault();
    setApi(e.target[0].value);
  }

  const handleChartType = (e: any) => {
    e.preventDefault();
    setChart(e.target[0].value);
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

  const removeAxis = () => {
    setXAxis('');
    setYAxis('');
  }

  return (
  <div className='w-full h-full'>
    <div className='p-5 w-full flex flex-col'>
      <div className='flex flex-col'>
        <form className='flex flex-row w-1/2' onSubmit={handleAPIChange}>
          <CustomTextField id="api_link" value={api} label='API Link' width='w-full' />
          <button className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white'>Hit</button>
        </form>
        <div className='flex flex-col w-1/2'>
          <form className='flex flex-row w-full' onSubmit={handleJSONPath}>
            <CustomTextField id="json-path" value={path} label='JSON Path' width='w-full' onChange={(e) => setPath(e.target.value)} />
            <button disabled={path === ''} className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white'>Add</button>
          </form>
          <div className='my-5 flex flex-row overflow-scroll w-full'>
            {JSONPaths.map(jp =>
              <div onClick={() => removePath(jp)} className='cursor-pointer px-3 bg-slate-300 border border-slate-200 rounded-lg h-[25px]'>
                {jp}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col w-1/2'>
          <form className='flex flex-row w-full' onSubmit={handleAddColumn}>
            <CustomTextField id="name" label='Name' width='w-full' />
            <CustomTextField id="key" label='Key' width='w-full' />
            <CustomTextField id="type" label='Type' width='w-full' />
            <button
              className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white'
              type="submit" 
               
            >Add</button>
          </form>
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
          <form className='flex flex-row w-full' onSubmit={handleAddAxes}>
            <CustomTextField id="xaxis" label='X-Axis' width='w-full'/>
            <CustomTextField id="yaxis" label='Y-Axis' width='w-full'/>
            <button 
              type='submit' 
              className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 mt-6 h-[50px] text-white'>Add</button>
          </form>
          <div className='my-5 flex flex-col overflow-scroll w-full'>
            {xAxis !== '' && yAxis !== '' && <div 
              onClick={() => removeAxis()} 
              className='flex flex-row justify-between cursor-pointer px-3 bg-slate-300 border border-slate-200 rounded-lg h-[25px]'
            >
              <span>X-Axis: {xAxis}</span><span>Y-Axis: {yAxis}</span>
            </div>}
          </div>
        </div>
        <div className='flex flex-col w-1/2'>
          <form className='flex flex-row w-full' onSubmit={handleChartType}>
            <select className='w-full p-3 outline-none border border-slate-300 hover:border-slate-500 focus:border-slate-500 rounded h-[50px]'>
              <option value="">Select a chart to display</option>
              <option value="bar">Bar</option>
              <option value="line">line</option>
              {/* <option value="scatter">Scatter</option> */}
            </select>
            <button 
              type='submit' 
              className='px-5 bg-slate-900 disabled:bg-slate-400 rounded ml-2 h-[50px] text-white'>Add</button>
          </form>
        </div>
      </div>
    </div>
    <DataGrid 
      columns={columns} 
      apiLink={api}
      jsonPathsForColumns={JSONPaths}
      xAxisColumn={xAxis}
      yAxisColumn={yAxis}
      graphType={chart}
    />
  </div>
  );
}

export default App;
