let table_container = document.querySelector("#district_table_container")
let table_total = document.querySelector("#table_total")


function createTableEntries(){


    let total_confirmed = 0;
    let total_active = 0;
    let total_recovered = 0;
    let total_deceased = 0;


    

    let html = ""
    for(const district in districtsData){

       let district_data = districtsData[`${district}`]

       districts_array.push(district_data)
       // Rearrange Array
        
      
    }


    

    // Add Ladakh Details

    let ladakh_data = states_data.LEH

    districts_array.push({
        confirmed: ladakh_data.confirmed,
        recovered: ladakh_data.recovered,
        active:ladakh_data.active,
        district:ladakh_data.loc.toUpperCase(),
        deceased:ladakh_data.deceased
    })

    districtsData["LADAKH"] = ladakh_data

    districts_array.sort(compareStats)

  

    for(let i = 0 ; i < districts_array.length;i++){


        let district_data = districts_array[i]

        total_confirmed += district_data.confirmed
        total_active += district_data.active
        total_recovered += district_data.recovered
        total_deceased += district_data.deceased


        if(district_data.district == "AKSAI CHIN" || district_data.district == "PAK" || district_data.confirmed == 0){

        }

        else {

        html = html +  `

       
        <tr class=""><td style="font-weight: 600;">
           ${district_data.district}</td>
            <td>
        
            ${district_data.confirmed}</td>
            <td style="color: inherit;">
            ${district_data.active}</td>
            <td style="color: rgb(181, 181, 181);">
            ${district_data.recovered}</td>
                <td style="color: rgb(181, 181, 181);">
            ${district_data.deceased}
                </td></tr>
                <tr class="spacer" style="display: none;">
                    <td>
                        
                    </td>
                    <td>
                        
                    </td>
                    <td>

                    </td>
                </tr>
        `
        }

      
        table_container.innerHTML = html
        table_total.innerHTML = `

        <span class="dropdown rotateDownRight" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span><tr class="is-total"><td style="font-weight: 600;">
        Total</td>
        <td>
            ${total_confirmed}</td>
            <td style="color: inherit;">
              ${total_active}
            </td><td style="color: inherit;">
              ${total_recovered}
            </td><td style="color: inherit;">
              ${total_deceased}
            </td></tr><tr class="spacer" style="display: none;"><td></td><td></td><td></td></tr><tr class="district-heading" style="display: none;"><td><div class="heading-content"><abbr title="District">District</abbr><div style="display: initial;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></div></div></td><td><div class="heading-content"><abbr class="is-cherry" title="Confirmed">Cnfmd</abbr><div style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></div></div></td></tr><tr class="spacer" style="display: none;"><td></td><td></td><td></td></tr>
        `

    }

}



function compareStats(d1,d2){
    if(d1.confirmed > d2.confirmed){
        return -1
    }

    else {
        return 1
    }
}