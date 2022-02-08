class dataHandling{
    static async getData(target) {
        try {
            const response = await fetch(`https://api.spacexdata.com/v4/${target}`);
            const data = await response.json();
            dataHandling.printData(data);
            return data;
            }
        catch (err) {
            console.alert("Fetching data failed...");
        }
    }
    static printData(data) {
        let i = 0;
            for (let elem of data) {
                document.getElementById("itemsContainer").innerHTML += `
                <div class="resultItem">
                <p>${elem.spaceTrack.OBJECT_ID}</p>
                <p>${elem.spaceTrack.OBJECT_NAME}</p>
                <p>${elem.spaceTrack.LAUNCH_DATE}</p>
                </div>`;
                if (++i >= 10) {
                    break;
                }
            }
    }
};