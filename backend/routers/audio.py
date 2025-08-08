from fastapi import APIRouter, File, UploadFile
import uuid, os, shutil
from services.transcriber import transcribe_with_whisper
from services.gemini_refiner import refine_transcript_with_gemini

router = APIRouter()

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save file temporarily
        file_ext = os.path.splitext(file.filename)[1]
        temp_filename = f"temp_{uuid.uuid4()}{file_ext}"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Transcribe
        raw_transcript = transcribe_with_whisper(temp_filename)

        # Refine with Gemini
        refined_transcript = refine_transcript_with_gemini(raw_transcript)

        os.remove(temp_filename)  # Cleanup

        return {
            "transcript": refined_transcript,
            "raw_transcript": raw_transcript
        }

    except Exception as e:
        return {"error": str(e)}
