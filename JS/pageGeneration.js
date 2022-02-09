class pageGeneration{
    static generatePage(target) {
        const container = document.getElementsByClassName("content")[0];
        if (target.toLowerCase() === "main") {
            container.innerHTML = `
            <div id="menuName"class="menuElements">
            <p>Menu</p>
            </div>
            <hr>
            <div class="menuElements">
                <a class="categoryButton" onclick="pageGeneration.generatePage('starlink')">Starlinks</a>
                <a class="categoryButton" onclick="pageGeneration.generatePage('rockets')">Rockets</a>
                <a class="categoryButton" onclick="pageGeneration.generatePage('tesla')">Tesla in space</a>
            </div>
        `;
        }
        else if (target.toLowerCase() === "starlink") {
            container.innerHTML = `
            <div id="navBar" class="menuElements">
                <a class="navButton" onclick="pageGeneration.generatePage('main')">&lt;</a>
                <p>${target[0].toUpperCase()+target.substring(1)}s</p>
            </div>
            <hr>
            <div class="resultItem itemHeader">
            <p>ID</p>
            <p>Satellite name</p>
            <p>Launch date</p>
            </div>
            <div id="itemsContainer" class="menuElements">
            
            </div>
            <div id="pageNav" class="resultItem itemHeader">

            </div>`;
            dataHandling.getData(target);
        }
        else {
            pageGeneration.generatePage("main");
        }
    }
    static generatePageNav(start,end) {
        const navContainer = document.getElementById('pageNav');
        navContainer.innerHTML = '';
        if (start > 0) {
            if (start > 1) {
                navContainer.innerHTML += `
                <a class="navButton" onclick="dataHandling.printData(dataHandling.data,0)">&lt;&lt;</a>
                 `;    
            }
            else {
                navContainer.innerHTML += `
                <a class="navButton inactive" onclick="">&lt;&lt;</a>
                `;
            }
        navContainer.innerHTML += `
        <a class="navButton" onclick="dataHandling.printData(dataHandling.data,${start - 1})">&lt;</a>
        `;
        }
        else {
             navContainer.innerHTML += `
             <a class="navButton inactive" onclick="">&lt;&lt;</a>
             <a class="navButton inactive" onclick="">&lt;</a>
            `;
        }
        navContainer.innerHTML += `
            <a class="navButton inactive" onclick="">${start+1}</a>
         `;
        if (start < end) {
            navContainer.innerHTML += `
            <a class="navButton" onclick="dataHandling.printData(dataHandling.data,${start + 1})">&gt;</a>
            `;
            if (start < end - 1) {
                navContainer.innerHTML += `
                <a class="navButton" onclick="dataHandling.printData(dataHandling.data,${end})">&gt;&gt;</a>
                `;       
            }
            else {
                navContainer.innerHTML += `
                <a class="navButton inactive" onclick="">&gt;&gt;</a>
                `;          
            }
        }
        else {
          navContainer.innerHTML += `
            <a class="navButton inactive" onclick="">&gt;</a>
            <a class="navButton inactive" onclick="dataHandling.printData(dataHandling.data,${end})">&gt;&gt;</a>
         `;   
        }
    }
};