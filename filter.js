let projects = document.getElementsByClassName("projectDisplay")
let checkedDict = {}
let allTech = getAllTechUsed()

function displayFilteredProjects() {
    let count = 0
    for (let i = 0; i < projects.length; i++) {
        let proj = projects[i]
        let techUsed = $(proj).find(".techUsed").text().trim()
        let isShown = false
        let showAll = true

        for (const [language, isFilter] of Object.entries(checkedDict)) {
            if (isFilter) showAll = false
            if (isFilter && (techUsed.toLowerCase()).includes(language.toLowerCase())) {
                isShown = true
            }
        }

        if (showAll) {
            count = projects.length
            $(proj).removeClass("d-none")
        }
        else if (!isShown) {
            $(proj).addClass("d-none")
        } else {
            count++
            $(proj).removeClass("d-none")
        }
    }

    $(".projectCount").text(count + " project(s)  ")
}

//todo: count each tech
function getAllTechUsed() {
    let allTechUsed = []
    for (let i = 0; i < projects.length; i++) {
        let proj = projects[i]
        let techUsed = $(proj).find(".techUsed").text().trim()
        techUsed = techUsed.replace(/ *\([^)]*\) */g, ""); // remove everything inside paraenthesis
        let langs = techUsed.split(",")
        for(let j = 0; j < langs.length; j++){
            allTechUsed.push(langs[j].trim())
        }
    }
    return [...new Set(allTechUsed)]; //remove duplicates from array
}

function addFilterButton(name){
    let count = $("[name=tech]").length + 1
    let inp = $("<input type=\"checkbox\" class=\"btn-check\" id=\"btncheck" + count + "\" name=\"tech\" autocomplete=\"off\">")
    let lab = $("<label class=\"btn btn-outline-light\" for=\"btncheck" + count + "\">" + name + "</label>")
    $("#filters").append(inp,lab)
}

for(let i = 0; i < allTech.length; i++){
    addFilterButton(allTech[i])
    checkedDict[allTech[i]] = false
}
//addFilterButton("test")
displayFilteredProjects()

$('input[name=tech]').change(function () {
    let checked = $(this).is(':checked')
    let techName = $(this).next().text()
    checkedDict[techName] = checked
    displayFilteredProjects()
});

