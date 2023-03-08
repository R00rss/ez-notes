import jwt
from decouple import config
from datetime import datetime, timedelta

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")


def generate_access_token(
    data: dict, expires_delta: timedelta = timedelta(minutes=120)
) -> str | None:
    try:
        expire = datetime.utcnow() + expires_delta
        token_data = {**data, "exp": expire}
        return jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    except (Exception, jwt.DecodeError) as e:
        print(e)
        return None


def decode_access_token(token: str) -> (dict | str) | None:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    except Exception as e:
        print(e)
        return None


# user_data = {"username": "admin", "password": "admin"}
# generate_token = generate_access_token(user_data)
# if generate_token["success"]:
#     decoded_token = decode_access_token(generate_token["payload"]["encoded_jwt"])
