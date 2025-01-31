from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import pickle

app = Flask(__name__)
CORS(app)

# Initialize questions data (this can be replaced with database logic or a persistent storage system)
questions = {
    1: {
        "question": "Which state won the best tableau award at the 76th Republic Day 2025?",
        "answer": "Uttar Pradesh"
    },
    2: {
        "question": "Which state has become the first North Eastern state to sign a Memorandum of Understanding with Bhasini?",
        "answer": "Tripura"
    },
    3: {
        "question": "Which institution has been awarded the 'Best Marching Contingent' among services during the 76th Republic Day celebrations?",
        "answer": "Jammu & Kashmir Rifles"
    },
    # Add more questions as needed
}

# To save and load questions
def save_data():
    with open('questions.pkl', 'wb') as f:
        pickle.dump(questions, f)

def load_data():
    global questions
    try:
        with open('questions.pkl', 'rb') as f:
            questions = pickle.load(f)
    except FileNotFoundError:
        save_data()

@app.route('/get-questions', methods=['GET'])
def get_questions():
    load_data()  # Make sure the questions are loaded before returning them
    question_list = [{"id": k, "question": v["question"]} for k, v in questions.items()]
    return jsonify(question_list)

@app.route('/check-answer', methods=['POST'])
def check_answer():
    data = request.get_json()
    question_id = data['question_id']
    user_answer = data['answer']

    if questions.get(question_id, {}).get('answer').lower() == user_answer.lower():
        return jsonify({"correct": True})
    else:
        return jsonify({"correct": False})

@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.get_json()
    username = data['username']
    score = data['score']

    # Save or update user score in your database or file
    with open('scores.pkl', 'ab') as f:
        pickle.dump({username: score}, f)

    return jsonify({"message": "Score submitted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
