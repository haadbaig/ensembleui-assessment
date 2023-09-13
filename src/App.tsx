import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { capitalizeWords } from './common/utilities.common';
import DataGrid from './components/datagrid.component';
import { ColumnDTO } from './dtos/column.dto';

function App() {
  let columns: ColumnDTO[] = [
    {name: 'Name', key: 'title', type: 'string'},
    {name: 'Type', key: 'type', type: 'string'},
    // {name: 'Category', key: 'category', type: 'string'},
    // {name: 'Amount', key: 'amount', type: 'number'},
  ]
  const isLoading = useRef(false);
  
  return (
  <div className='w-full h-full'>
    <DataGrid 
      columns={columns} 
      apiLink={"https://us-central1-fir-apps-services.cloudfunctions.net/transactions"}
      jsonPathsForColumns={[`$.[*].name`,`$.[*].type`]}
    />
  </div>
  );
}

export default App;
