
from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

def generate_response(prompt):
    """
    Generate a response by calling the Deepseek model through Ollama.
    Make sure that Ollama is installed and Deepseek is set up locally.
    """
    # Construct the command to call Deepseek via Ollama
    command = ["ollama", "run", "deepseek", "--prompt", prompt]

    try:
        # Run the command and capture the output
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        # The response is expected in stdout
        response = result.stdout.strip()
    except subprocess.CalledProcessError as e:
        response = f"Error generating response: {e}"

    return response

@app.route("/chat", methods=["POST"])
def chat():
    """
    API endpoint to receive a user message and return a chatbot response.
    """
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    response_text = generate_response(user_message)
    return jsonify({"response": response_text})

# Optionally, serve the frontend from the Flask app
@app.route("/")
def home():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(debug=True)