
// Function to populate the template with data
async function fetchData() {
    return fetch('./projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
}

function populateTemplate(projectData) {
    const templateRight = document.getElementById('projectTemplateRight');
    const templateLeft = document.getElementById('projectTemplateLeft');
    projectData.sort((a, b) => (b.priority || -Infinity) - (a.priority || -Infinity));
    console.log(projectData)
    for (let i = 0; i < projectData.length; i++) {
        let left = i % 2 === 0;
        const project = projectData[i];
        let clone;

        if (left) {
            clone = document.importNode(templateRight.content, true);
        } else {
            clone = document.importNode(templateLeft.content, true);
        }
        clone.querySelector('.projectHeader').textContent = project.name;
        clone.querySelector('.projectSummary').innerHTML = project.description;
        clone.querySelector('.techUsed').textContent = project?.languages.join(', ');
        clone.querySelector('.stillImage').src = project?.thumbnail;
        clone.querySelector('.imageGif').src = project?.preview || project?.thumbnail;

        clone.querySelector('.github').href = project.links?.github;
        clone.querySelector('.website').href = project.links?.live;
        if(project.links?.github === undefined){
            clone.querySelector('.github').remove();
        }
        if(project.links?.live === undefined){
            clone.querySelector('.website').remove();
        }

        document.getElementById("projects").appendChild(clone);
    }
}

(async () => {
    $.holdReady(true);
    populateTemplate((await fetchData()).projects);
    $.holdReady(false);
})();
