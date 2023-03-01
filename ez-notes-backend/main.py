from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    Response,
    Request,
    Body,
    Header,
)
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

origins = [
    "http://localhost",
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


@app.get("/users", response_model=list[schemasDB.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.post("/api/collections_by_id_user", response_model=list[schemasDB.Collection])
def collections_by_id_user(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    authorization_token: str = Depends(get_token_header),
):
    print("authorization_token", authorization_token)
    try:
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
