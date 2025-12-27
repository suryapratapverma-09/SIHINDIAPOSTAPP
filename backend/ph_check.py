# import pandas as pd
# from collections import Counter
# from sklearn.preprocessing import LabelEncoder

# # Load the dataset
# file_path = r"C:\Users\HP\Desktop\SIH APP\indiapostapp\backend\user_dataset_india_with_timeslots_2.csv"
# data = pd.read_csv(file_path)
# data.columns = data.columns.str.strip()  # Remove any leading or trailing spaces in column names

# # Check if required columns exist
# required_columns = ['Contact Number', 'Time Slot', 'Delivery Successful', 'Name']
# if not all(col in data.columns for col in required_columns):
#     print("One or more required columns are missing. Please check the dataset.")
#     exit()

# # Encode the 'Time Slot' column for further analysis
# label_encoder_time = LabelEncoder()
# data['Time_Slot_Encoded'] = label_encoder_time.fit_transform(data['Time Slot'])

# # Calculate the success rate for each time slot grouped by contact number
# time_slot_success_rate = (
#     data.groupby(['Contact Number', 'Time Slot'])['Delivery Successful']
#     .mean()
#     .reset_index()
# )

# # Identify the most successful time slot for each contact number
# contact_successful_time_slot = (
#     time_slot_success_rate.loc[
#         time_slot_success_rate.groupby('Contact Number')['Delivery Successful'].idxmax()
#     ]
# )
# contact_successful_time_slot.columns = ['Contact Number', 'Most_Successful_Time_Slot', 'Success_Rate']

# # Function to get the most successful time slot based on contact number (with weighted scoring)
# def get_time_slot_with_weighted_score(contact_number, weight_frequency=0.7, weight_success_rate=0.3):
#     if contact_number not in data['Contact Number'].values:
#         return f"Contact number '{contact_number}' not found in the dataset. Please enter a valid contact number."
    
#     # Retrieve the user's name corresponding to the contact number
#     user_name = data[data['Contact Number'] == contact_number]['Name'].iloc[0]
    
#     # Retrieve all time slots for this contact number
#     user_data = data[data['Contact Number'] == contact_number]

#     # Sort the time slots by frequency (descending order)
#     time_slot_counts = Counter(user_data['Time Slot'])
#     sorted_time_slots = sorted(time_slot_counts.items(), key=lambda x: x[1], reverse=True)
    
#     # Calculate weighted score for each time slot
#     time_slot_scores = []
#     for time_slot, count in sorted_time_slots:
#         # Get the success rate for the current time slot
#         success_rate = time_slot_success_rate[
#             (time_slot_success_rate['Contact Number'] == contact_number) & 
#             (time_slot_success_rate['Time Slot'] == time_slot)
#         ]['Delivery Successful'].values[0]
        
#         # Calculate the weighted score
#         score = (count * weight_frequency) + (success_rate * 100 * weight_success_rate)  # success rate is multiplied by 100 for percentage
#         time_slot_scores.append((time_slot, score))

#     # Sort time slots by their score in descending order
#     sorted_by_score = sorted(time_slot_scores, key=lambda x: x[1], reverse=True)
    
#     # Get the most successful time slot
#     most_successful_time_slot = sorted_by_score[0][0]  # The time slot with the highest score

#     # Display time slots with their weighted scores
#     print(f"Time Slot Frequencies, Success Rates, and Weighted Scores for Contact Number ({user_name}):")
#     for time_slot, score in sorted_by_score:
#         success_rate = time_slot_success_rate[
#             (time_slot_success_rate['Contact Number'] == contact_number) & 
#             (time_slot_success_rate['Time Slot'] == time_slot)
#         ]['Delivery Successful'].values[0]
#         print(f"{time_slot}: {time_slot_counts[time_slot]} times, Success Rate: {success_rate * 100:.2f}%, Weighted Score: {score:.2f}")

#     return user_name, most_successful_time_slot

