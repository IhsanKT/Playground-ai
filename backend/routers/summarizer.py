from fastapi import APIRouter, UploadFile, File, Form
from services.summarizer import summarize_text, extract_text_from_file, extract_text_from_url

router = APIRouter()

@router.post("/summarize/file")
async def summarize_file(file: UploadFile = File(...)):
    text = await extract_text_from_file(file)
    summary = summarize_text(text)
    return {"summary": summary}

@router.post("/summarize/url")
async def summarize_url(url: str = Form(...)):
    text = extract_text_from_url(url)
    summary = summarize_text(text)
    return {"summary": summary}
