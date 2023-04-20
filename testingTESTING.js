// d3.json("http://127.0.0.1:5000/api/v1.0/main")(function(barData) {

// let xBins = [Morning, Afternoon, Evening];
//     let yData = [];
//     for(let i = 0; i < tweets.length; i++) {
//     testTime += tweets[i];
//     }

// // let avgTweetLength = testTime / tweets.length;

// let title = 'Tweets by Day'

// let trace1 = {
//     x: xBins,
//     y: yData,
//     type: 'bar'
// };

// let tryOne = [trace1];
// let layout = {
//     title: title
// }});

// Plotly.newPlot("plot", tryOne, layout);

async function getTweetData() {
    const url = "http://127.0.0.1:5000/api/v1.0/main"

    const response = await fetch(url)
    const barChartData = await response.json()

    console.log(barChartData)
}

getTweetData()
