from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
import base64
from os import path

current_path = path.dirname(path.realpath(__file__))
path_keys_aes = path.join(current_path, "aes_keys")


def encryptionFromStr(data: str) -> str | None:  # data has to be string
    try:
        pathPublicKeyName = path.join(path_keys_aes, "public_shared.pem")
        public_key = read_key(pathPublicKeyName, "public")
        encrypted = public_key.encrypt(
            data.encode("utf-8"),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        )
        return {
            "payload": {"encrypted_str": base64.b64encode(encrypted).decode("utf-8")},
            "success": True,
        }
    except Exception as e:
        return {
            "exception": e,
            "success": False,
        }


def decryptionFromStr(data: str):  # data has to be string
    try:
        pathPrivateKeyName = path.join(path_keys_aes, "private_noshare.pem")
        private_key = read_key(pathPrivateKeyName, "private")
        result = private_key.decrypt(
            base64.b64decode(data.encode("utf-8")),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None,
            ),
        ).decode("utf-8")
        return {
            "payload": {"original_str": data, "decrypted_str": result},
            "success": True,
        }
    except Exception as e:
        return {
            "exception": e,
            "success": False,
        }


def generate_keys():  # generate the keys and saved in current folder named private_noshare and public_shared .pem

    #############generate public and private keys###################
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend()
    )
    public_key = private_key.public_key()

    #############serializing and saving the keys################

    serial_private = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    path_private_save = path.join(path_keys_aes, "private_noshare.pem")
    with open(path_private_save, "wb") as f:
        f.write(serial_private)

    serial_public = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo,
    )
    path_public_save = path.join(path_keys_aes, "public_shared.pem")
    with open(path_public_save, "wb") as f:
        f.write(serial_public)


def read_key(path_key: str, key_type: str = "private"):
    key = None
    with open(path_key, "rb") as key_file:
        if key_type == "private":
            key = serialization.load_pem_private_key(
                key_file.read(), password=None, backend=default_backend()
            )
        elif key_type == "public":
            key = serialization.load_pem_public_key(
                key_file.read(), backend=default_backend()
            )
    return key


###############encryption########################


def encryption(data, public_key):  # data has to be binary type
    encrypted = public_key.encrypt(
        data,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )
    return base64.b64encode(encrypted)  # encode in base 64


##############decryption#################################
def decryption(data, private_key):  # data needs to be b64 encrypted
    return private_key.decrypt(
        base64.b64decode(data),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None,
        ),
    )


# password = "root123"
# encrypted_data = encryptionFromStr(password)
# if encrypted_data["success"]:
#     encrypted_data = encrypted_data["payload"]["encrypted_str"]
#     decrypted_data = decryptionFromStr(encrypted_data)
#     print(decrypted_data)
