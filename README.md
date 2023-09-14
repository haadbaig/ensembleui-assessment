# Guidelines to run project

- `npm install` for installing dependencies.
- `npm start` to run project.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Features

This module has everything one would need in populating datagrid and visualizing data. This implementation solves the problem where one wants to represent the response with dense object in a tabular form. This implementation provides user with option to pass jsonPath of the properties which user wants to show in tabular form. As an additional feature, this implementation uses Plotly.js to provide feature of ploting graph between selective columns. And the best part is, user only have to pass name of columns in xAxisColumn and yAxisColumn, and name of the graph-type in which user wants to represent its data.

# Using Guide

The parent module is <DataGrid />. The module takes following props:

`1) columns: ColumnDTO[]`
  `columns` prop takes array of objects in following format: 
    [
      {
        name: string, // title of the column 
        key: string, // unique name of the column, also the key of the JSON object that wants to render in table.
        type: string, // type of the columns
      },
      ...
    ]

`2) apiLink: string`
  This prop takes the `API link` which returns array of objects.

`3) jsonPathsForColumns: string[]`
  This prop takes array of strings, where each string represent the `JSONPath` of the attribute of the object that user wants to show in the table 

`4) xAxisColumn?: string`
  This prop takes a string which takes the key name of the column which you want to represent on `x-axis of graph`

`5) yAxisColumn?: string`
  This prop takes a string which takes the key name of the column which you want to represent on `y-axis of graph`

`6) graphType?: PlotType`
  This prop takes the type of graph as string. Types of graphs can be found at (```https://plotly.com/javascript/basic-charts/```).

Sample usage of the module can be found in `App.tsx` file.