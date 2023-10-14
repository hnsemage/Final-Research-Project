import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import db_connection

# Establish a database connection
client, db, collection = db_connection.connect_to_database()

# Check if the database connection was successful
if client is None or db is None or collection is None:
    print("Exiting the script.")
    exit()


def hba1c_fbs_summarize(user_HBA1C, user_FBS, report_HBA1C, report_FBS):
    # Load data from Excel
    data = pd.read_excel('datasets/HBA1C_FBS.xlsx')

    # Preprocess the data if necessary (e.g., handling missing values).
    # Fill missing values with the mean of the respective columns.
    data['HBA1C_Value'].fillna(data['HBA1C_Value'].mean(), inplace=True)
    data['FBS_Value'].fillna(data['FBS_Value'].mean(), inplace=True)

    # Encode categorical labels (e.g., normal, hyperthyroidism, hypothyroidism) using LabelEncoder.
    label_encoder = LabelEncoder()
    data['category_encoded'] = label_encoder.fit_transform(data['Result'])

    # Split the data into training and testing sets.
    x = data[['HBA1C_Value', 'FBS_Value']]
    y = data['category_encoded']
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=42)

    # Create and train the Random Forest model.
    model = RandomForestClassifier(random_state=42)
    model.fit(x_train, y_train)

    # After training the model
    model.feature_names_in_ = ['HBA1C_Value', 'FBS_Value']

    # Calculate and print the accuracy of the model on the testing data
    y_pred = model.predict(x_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy * 100:.2f}%")

    # Take user input for HBA1C and PPBS values
    user_input = [[user_HBA1C, user_FBS]]

    # Make predictions for the user's input.
    predicted_category_encoded = model.predict(user_input)

    # Decode the predicted category back to the original label.
    predicted_category = label_encoder.inverse_transform(predicted_category_encoded)

    # Use the predicted category to query the MongoDB collection for additional information
    # Check if the user-input report types match the ones in MongoDB
    result = collection.find_one({"report_type01": report_HBA1C, "report_type02": report_FBS})

    print(f"Database Report Types (report_type01): {result.get('report_type01', 'N/A')}")
    print(f"Database Report Types (report_type02): {result.get('report_type02', 'N/A')}")
    # Print the values of report_type01 and report_type02 from the database

    if result:
        database_info = {
            "Report Type 01": result.get('report_type01', 'N/A'),
            "Report Type 02": result.get('report_type02', 'N/A'),
        }
    else:
        database_info = {
            "Report types not found in the database."}

    # Find records with matching report_type01 and report_type02
    matching_records = collection.find({"report_type01": report_HBA1C, "report_type02": report_FBS})

    # Initialize a variable to store the matching record
    matching_record = None

    # Initialize flags to keep track of whether titles have been printed
    precautions_printed = False
    risks_printed = False
    symptoms_printed = False
    description_printed = False
    links_printed = False

    # Iterate through the matching records and find the one with the desired status
    for record in matching_records:
        if record.get("status", "").lower() == predicted_category[0].lower():
            matching_record = record
            break
    matching_info = {
        "About your reports": None,
        "Precautions": None,
        "Risks": None,
        "Symptoms": None,
        "Learn More About Your Reports": None,
    }
    # Continue retrieving other information if a matching record was found
    if matching_record:

        # Split the description string by commas and print each point on a separate line
        description = matching_record.get('description', 'N/A')
        if '.' in description:
            description_points = description.split('.' or '.')
            for point in description_points:
                if not description_printed:
                    print("About your reports:")
                    description_printed = True
                print(f"- {point.strip()}")  # Trim spaces around each point
                matching_info["About your reports"] = description_points

        else:
            if not description_printed:
                print(f"About your reports: {description.strip()}")  # Treat as a single precaution
                description_points = [description.strip()]
                matching_info["About your reports"] = description_points
                description_printed = True

        # Split the precautions string by commas and print each point on a separate line
        precautions = matching_record.get('precautions', 'N/A')
        if ',' in precautions:
            precautions_points = precautions.split(',' or '.')
            for point in precautions_points:
                if not precautions_printed:
                    print("Precautions:")
                    precautions_printed = True
                print(f"- {point.strip()}")  # Trim spaces around each point
                matching_info["Precautions"] = precautions_points
        else:
            if not precautions_printed:
                print(f"Precautions: {precautions.strip()}")  # Treat as a single precaution
                precautions_points = [precautions.strip()]
                matching_info["Precautions"] = precautions_points
                precautions_printed = True

        # Split the risk string by commas and print each point on a separate line
        risk = matching_record.get('risk', 'N/A')
        if ',' in risk:
            risk_points = risk.split(',' or '.')
            for point in risk_points:
                if not risks_printed:
                    print("Risks:")
                    risks_printed = True
                print(f"- {point.strip()}")  # Trim spaces around each point
                matching_info["Risks"] = risk_points
        else:
            if not risks_printed:
                print(f"Risks: {risk.strip()}")  # Treat as a single risk point
                risk_points = [risk.strip()]
                matching_info["Risks"] = risk_points
                risks_printed = True

        # Split the symptoms string by commas and print each point on a separate line
        symptoms = matching_record.get('symptoms', 'N/A')
        if ',' in symptoms:
            symptoms_points = symptoms.split(',' or '.')
            for point in symptoms_points:
                if not symptoms_printed:
                    print("Symptoms:")
                    symptoms_printed = True
                print(f"- {point.strip()}")  # Trim spaces around each point
                matching_info["Symptoms"] = symptoms_points
        else:
            if not symptoms_printed:
                print(f"Symptoms: {symptoms.strip()}")  # Treat as a single symptom
                symptoms_points = [symptoms.strip()]
                matching_info["Symptoms"] = symptoms_points
                symptoms_printed = True

        # Split the symptoms string by commas and print each point on a separate line
        links = matching_record.get('links', 'N/A')
        if ',' in links:
            links_points = links.split(',' or '.')
            for point in links_points:
                if not links_printed:
                    print("Learn More About Your Reports:")
                    links_printed = True
                print(f"- {point.strip()}")  # Trim spaces around each point
                matching_info["Learn More About Your Reports"] = links_points
        else:
            if not symptoms_printed:
                print(f"Learn More About Your Reports: {symptoms.strip()}")  # Treat as a single symptom
                links_points = [symptoms.strip()]
                matching_info["Learn More About Your Reports"] = links_points
                links_printed = True

    else:
        print("No matching record found for the predicted category.")

    return predicted_category[0], database_info, matching_info


# This function handles when the user input PPBS first and then HBA1C
def fbs_hba1c_summarize(user_FBS, user_HBA1C, report_FBS, report_HBA1C):
    return hba1c_fbs_summarize(user_HBA1C, user_FBS, report_HBA1C, report_FBS)
