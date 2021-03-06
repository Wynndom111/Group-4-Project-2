from pw import pw
import csv
import io
# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func


# Define the database connection parameters
username = 'postgres'  # Ideally this would come from config.py (or similar)
password = pw # Ideally this would come from config.py (or similar)
database_name = 'incarceration_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
connection_string = f'postgresql://postgres:{password}@localhost:5432/incarceration_db'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
state_data = base.classes.state_data


# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage

@app.route("/Bar")
def LineRoute():
    ''' This function runs when the browser loads the bar chart route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("Bar.html", title = "Incarceration by State 2008 - 2018: Trend Line")
    return webpage


@app.route("/Map")
def MapRoute():
    ''' This function runs when the browser loads the map route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("Map.html", title = "Incarceration by State 2008 - 2018, Demographics")
    return webpage

@app.route("/Pie")
def PieRoute():
    ''' This function runs when the browser loads the pie chart route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("Pie.html", title = "Incarceration by State 2008 - 2018, Demographics (Pie Chart)")
    return webpage

@app.route("/StateData")
def QueryState():
    ''' Query the database for state incarceration data and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(grouped_data.state).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    state = []
    for state in results:
        dict = {}
        dict["state"] = state
        state.append(dict)

    # Return the jsonified result. 
    return jsonify(state)

@app.route("/BarData")
def QueryBar():
    ''' Query the database for state incarceration and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(state_data.key, state_data.state, state_data.year, state_data.confined_population, state_data.white_population, state_data.black_population, state_data.hispanic_population, state_data.native_american_population, state_data.asian_population, state_data.native_hawaiian_pacific_islander_population, state_data.two_or_more_race_population, state_data.other_population).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    bar_demographics = []
    for key, state, year, confined_population, white_population, black_population, hispanic_population, native_american_population, asian_population, native_hawaiian_pacific_islander_population, two_or_more_race_population, other_population in results:
        dict = {}
        dict["key"] = key
        dict["state"] = state
        dict["year"] = year
        dict["confined_population"] = confined_population
        dict["white_population"] = white_population
        dict["black_population"] = black_population
        dict["hispanic_population"] = hispanic_population
        dict["native_american_population"] = native_american_population
        dict["asian_population"] = asian_population
        dict["native_hawaiian_pacific_islander_population"] = native_hawaiian_pacific_islander_population
        dict["two_or_more_race_population"] = two_or_more_race_population
        dict["other_population"] = other_population
        bar_demographics.append(dict)

    # Return the jsonified result. 
    return jsonify(bar_demographics)

@app.route("/MapData")
def QueryMap():
    ''' Query the database for incarceration population data and return the results as a CSV. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(state_data.key, state_data.state, state_data.year, state_data.confined_population, state_data.white_population, state_data.black_population, state_data.hispanic_population, state_data.native_american_population, state_data.asian_population, state_data.native_hawaiian_pacific_islander_population, state_data.two_or_more_race_population, state_data.other_population).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 

   
    map_demographics = []
    for key, state, year, confined_population, white_population, black_population, hispanic_population, native_american_population, asian_population, native_hawaiian_pacific_islander_population, two_or_more_race_population, other_population in results:
        dict = {}
        dict["key"] = key
        dict["state"] = state
        dict["year"] = year
        dict["confined_population"] = confined_population
        dict["white_population"] = white_population
        dict["black_population"] = black_population
        dict["hispanic_population"] = hispanic_population
        dict["native_american_population"] = native_american_population
        dict["asian_population"] = asian_population
        dict["native_hawaiian_pacific_islander_population"] = native_hawaiian_pacific_islander_population
        dict["two_or_more_race_population"] = two_or_more_race_population
        dict["other_population"] = other_population
        map_demographics.append(dict)

    with io.StringIO() as stream:
        csvWriter = csv.DictWriter(stream, fieldnames = map_demographics[0].keys())
        csvWriter.writeheader()
        for rowdict in map_demographics:
            csvWriter.writerow(rowdict)
        
        return stream.getvalue()


@app.route("/PieData")
def QueryPie():
    ''' Query the database for state prison and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(state_data.key, state_data.state, state_data.year, state_data.confined_population, state_data.white_population, state_data.black_population, state_data.hispanic_population, state_data.native_american_population, state_data.asian_population, state_data.native_hawaiian_pacific_islander_population, state_data.two_or_more_race_population, state_data.other_population).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    pie_demographics = []
    for key, state, year, confined_population, white_population, black_population, hispanic_population, native_american_population, asian_population, native_hawaiian_pacific_islander_population, two_or_more_race_population, other_population in results:
        dict = {}
        dict["key"] = key
        dict["state"] = state
        dict["year"] = year
        dict["confined_population"] = confined_population
        dict["white_population"] = white_population
        dict["black_population"] = black_population
        dict["hispanic_population"] = hispanic_population
        dict["native_american_population"] = native_american_population
        dict["asian_population"] = asian_population
        dict["native_hawaiian_pacific_islander_population"] = native_hawaiian_pacific_islander_population
        dict["two_or_more_race_population"] = two_or_more_race_population
        dict["other_population"] = other_population
        pie_demographics.append(dict)

    # Return the jsonified result. 
    return jsonify(pie_demographics)

# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)