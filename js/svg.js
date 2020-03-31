
let display_place_name = document.querySelector("#display_place_name")



/* SERVICE WORKER REGISTRATION */

let confirmed_header = document.querySelector("#confirmed_header")
let recovered_header = document.querySelector("#recovered_header")
let deceased_header = document.querySelector("#deceased_header")
let active_header = document.querySelector("#active_header")
let last_updated = document.querySelector("#last_updated")

/* MAP ELEMENTS */

let maps_confirmed = document.querySelector("#maps_confirmed")
let maps_active = document.querySelector("#maps_active")
let maps_recovered = document.querySelector("#maps_recovered")
let maps_deceased = document.querySelector("#maps_deceased")





fetch("https://api.rootnet.in/covid19-in/stats/latest")
    .then((response) => { return response.json() })
    .then((data) => {
      
        let jk = data.data.regional[10]
        let ladakh = data.data.regional[13]



        jk.confirmed = jk.confirmedCasesIndian + jk.confirmedCasesForeign
        ladakh.confirmed = ladakh.confirmedCasesIndian + ladakh.confirmedCasesForeign

        jk.deceased = jk.deaths
        ladakh.deceased = ladakh.deaths
        jk.recovered = jk.discharged
        ladakh.recovered = ladakh.discharged
        jk.active = jk.confirmed - jk.recovered - jk.deceased
        ladakh.active = ladakh.confirmed - ladakh.recovered - ladakh.deceased

        

        states_data.JK = jk
        states_data.LEH = ladakh


        total_active = ladakh.active + jk.active
        total_recovered = ladakh.recovered + jk.recovered
        total_deceased = ladakh.deceased + jk.deceased

        renderPieChart([total_active, total_recovered, total_deceased])


        renderHeaderStats(jk, ladakh)

    })
    .catch(err => console.log(err))



function renderHeaderStats(jk, ladakh) {
    confirmed_header.textContent = jk.confirmed + ladakh.confirmed
    recovered_header.textContent = jk.recovered + ladakh.recovered
    deceased_header.textContent = jk.deceased + ladakh.deceased
    active_header.textContent = jk.active + ladakh.active

}


function renderMapHeaderStats(region) {
    maps_confirmed.textContent = region.confirmed
    maps_recovered.textContent = region.recovered
    maps_active.textContent = region.active
    maps_deceased.textContent = region.deceased
}







map.addEventListener("mouseover", (e) => {
  
    renderDistrictDetails(e.target.id)

})



map.addEventListener("click",(e)=>{
    renderDistrictDetails(e.target.id)
})

function renderBarChart(state_data, name) {
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


function renderPieChart(data) {
    var ctx = document.getElementById("pie-chart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["ACTIVE", "RECOVERED", "DECEASED"],
            datasets: [{
                backgroundColor: [
                    "#ff073a",
                    "#28a745",
                    "#6c757d"
                ],
                data: data
            }]
        }
    });

}

function renderDefaultMapView() {
    let region = states_data["JK"]
    display_place_name.textContent = "JAMMU KASHMIR"
    renderMapHeaderStats(region)
    renderBarChart([region.confirmed, region.recovered, region.deceased], "JAMMU KASHMIR")
}



function renderColoredMap() {
    let regions = map.children[0].children

    let colors = ["rgb(254, 216, 200)", "rgb(252, 181, 155)","rgb(252, 187, 163)", "rgb(187, 21, 26)"]

    for (let i = 0; i < regions.length; i++) {


        let region = regions[i]

        let regional_data = districtsData[region.id]

        if(regional_data.confirmed > 0) {
            region.style.fill = colors[0]
        }

        if(regional_data.confirmed > 5){
            region.style.fill = colors[1]
        }

        if(regional_data.confirmed > 10){
            region.style.fill = colors[2]
        }


        if(regional_data.confirmed > 15) {
            region.style.fill = colors[3]
        }

        else {

        }
       

    }
}



function renderDistrictDetails(district){

    let details = districtsData[`${district}`]

    display_place_name.textContent = district



    /* MAP STATS */

    maps_active.textContent = details.active
    maps_confirmed.textContent = details.confirmed
    maps_deceased.textContent = details.deceased
    maps_recovered.textContent = details.recovered

    let data = [details.confirmed,details.recovered,details.deceased]
    renderBarChart(data,district)

}