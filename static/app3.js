console.log("loaded app3");

var PieChart = function() {};

d3.json("/PieData").then((data) => {
    const labels = [
        'white_population',
        'black_population',
        'hispanic_population',
        'asian_population',
        'native_hawaiian_pacific_islander_population',
        'two_or_more_race_population',
        'other_population',
    ];

    PieChart = function(stateKey) {
        let currentData = data.filter(x => x.key === stateKey)[0];
        if(currentData) {
            let values = labels.map(label => currentData[label]);      
            var pieLayout = {
                title: {
                    text:"Demographics of Prison Population by State & Year",
                    xanchor:'center',
                    yanchor:'top'},
                autosize:true,
                // width:700,
                // height:700,
                showlegend:true,
                // legend:{x:1, y:1}
            }
            var config = {responsive: true}

            Plotly.newPlot('pie', [{values: values, labels: labels, type: 'pie'}], pieLayout, config)
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
        PieChart(domSelector.value);
    };

    // Get initial state
    var state = stateKey[0];


    PieChart(state);
});