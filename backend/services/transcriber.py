import whisper

# Load model once
model = whisper.load_model("base")

def transcribe_with_whisper(filepath: str) -> str:
    result = model.transcribe(filepath)
    return result["text"]
