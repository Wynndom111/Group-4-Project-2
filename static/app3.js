function PieChart(stateKey)
{
    d3.json("/PieData").then((data) => {
            //console.log(data);
        //Get values to populate chart
        var white_population = data.map(data => data.white_population)
        var black_population = data.map(data => data.black_population)
        var hispanic_population = data.map(data => data.hispanic_population)
        var native_american_population = data.map(data => data.hispanic_population)
        var asian_population = data.map(data =>data.asian_population)
        var native_hawaiian_Pacific_islander_population = data.map(data => data.native_hawaiian_Pacific_islander_population)
        var two_or_more_race_population = data.map(data => data.two_or_more_race_population)
        var other_population = data.map(data => data.other_population)
        values = [white_population,black_population,hispanic_population,asian_population,native_hawaiian_Pacific_islander_population,two_or_more_race_population, other_population]
        labels = ['white_population','black_population','hispanic_population','asian_population','native_hawaiian_Pacific_islander_population','two_or_more_race_population', 'other_population']
        var pieData = {
            values = values,
            labels = labels,
            type: "pie"
        }
        var pieLayout = {
            title: "Demographics of Prison Population by State & Year"
        }
    Plotly.newPlot("pie", [pieData], pieLayout);
    });
};


function initialChart(){

    // grab state selector
    var selector = d3.select("#stateSelect");

    //read json
    d3.json("/PieData").then((data) => {


        // populate dropdown with states
            var stateKey = data.map(data => data.key);
            stateKey.forEach((state) => {
            selector.append("option")
                .text(state)
                .property("value", state);
        });

        // Get initial state
        var state = stateKey[0];


       BarChart(stateKey);
    
    });
    
};

initialChart();