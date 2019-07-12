import pymongo
from flask import Flask
from flask import request
from flask_cors import CORS
import collections

app = Flask(__name__)
CORS(app)

# connect to the database as a client and keep the actions ready to go
client = pymongo.MongoClient('mongodb+srv://cluster0-uql2y.mongodb.net/test', 
		username='groot', password='iamgroot')

db = client.test

actions = db.actions

# keys used to filter on in webpage
keys = ['action', 'station', 'dish']

def find_distinct_values(filtered_values_list):
	# add 'any' as the first option all the time
	distinct_values_dict = { key : ['any'] for key in keys}

	for row in filtered_values_list:
		for key in keys:
			if row[key] not in distinct_values_dict[key]:
				distinct_values_dict[key].append(row[key])

	return distinct_values_dict

def find_filterd_values(filter_state):
	# look through the filter state
	# take out values that say 'any' -> all values accepted
	# find with other values that are specified
	parsed_filters = {}
	
	for filter_key, filter_value in filter_state.items():
		if filter_value != 'any':
			parsed_filters[filter_key] = filter_value
	
	filtered_values_list = []
	for filtered_action in actions.find({ "$or" : [parsed_filters]}, {'_id': False}):
		filtered_values_list.append(filtered_action)

	return filtered_values_list

def calculate_stats(filtered_values_list):
	# use a counter to find unique durations and total duration of the list
	# return the durations normalized to equal 100 
	aggregate_stats = { key : collections.Counter() for key in keys }
	total_duration = 0

	for row in filtered_values_list:
		for key in keys:
			aggregate_stats[key].update({row[key] : row['duration']})

		total_duration = sum(aggregate_stats[key].values())

	normalized_stats = {}
	for key in keys:
		normalized_stats[key] = []
		for unique_item, duration in dict(aggregate_stats[key]).items():
			normalized_stats[key].append({ 'label': unique_item, 'value':  duration/total_duration*100})

	return normalized_stats, total_duration

# one endpoint for all the data
# all the values in the webpage depend on list from filtering
# TO-DO: add a cache which stores more recent list and add logic to decide if DB needs to be 
# accessed again 
@app.route('/filterData', methods=['PUT'])
def send_filtered_values():
	filter_state = request.args.to_dict()
	filtered_values_list = find_filterd_values(filter_state)
	distinct_values_dict = find_distinct_values(filtered_values_list)
	normalized_stats, total_duration = calculate_stats(filtered_values_list)
	return {
		'resultsList' : filtered_values_list, 
		'distinctValues' : distinct_values_dict,
		'aggregateDurations' : normalized_stats,
		'totalDuration' : total_duration }
	