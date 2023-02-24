let projectsUrl = 'http://127.0.0.1:8000/api/projects'

let token = localStorage.getItem('token')

let getProjects = () => {
    let projectsWrapper = document.getElementById('projects--wrapper')
    projectsWrapper.innerHTML=""
    if(!token){
        alert('You must log in!')
        window.location = "http://192.168.101.189:5500/login.html"
    }

    let logoutBtn = document.getElementById('logout-btn')
    logoutBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        window.location = "http://192.168.101.189:5500/login.html"
    })

    fetch(projectsUrl)
    .then(response => response.json())
    .then(data => {
        buildProjects(data)
    })
}



let buildProjects = (projects) =>{
    let projectsWrapper = document.getElementById('projects--wrapper')
    projectsWrapper.innerHTML=""
    projects.forEach(project => {
        let projectCard = `
            <div class="project--card">
                <img src="http://127.0.0.1:8000${project.featured_image}"/>
                <div>
                    <div class="card--header">
                        <h3>${project.title}</h3>
                        <strong class="vote--option" data-vote="up" data-project="${project.id}">&#43;</strong>
                        <strong class="vote--option" data-vote="down" data-project="${project.id}">&#8722;</strong>
                    </div>
                    <i>${project.vote_ratio}% Positive Feedback</i>
                    <p>${project.description.substring(0, 150)}</p>
                </div>
            </div>
        `
        projectsWrapper.innerHTML += projectCard
    });

    addVoteEvents()
}


let addVoteEvents = () => {
    let voteBtns = document.getElementsByClassName('vote--option');
    [...voteBtns].forEach(btn => {
        btn.addEventListener('click', (e)=>{

            let vote = e.target.dataset.vote
            let project = e.target.dataset.project
            fetch(`${projectsUrl}/${project}/vote`, {
                method:'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify({'value':vote, 'body':"Awesome!"})
            }).then(response => response.json())
            .then(data => {getProjects()
                })
            
        });
    });
};

getProjects()
