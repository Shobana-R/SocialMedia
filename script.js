async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function renderData() {
    
    const data = await fetchData();
    if (!data) {
        return;
    }
    
    data.forEach(async item => {
        const container = document.querySelector('.container');
        const post = document.createElement('div');
       
           
        const title = document.createElement('h2');
        title.textContent = item.title;

        const body = document.createElement('p');
        body.textContent = item.body;

       
        const userData = await fetch('users.json')
        .then(response => response.json())
        userData.forEach(user => {
        if(item.userId== user.id){
            const img = document.createElement('img');
            img.src = `https://picsum.photos/id/${user.id}/50/50`;
            img.classList.add('rounded-circle');
            post.classList.add('flex-grow-1');
            post.appendChild(img);
        const userName = document.createElement('h4');
        userName.textContent = user.name;
        post.appendChild(userName);}
        });
        
        post.appendChild(title);
        post.appendChild(body);
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('button'+item.id);
        toggleButton.textContent = 'View Comments';
        post.appendChild(toggleButton);

        const comments=await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${item.id}`)
        .then(response => response.json())
            comments.forEach(comm => {
            const title = document.createElement('h5');
            title.textContent = comm.name;
            title.classList.add('text-secondary','border','comments');
            title.style="display:none";
            const comment = document.createElement('ul');
            comment.classList.add('comments'+item.id);
            comment.textContent = comm.body;
            comment.style="display: none";
            post.appendChild(title);
            post.appendChild(comment);
        });
        container.appendChild(post);
        toggleButton.addEventListener('click', function() {
            var c = document.getElementsByClassName(this.classList.value.replace("button","comments"));
            Array.from(c).forEach((x) => {
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
        });
        console.log(c);
    });
}); 
}
renderData();