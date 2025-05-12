from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=Path(__file__).parent / "static"), name="static")

# 2) Корень сайта — index.html
@app.get("/", include_in_schema=False)
async def root() -> HTMLResponse:
    html = (Path(__file__).parent / "templates" / "index.html").read_text(encoding="utf-8")
    return HTMLResponse(content=html, status_code=200)


@app.post("/add_comment")
async def add_comment(request: Request):
    data = await request.json()
    comment = data.get("comment")
    if comment:
        with open("comments.txt", "a", encoding="utf-8") as file:
            file.write(comment + "\n")
        return {"message": "Комментарий успешно добавлен"}
    return {"error": "Комментарий не может быть пустым"}

@app.get("/get_comments")
async def get_comments():
    
    try:
        with open("comments.txt", "r", encoding="utf-8") as file:
            comments = file.readlines()
        comments = [comment.strip() for comment in comments]  
        return {"comments": comments}
    except FileNotFoundError:
        return {"comments": []}  
