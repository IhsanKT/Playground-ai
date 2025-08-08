from fastapi import APIRouter, File, UploadFile
import os, uuid
from services.image_captioner import generate_caption

router = APIRouter()

@router.post("/caption")
async def caption_image(file: UploadFile = File(...)):
    try:
        ext = os.path.splitext(file.filename)[1]
        temp_filename = f"temp_image_{uuid.uuid4()}{ext}"

        with open(temp_filename, "wb") as f:
            f.write(await file.read())

        caption = generate_caption(temp_filename)

        os.remove(temp_filename)
        print(f"Generated caption: {caption}")

        return {"caption": caption}

    except Exception as e:
        return {"error": str(e)}
