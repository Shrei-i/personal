from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
