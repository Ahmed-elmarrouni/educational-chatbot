from fastapi import FastAPI
from pydantic import BaseModel
from tree import faq_tree
from fastapi.middleware.cors import CORSMiddleware
from rapidfuzz import fuzz, process

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    text: str

def preprocess_query(query):
    return query.lower().strip()

def find_answer(tree, query):
    if isinstance(tree, dict):
        keys = tree.keys()
        best_match = process.extractOne(query, keys, scorer=fuzz.partial_ratio)
        if best_match and best_match[1] > 60:  
            result = find_answer(tree[best_match[0]], query)
            if result:
                return result
        return None
    elif isinstance(tree, list):
        return ", ".join(tree)
    elif isinstance(tree, str):
        return tree
    return None

def generate_suggestions(tree, query):
    if isinstance(tree, dict):
        keys = tree.keys()
        suggestions = process.extract(query, keys, scorer=fuzz.partial_ratio, limit=3)
        return [s[0] for s in suggestions if s[1] > 40]
    return []

def create_paragraph(query, answer, suggestions):
    paragraph = (
        f"Merci pour votre question :\n\n"
        f"Voici ce que j'ai trouvé :\n\n"
        f"{answer}\n\n"
    )
    if suggestions:
        paragraph += (
            "Vous pourriez également être intéressé par ces sujets :\n"
            + "\n".join(f"- {suggestion}" for suggestion in suggestions)
        )
    else:
        paragraph += "Je n'ai pas d'autres suggestions pour le moment."
    paragraph += "\n\nN'hésitez pas à poser une autre question !"
    return paragraph

@app.post("/ask")
async def ask_question(question: Question):
    query = preprocess_query(question.text)
    answer = find_answer(faq_tree, query)
    suggestions = generate_suggestions(faq_tree, query)

    if answer:
        response_paragraph = create_paragraph(question.text, answer, suggestions)
        return {
            "question": question.text,
            "answer": response_paragraph,
            "suggestions": suggestions,
        }

    return {
        "question": question.text,
        "answer": (
            f"Désolé, je n'ai pas trouvé de réponse précise pour '{question.text}'.\n\n"
            f"Essayez d'explorer d'autres sujets ou de reformuler votre question."
        ),
        "suggestions": suggestions,
    }

@app.get("/")
async def read_root():
    return {"message": "Bienvenue au Chatbot Éducatif!"}
