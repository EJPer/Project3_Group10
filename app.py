import json 
from flask_cors import CORS, cross_origin
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from sqlalchemy import and_, or_, not_

#################################################
# Load Data
#################################################

engine = create_engine("sqlite:///tweets.sqlite")

###########################
#figure out subtrings
# engine.execute("alter table Tweets " 
#                "add time as substr(tweet_created,11,8);")
###########################

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)


# Save reference to the table
Tweets = Base.classes.Tweets


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
    )

@app.route("/api/v1.0/main")
@cross_origin(supports_credentials=True)  # to prevent CORS errors
def test():
    #create our session (link) from python to the DB:
    session = Session(engine)

    results = session.query(Tweets.time)
 
    session.query(Tweets.airline_sentiment, 
              Tweets.airline_sentiment_confidence,
              Tweets.airline,
              Tweets.text,
              Tweets.tweet_created,
              Tweets.user_timezone).filter(Tweets.airline_sentiment_confidence >= .7,or_(Tweets.user_timezone == 'Pacific Time (US & Canada)',
                                                                                         Tweets.user_timezone == 'Eastern Time (US & Canada)',
                                                                                         Tweets.user_timezone == 'Mountain Time (US & Canada)',
                                                                                         Tweets.user_timezone == 'Central Time (US & Canada)')).all()
    
    session.close()
    result_list = []

    for time in results:
        result_dict = {}
        result_dict['time'] = time
        result_dict['timezone'] = timezone
        result_dict['tweet'] = tweet
        result_list.append(result_dict)

    return jsonify(result_list)

    

    

if __name__ == '__main__':
    app.run(debug=True)