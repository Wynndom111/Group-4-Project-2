from pw import pw

# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Define the database connection parameters
username = 'postgres'  # Ideally this would come from config.py (or similar)
password = pw # Ideally this would come from config.py (or similar)
database_name = 'incarceration_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
table = base.classes.state_data

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("..templates/index.html")
    return webpage

@app.route("/other")
def OtherRoute():
    ''' This function runs when the user clicks the link for the other page.
        Note that the html file must be located in a folder called templates. '''

    # Note that this call to render template passes in the title parameter. 
    # That title parameter is a 'Shirley' variable that could be called anything 
    # we want. But, since we're using it to specify the page title, we call it 
    # what we do. The name has to match the parameter used in other.html. 
    webpage = render_template("other.html", title_we_want="Shirley")
    return webpage

@app.route("/Line")
def QueryLine():
    ''' Query the database for fighter aircraft and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.country, table.iso3, table.fighteraircraft).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    confined_per_year = []
    for country, iso3, fighteraircraft in results:
        dict = {}
        dict["state"] = state
        dict["year"] = year
        dict["confined_population"] = confined_population
        confined_per_year.append(dict)

    # Return the jsonified result. 
    return jsonify(confined_per_year)

@app.route("/Map")
def QueryMap():
    ''' Query the database for population numbers and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.country, table.iso3, table.totalpopulation).all()
    session.close 

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    map_demographics = []
    for country, iso3, totalpopulation in results:
        dict = {}
        dict["state"] = state
        dict["year"] = year
        dict["confined_population"] = confined_population
        dict["white_population"] = white_population
        dict["black_population"] = black_population
        dict["hispanic_population"] = hispanic_population
        dict["native_american_population"] = native_american_population
        dict["asian_population"] = asian_population
        dict["native_hawaiian_pacific_islander_population"] = native_american_population
        dict["two_or_more_race_population"] = two_or_more_race_population
        dict["other_population"] = other_population
        map_demographics.append(dict)

    # Return the jsonified result. 
    return jsonify(map_demographics)


@app.route("/Pie")
def QueryPie():
    ''' Query the database for state prison and return the results as a JSON. '''

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(table.country, table.iso3, table.totalpopulation).all()
    session.close 

    # Create a list of dictionaries, with each dictionary containing one row from the query. 
    pie_demographics = []
    for country, iso3, totalpopulation in results:
        dict = {}
        dict["state"] = state
        dict["year"] = year
        dict["confined_population"] = confined_population
        dict["white_population"] = white_population
        dict["black_population"] = black_population
        dict["hispanic_population"] = hispanic_population
        dict["native_american_population"] = native_american_population
        dict["asian_population"] = asian_population
        dict["native_hawaiian_pacific_islander_population"] = native_american_population
        dict["two_or_more_race_population"] = two_or_more_race_population
        dict["other_population"] = other_population
        pie_demographics.append(dict)

    # Return the jsonified result. 
    return jsonify(pie_demographics)


@app.route("/test")
def TestRoute():
    ''' This function returns a simple message, just to guarantee that
        the Flask server is working. '''

    return "This is the test route!"

@app.route("/dictionary")
def DictionaryRoute():
    ''' This function returns a jsonified dictionary. Ideally we'd create 
        that dictionary from a database query. '''

    dict = { "Fine Sipping Tequila": 10,
             "Beer": 2,
             "Red Wine": 8,
             "White Wine": 0.25}
    
    return jsonify(dict) # Return the jsonified version of the dictionary

@app.route("/dict")
def DictRoute():
    ''' This seems to work in the latest versions of Chrome. But it's WRONG to
        return a dictionary (or any Python-specific datatype) without jsonifying
        it first! '''        

    dict = { "one": 1,
             "two": 2,
             "three": 3}
    
    return dict # WRONG! Don't return a dictionary! Return a JSON instead. 


# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)