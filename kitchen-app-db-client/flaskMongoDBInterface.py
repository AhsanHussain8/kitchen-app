import pymongo

client = pymongo.MongoClient('mongodb+srv://cluster0-uql2y.mongodb.net/test', 
		username='groot', password='iamgroot')

db = client.test

actions = db.actions

#for action in actions.find({ "$or" :[{'dish' : 'lasagna'}, {'station' : 'oven1'}]}):
#	print(action)

print(actions.find().distinct('action'))

print(actions.find().distinct('station'))

print(actions.find().distinct('dish'))

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'