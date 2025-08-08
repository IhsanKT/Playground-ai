import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Replace with your actual key

def generate_caption(image_path: str) -> str:
    model = genai.GenerativeModel("gemini-pro-vision")
    img = Image.open(image_path)

    prompt = "Describe this image in detail."

    response = model.generate_content([prompt, img])
    return response.text
