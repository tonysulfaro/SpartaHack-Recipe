import http.client, urllib.request, urllib.parse, urllib.error, base64, requests, json
from pprint import pprint
from flask import Flask, session, redirect, url_for, escape, request
from flask import make_response
from bs4 import BeautifulSoup


class TextToSpeech(object):
    def __init__(self, subscription_key):
        self.subscription_key = subscription_key
        self.tts = input("What would you like to convert to speech: ")
        self.timestr = time.strftime("%Y%m%d-%H%M")
        self.access_token = None

    def get_token(self):
        fetch_token_url = "https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken"
        headers = {
            'Ocp-Apim-Subscription-Key': self.subscription_key
        }
        response = requests.post(fetch_token_url, headers=headers)
        self.access_token = str(response.text)

    def save_audio(self):
        base_url = 'https://westus.tts.speech.microsoft.com/'
        path = 'cognitiveservices/v1'
        constructed_url = base_url + path
        headers = {
            'Authorization': 'Bearer ' + self.access_token,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
            'User-Agent': 'YOUR_RESOURCE_NAME'
        }
        xml_body = ElementTree.Element('speak', version='1.0')
        xml_body.set('{http://www.w3.org/XML/1998/namespace}lang', 'en-us')
        voice = ElementTree.SubElement(xml_body, 'voice')
        voice.set('{http://www.w3.org/XML/1998/namespace}lang', 'en-US')
        voice.set('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
        voice.text = self.tts
        body = ElementTree.tostring(xml_body)
        response = requests.post(constructed_url, headers=headers, data=body)
        if response.status_code == 200:
            with open('sample-' + self.timestr + '.wav', 'wb') as audio:
                audio.write(response.content)
                print("\nStatus code: " + str(response.status_code) + "\nYour TTS is ready for playback.\n")
        else:
            print("\nStatus code: " + str(
                response.status_code) + "\nSomething went wrong. Check your subscription key and headers.\n")


headers = {
    # Request headers
    'Ocp-Apim-Subscription-Key': '46386923da044df0b8ea641212b3d912',
}
fp = open("foodlist.txt", "r")
for i in fp:
    check_list = i.split(",")


def get_food(food_string):
    documents = {'documents': [
        {'id': '1', 'language': 'en', 'text': food_string}
    ]}

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

    return food_list[0]


def get_info(stringh, size):
    response = requests.get(
        "https://api.edamam.com/search?q="+stringh+"&app_id=d63abbc7&app_key=ad82d4418f075d5a656da60a47ad8246&from=0&to=" + str(
            size))
    file = response.json()
    url_list = []
    img_list = []
    ingred_list = []
    instruction_list1 = []
    label_list = []

    for i in range(size):
        label_list.append(file['hits'][i]['recipe']['label'])

    for i in range(size):
        url_list.append(file['hits'][i]['recipe']['url'])

    for i in range(size):
        img_list.append(file['hits'][i]['recipe']['image'])

    for i in range(size):
        ingred_list.append(file['hits'][i]['recipe']['ingredientLines'])

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
    return (make_json(url_list, label_list, img_list, ingred_list, instruction_list1, size))


def make_json(url_list, name_list, img_list, ingred_list, instruction_list, size):
    json_list = []
    for x in range(size):
        url = url_list[x]
        img = img_list[x]
        name = name_list[x]
        ingred = ingred_list[x]
        instruction = instruction_list[x]
        fin_dict = {"url": url, "label": name, "image": img, "instruction": instruction, "ingred": ingred}

        json_list.append(fin_dict)

    return json.dumps(json_list)


def speech_to_text():
    # Creates an instance of a speech config with specified subscription key and service region.
    # Replace with your own subscription key and service region (e.g., "westus").
    speech_key, service_region = "1f65cf15a97b424cbc105f002631a6db", "westus"
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

    # Creates a recognizer with the given settings
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    print("Say something...")

    # Performs recognition. recognize_once() returns when the first utterance has been recognized,
    # so it is suitable only for single shot recognition like command or query. For long-running
    # recognition, use start_continuous_recognition() instead, or if you want to run recognition in a
    # non-blocking manner, use recognize_once_async().
    result = speech_recognizer.recognize_once()

    # Checks result.
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        print("Recognized: {}".format(result.text))
    elif result.reason == speechsdk.ResultReason.NoMatch:
        print("No speech could be recognized: {}".format(result.no_match_details))
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print("Speech Recognition canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print("Error details: {}".format(cancellation_details.error_details))
    return (result.text)


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
        stringh = request.args.get('query')
        food_string = get_food(stringh)
        resp = make_response(get_info(food_string, 10), 200)
        resp.headers['Content-Type'] = 'application/json'
        resp.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:50721'
        return resp
    elif request.method == 'POST':
        pass

subscription_key = "a2398892e90140698df64526fb7c5919"
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9001)
