from fastapi import FastAPI
from fastapi.responses import FileResponse
from lmnt.api import Speech
import os
import asyncio

app = FastAPI()

@app.get("/synthesize/")
async def synthesize(text: str, voice: str = "lily"):
    async with Speech() as speech:
        synthesis = await speech.synthesize(text, voice)
        with open("output.mp3", "wb") as f:
            f.write(synthesis['audio'])
    return FileResponse("output.mp3", media_type='audio/mpeg')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)