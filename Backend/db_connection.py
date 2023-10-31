import pymongo


def connect_to_database():
    try:
        # Create a MongoClient instance
        client = pymongo.MongoClient(host='localhost', port=27017)

        # Access your MongoDB database
        db = client['FinalProject']

        # Access your MongoDB collection
        collection = db['DoubleBloodReports']

        # Access your MongoDB collection for Records
        records_collection = db['Records']

        # Access your MongoDB collection for Users (for user authentication)
        users_collection=db['Users']

        # Check if the database connection is successful
        if client is not None and db is not None and collection is not None:
            print("Connected to MongoDB successfully.")
            return client, db, collection,users_collection,records_collection
        else:
            print("Failed to connect to MongoDB.")
            return None, None, None,None,None
    except pymongo.errors.ConnectionFailure:
        print("Could not connect to MongoDB. Please ensure that MongoDB is running.")
        return None, None, None,None, None
