# import joblib
import sys
import subprocess
# import transformers

# subprocess.check_call([sys.executable, "-m", "pip", "install", "transformers"])
# subprocess.check_call([sys.executable, "-m", "pip", "install", "joblib"])
sys.path.insert(0, "/Users/frankvu/Documents/UMICH/CIS525/react/cis525final/venv/lib/python3.9")
joblib = __import__("joblib")
imported_module = __import__("transformers")

model_name = "deepset/roberta-base-squad2"
pipe=joblib.load('pipeline.joblib')
nlp = pipe('question-answering', model=model_name, tokenizer=model_name)

output =  nlp(sys.argv[1],
              sys.argv[2])
print(output)
