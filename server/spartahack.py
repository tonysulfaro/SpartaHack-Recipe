import http.client, urllib.request, urllib.parse, urllib.error, base64, requests, json
from pprint import pprint
from flask import Flask, session, redirect, url_for, escape, request
from flask import make_response
from bs4 import BeautifulSoup

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


def get_info(string, size):
    response = requests.get(
        "https://api.edamam.com/search?q=chicken&app_id=d63abbc7&app_key=ad82d4418f075d5a656da60a47ad8246&from=0&to=" + str(
            size))
    file = response.json()
    url_list = []
    img_list = []
    ingred_list = []
    instruction_list1 = []
    for i in range(size):
        url_list.append(file['hits'][i]['recipe']['url'])
    print(url_list)

    for i in range(size):
        img_list.append(file['hits'][i]['recipe']['image'])
    print(img_list)

    for i in range(size):
        ingred_list.append(file['hits'][i]['recipe']['ingredientLines'])
    print(ingred_list)

    for i in range(size):
        response_1 = requests.get(url_list[0]).text
        soup = BeautifulSoup(response_1)
        mydivs = soup.find("ol", {"class": "recipe-procedures-list instructions"})
        string = str(mydivs.encode('utf-8'))
        list = string.split('<p>')
        take_next = False
        instruction_list = []
        for i in list:
            if take_next:
                take_till = i.find("</p")
                instruction_list.append(i[0:take_till])
                take_next = False
            if i == "":
                take_next = True
            else:
                take_next = False

        instruction_list1.append(instruction_list)
    print(instruction_list1)
    return (make_json(url_list, img_list, ingred_list, instruction_list1, size))


def make_json(url_list, img_list, ingred_list, instruction_list, size):
    json_list = []
    for x in range(size):
        url = url_list[x]
        img = img_list
        ingred = ingred_list
        instruction = instruction_list
        fin_dict = {"url": url, "image": img, "instruction": instruction, "ingred": ingred_list}
        json_list.append(fin_dict)
    return json.dumps(json_list)


app = Flask(__name__)

# Set the secret key to some random bytes. Keep this really secret!
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def hello():
    print('hi')
    return "Hello World!"


x = get_info("x", 3)


@app.route('/recipe', methods=['GET', 'POST'])
def get_albums():
    if request.method == 'GET':
        string = request.args.get('query')
        resp = make_response(get_info(string,3), 200)
        resp.headers['Content-Type'] = 'application/json'
        resp.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:50721'
        return resp
    elif request.method == 'POST':
        pass


app.run(host='0.0.0.0', port=5000)
