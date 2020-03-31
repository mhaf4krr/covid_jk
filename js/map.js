const API_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSg-doiJ59mWF5UiJP-tCB6XCqahr9YaXe6eHiyWFyjylHtGRuy5yZrw1ZNWq3etbbyU8Gqz0i5gANp/pub?gid=0&single=true&output=csv&prevent-cache="

fetch(API_URL + (Math.floor(Math.random()*10**8)).toString()).then((response) => {
    return response.text()
}).then((text) => {
   let  patientData = ArraysToDict(CSVToArray(text));
   let  districts = getDistrictNames()
    
    calculateDistrictData(patientData,districts)
    createTableEntries()
    renderDefaultMapView()
    renderColoredMap()
});


function calculateDistrictData(patientData,districts){
    
    let data = {}
    
    districts.forEach((district)=>{
        console.log(district)
   
        data[`${district}`] = calculateStats(patientData,district)
    })

    districtsData = data
}


function calculateStats(patientData,district){
    let place = district
    let recovered = 0
    let confirmed = 0
    let deceased = 0
    let active = 0

    for(let i=0 ; i < patientData.length; i++){

        let patient = patientData[i]

        if(patient.District.toUpperCase() == place){
            confirmed = confirmed + 1;

            if(patient.Status == "Deceased"){
                deceased = deceased + 1
            }

            else if(patient.Status == "Recovered"){
                recovered = recovered+1
            }

        }
    }

    active = confirmed - deceased - recovered


   return {
       confirmed:confirmed,
       recovered:recovered,
       active:active,
       deceased:deceased,
       district:district
   }
}


