//define functions
//step1form

const handleSubmit = () => {
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
        .then(res => res.json())
        .then(resp => {
            resp.items.map(item => {
                const li = document.createElement('li')
                const h2 = document.createElement('h2');
                h2.textContent = item.login;

                h2.addEventListener('click', (e) => {showUserRepos(item.login, e)})
                const img = document.createElement('img');
                img.src = item.avatar_url;
                const a = document.createElement('a');
                a.href = item.html_url;
                a.target = '_blank';
                a.textContent = 'Visit Profile';

                const userList = document.querySelector('ul')
                li.append(h2, img, a);
                userList.append(li);
            })
            form.reset();
        })
    })
}

const showUserRepos = (username, e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(resp => {
        resp.map(repo => {
            const li = document.createElement('li')
            const h2 = document.createElement('h2');
            h2.textContent = repo.name;
            const repoList = document.querySelector('#repos-list');
            li.append(h2);
            repoList.append(li);
        })
    })
}





//call functions
handleSubmit()