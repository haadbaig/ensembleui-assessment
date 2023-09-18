export function capitalizeWords(inputString: string) {
  return inputString
    .split(' ')
    .map(word => {
      if (word.length === 0) {
        return '';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function convertArrayInObject(arrays: any[]) {
  let columnsName: string[] = []
  let tableObjectArray: any[] = [];
  let tableObject: any = {};
  let countArray = Array.from({ length: arrays.length > 0 ? arrays[0].data?.length : 0 }, (_, index) => index);
  
  arrays.forEach(arr => columnsName.push(arr.key));
  
  countArray.forEach(index => {
    arrays.forEach((array, i) => tableObject[columnsName[i]] = array.data[index]);
    tableObjectArray.push(tableObject);
    tableObject = {};
  })
  return tableObjectArray;
}