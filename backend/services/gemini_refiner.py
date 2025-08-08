import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()
import os

# Init Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Replace this!

def refine_transcript_with_gemini(transcript: str) -> str:
    model = genai.GenerativeModel("gemini-2.5-flash")
    prompt = f"""
    Please improve and clean up the following transcript from an audio recording. 
    Add punctuation, fix grammar, and make it easy to read:

    {transcript}
    """
    response = model.generate_content(prompt)
    return response.text
