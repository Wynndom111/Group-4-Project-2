# import libraries
import json
import requests
from geojson import Point, Feature, FeatureCollection, dump

# geojson data provided by user on github
url = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json'

# read geojson data
geo_data = requests.get(url).json()

# dump geojson data into file in the 
with open('../static/usstates.geojson', 'w') as f:
    dump(geo_data, f)

print(geo_data)

