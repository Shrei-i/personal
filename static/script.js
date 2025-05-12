/* script.js */

document.addEventListener("DOMContentLoaded", loadComments);

async function addComment() {
    const input   = document.getElementById("comment-text");
    const text    = input.value.trim();
    if (!text) return;

    // отрисовали сразу в браузере
    appendComment(text);

    // очистили поле ввода
    input.value = "";

    // сохранили на сервере
    try {
        const res = await fetch("/add_comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ comment: text })
        });
        if (!res.ok) throw new Error("Ошибка при сохранении комментария");
    } catch (err) {
        console.error(err);
    }
}

async function loadComments() {
    try {
        const res  = await fetch("/get_comments");
        if (!res.ok) throw new Error("Ошибка при загрузке комментариев");
        const { comments } = await res.json();
        comments.forEach(appendComment);
    } catch (err) {
        console.error(err);
    }
}

function appendComment(text) {
    const div = document.createElement("div");
    div.className = "comment";
    div.textContent = text;
    document.getElementById("comments-list").appendChild(div);
}
