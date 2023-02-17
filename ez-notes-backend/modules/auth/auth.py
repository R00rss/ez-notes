from functions.auth.manageToken import generate_access_token
from functions.database.queries import generalQuery
from functions.cryptography.cryptography import decryptionFromStr


def authenticUser(username, password):
    response = {
        "message": "usuario no autenticado",
        "success": False,
        "auth": False,
        "token": "",
    }
    query = "SELECT nombre_usuario,contraseña,id,name,tipo_usuario,agencia from usuarios where estado = 1"
    users = generalQuery(query)
    if users != None:
        for row in users:
            user_usernameDB = row[0]
            user_passwordDB = row[1]
            # user_passwordDB_decrypted = decryptionFromStr(user_passwordDB)
            # user_usernameDB_decrypted = decryptionFromStr(user_usernameDB)
            user_idDB = row[2]
            user_nameDB = row[3]
            user_tipoDB = row[4]
            user_agency = row[5]

            if (
                # username == user_usernameDB_decrypted
                # and password == user_passwordDB_decrypted
                username == user_usernameDB
                and password == user_passwordDB
            ):
                response["message"] = "usuario autenticado con éxito"
                response["auth"] = True
                response["success"] = True
                print(user_agency)
                response["token"] = generate_access_token(
                    {
                        "id": user_idDB,
                        # "username": user_usernameDB_decrypted,
                        "username": user_usernameDB,
                        "name": user_nameDB,
                        "tipo_usuario": user_tipoDB,
                        "agencia": user_agency,
                    }
                )
    else:
        response["message"] = "Error de BD"
    return response
