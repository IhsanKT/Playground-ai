from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from routers import audio, image, summarizer


# Load environment variables
load_dotenv()

# Constants
MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")  # fallback default
ALGORITHM = os.getenv("ALGORITHM", "HS256")

# MongoDB setup
client = MongoClient(MONGO_URI)
db = client["auth_db"]
users_collection = db["users"]

# App init
app = FastAPI()

# CORS setup (React runs at localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic User Model
class User(BaseModel):
    email: EmailStr
    password: str

# Utility Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Routes
@app.post("/signup")
def signup(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_pwd = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "password": hashed_pwd})
    return {"message": "User created successfully"}

@app.post("/login")
def login(user: User):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}



app.include_router(audio.router, prefix="/audio", tags=["Audio"])
app.include_router(image.router, prefix="/image", tags=["Image"])
app.include_router(summarizer.router, prefix="/summarizer", tags=["Summarizer"])
