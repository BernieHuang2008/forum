from MercurySQL import set_driver, DataBase
from MercurySQL.drivers.sqlite import Driver_SQLite
from datetime import datetime, timedelta
from hashlib import sha256

set_driver(Driver_SQLite)
db = DataBase("user.db")
table_token = db["token"]
table_token.struct(
    {"token": str, "id": int, "expire": int},
    primaryKey="token"
)


def gentoken(id):
    token = f"{id}:{datetime.now().timestamp()}"
    token = sha256(token.encode()).hexdigest()
    expire = datetime.now() + timedelta(days=30)
    table_token.insert(token=token, id=id, expire=int(expire.timestamp()))
    return token


def checktoken(token):
    token = (table_token["token"] == token).query()
    if token:
        token = token[0]
        if datetime(token.expire) > datetime.now():
            return token.id
    return None
