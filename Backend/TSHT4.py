import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split, learning_curve
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


def plot_learning_curve(estimator, X, y, cv, train_sizes=np.linspace(0.1, 1.0, 5)):
    train_sizes, train_scores, test_scores = learning_curve(
        estimator, X, y, cv=cv, train_sizes=train_sizes, scoring="accuracy"
    )
    train_scores_mean = np.mean(train_scores, axis=1)
    train_scores_std = np.std(train_scores, axis=1)
    test_scores_mean = np.mean(test_scores, axis=1)
    test_scores_std = np.std(test_scores, axis=1)

    plt.figure(figsize=(8, 6))
    plt.title("Learning Curve")
    plt.xlabel("Training Examples")
    plt.ylabel("Score")
    plt.grid()

    plt.fill_between(
        train_sizes,
        train_scores_mean - train_scores_std,
        train_scores_mean + train_scores_std,
        alpha=0.1,
        color="r",
    )
    plt.fill_between(
        train_sizes,
        test_scores_mean - test_scores_std,
        test_scores_mean + test_scores_std,
        alpha=0.1,
        color="g",
    )

    plt.plot(train_sizes, train_scores_mean, "o-", color="r", label="Training Score")
    plt.plot(train_sizes, test_scores_mean, "o-", color="g", label="Cross-Validation Score")

    plt.legend(loc="best")
    plt.show()


def tsh_t4_summarize(user_TSH, user_T4, report_TSH, report_T4):
    # Load data from Excel
    data = pd.read_excel('datasets/TSH_T4.xlsx')

    # Preprocess the data if necessary (e.g., handling missing values).
    # Fill missing values with the mean of the respective columns.
    data['TSH_Value'].fillna(data['TSH_Value'].mean(), inplace=True)
    data['T4_Value'].fillna(data['T4_Value'].mean(), inplace=True)

    # Encode categorical labels (e.g., normal, hyperthyroidism, hypothyroidism) using LabelEncoder.
    label_encoder = LabelEncoder()
    data['category_encoded'] = label_encoder.fit_transform(data['Result'])

    # Split the data into training and testing sets.
    x = data[['TSH_Value', 'T4_Value']]
    y = data['category_encoded']
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=42)

    # Create and train the Random Forest model.
    model = RandomForestClassifier(random_state=42)
    model.fit(x_train, y_train)

    # After training the model
    model.feature_names_in_ = ['TSH_Value', 'T4_Value']

    # Calculate and print the accuracy of the model on the training data
    y_train_pred = model.predict(x_train)
    train_accuracy = accuracy_score(y_train, y_train_pred)
    print(f"Training Data Accuracy: {train_accuracy * 100:.2f}%")

    # Calculate and print the accuracy of the model on the testing data
    y_test_pred = model.predict(x_test)
    test_accuracy = accuracy_score(y_test, y_test_pred)
    print(f"Testing Data Accuracy: {test_accuracy * 100:.2f}%")

    # Check for overfitting or underfitting
    if train_accuracy > test_accuracy:
        print("The model may be overfitting the training data.")
    elif train_accuracy < test_accuracy:
        print("The model may be underfitting the training data.")
    else:
        print("The model is performing similarly on both training and testing data, which is a good sign.")

    # Take user input for TSH and T4 values
    user_input = [[user_TSH, user_T4]]

    # Make predictions for the user's input.
    predicted_category_encoded = model.predict(user_input)

    # Decode the predicted category back to the original label.
    predicted_category = label_encoder.inverse_transform(predicted_category_encoded)

    # Use the predicted category to query the MongoDB collection for additional information
    # Check if the user-input report types match the ones in MongoDB
    result = collection.find_one({"report_type01": report_TSH, "report_type02": report_T4})

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
    matching_records = collection.find({"report_type01": report_TSH, "report_type02": report_T4})

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

        # Plot the learning curve
    plot_learning_curve(model, x, y, cv=5)

    return predicted_category[0], database_info, matching_info


# This function handles when the user input T4 first and then TSH
def t4_tsh_summarize(user_T4, user_TSH, report_T4, report_TSH):
    return tsh_t4_summarize(user_TSH, user_T4, report_TSH, report_T4)
