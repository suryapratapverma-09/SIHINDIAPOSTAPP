from flask import Flask, request, jsonify
import pandas as pd
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify({"message": "Hello!"})

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
