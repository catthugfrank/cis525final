import joblib
import sys
import subprocess
import transformers
import torch

# import sys
# print(sys.path)

# subprocess.check_call([sys.executable, "-m", "pip", "install", "joblib"])
#
# subprocess.check_call([sys.executable, "-m", "pip", "install", "torch"])
# subprocess.check_call([sys.executable, "-m", "pip", "install", "transformers"])
# return "hey"
import os
# print(os.environ)
# print(sys.argv[1])
# print("worked")
# print(sys.path)
model_name = "deepset/roberta-base-squad2"
pipe=joblib.load('pipeline.joblib')
nlp = pipe('question-answering', model=model_name, tokenizer=model_name)

output =  nlp('How much did he increase club involvement',
           'Increased club involvement by 4 times compared to previous years for club events')
print(output)

# file = open("output.txt", "w")
# file.write(output)
# file.close