from fastapi import UploadFile
import os


async def save_file(path: str, file: UploadFile):
    # create directory if not exists
    if not os.path.exists(os.path.dirname(path)):
        os.makedirs(os.path.dirname(path))
    # save file
    with open(path, "wb") as buffer:
        while True:
            chunk = await file.read(1024)
            if not chunk:
                break
            buffer.write(chunk)
    return path
