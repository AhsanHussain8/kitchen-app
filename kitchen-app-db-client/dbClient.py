import pymongo
from flask import Flask
from flask import request
from flask_cors import CORS
import collections

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient('mongodb+srv://cluster0-uql2y.mongodb.net/test', 
		username='groot', password='iamgroot')

db = client.test

actions = db.actions

keys = ['action', 'station', 'dish']

def find_distinct_values():
	distinct_values_dict = {}
	for key in keys:
		distinct_values_dict[key] = actions.find().distinct(key)
	return distinct_values_dict

def find_filterd_values(filter_state):
	#exmaple: {'action': 'any', 'station': 'x', dish : 'y'}
	parsed_filters = {}
	for filter_key, filter_value in filter_state.items():
		if filter_value != 'any':
			parsed_filters[filter_key] = filter_value

	filtered_values_list = []
	for filtered_action in actions.find({ "$or" : [parsed_filters]}, {'_id': False}):
		filtered_values_list.append(filtered_action)
	return filtered_values_list

def calculate_stats(filtered_values_list):
	aggregate_stats = { key : collections.Counter() for key in keys }
	for row in filtered_values_list:
		for key in keys:
			aggregate_stats[key].update({row[key] : row['duration']})

	return { key : dict(aggregate_stats[key])  for key in keys }

@app.route('/initialData')
def send_distinct_values():
	distinct_values_dict = find_distinct_values() 
	return distinct_values_dict

@app.route('/filterData', methods=['PUT'])
def send_filtered_values():
	filter_state = request.args.to_dict()
	filtered_values_list = find_filterd_values(filter_state)
	aggregate_durations = calculate_stats(filtered_values_list)
	return {'resultsList' : filtered_values_list, 'aggregateDurations' : aggregate_durations }
	