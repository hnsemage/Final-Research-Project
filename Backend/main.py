from HBA1CFBS import hba1c_fbs_summarize, fbs_hba1c_summarize
from TSHT4 import tsh_t4_summarize, t4_tsh_summarize
from HBA1CPPBS import hba1c_ppbs_summarize, ppbs_hba1c_summarize
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global variables to store the results
prediction_result = ""
database_info_result = {}
matching_info_result = {}


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
                prediction_result, database_info_result, matching_info_result = tsh_t4_summarize(value1, value2,report_type1,report_type2)
            elif report_type1 == 'T4' and report_type2 == 'TSH':
                prediction_result, database_info_result, matching_info_result = t4_tsh_summarize(value1, value2,report_type1,report_type2)
            elif report_type1 == 'HBA1C' and report_type2 == 'PPBS':
                prediction_result, database_info_result, matching_info_result = hba1c_ppbs_summarize(value1, value2,report_type1,report_type2)
            elif report_type1 == 'PPBS' and report_type2 == 'HBA1C':
                prediction_result, database_info_result, matching_info_result = ppbs_hba1c_summarize(value1, value2,report_type1,report_type2)
            elif report_type1 == 'HBA1C' and report_type2 == 'FBS':
                prediction_result, database_info_result, matching_info_result = hba1c_fbs_summarize(value1, value2,report_type1,report_type2)
            elif report_type1 == 'FBS' and report_type2 == 'HBA1C':
                prediction_result, database_info_result, matching_info_result = fbs_hba1c_summarize(value1, value2, report_type1, report_type2)
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


if __name__ == '__main__':
    app.run(port=5000, debug=True)
