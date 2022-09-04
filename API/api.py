import flask
from flask import request, jsonify
import Face_classifier
import base64
from PIL import Image
from io import BytesIO
import base64


app = flask.Flask(__name__)
app.config["DEBUG"] = False

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)

    #store the image in a file
    img = Image.open(BytesIO(base64.b64decode(data['image'])))
    
    img.save('test.jpg')
    yhat = Face_classifier.classify_face('test.jpg')
    return jsonify(yhat)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
