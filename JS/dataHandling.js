class dataHandling{
    static data;
    static async getData(target) {
        try {
            const response = await fetch(`https://api.spacexdata.com/v4/${target}`);
            const data = await response.json();
            dataHandling.data = data;
            dataHandling.printData(data,0);
            return data;
            }
        catch (err) {
            console.alert("Fetching data failed...");
        }
    }
    static printData(data, pageNumber) {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = "";
        let maxIndex = (pageNumber * 10) + 9;
        let elemIndex = 0 + (pageNumber*10);
        if (maxIndex >= data.length) {
            maxIndex = data.length - 1;
            elemIndex = maxIndex - (maxIndex % 10);
        }
        let className = "resultItem";
        for (elemIndex; elemIndex <= maxIndex; ++elemIndex) {
                itemsContainer.innerHTML += `
                <div class="${className}">
                <p>${data[elemIndex].spaceTrack.OBJECT_ID}</p>
                <p>${data[elemIndex].spaceTrack.OBJECT_NAME}</p>
                <p>${data[elemIndex].spaceTrack.LAUNCH_DATE}</p>
                </div>`;
        }
        pageGeneration.generatePageNav(pageNumber, Math.floor(data.length/10));
    }
};