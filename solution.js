function hierarchySortFunc(a,b ) {
    return a.name > b.name;
  }
  
  function hierarhySort(hashArr, key, result) {
  
    if (hashArr[key] == undefined) return;
    var arr = hashArr[key].sort(hierarchySortFunc);
    for (var i=0; i<arr.length; i++) {
      result.push(arr[i]);
      hierarhySort(hashArr, arr[i].id, result);
    }
  
    return result;
  }

module.exports = function sortCategoriesForInsert (inputJson) {
    var arr = [];
    for(var i=0; i<inputJson.length; i++>){
      if(inputJson[i].parent_id == null){
        inputJson[i].parent_id = 0
      }
      arr.push(inputJson[i])
    }
    var hashArr = {};
    
    for (var i=0; i<arr.length; i++) {
      if (hashArr[arr[i].parent_id] == undefined) hashArr[arr[i].parent_id] = [];
      hashArr[arr[i].parent_id].push(arr[i]);
    }
    
    var properJsonOutput = hierarhySort(hashArr, 0, []);
    return properJsonOutput;
}