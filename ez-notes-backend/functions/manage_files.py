from fastapi import UploadFile
import os


async def save_file(path: str, file: UploadFile):
    # create directory if not exists recursively
    try:
        if not os.path.exists(os.path.dirname(path)):
            os.makedirs(os.path.dirname(path))

        contents = await file.read()
        # with open(path, "wb") as f:
        with open(file.filename, "wb") as f:
            f.write(contents)
        return path
    except Exception as e:
        print(e)
        return None
