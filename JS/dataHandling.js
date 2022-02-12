class dataHandling{
    static data;
    static async getData(target) {
        try {
            const response = await fetch(`https://api.spacexdata.com/v4/${target}`);
            const data = await response.json();
            dataHandling.data = data;
            dataHandling.printData(data,0,target);
            return data;
            }
        catch (err) {
            console.alert("Fetching data failed...");
        }
    }
    static printData(data, pageNumber,target) {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = "";
        let maxIndex = (pageNumber * 10) + 9;
        let elemIndex = 0 + (pageNumber*10);
        if (maxIndex >= data.length) {
            maxIndex = data.length - 1;
            elemIndex = maxIndex - (maxIndex % 10);
        }
        let className = "resultItem";
        if (target === "starlink") {   
            for (elemIndex; elemIndex <= maxIndex; ++elemIndex) {
                itemsContainer.innerHTML += `
                <div class="${className}">
                <p>${data[elemIndex].spaceTrack.OBJECT_ID}</p>
                <p>${data[elemIndex].spaceTrack.OBJECT_NAME}</p>
                <p>${data[elemIndex].spaceTrack.LAUNCH_DATE}</p>
                </div>`;
            }
            pageGeneration.generatePageNav(pageNumber, Math.floor(data.length/10),target);
        }
        else if (target === "rockets") {
            for (elemIndex; elemIndex <= maxIndex; ++elemIndex) {
                itemsContainer.innerHTML += `
                <div class="${className}">
                <p>${data[elemIndex].name}</p>
                <p>${data[elemIndex].first_flight}</p>
                <p>${data[elemIndex].active}</p>
                <div>
                <p>Height: ${data[elemIndex].height.meters}m</p>
                <p>Diameter: ${data[elemIndex].diameter.meters}m</p>
                <p>Mass: ${data[elemIndex].mass.kg}kg</p>
                </div>
                <div>
                <p>Launch price: $${data[elemIndex].cost_per_launch}</p>
                <img width="150" height="150" src="${data[elemIndex].flickr_images[0]}" referrerpolicy="no-referrer" alt="${data[elemIndex].name} image"/>
                </div>
                <div>
                <p>Engine</p>
                <p>Type: ${data[elemIndex].engines.type}</p>
                <p>Thrust in vacuum: ${data[elemIndex].engines.thrust_vacuum.kN}kN</p>
                <p>Thrust on sea level: ${data[elemIndex].engines.thrust_sea_level.kN}kN</p>
                <p>Thrust to weight ratio: ${data[elemIndex].engines.thrust_to_weight}</p>
                </div>
                <p class="description">${data[elemIndex].description}</p>
                </div>`;
                for (const elem of document.querySelectorAll(`#itemsContainer>.${className}`)) {
                    elem.addEventListener('click', (e) => {
                        try {
                            if (e.target !== e.currentTarget) {
                                throw new Error("Child element clicked.");
                            }
    
                            if (e.target.className.includes(" unfolded")) {
                                e.target.className = e.target.className.replace(" unfolded", "");
                            }
                            else {
                                e.target.className += " unfolded";
                            }
                        }
                        catch (err) {
                            if (e.currentTarget.className.includes(" unfolded")) {
                                e.currentTarget.className = e.currentTarget.className.replace(" unfolded", "");
                            }
                            else {
                                e.currentTarget.className += " unfolded";
                            }
                        }
                        finally {
                            const elems = document.querySelectorAll(".unfolded");
                            if (elems.length > 1) {   
                                for (const elem of elems) {
                                    if (elem !== e.currentTarget) {
                                        elem.className = elem.className.replace(" unfolded", "");
                                    }
                                }
                            }
                        }
                    });
                }
            }
        pageGeneration.generatePageNav(pageNumber, Math.floor(data.length/10),target);
        }
        else if (target === "roadster") {
            itemsContainer.innerHTML = `
            <div id="pageNav" class="resultItem">
            <p>Tesla facts</p>
            </div>
            <div id="teslaData" class="resultItem unfolded">
            <p style="width:45%;height:30px;">Distance from earth: ${data.earth_distance_km}km</p>
            <p style="width:45%;height:30px;">Distance from mars: ${data.mars_distance_km}km</p>
            <p>Launch date: ${data.launch_date_utc.substring(0, 10)}</p>
            <p class="description">${data.details}</p>
            <div id="imagesContainer">
            
            </div>
            </div>
            <div class="resultItem">
            </div>
            `;
            const teslaIMG = document.querySelector("#imagesContainer");
            for (const img of data.flickr_images) {
                teslaIMG.innerHTML += `
                <img width="150" height="150" src="${img}" alt="Roadster photo"/>`;
            }

        }
        
    }
};