# # Input and prediction (with weighted scoring)
# contact_number = int(input("Enter the contact number to predict the user's most successful time slot: "))
# user_name, predicted_time_slot = get_time_slot_with_weighted_score(contact_number)

# print(f"Predicted most successful time slot for {user_name}: {predicted_time_slot")


from flask import Flask, request, jsonify
import pandas as pd
from collections import Counter
from sklearn.preprocessing import LabelEncoder
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and preprocess the dataset
file_path = r"C:\Users\HP\Desktop\SIH APP\indiapostapp\backend\user_dataset_india_with_timeslots_2.csv"

data = pd.read_csv(file_path)
data.columns = data.columns.str.strip()  # Remove leading/trailing spaces in column names

# Check if required columns exist
required_columns = ['Contact Number', 'Time Slot', 'Delivery Successful', 'Name']
if not all(col in data.columns for col in required_columns):
    raise Exception("One or more required columns are missing. Please check the dataset.")

# Encode the 'Time Slot' column for further analysis
label_encoder_time = LabelEncoder()
data['Time_Slot_Encoded'] = label_encoder_time.fit_transform(data['Time Slot'])

# Calculate the success rate for each time slot grouped by contact number
time_slot_success_rate = (
    data.groupby(['Contact Number', 'Time Slot'])['Delivery Successful']
    .mean()
    .reset_index()
)


@app.route('/')
def hello():
    return jsonify({"message": "Hello!"})

