const url = ('http://127.0.0.1:5000/api/v1.0/main')

d3.json(url).then((data)=>{

let uniqueAirline = data.map(item => item.airline)
  .filter((item, i, ar) => ar.indexOf(item) === i)
    console.log(uniqueAirline);
});



(function init() {
    let dropdown = d3.select('#selData');

    d3.json(url).then((data)=>{

        let uniqueAirline = data.map(item => item.airline)
          .filter((item, i, ar) => ar.indexOf(item) === i)
        

        uniqueAirline.forEach((name) => {
            dropdown.append("option")
            .text(name)
            .property("value", name)
        })

    starter = "Delta"

    createPie(starter)
    });
})();


function createPie(airline) {
    d3.json(url).then((data) => {

        let airlineData = data
        let airlineValues = airlineData.filter(object => object.airline == airline);
        console.log(airlineValues)

        positive = 0
        negative = 0
        neutral = 0

        airlineValues.forEach((airline) => {
            if (airline.sentiment === 'positive') {
                positive += 1
            }
            else if (airline.sentiment === 'negative') {
                negative += 1
            }

            else if (airline.sentiment === 'neutral') {
                neutral += 1
            }
        });
        console.log(positive)

        let trace1 = [{
            values : [positive, negative, neutral],
            labels : ["positive", "negative", "neutral"],
            type: 'pie'
        }];

        let layout = {
            height: 400,
            width: 500
        };

        Plotly.newPlot("pie", trace1, layout);
    });
};

function optionChanged(airline) {
    console.log(airline);
    createPie(airline);
};