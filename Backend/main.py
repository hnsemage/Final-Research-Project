from HBA1CFBS import hba1c_fbs_summarize, fbs_hba1c_summarize
from TSHT4 import tsh_t4_summarize, t4_tsh_summarize
from HBA1CPPBS import hba1c_ppbs_summarize, ppbs_hba1c_summarize
from flask import Flask, request, jsonify, session
from db_connection import connect_to_database
from flask_cors import CORS
import datetime
import secrets

app = Flask(__name__)
CORS(app)

# Set the secret key for session management
app.secret_key = secrets.token_hex(16)

# Global variables to store the results
prediction_result = ""
database_info_result = {}
matching_info_result = {}

# Add your MongoDB configuration
client, db, collection, users_collection, records_collection = connect_to_database()


# For generating the prediction and displaying the needed records
@app.route('/predict', methods=['POST', 'GET'])
def predict():
    global prediction_result, database_info_result, matching_info_result

    if request.method == 'POST':
        try:
            # Get data from the POST request
            data = request.json
            print("Received data:", data)

            # Extract report_type1 and report_type2 from the data
            report_type1 = data.get('report_type1', '').upper()
            report_type2 = data.get('report_type2', '').upper()

            # Extract value1 and value2 from the data
            value1 = float(data.get('value1', 0.00))
            value2 = float(data.get('value2', 0.00))

            # Logic to choose the appropriate model based on report types
            if report_type1 == 'TSH' and report_type2 == 'T4':
                prediction_result, database_info_result, matching_info_result = tsh_t4_summarize(value1, value2,
                                                                                                 report_type1,
                                                                                                 report_type2)
            elif report_type1 == 'T4' and report_type2 == 'TSH':
                prediction_result, database_info_result, matching_info_result = t4_tsh_summarize(value1, value2,
                                                                                                 report_type1,
                                                                                                 report_type2)
            elif report_type1 == 'HBA1C' and report_type2 == 'PPBS':
                prediction_result, database_info_result, matching_info_result = hba1c_ppbs_summarize(value1, value2,
                                                                                                     report_type1,
                                                                                                     report_type2)
            elif report_type1 == 'PPBS' and report_type2 == 'HBA1C':
                prediction_result, database_info_result, matching_info_result = ppbs_hba1c_summarize(value1, value2,
                                                                                                     report_type1,
                                                                                                     report_type2)
            elif report_type1 == 'HBA1C' and report_type2 == 'FBS':
                prediction_result, database_info_result, matching_info_result = hba1c_fbs_summarize(value1, value2,
                                                                                                    report_type1,
                                                                                                    report_type2)
            elif report_type1 == 'FBS' and report_type2 == 'HBA1C':
                prediction_result, database_info_result, matching_info_result = fbs_hba1c_summarize(value1, value2,
                                                                                                    report_type1,
                                                                                                    report_type2)
            else:
                return jsonify({'error': 'Invalid report types'}), 400

            # Convert prediction_result to uppercase
            prediction_result = prediction_result.upper()

            return jsonify({'message': 'Prediction and data saved successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    elif request.method == 'GET':
        # Handle GET request to retrieve data

        data = {
            'prediction': prediction_result,
            'matching_info': matching_info_result  # Return split matching_info
        }
        return jsonify(data), 200


# For generating the prediction and displaying the needed records
@app.route('/predictlogin/<phone_number>', methods=['POST', 'GET'])
def predictlogin(phone_number):
    global prediction_result, database_info_result, matching_info_result

    if request.method == 'POST':
        try:
            # Get data from the POST request
            data = request.json
            print("Received data:", data)

            # Extract report_type1 and report_type2 from the data
            report_type1 = data.get('report_type1', '').upper()
            report_type2 = data.get('report_type2', '').upper()

            # Extract value1 and value2 from the data
            value1 = float(data.get('value1', 0.00))
            value2 = float(data.get('value2', 0.00))

            session['phone_number'] = phone_number
            print("Session phone_number:", session.get('phone_number'))

            # Logic to choose the appropriate model based on report types
            if report_type1 == 'TSH' and report_type2 == 'T4':
                prediction_result, database_info_result, matching_info_result = tsh_t4_summarize(value1, value2,
                                                                                                 report_type1,
                                                                                                 report_type2)
            elif report_type1 == 'T4' and report_type2 == 'TSH':
                prediction_result, database_info_result, matching_info_result = t4_tsh_summarize(value1, value2,
                                                                                                 report_type1,
                                                                                                 report_type2)
            elif report_type1 == 'HBA1C' and report_type2 == 'PPBS':
                prediction_result, database_info_result, matching_info_result = hba1c_ppbs_summarize(value1, value2,
                                                                                                     report_type1,
                                                                                                     report_type2)
            elif report_type1 == 'PPBS' and report_type2 == 'HBA1C':
                prediction_result, database_info_result, matching_info_result = ppbs_hba1c_summarize(value1, value2,
                                                                                                     report_type1,
                                                                                                     report_type2)
            elif report_type1 == 'HBA1C' and report_type2 == 'FBS':
                prediction_result, database_info_result, matching_info_result = hba1c_fbs_summarize(value1, value2,
                                                                                                    report_type1,
                                                                                                    report_type2)
            elif report_type1 == 'FBS' and report_type2 == 'HBA1C':
                prediction_result, database_info_result, matching_info_result = fbs_hba1c_summarize(value1, value2,
                                                                                                    report_type1,
                                                                                                    report_type2)
            else:
                return jsonify({'error': 'Invalid report types'}), 400

            # Convert prediction_result to uppercase
            prediction_result = prediction_result.upper()

            # Save records only if the user is logged in
            if 'phone_number' in session:
                current_datetime = datetime.datetime.now()
                date = current_datetime.strftime('%Y-%m-%d')
                time = current_datetime.strftime('%H:%M:%S')

                record_data = {
                    'report_type1': report_type1,
                    'report_type2': report_type2,
                    'report_value1': value1,
                    'report_value2': value2,
                    'prediction': prediction_result,
                    'phone_number': session['phone_number'],
                    'date': date,
                    'time': time
                }

                # Example debug statements

                print("Record data:", record_data)

                records_collection.insert_one(record_data)

            return jsonify({'message': 'Prediction and data saved successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    elif request.method == 'GET':
        # Handle GET request to retrieve data

        data = {
            'prediction': prediction_result,
            'matching_info': matching_info_result  # Return split matching_info
        }
        return jsonify(data), 200


# For user login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    phone_number = data.get('phone_number')
    provided_password = data.get('password')

    # Retrieve user from the database using the phone number
    user = users_collection.find_one({"phone_number": phone_number})

    if user:
        # Retrieve the stored password from the user object
        stored_password = user.get("password")

        # Print the original provided and stored passwords (without hash)
        print("Provided Password (Without Hash):", provided_password)
        print("Stored Password (Without Hash):", stored_password)

        # Compare the provided password with the stored password in plaintext (unhashed) form
        if stored_password == provided_password:
            # Password is correct
            session['phone_number'] = phone_number
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


# Get information about the user
@app.route('/get_user_data/<phone_number>', methods=['GET'])
def get_user_data(phone_number):
    try:
        # Find the user based on the provided phone number
        user = users_collection.find_one({"phone_number": phone_number})

        if user:
            # Remove the '_id' field, as it's not serializable to JSON
            user.pop('_id', None)
            return jsonify(user), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Get the medical data of the user
@app.route('/get_records/<phone_number>', methods=['GET'])
def get_records(phone_number):
    try:
        # Find records based on the provided phone number
        records = records_collection.find({"phone_number": phone_number})

        # Convert records to a list and remove the '_id' field
        records = [record for record in records]
        for record in records:
            record.pop('_id', None)

        return jsonify(records), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    # Check if the user with the same phone number already exists
    existing_user = users_collection.find_one({"phone_number": phone_number})
    if existing_user:
        return jsonify({'error': 'User with this phone number already exists'}), 400

    # Insert the new user into the Users collection
    new_user = {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
        'phone_number': phone_number,
        'password': password,  # You should hash the password here

    }
    users_collection.insert_one(new_user)

    return jsonify({'message': 'Registration successful'}), 201


if __name__ == '__main__':
    app.run(port=5000, debug=True)