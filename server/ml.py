import joblib
import sys
import subprocess
import transformers
import torch

# subprocess.check_call([sys.executable, "-m", "pip", "install", "torch"])
# import torch
model_name = "deepset/roberta-base-squad2"
pipe=joblib.load('pipeline.joblib')
nlp = pipe('question-answering', model=model_name, tokenizer=model_name)

output =  nlp(sys.argv[1],sys.argv[2])
# output =  nlp("Answer is 5","What is the answer?")
print(output)
