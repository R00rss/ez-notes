from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name, password=user.password, username=user.username
    )  # can use dict to compact code
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_collections(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Collection).offset(skip).limit(limit).all()


def get_collections_by_id_user(
    db: Session, skip: int = 0, limit: int = 100, id_user: int = 0
):
    return (
        db.query(models.Collection)
        .filter(models.Collection.user_id == id_user)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_user_collection(db: Session, item: schemas.CollectionCreate, user_id: int):
    db_item = models.Item(**item.dict(), user_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
