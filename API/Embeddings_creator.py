import numpy as np
from tensorflow.keras.models import load_model
from keras_facenet import FaceNet


def create_embedding(face_pixels):
    #load the facenet model
    model = FaceNet()
    print('Loaded Model')
    face_pixels = face_pixels.astype('float32')
    mean, std = face_pixels.mean(), face_pixels.std()
    face_pixels = (face_pixels - mean) / std
    samples = np.expand_dims(face_pixels, axis=0)
    yhat = model.embeddings(samples)
    return yhat[0]

# load the face dataset
data = np.load('./Dataset/Dataset.npz')
X,y = data['arr_0'], data['arr_1']
print('Loaded: ', X.shape, y.shape)


# # Convert each face in the train set to an embedding
# model = FaceNet()
# print('Loaded Model')
# newX = list()
# for face_pixels in X:
#     embedding = create_embedding(face_pixels)
#     newX.append(embedding)
# newX = np.asarray(newX)
# print(newX.shape)



# # Save arrays to one file in compressed format
# np.savez_compressed('./Dataset/Dataset_embeddings.npz', newX,y)

