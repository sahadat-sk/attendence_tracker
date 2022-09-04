import pickle
import numpy as np
import Face_extractor
import Embeddings_creator

def classify_face(filename):
    faces = Face_extractor.extract_face_multi(filename)
    predictions=list()
    # print(face.shape)
    for face in faces:
        embeddings=list()
        embeddings.append(Embeddings_creator.create_embedding(face))
        embeddings = np.asarray(embeddings)
        # print(embeddings.shape)
        model = pickle.load(open('model.sav', 'rb'))
        yhat = model.predict(embeddings)
        predictions.append(yhat)
    return predictions

# print(classify_face('test.jpg'))