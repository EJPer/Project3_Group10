import json 
from flask_cors import CORS, cross_origin
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from sqlalchemy import and_, or_, not_
from sqlalchemy import func, cast, Time
from sqlalchemy.types import String, Time
from datetime import date
import datetime as datetime,time

#################################################
# Load Data
#################################################

engine = create_engine("sqlite:///tweets.sqlite")


# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)


# Save reference to the table
Tweets = Base.classes.Tweets


app = Flask(__name__)
CORS(app, support_credentials=True)   # to prevent CORS errors

##################### Map Data
# Connect the database
data_path = "data/central.geojson"
with open(data_path) as f:
    data_central = json.load(f)

data_path = "data/eastern.geojson"
with open(data_path) as f:
    data_eastern = json.load(f)

data_path = "data/mountain.geojson"
with open(data_path) as f:
    data_mountain = json.load(f)

data_path = "data/pacific.geojson"
with open(data_path) as f:
    data_pacific = json.load(f)

app = Flask(__name__)
CORS(app, support_credentials=True)   # to prevent CORS errors


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/main<br/>"
        f"/api/v1.0/central<br/>"
        f"/api/v1.0/eastern<br/>"
        f"/api/v1.0/mountain<br/>"
        f"/api/v1.0/pacific<br/>"
    )

@app.route("/api/v1.0/main")
@cross_origin(supports_credentials=True)  # to prevent CORS errors
def test():
    #create our session (link) from python to the DB:
    session = Session(engine)
 
    results = session.query(Tweets.airline_sentiment, 
              Tweets.airline_sentiment_confidence,
              Tweets.airline,
              Tweets.text,
              cast(func.substring(cast(Tweets.tweet_created,String), 12,8), String),
              Tweets.user_timezone).filter(Tweets.airline_sentiment_confidence >= .7,or_(Tweets.user_timezone == 'Pacific Time (US & Canada)',Tweets.user_timezone == 'Eastern Time (US & Canada)',Tweets.user_timezone == 'Mountain Time (US & Canada)',Tweets.user_timezone == 'Central Time (US & Canada)')).all()

    
    session.close()
    

    result_list = []
    for output in results:
        result_dict = {}
        result_dict['sentiment'] = output[0]
        result_dict['airline'] = output[2]
        result_dict['tweet'] = int(len(output[3]))
        result_dict['time'] = output[4]
        result_dict['timezone'] = output[5]
        result_list.append(result_dict)

    return jsonify(result_list)


@app.route("/api/v1.0/central")
@cross_origin(supports_credentials=True)  # to prevent CORS errors
def central_data():
    return jsonify(data_central)

@app.route("/api/v1.0/eastern")
@cross_origin(supports_credentials=True)  # to prevent CORS errors
def eastern_data():
    return jsonify(data_eastern)

@app.route("/api/v1.0/mountain")
@cross_origin(supports_credentials=True)  # to prevent CORS errors
def mountain_data():
    return jsonify(data_mountain)

@app.route("/api/v1.0/pacific")
@cross_origin(supports_credentials=True)  # to prevent CORS errors
def pacific_data():
    return jsonify(data_pacific)
    

if __name__ == '__main__':
    app.run(debug=True)