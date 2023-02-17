from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import uvicorn
from database.sql_app.database import SessionLocal, engine
import database.sql_app.crud as crud
import database.sql_app.models as models
import database.sql_app.schemas as schemas

app = FastAPI(
    # ssl_keyfile="./ssl_certificado/private.key",
    # ssl_certfile="./ssl_certificado/server.crt",
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users/", response_model=list[schemas.User])
# @app.get("/users/")
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # users = crud.get_users(db, skip=skip, limit=limit)
    # return users
    users = crud.get_users(db, skip=skip, limit=limit)
    print(users)
    print(type(users[0]))
    return users


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        reload=True,
        port=2001
        # port=443,
        # ssl_keyfile="./ssl_certificado/private.key",
        # ssl_certfile="./ssl_certificado/server.crt",
    )
