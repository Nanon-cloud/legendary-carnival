#!/bin/bash
set -e
pip install --upgrade pip
pip install fastapi uvicorn psycopg2-binary pydantic
exec python -m uvicorn main:app --host 0.0.0.0 --port $PORT
