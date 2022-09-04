import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# load the face dataset
data = np.load('./Dataset/Dataset.npz')
X,y = data['arr_0'], data['arr_1']
print('Loaded: ', X,y)


# plot first few images
for i in range(10):
    # define subplot
    plt.subplot(2, 5, 1 + i)
    # plot raw pixel data
    plt.imshow(X[i])
    plt.title(y[i])
# show the figure
plt.show()
