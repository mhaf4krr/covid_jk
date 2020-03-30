let map = document.querySelector("#jk_map")
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


let states_data = {
    JK : null,

    LEH : null
}




fetch("https://api.rootnet.in/covid19-in/stats/latest")
.then((response) => {return response.json()})
.then((data)=> {
    console.log(data)
   let jk= data.data.regional[10]
   let ladakh = data.data.regional[13]



   jk.confirmed = jk.confirmedCasesIndian + jk.confirmedCasesForeign
   ladakh.confirmed = ladakh.confirmedCasesIndian + ladakh.confirmedCasesForeign
   
   jk.deceased = jk.deaths
   ladakh.deceased = ladakh.deaths
   jk.recovered = jk.discharged
   ladakh.recovered = ladakh.discharged
   jk.active = jk.confirmed - jk.recovered - jk.deceased
   ladakh.active = ladakh.confirmed - ladakh.recovered - ladakh.deceased

   console.log(jk,ladakh)

   states_data.JK = jk
   states_data.LEH = ladakh


    total_active = ladakh.active + jk.active
    total_recovered = ladakh.recovered + jk.recovered
    total_deceased = ladakh.deceased + jk.deceased

    renderPieChart([total_active,total_recovered,total_deceased])


   renderHeaderStats(jk,ladakh)
   renderDefaultMapView()
   renderColoredMap()
})
.catch(err => console.log(err))



function renderHeaderStats(jk,ladakh){
    confirmed_header.textContent = jk.confirmed + ladakh.confirmed
    recovered_header.textContent =  jk.recovered + ladakh.recovered
    deceased_header.textContent =  jk.deceased + ladakh.deceased
    active_header.textContent = jk.active + ladakh.active
    
}


function renderMapHeaderStats(region){
    maps_confirmed.textContent = region.confirmed
    maps_recovered.textContent = region.recovered
    maps_active.textContent = region.active
    maps_deceased.textContent = region.deceased
}




let renderDistrictDetails = (details) => {
    
    region = states_data[details]

    if(details == "LEH" || details =="KARGIL"){
        region = states_data["LEH"]
        display_place_name.textContent = "LADAKH"
    }
    else {
        region = states_data["JK"]
        display_place_name.textContent = "JAMMU KASHMIR"
        
    }


    renderMapHeaderStats(region)
    
     renderBarChart([region.confirmed,region.recovered,region.deceased],details)
}


map.addEventListener("mouseover", (e) => {
    console.log(e.target.id)
    renderDistrictDetails(e.target.id)

})



function renderBarChart(state_data,name){
 if(name == "AKSAI CHIN" || name == "PAK"){
  return
 }
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


function renderPieChart(data){
    var ctx = document.getElementById("pie-chart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["ACTIVE","RECOVERED","DECEASED"],
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

function renderDefaultMapView(){
    let region = states_data["JK"]
    renderMapHeaderStats(region)
    renderBarChart([region.confirmed,region.recovered,region.deceased],"JAMMU KASHMIR")
}



function renderColoredMap(){
    let regions = map.children[0].children
  

   for(let i=0;i<regions.length;i++){

        

        let region = regions[i]

       

        if(region.id == "PAK" || region.id == "AKSAI CHIN"){

        }

        else if(region.id =="KARGIL" || region.id=="LEH"){

            region.style.fill="#ffe10c"
        }

        else {
            region.style.fill="#ff930c"
        }
    
   }
}
