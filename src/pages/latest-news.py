# from flask import Flask, jsonify
# from flask_cors import CORS
# import requests

# app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend access

# API_KEY = "9f98d50b90ed46d4bb17143bd35c6bb3"  # Replace with your actual NewsAPI key

# @app.route('/latest-news', methods=['GET'])
# def get_latest_news():
#     try:
#         url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={API_KEY}"
#         response = requests.get(url)

#         # Handle API request failure
#         if response.status_code != 200:
#             print("NewsAPI Error:", response.text)
#             return jsonify({"error": "Failed to fetch latest news"}), 500

#         data = response.json()

#         if "articles" in data and data["articles"]:
#             articles = [{"title": article.get("title", "No Title"), 
#                          "source": article.get("source", {}).get("name", "Unknown")} 
#                          for article in data["articles"][:10]]
#             return jsonify({"articles": articles})

#         return jsonify({"error": "No latest news found!"}), 404

#     except Exception as e:
#         print("Error in /latest-news:", str(e))
#         return jsonify({"error": "Internal Server Error"}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)
