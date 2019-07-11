import pymongo
from flask import Flask
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


client = pymongo.MongoClient('mongodb+srv://cluster0-uql2y.mongodb.net/test', 
		username='groot', password='iamgroot')

db = client.test

actions = db.actions

def find_distinct_values():
	keys = ['action', 'station', 'dish']
	distinct_values_dict = {}
	for key in keys:
		distinct_values_dict[key] = actions.find().distinct(key)
	return distinct_values_dict

def find_filterd_values(filters):
	#exmaple: {'action': 'any', 'station': 'x', dish : 'y'}
	parsed_filters = {}
	for filter_key, filter_value in filters.items():
		if filter_value != 'any':
			parsed_filters[filter_key] = filter_value

	filtered_values_list = []
	for filtered_action in actions.find({ "$or" : [filters] }):
		filtered_values_list.append(filtered_action)
	return filtered_values_list

@app.route('/initialData')
def send_distinct_values():
	distinct_values_dict = find_distinct_values() 
	return distinct_values_dict

@app.route('/filterData')
def send_filtered_values(methods=['PUT']):
	filters = request.args.get('filters')
	filtered_values_list = find_filterd_values(filters)
	return filtered_values_list