from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allow React to access Flask backend

API_KEY = "1d8a23400acd4e8c9a51af57e23c0f4d"  # Replace with your actual NewsAPI key

@app.route('/latest-news', methods=['GET'])
def get_latest_news():
    url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={API_KEY}"
    response = requests.get(url)
    data = response.json()

    if "articles" in data and data["articles"]:
        articles = [{"title": article["title"], "source": article["source"]["name"]} for article in data["articles"][:10]]
        return jsonify({"articles": articles})
    
    return jsonify({"error": "No latest news found!"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
