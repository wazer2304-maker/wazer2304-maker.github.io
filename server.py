#FIX THIS. WOLFRAM ALPHA API. 

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import wolframalpha

app_id = "KJ2V4L-THR8U8RAAL"
client = wolframalpha.Client(app_id)

app = Flask('app')
CORS(app)


@app.route('/', methods=["POST"])
def main():
  #res = client.query(q)
  #answer = next(res.results).text
  q = jsonify(str(request.data)[2:-1])
  

  print(q)
  for x in q:
    print(x)

  #res = client.query(q)
  answer = "h"  #res.results

  return answer


app.run(host='0.0.0.0', port=8080)
