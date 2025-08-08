from fastapi import APIRouter, File, UploadFile

router = APIRouter()
@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    return {
        "message": "I didn't get the time to implement this yet. Please check back later."
    }

    # try:
    #     file_ext = os.path.splitext(file.filename)[1]
    #     temp_filename = f"temp_{uuid.uuid4()}{file_ext}"
    #     with open(temp_filename, "wb") as buffer:
    #         shutil.copyfileobj(file.file, buffer)

    #     raw_transcript = transcribe_with_whisper(temp_filename)
    #     refined_transcript = refine_transcript_with_gemini(raw_transcript)

    #     os.remove(temp_filename)

    #     return {
    #         "transcript": refined_transcript,
    #         "raw_transcript": raw_transcript
    #     }

    # except Exception as e:
    #     return {"error": str(e)}
