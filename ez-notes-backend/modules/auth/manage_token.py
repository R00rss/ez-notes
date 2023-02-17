import jwt
from decouple import config
from datetime import datetime, timedelta

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("ALGORITHM")


def generate_access_token(
    data: dict, expires_delta: timedelta = timedelta(minutes=6000)
):
    expire = datetime.utcnow() + expires_delta
    token_data = {**data, "exp": expire}
    try:
        return {
            "payload": {
                "encoded_jwt": jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
            },
            "success": True,
        }
    except Exception as e:
        return {
            "exception": e,
            "success": False,
        }


def decode_access_token(token: str):
    try:
        return {
            "payload": {
                "decoded_jwt": jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
            },
            "success": True,
        }
    except Exception as e:
        return {
            "exception": e,
            "success": False,
        }


# user_data = {"username": "admin", "password": "admin"}
# generate_token = generate_access_token(user_data)
# if generate_token["success"]:
#     decoded_token = decode_access_token(generate_token["payload"]["encoded_jwt"])
