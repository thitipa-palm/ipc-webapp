from numpy import loadtxt
from keras.models import load_model
from sklearn import preprocessing
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.model_selection import cross_val_score, KFold, StratifiedKFold
from keras.utils.np_utils import to_categorical
import pandas as pd
import numpy as np
import json

model = load_model('model_CNNLSTM.h5')

#data prep
P_01 = pd.read_csv('dataset/P_01.csv')
P_02 = pd.read_csv('dataset/P_02.csv')
P_03 = pd.read_csv('dataset/P_03.csv')
ipc_maindf = pd.concat([P_01,P_02,P_03])
ipc_maindf.reset_index(drop = True, inplace = True)
sx = ipc_maindf.iloc[:,0:10]
sy = ipc_maindf.iloc[:,10:11]
sx = sx.values

for i in range(len(sx)):
    for j in range (len(sx[i])):
        sx[i][j] = json.loads(sx[i][j])

sx = np.array(list(map(np.vstack, sx)))
sx = np.transpose(sx, axes=(0, 2, 1))
sy = sy.values.tolist()
for i in range(len(sy)):
    sy[i] = sy[i][0]
sy = np.asarray(sy)

#Encoded the label from 0, 1, 2, ...
le = preprocessing.LabelEncoder()
le.fit(sy)
le.classes_
y_all = le.transform(sy)

scaler = MinMaxScaler()
for i1 in range(0, sx.shape[0], 1):
  for i2 in range(0, sx.shape[2], 1):
    x_mm_trans = scaler.fit_transform(np.transpose(sx[i1,:,i2].reshape(1, sx.shape[1])))
    x_mm = np.transpose(x_mm_trans)
    if (i2==0):
      x_mm_sen = x_mm.reshape(1, x_mm.shape[1], 1)
    else:
      x_mm_sen = np.append(x_mm_sen, x_mm.reshape(1, x_mm.shape[1], 1), axis=2)
  if (i1==0):
    x_all = x_mm_sen
  else:
    x_all = np.append(x_all, x_mm_sen, axis=0)


#Data Split
sX = x_all.iloc[xx,:]
sY = y_all.iloc[xx,:]
#prediction
pred = np.argmax(model.predict([x_test]), axis=1)