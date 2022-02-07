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
            <a class="categoryButton" onclick="pageGeneration.generatePage('starlinks')">Starlinks</a>
            <a class="categoryButton" onclick="pageGeneration.generatePage('rockets')">Rockets</a>
            <a class="categoryButton" onclick="pageGeneration.generatePage('tesla')">Tesla in space</a>
            </div>
        `;
        }
        else if (target.toLowerCase() === "starlinks") {
            container.innerHTML = `<div id="navBar"class="menuElements">
            <a class="navButton" onclick="pageGeneration.generatePage('main')">&lt;</a>
            </div>`;
        }
        else {
            pageGeneration.generatePage("main");
        }
    }
};