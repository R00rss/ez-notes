from pydantic import BaseModel
from enums import Status


class General_Response_Model(BaseModel):
    status: Status
    message: str
    error: str | None


class credentials(BaseModel):
    username: str
    password: str


class UserToken(BaseModel):
    id: int
    name: str
    username: str
    password: str
    status: int
    user_type: int
    exp: int
