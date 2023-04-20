///////////////////
/// Fetch Data ///

d3.json("http://127.0.0.1:5000/api/v1.0/main").then(function(mainData) { 

// let [hours, minutes, seconds] = mainData.time.split(":");
// //let tweet_time = new Date(Date.UTC(1970,5,7,hours,minutes,seconds))
// console.log(time)

    let morning = 0;
    let afternoon = 0;
    let evening = 0;

    mainData.forEach(i => {

        if (i.time >= "05:00:00" && i.time <= "10:59:59") {
            morning += 1}
            else if (i.time >= "11:00:00" && i.time <= "17:59:59") {
                afternoon += 1}
                else {
                    evening += 1}
    })
console.log(morning)
console.log(afternoon)
console.log(evening)

    // let morn = [Object.(tweet_time.filter(Tweets.time >= "05:00:00", and_ <= "10:59:59"))];
    // let noon = [Object.values(tweet_time.filter(Tweets.time >= "11:00:00", and_ <= "17:59:59"))];
    // let eve = [Object.values(tweet_time.filter(Tweets.time >= "18:00:00", and_ <= "23:59:59"))];
    let barChartData = [
        {
            x: ["morning", "afternoon", "evening"],
            y: [morning, afternoon, evening],
            type: 'bar'  
        }
    ];
    
    Plotly.newPlot('bar', barChartData);
});


