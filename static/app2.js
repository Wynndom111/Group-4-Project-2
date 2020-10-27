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
           // Plotly.newPlot('bar', [{y: values, x: labels, type: 'bar'}], barLayout)
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







// console.log("loaded app2.js");


// function BarChart(stateKey) {

//     d3.json("/PieData").then((data) => {
//             //console.log(data);

//         //Get values to populate chart
//         var white_population = data.map(data => data.white_population)
//         var black_population = data.map(data => data.black_population)
//         var hispanic_population = data.map(data => data.hispanic_population)
//         var native_american_population = data.map(data => data.native_american_population)
//         var asian_population = data.map(data =>data.asian_population)
//         var native_hawaiian_Pacific_islander_population = data.map(data => data.native_hawaiian_Pacific_islander_population)
//         var two_or_more_race_population = data.map(data => data.two_or_more_race_population)
//         var other_population = data.map(data => data.other_population)
        
//         //define variables for chart
//         xTicks = ['white_population','black_population','hispanic_population','asian_population','native_hawaiian_Pacific_islander_population','two_or_more_race_population', 'other_population']
//         yValues = [white_population,black_population,hispanic_population,asian_population,native_hawaiian_Pacific_islander_population,two_or_more_race_population, other_population]
        
//         // enter chart data
//         var barData = {
//             x: xTicks,
//             y: yValues,
//             type: "bar",
//             orientation: "v"
//         }
        
//         // set chart layout
//         var barLayout = {
//             title: "Demographics of Prison Population by State & Year",
//             xaxis: {
//                 title: {
//                     text: 'Demographic Group'
//                 }
//             },
//             yaxis: {
//                 title: {
//                     text: 'Total Confined Population'
//                 }
//             }
//         }
//         // Plot Bar Chart
//         Plotly.newPlot("bar", [barData], barLayout);

//         });
//     };


// function initialChart(){

//     // grab state selector
//     var selector = d3.select("#stateSelect");

//     //read json
//     d3.json("/PieData").then((data) => {


//         // populate dropdown with states
//             var stateKey = data.map(data => data.key);
//             stateKey.forEach((state) => {
//             selector.append("option")
//                 .text(state)
//                 .property("value", state);
//         });

//         // Get initial state
//         var state = stateKey[0];


//        BarChart(state);
    
//     });
    
// };

// initialChart();

