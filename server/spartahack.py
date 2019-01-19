import http.client, urllib.request, urllib.parse, urllib.error, base64, requests, json
from pprint import pprint
from flask import Flask, session, redirect, url_for, escape, request

headers = {
    # Request headers
    'Ocp-Apim-Subscription-Key': '46386923da044df0b8ea641212b3d912',
}
fp = open("foodlist.txt", "r")
for i in fp:
    check_list = i.split(",")

documents = {'documents': [
    {'id': '1', 'language': 'en', 'text': 'How do I lobster recipe.'},
    {'id': '2', 'language': 'en', 'text': 'one hot dog please.'},
    {'id': '3', 'language': 'en', 'text': 'How do I cook a pizza?'},
    {'id': '4', 'language': 'en', 'text': 'Can you find me a way to make catfish?'}
]}


def get_food():
    response = requests.post("https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases",
                             headers=headers, json=documents)
    # print(response.content)
    # response_json = json.loads(response.content)
    key_phrases = response.json()
    food_list = []

    food = key_phrases['documents'][0]['keyPhrases'][0]
    index = 0
    for i in key_phrases['documents'][0]['keyPhrases']:

        if 'recipe' in i:
            hold = i.split()
            i = hold[0]
            if i in check_list:
                food_list.append(i)

                break

        if (key_phrases['documents'][0]['keyPhrases'][index] in check_list):
            food_list.append(key_phrases['documents'][0]['keyPhrases'][index])
        else:
            while (True):
                if (key_phrases['documents'][0]['keyPhrases'][index] in check_list):
                    food_list.append(key_phrases['documents'][0]['keyPhrases'][index])
                    break
                else:
                    index += 1
    updated_list = set(food_list)
    print(updated_list)


app = Flask(__name__)

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def hello():
    print('hi')
    return "Hello World!"


@app.route('/recipe', methods=['GET', 'POST'])
def get_albums():
    if request.method == 'GET':
        return "recipe thing"
    elif request.method == 'POST':
        pass


app.run(host='0.0.0.0', port=9999)
