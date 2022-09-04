import Face_extractor
import os
import numpy as np
from sklearn.model_selection import train_test_split

# load images and extract faces for all images in a directory
def load_faces(directory):
    faces = list()
    # enumerate files
    for filename in os.listdir(directory):
        # path
        path = directory + filename
        # get face
        face = Face_extractor.extract_face(path)
        # store
        faces.append(face)
    return faces

# load a dataset that contains one subdir for each class that in turn contains images
def load_dataset(directory):
    x,y = list(), list()
    # enumerate folders, on per class
    for subdir in os.listdir(directory):
        # path
        path = directory + subdir + '/'
        # skip any files that might be in the dir
        if not os.path.isdir(path):
            continue
        # load all faces in the subdirectory
        faces = load_faces(path)
        # create labels
        labels = [subdir for _ in range(len(faces))]
        # summarize progress
        print('>loaded %d examples for class: %s' % (len(faces), subdir))
        # store
        x.extend(faces)
        y.extend(labels)
    return np.asarray(x), np.asarray(y)

# load dataset and split into train/test
X,y = load_dataset('./Dataset/images/')
# save arrays to one file in compressed format
np.savez_compressed('./Dataset/Dataset.npz', X,y)

