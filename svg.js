
let states_data = {
    SRINAGAR : {
        confirmed : 15,
        recovered: 0,
        deceased : 2
    },

    LEH : {
        confirmed:11,
        recovered:2,
        deceased:1
    }
}

let map = document.querySelector("#jk_map")
let display_place_name = document.querySelector("#display_place_name")


let renderDistrictDetails = (details) => {
    display_place_name.textContent = details
    region = states_data[details]


    
     renderBarChart([region.confirmed,region.recovered,region.deceased],details)
}


map.addEventListener("mouseover", (e) => {
    console.log(e.target.id)
    renderDistrictDetails(e.target.id)

})



function renderBarChart(state_data,name){
    let data =
{
    labels: ['Confirmed', 'Revovered', 'Deceased'],
    datasets: [{

        label: name,
        backgroundColor: ['#e23028', '#86cf61', '#a4a8a2'],

        data: state_data
    }]
}

var ctx = document.getElementById('chart-1').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                // Change here
                barPercentage: 0.4
            }]
        }
    }
});

}


new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
        }, {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
        }, {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: false
        }, {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: false
        }, {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: "North America",
            borderColor: "#c45850",
            fill: false
        }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'World population per region (in millions)'
        }
    }
});