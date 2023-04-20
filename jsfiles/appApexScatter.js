//Loading in Data//

//url
const url = 'http://127.0.0.1:5000/api/v1.0/main';

//reformat data into seperate lists:
function processdata(jsondata, postivedata,neutraldata, negativedata) { 
  //positivedata,neutraldata,negativedata -> empty arrays
  //jsondata -> a dictionary in the form 
  // {
  //   "airline": "Southwest", 
  //   "sentiment": "negative", 
  //   "time": "08:09:14", 
  //   "timezone": "Pacific Time (US & Canada)", 
  //   "tweet": 135
  // }

  var [hours, minutes, seconds] = jsondata.time.split(":");
  var tweet_time = new Date(Date.UTC(1970,5,7,hours,minutes,seconds))
  // var tweet_time = new Date();
  // tweet_time.setHours(hours);
  // tweet_time.setMinutes(minutes);
  // tweet_time.setSeconds(seconds);

  datapoint = [tweet_time, jsondata.tweet]

  if (jsondata.sentiment === 'positive' ) {
    postivedata.push(datapoint);
  } else if (jsondata.sentiment === 'negative' ){
    negativedata.push(datapoint);
  } else if (jsondata.sentiment === 'neutral'){
    neutraldata.push(datapoint);
  }
  
};


//Loop created if statment through the dataset
function formatForApex(jsondata){
  //set up empty list
  postivearray = []
  negativearray = []
  neutralarray = []

  //loop and push to array
  for (var i = 0 ; i<jsondata.length; i++) {
    processdata(jsondata[i],postivearray, negativearray, neutralarray)
    
  };

  return [{"name": 'positive',
          "data" :postivearray},
          {"name": 'negative',
            "data":  negativearray},
          {"name": 'neutral',
            "data": neutralarray}
         ]

        
}

d3.json(url).then(result => {
  var formattedData = formatForApex(result);
  console.log(formattedData);

  var options = {
    series:formattedData,
    chart:{
      height:300,//NOTE: this refers to the length of tweet we can expect
      type:'scatter',
      zoom:{
        enabled:true,
        type:'xy'
      }
    },
    xaxis:{
      type: 'datetime',
      datetimeFormat: 'HH:mm:ss',
      tick: {
        interval: 60*60*1000,
        format:'HH:mm:ss'
      }
    },
    yaxis:{
      tickAmount:7
    }
  };
  
  var chart = new ApexCharts(document.querySelector("#apex"),options);
  chart.render();



});






















  









  