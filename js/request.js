// let dataRequest = new XMLHttpRequest();
//
// dataRequest.open('GET', 'js/data.json', true);
// dataRequest.onreadystatechange = function () {
//  if (dataRequest.readyState === 4) {
//    if (dataRequest.status !== 200) {
//      console.log(dataRequest.status + ': ' + dataRequest.statusText);
//    } else {
//        let dataArray = JSON.parse(dataRequest.responseText);
//        let typesArray = dataArray.types;
//        let prioritiesArray = dataArray.priorities;
//
//        for(let i = 0; i < tasksData.length; i++) {
//            tasksData[i].type = getRandomElementFromArray(typesArray);
//            tasksData[i].priority = getRandomElementFromArray(prioritiesArray);
//        }
//    }
//  }
// };
//
// dataRequest.send();



