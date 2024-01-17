// Funzione asincrona per ottenere i dati del post da JSONPlaceholder
async function getPostData(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await response.json();
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await commentsResponse.json();

        return {
            title: post.title,
            content: post.body,
            comments: comments.slice(0, 3) // Prendi solo i primi 3 commenti per semplicità
        };
    } catch (error) {
        console.error('Errore nel recupero dei dati del post:', error);
    }
}

// Funzione asincrona per visualizzare un post sulla pagina
async function displayPosts() {
    const postContainer = document.getElementById('container');

    // Genera e visualizza 10 post
    for (let postId = 1; postId <= 10; postId++) {
        const postData = await getPostData(postId);

        const postElement = document.createElement('div');
        postElement.innerHTML = `
        <div id="post">
            <h2>${postData.title}</h2>
            <p>${postData.content}</p>
            <h3>Commenti</h3>
            <ul>${postData.comments.map(comment => `<li><span id=email>Email: ${comment.email}</span>: ${comment.body}</li>`).join('')}</ul>
        </div>
        `;

        postContainer.appendChild(postElement);
    }
}

// Chiamata a displayPosts per visualizzare 10 post
displayPosts();
