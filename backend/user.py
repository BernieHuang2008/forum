import flask
from MercurySQL import set_driver, DataBase
from MercurySQL.drivers.sqlite import Driver_SQLite

import tokenx

set_driver(Driver_SQLite)
db = DataBase("user.db")
table_users = db["users"]
table_users.struct(
    {"id": int, "username": str, "password": str}, primaryKey="id", autoIncrement=True
)

app = flask.Flask(__name__)


@app.route("/user/login", methods=["POST"])
def login():
    username = flask.request.form["username"]
    password = flask.request.form["password"]
    user = (table_users["username"] == username).query()

    if user:
        user = user[0]
    else:
        return {"msg": "User not found"}, 404

    if user.password == password:
        return {"id": user.id, "token": tokenx.gentoken(user.id)}
    
@app.route("/user/reg", methods=["POST"])
def reg():
    username = flask.request.form["username"]
    password = flask.request.form["password"]

    if (table_users["username"] == username).query():
        return {"msg": "User already exists"}, 400
    
    user = table_users.insert(username=username, password=password)
    return {"id": user.id, "token": tokenx.gentoken(user.id)}


app.run()
