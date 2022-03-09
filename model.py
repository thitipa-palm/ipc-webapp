#Activity ID map
activity_id = {1:'sit_straight', 2:'sit_hunch', 3:'stand_straight',
              4:'stand_hunch', 5:'walk_straight', 6:'walk_hunch', 7:'run_straight',
              8:'run_hunch', 9:'strech_L', 10:'strech_R', 11:'strech_C'}
#Good Posture Activities: 
goodposture_ac = [1,3,5,7,9,10,11]
#Bad Posture Activities: 
badposture_ac = [2,4,6,8]

# Load data set containing all the data from csv
from google.colab import drive #pipline require
drive.mount('/content/gdrive')
P_01_path = '/content/gdrive/My Drive/Senoir Project/SL1-2021/Dataset/main/P_01.csv'
P_02_path = '/content/gdrive/My Drive/Senoir Project/SL1-2021/Dataset/main/P_02.csv'
P_03_path = '/content/gdrive/My Drive/Senoir Project/SL1-2021/Dataset/main/P_03.csv'

ipc_maindf = pd.read_csv(P_01_path)
P_02 = pd.read_csv(P_02_path)
P_03 = pd.read_csv(P_03_path)
ipc_maindf = ipc_maindf.append(P_02)
ipc_maindf = ipc_maindf.append(P_03)

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

print(x_all.shape)

####################### Model ########################
n_steps = 10
n_length = 5
n_features = 10

x = x_all
# Input to models
x1 = x_all # inputs of CNN, LSTM
x2 = x_all.reshape((sx.shape[0], n_steps, n_length, n_features)) # inputs of CNN-LSTM
x3 = x_all.reshape((sx.shape[0], n_steps, 1, n_length, n_features)) # inputs of ConvLSTM

kf= 10
kfold = StratifiedKFold(n_splits=kf, shuffle=True, random_state=10)
accScores, preScores, recScores, f1Scores  = [], [], [], []
for train, test in kfold.split(x, sy):
  #Train data
  #All data input
  x_trainDL1 = x2[train, :, :, :]

  #Test data
  #All data input
  x_testDL1 = x2[test, :, :, :]

  y_train = y_all[train]
  y_test = y_all[test]
  y_train_one_hot = to_categorical(y_train)
  
  # input layer
  visible1 = Input(shape=(None, x_trainDL1.shape[2], x_trainDL1.shape[3]))

  # Ch1
  conv11 = TimeDistributed(Conv1D(200, kernel_size=3, activation='relu', padding='same'))(visible1)
  batch11 = TimeDistributed(BatchNormalization())(conv11)
  pool11 = TimeDistributed(MaxPooling1D(pool_size=2, padding='same'))(batch11)
  flat11 = TimeDistributed(Flatten())(pool11)
  lstm11 = LSTM(200)(flat11)
  dense11 = Dense(200, activation='relu')(lstm11)  
  dense12 = Dense(100, activation='relu')(dense11)
  output1 = Dense(11, activation='softmax')(dense12)
  
  model1 = Model(inputs=[visible1], outputs=output1)
  opt = tf.keras.optimizers.Adam(learning_rate=0.001)
  model1.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
  #print(model1.summary())
  history1 = model1.fit([x_trainDL1], y_train_one_hot, epochs=30, batch_size=64)
  y_predict1 = np.argmax(model1.predict([x_testDL1]), axis=1)
  accScores.append(accuracy_score(y_test, y_predict1, normalize=True))  
  preScores.append(precision_score(y_test, y_predict1, average='macro'))  
  recScores.append(recall_score(y_test, y_predict1, average='macro'))  
  f1Scores.append(f1_score(y_test, y_predict1, average='macro'))  

print('Accuracy: %.4f' %(sum(np.array(accScores))/kf))
print('Precision: %.4f' %(sum(np.array(preScores))/kf))
print('Recall: %.4f' %(sum(np.array(recScores))/kf))
print('F1: %.4f' %(sum(np.array(f1Scores))/kf))