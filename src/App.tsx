import DataGrid from './components/datagrid.component';
import { ColumnDTO } from './dtos/column.dto';

function App() {
  let columns: ColumnDTO[] = [
    {name: 'Name', key: 'name', type: 'string'},
    {name: 'Type', key: 'type', type: 'string'},
    {name: 'Category', key: 'category', type: 'string'},
    {name: 'Amount', key: 'amount', type: 'number'},
  ]
  
  return (
  <div className='w-full h-full'>
    <DataGrid 
      columns={columns} 
      apiLink={"https://us-central1-fir-apps-services.cloudfunctions.net/transactions"}
      jsonPathsForColumns={[`$.[*].name`,`$.[*].type`,`$.[*].category`,`$.[*].amount`]}
      xAxisColumn="name"
      yAxisColumn="amount"
      graphType='scatter'
    />
  </div>
  );
}

export default App;
