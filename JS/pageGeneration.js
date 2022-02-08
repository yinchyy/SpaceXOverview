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
            <div id="itemHeader" class="resultItem">
            <p>ID</p>
            <p>Starlink name</p>
            <p>Launched</p>
            </div>
            <div id="itemsContainer" class="menuElements">
            
            </div>`;
            dataHandling.getData(target);
        }
        else {
            pageGeneration.generatePage("main");
        }
    }
};