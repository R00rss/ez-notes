from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    Response,
    Request,
    Body,
    Header,
    UploadFile,
    File,
    Form,
)
import os
from os import path
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import uvicorn
from database.database import SessionLocal, engine
import database.crud as crud
import database.models as models
import database.schemas as schemasDB
import schemas as schemas
import auth.manage_token as token
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import functions.manage_files as manage_files

origins = [
    # all origins
    "*",
    # "http://172.10.19.55",
    # "http://172.10.19.52",
    "http://localhost:7000",
]

app = FastAPI(
    # ssl_keyfile="./ssl_certificado/private.key",
    # ssl_certfile="./ssl_certificado/server.crt",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pathname = path.dirname(path.realpath(__file__))


async def get_token_header(Authorization: Optional[str] = Header(None)):
    token = Authorization.split(" ")[1]
    if token is None:
        raise HTTPException(status_code=400, detail="Token is missing")
    return token


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/users", response_model=list[schemasDB.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.post(
    "/api/collection",
    response_model=schemasDB.Collection,
)
def collections(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    collection: schemasDB.CollectionCreate = Body(...),
):
    print("authorization_token", authorization_token)
    try:
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            collection = crud.add_collection(
                db,
                collection=collection,
                user_id=current_user["id"],
            )
            return collection
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


# @app.post("/api/image", response_model=schemasDB.Image)
@app.post("/api/image")
async def upload_file(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    file: UploadFile = File(...),
    id_note: str = Form(...),
):
    try:
        # GET CURRENT PATH using path
        # import os

        # print("file", file)

        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            contents = await file.read()
            pathToSave = path.join(
                pathname,
                "files",
                "images",
                f"note_{id_note}",
                file.filename,
            )
            if not path.exists(os.path.dirname(pathToSave)):
                os.makedirs(os.path.dirname(pathToSave))
            aux_file = open(pathToSave, "wb")
            aux_file.write(contents)
            aux_file.close()
            aux_image = schemasDB.ImageCreate(
                note_id=id_note, path_file=pathToSave, name=file.filename
            )

            image = crud.add_image(db, image=aux_image)
            return image
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.put(
    "/api/collection",
    response_model=schemasDB.Collection,
)
def collection(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    collection: schemasDB.Collection = Body(...),
):
    print("authorization_token", authorization_token)
    try:
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            collection_ = crud.update_collection(db, collection=collection)
            return collection_
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.post(
    "/api/note",
    response_model=schemasDB.Note,
)
def note(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    note: schemasDB.NoteCreate = Body(...),
):
    print("authorization_token", authorization_token)
    try:
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            note_ = crud.add_note(db, note=note)
            return note_
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.put(
    "/api/note",
    response_model=schemasDB.Note,
)
def note(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    note: schemasDB.Note = Body(...),
):
    print("authorization_token", authorization_token)
    try:
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            note_ = crud.update_note(db, note=note)
            return note_
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.delete("/api/note")
def note(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    note: schemasDB.Note = Body(...),
):
    print("authorization_token", authorization_token)
    try:
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            flag = crud.delete_note_by_id(db, id_note=note.id)
            if flag:
                return {"message": "note deleted"}
            raise HTTPException(status_code=404, detail="note not found")
        raise HTTPException(status_code=403, detail="usuario no autorizado")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.get("/api/notes", response_model=list[schemasDB.Note])
def notes(
    id_collection: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
):
    try:
        # return {"id_collection": id_collection}

        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            notes_ = crud.get_notes_by_id_collection(
                db, skip=skip, limit=limit, id_collection=id_collection
            )
            return notes_
        raise HTTPException(status_code=403, detail="usuario no autorizado")

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.get("/api/collections", response_model=list[schemasDB.Collection])
def collections(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
):
    # print("authorization_token", authorization_token)
    try:
        # collections = crud.get_collections_by_id_user(
        #     db, skip=skip, limit=limit, id_user=1
        # )
        # return collections
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            collections = crud.get_collections_by_id_user(
                db, skip=skip, limit=limit, id_user=current_user["id"]
            )
            return collections
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.delete("/api/collection")
def note(
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
    collection: schemasDB.Collection = Body(...),
):
    print("authorization_token", authorization_token)
    try:
        if authorization_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(authorization_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            flag = crud.delete_collection_by_id(db, id_collection=collection.id)
            if flag:
                return {"message": "collection deleted"}
            raise HTTPException(status_code=404, detail="note not found")
        raise HTTPException(status_code=403, detail="usuario no autorizado")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error in the server")


@app.get("/set_cookies")
async def set_cookie(response: Response):
    response.set_cookie(key="session_cookie", value="other value", httponly=True)
    return {"message": "Cookie set successfully!"}


@app.get("/get_cookies")
async def get_cookie(request: Request):
    session_cookie = request.cookies.get("session_cookie")
    if session_cookie:
        return {"message": f"Cookie value: {session_cookie}"}
    else:
        return {"message": "Cookie not found."}


@app.get("/api/validate_session")
async def validate_session(request: Request):
    current_cookie = request.cookies.get("session_cookie")
    print(current_cookie)
    if current_cookie:
        return {"message": f"Cookie value: {current_cookie}"}
    else:
        raise HTTPException(status_code=404, detail="No session found")


@app.post("/api/validate_session")
# async def validate_session(token = Depends(token.decode_access_token)):
async def validate_session(current_token: dict = Body()):
    try:
        aux_token = current_token["current_token"]
        if aux_token == None:
            raise HTTPException(status_code=400, detail="No session found")
        current_user: schemas.UserToken = token.decode_access_token(aux_token)
        if current_user == None:  # el token es valido
            raise HTTPException(status_code=404, detail="No session found")
        if current_user["status"] == 1:
            return {"message": "Session valid"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error in the server")


@app.post("/api/login")
def login(
    response: Response,
    credentials: schemas.credentials,
    db: Session = Depends(get_db),
):
    users = crud.get_users(db)
    for user in users:
        if (
            user.username == credentials.username
            and user.password == credentials.password
        ):
            current_token = token.generate_access_token(
                {
                    "id": user.id,
                    "name": user.name,
                    "username": user.username,
                    "password": user.password,
                    "status": user.status,
                    "user_type": user.user_type,
                }
            )
            # print(current_token)
            # response.set_cookie(key="session_cookie", value="my_value", httponly=True)

            response.set_cookie(
                # "Authorization",
                key="session_cookie",
                value=f"{current_token}",
                httponly=True,
                # secure=True,
                # samesite="none",
                # max_age=1800,
                # expires=1800,
            )
            return {"message": "Login successful", "token": current_token}
            # return HTTPResponse(status_code=200, detail="Login successful")
    raise HTTPException(status_code=404, detail="user or password incorrect")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        reload=True,
        port=2000,
        # port=443,
        # ssl_keyfile="./ssl_certificado/private.key",
        # ssl_certfile="./ssl_certificado/server.crt",
        # workers=4,
        # proxy_headers=True,
    )
