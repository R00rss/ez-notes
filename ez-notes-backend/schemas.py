from pydantic import BaseModel
from enums import Status


class General_Response_Model(BaseModel):
    status: Status
    message: str
    error: str | None


class credentials(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: int
    name: str
    username: str
    image_path: str
    status: int
    user_type: int
    exp: int


class UserToken(User):
    password: str
