from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.post("/caption")
async def caption_image(file: UploadFile = File(...)):
    return {
        "message": "I didn't get the time to implement this yet. Please check back later."
    }
