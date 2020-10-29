console.log("loaded app2");

var barChart = function() {};

d3.json("/BarData").then((data) => {
    const labels = [
        'white_population',
        'black_population',
        'hispanic_population',
        'asian_population',
        'native_hawaiian_pacific_islander_population',
        'two_or_more_race_population',
        'other_population',
    ];
    console.log(data);
    barChart = function(stateKey) {
        let currentData = data.filter(x => x.key === stateKey)[0];
        console.log(currentData);
        if(currentData) {
            let values = labels.map(label => currentData[label]); 
            console.log(values);     
            var barLayout = {
                title: "Demographics of Prison Population by State & Year",
                width:1000,
                height:1000
            }
           // mark chartist chart (bar)
            new Chartist.Bar('.ct-chart', {
                labels: labels,
                series: values
              }, {
                distributeSeries: true
              });
        } else {
            console.log("stateKey does not exist: " + stateKey);
        }
    };

    var selector = d3.select("#stateSelect");


    // populate dropdown with states
    var stateKey = data.map(data => data.key);
    stateKey.forEach((state) => {
        selector.append("option")
            .text(state)
            .property("value", state)
    });

    let domSelector = document.getElementById('stateSelect');
    domSelector.onchange = () => {
        barChart(domSelector.value);
    };

    // Get initial state
    var state = stateKey[0];


    barChart(state);
});







