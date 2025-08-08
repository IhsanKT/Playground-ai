import google.generativeai as genai
import pdfplumber
from docx import Document
import requests
from bs4 import BeautifulSoup
import os
from dotenv import load_dotenv

load_dotenv

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Replace with your actual key

def summarize_text(text: str) -> str:
    model = genai.GenerativeModel("gemini-2.5-flash")
    prompt = f"Summarize the following text:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text

async def extract_text_from_file(file) -> str:
    filename = file.filename.lower()
    contents = await file.read()

    if filename.endswith(".pdf"):
        with open("temp.pdf", "wb") as f:
            f.write(contents)
        with pdfplumber.open("temp.pdf") as pdf:
            return "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())

    elif filename.endswith(".docx"):
        with open("temp.docx", "wb") as f:
            f.write(contents)
        doc = Document("temp.docx")
        return "\n".join([para.text for para in doc.paragraphs])

    else:
        return "Unsupported file type."

def extract_text_from_url(url: str) -> str:
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        text = soup.get_text(separator="\n", strip=True)
        return text
    except Exception:
        return "Could not extract content from the URL."
