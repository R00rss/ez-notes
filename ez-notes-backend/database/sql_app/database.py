from sqlalchemy import create_engine

# from sqlalchemy.orm import sessionmaker, declarative_base

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from decouple import config

# from .models import User
# from database.sql_app.models import User

DB_USER = config("DB_USER")
DB_PASS = config("DB_PASS")
DB_HOST = config("DB_HOST")
DB_NAME = config("DB_NAME")
DB_PORT = config("DB_PORT")

SQLALCHEMY_MYSQL_DATABASE_URL = (
    f"mysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
engine = create_engine(SQLALCHEMY_MYSQL_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