# Flask API endpoint
@app.route('/predict', methods=['POST'])
def predict_time_slot():
    try:
        # Parse the request payload
        request_data = request.get_json()
        contact_number = int(request_data.get("contact_number"))
        
        # Validate the input
        # if contact_number is None or not isinstance(contact_number, int):
        #     return jsonify({"error": "Please provide a valid contact number."}), 400

        print("Type of contact_number from request:", type(contact_number))
        print("Data type of 'Contact Number' column:", data['Contact Number'].dtype)

        if contact_number not in data['Contact Number'].values:
            return jsonify({"error": f"Contact number '{contact_number}' not found in the dataset."}), 404
        print("Work1")
        # Retrieve user's name
        user_name = data[data['Contact Number'] == contact_number]['Name'].iloc[0]
        
        # Retrieve all time slots for this contact number
        user_data = data[data['Contact Number'] == contact_number]
        print("Work2")

        # Sort the time slots by frequency (descending order)
        time_slot_counts = Counter(user_data['Time Slot'])
        sorted_time_slots = sorted(time_slot_counts.items(), key=lambda x: x[1], reverse=True)
        print("Work3")

        # Calculate weighted score for each time slot
        weight_frequency = 0.7
        weight_success_rate = 0.3
        time_slot_scores = []
        for time_slot, count in sorted_time_slots:
            # Get the success rate for the current time slot
            success_rate = time_slot_success_rate[
                (time_slot_success_rate['Contact Number'] == contact_number) & 
                (time_slot_success_rate['Time Slot'] == time_slot)
            ]['Delivery Successful'].values[0]
            
            # Calculate the weighted score
            score = (count * weight_frequency) + (success_rate * 100 * weight_success_rate)  # success rate is multiplied by 100 for percentage
            time_slot_scores.append((time_slot, score))

        # Sort time slots by their score in descending order
        sorted_by_score = sorted(time_slot_scores, key=lambda x: x[1], reverse=True)

        # Prepare detailed results
        detailed_scores = []
        for time_slot, score in sorted_by_score:
            success_rate = time_slot_success_rate[
                (time_slot_success_rate['Contact Number'] == contact_number) & 
                (time_slot_success_rate['Time Slot'] == time_slot)
            ]['Delivery Successful'].values[0]
            detailed_scores.append({
                "time_slot": time_slot,
                "frequency": time_slot_counts[time_slot],
                "success_rate": round(success_rate * 100, 2),
                "weighted_score": round(score, 2)
            })

        # Get the most successful time slot
        most_successful_time_slot = sorted_by_score[0][0]  # The time slot with the highest score

        # Return the result as JSON
        response = {
            "contact_number": contact_number,
            "user_name": user_name,
            "most_successful_time_slot": most_successful_time_slot,
            "detailed_scores": detailed_scores
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#extra code 
class TimeSlotSelector:
    def __init__(self, dataset_path, time_column='Time Slot', max_users_per_slot=5):
        """
        Initialize the time slot selection system with a dataset.

        :param dataset_path: Path to the dataset file
        :param time_column: Name of the column containing time slots (default 'Time Slot')
        :param max_users_per_slot: Maximum number of users per slot
        """
        self.dataset = self._load_dataset(dataset_path)

        if time_column not in self.dataset.columns:
            raise ValueError(f"Column '{time_column}' not found in the dataset. Available columns: {list(self.dataset.columns)}")

        self.dataset[time_column] = self.dataset[time_column].astype(str)

        self.time_slots = {}
        unique_slots = self.dataset[time_column].unique()
        for slot in unique_slots:
            self.time_slots[str(slot)] = []

        self.max_users_per_slot = max_users_per_slot
        self.probability_tiers = [
            (6, (70, 90)),  # 6th user: 70-90% chance
            (7, (50, 69)),  # 7th user: 50-69% chance
            (8, (30, 49)),  # 8th user: 30-49% chance
            (9, (10, 29))   # 9th user: 10-29% chance
        ]

    def _load_dataset(self, dataset_path):
        if dataset_path.endswith('.csv'):
            return pd.read_csv(dataset_path)
        elif dataset_path.endswith(('.xls', '.xlsx')):
            return pd.read_excel(dataset_path)
        elif dataset_path.endswith('.json'):
            return pd.read_json(dataset_path)
        elif dataset_path.endswith('.parquet'):
            return pd.read_parquet(dataset_path)
        else:
            raise ValueError(f"Unsupported file type: {dataset_path}")

    def select_time_slot(self, user_id, chosen_slot):
        if chosen_slot not in self.time_slots:
            return {"success": False, "message": "Invalid time slot selected."}

        current_users = len(self.time_slots[chosen_slot])

        if current_users >= 10:
            return {"success": False, "message": "Slot is completely full and cannot be selected."}
        elif current_users >= self.max_users_per_slot:
            tier_index = current_users - self.max_users_per_slot
            if tier_index < len(self.probability_tiers):
                max_users, (min_prob, max_prob) = self.probability_tiers[tier_index]
                selection_probability = random.randint(min_prob, max_prob) / 100

                # Always allow selection for users 6 through 9
                self.time_slots[chosen_slot].append(user_id)
                return {"success": True, "message": f"User {user_id} selected slot {chosen_slot} with probability {selection_probability * 100:.0f}%"}

            else:
                return {"success": False, "message": "Slot is completely full."}
        else:
            self.time_slots[chosen_slot].append(user_id)
            return {"success": True, "message": "Slot successfully selected."}

    def get_available_slots(self):
        return [slot for slot, users in self.time_slots.items() if len(users) < 9]

    def get_slot_status(self):
        return {slot: {"users": users, "count": len(users), "available": len(users) < 9} for slot, users in self.time_slots.items()}


# Initialize the selector with the dataset path
dataset_path = r"C:\Users\HP\Desktop\SIH APP\indiapostapp\backend\user_dataset_india_with_timeslots_2.csv"
selector = TimeSlotSelector(dataset_path)

@app.route('/get_available_slots', methods=['GET'])
def get_available_slots():
    available_slots = selector.get_available_slots()
    return jsonify({"available_slots": available_slots})

@app.route('/select_time_slot', methods=['POST'])
def select_time_slot():
    data = request.get_json()
    user_id = data.get('user_id')
    chosen_slot = data.get('chosen_slot')

    if not user_id or not chosen_slot:
        return jsonify({"error": "Please provide both 'user_id' and 'chosen_slot'."}), 400

    result = selector.select_time_slot(user_id, chosen_slot)
    return jsonify(result)

@app.route('/get_slot_status', methods=['GET'])
def get_slot_status():
    status = selector.get_slot_status()
    return jsonify(status)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)