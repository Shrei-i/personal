document.addEventListener("DOMContentLoaded", loadComments);

function addComment() {
    const commentText = document.getElementById('comment-text').value;
    if (commentText.trim() !== "") {
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = commentText;

        const commentsList = document.getElementById('comments-list');
        commentsList.appendChild(newComment);

        saveComment(commentText);

        document.getElementById('comment-text').value = "";
    }
}

async function saveComment(comment) {
    try {
        const response = await fetch('http://localhost:8000/add_comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        });
        if (!response.ok) {
            throw new Error('Ошибка при сохранении комментария');
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadComments() {
    try {
        const response = await fetch('http://localhost:8000/get_comments');
        const data = await response.json();
        const comments = data.comments;

        const commentsList = document.getElementById('comments-list');
        comments.forEach(commentText => {
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.textContent = commentText;
            commentsList.appendChild(comment);
        });
    } catch (error) {
        console.error("Ошибка при загрузке комментариев:", error);
    }
}
