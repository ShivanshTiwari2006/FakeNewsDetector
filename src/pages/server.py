from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)

# Allow requests from React frontend (localhost:3001)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

# Replace with your actual API keys
NEWSAPI_KEY = "e57b7888a77c4dc8abaa2c135c5967d9"  # NewsAPI Key
FACTCHECK_KEY = "AIzaSyDDShZZsnD8r7bZy1JGSnWFoYR_APFvTlQ"  # Google Fact Check API Key

@app.route('/latest-news', methods=['GET'])
def get_latest_news():
    try:
        url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={NEWSAPI_KEY}"
        response = requests.get(url)

        if response.status_code != 200:
            print("NewsAPI Error:", response.text)  # Print API error for debugging
            return jsonify({"error": "Failed to fetch latest news"}), 500

        data = response.json()

        if "articles" in data and data["articles"]:
            articles = [{"title": article.get("title", "No Title"), 
                         "source": article.get("source", {}).get("name", "Unknown")} 
                         for article in data["articles"][:10]]
            return jsonify({"articles": articles})

        return jsonify({"error": "No latest news found!"}), 404

    except Exception as e:
        print("Error in /latest-news:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        query = data.get("text", "")

        if not query:
            return jsonify({"error": "No text provided"}), 400

        url = f"https://newsapi.org/v2/everything?q={query}&apiKey={NEWSAPI_KEY}"
        response = requests.get(url)
        data = response.json()

        if "articles" in data and data["articles"]:
            articles = [{"title": article["title"], "source": article["source"]["name"]} for article in data["articles"][:5]]
            return jsonify({"status": "verified", "articles": articles})

        return jsonify({"status": "unverified", "message": "🚨 No sources found!"})
    except Exception as e:
        print("Error processing request:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/fact-check', methods=['POST'])
def fact_check():
    try:
        data = request.json
        query = data.get("text", "")

        if not query:
            return jsonify({"error": "No text provided"}), 400

        url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={query}&key={FACTCHECK_KEY}"
        response = requests.get(url)
        data = response.json()

        if "claims" in data:
            claims = [{
                "claim": claim["text"],
                "rating": claim["claimReview"][0]["textualRating"],
                "source": claim["claimReview"][0]["publisher"]["name"]
            } for claim in data["claims"][:3]]
            
            return jsonify({"status": "fact-checked", "claims": claims})

        return jsonify({"status": "not-found", "message": "🚨 No fact-checking results found!"})
    except Exception as e:
        print("Error fetching fact-check results:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
