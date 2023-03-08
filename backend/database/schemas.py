from pydantic import BaseModel
from datetime import datetime


# Image
class ImageBase(BaseModel):
    name: str
    path_file: str
    note_id: int


class ImageCreate(ImageBase):
    pass


class Image(ImageBase):
    id: int
    created_at: datetime
    updated_at: datetime
    status: int

    class Config:
        orm_mode = True


# Note
class NoteBase(BaseModel):
    name: str
    text_content: str
    collection_id: int


class NoteCreate(NoteBase):
    pass


class Note(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime
    status: int
    images: list[Image] = []

    class Config:
        orm_mode = True


# Collection
class CollectionBase(BaseModel):
    name: str


class CollectionCreate(CollectionBase):
    pass


class Collection(CollectionBase):
    id: int
    created_at: datetime
    updated_at: datetime
    status: int
    user_id: int
    notes: list[Note] = []

    class Config:
        orm_mode = True


# User
class UserBase(BaseModel):
    username: str
    name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
    status: int
    user_type: int
    collections: list[Collection] = []
    # collections: list[Collection] = []

    class Config:
        orm_mode = True
