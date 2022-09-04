import numpy as np
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import Normalizer
import xgboost as xgb
import pickle
# load the face dataset
data = np.load('./Dataset/Dataset_embeddings.npz')
X,y=data['arr_0'], data['arr_1']
print('Loaded: ', X.shape, y.shape)

# normalize input vectors
in_encoder = Normalizer()
X = in_encoder.transform(X)


# fit model
model = xgb.XGBClassifier(LabelEncoder=True)
model.fit(X,y)

# predict
# yhat = model.predict(X)
# print(accuracy_score(yhat,y))

# save the model to disk
pickle.dump(model, open('model.sav', 'wb'))

