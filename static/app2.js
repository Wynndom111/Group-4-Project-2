console.log("loaded app2.js");


d3.json("127.0.0.1:5000/Line").then(function (data) {
        console.log(data);

    });


