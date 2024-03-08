import flask
from flask_cors import CORS

app = flask.Flask(__name__)


@app.route("/forum/t/<int:tid>")
def request_posts(tid: int):
    # TODO: fetch posts from database, with tid as the topic id
    return flask.jsonify(
        [
            {
                "id": 1,
                "poster": "Bernie",
                "poster_photo": "https://2.gravatar.com/avatar/f519393c110994154abcf67f380caea020de8a344e918b86682c53e2f9748679",
                "type": "text",
                "data": "Hello, world",
                "time": "10天前",
            },
            {
                "id": 2,
                "poster": "cxzlw",
                "poster_photo": "https://openteens.org/img/logo/build/circle.png",
                "type": "text",
                "data": "Hello, world, Bernie!",
                "time": "2020-10-30",
            },
        ]
    )


@app.route("/forum/p/<int:pid>")
def request_post(pid: int):
    # TODO: fetch a single post from database
    return flask.jsonify(
        {
            "id": 1,
            "poster": "Bernie",
            "poster_photo": "https://2.gravatar.com/avatar/f519393c110994154abcf67f380caea020de8a344e918b86682c53e2f9748679",
            "type": "text",
            "data": "Hello, world",
            "time": "10天前",
        }
    )


@app.route("/forum/c/<int:cid>")
def request_cate(cid: int):
    # TODO: fetch a single category from database
    if cid == 1:
        return flask.jsonify(
            {"id": 1, "title": "TeensCamp #1", "time": "3天前"},
            {"id": 3, "title": "TeensCamp #200", "time": "100年前"},
        )
    return flask.jsonify(
        [
            {"id": 1, "title": "TeensCamp #1", "time": "3天前"},
            {"id": 2, "title": "TeensCamp #2", "time": "100天前"},
        ]
    )


@app.route("/forum/cl")
def request_cates():
    # TODO: fetch all categories from database
    return flask.jsonify(
        [
            {
                "id": 1,
                "title": "News",
                "icon": "linear-gradient(90deg, #0088CC 50%, #0088CC 50%)",
                "tags": [],
            },
            {
                "id": 2,
                "title": "TeensCamp",
                "icon": "linear-gradient(90deg, #cc7134 50%, #cc7134 50%)",
                "tags": [],
            },
        ]
    )


if __name__ == "__main__":
    CORS(app)
    app.run(port=9999)
