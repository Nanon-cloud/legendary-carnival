from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
import os
from psycopg2.extras import RealDictCursor

app = FastAPI()

@app.get("/start")
def start_info():
    return {"message": "Use POST /start to begin the quiz"}

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/dbname")
try:
    conn = psycopg2.connect(DATABASE_URL)
except Exception as e:
    print(f"Database connection failed: {e}")
    conn = None

class UserStart(BaseModel):
    name: str

@app.on_event("startup")
async def startup():
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS user_starts (
                name TEXT PRIMARY KEY,
                count INTEGER DEFAULT 0
            )
        """)
        conn.commit()

@app.post("/start")
async def start_quiz(user: UserStart):
    if not conn:
        raise HTTPException(status_code=500, detail="Database not connected")
    name = user.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name cannot be empty")
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Increment count
            cur.execute("""
                INSERT INTO user_starts (name, count) VALUES (%s, 1)
                ON CONFLICT (name) DO UPDATE SET count = user_starts.count + 1
                RETURNING count
            """, (name,))
            result = cur.fetchone()
            conn.commit()
            return {"count": result["count"]}
    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Database error")
