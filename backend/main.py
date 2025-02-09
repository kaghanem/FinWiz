from flask import Flask, request, jsonify, render_template
import subprocess
import re

app = Flask(__name__, static_folder="C:/Users/salem/git/FinWiz/frontend/static", template_folder="C:/Users/salem/git/FinWiz/frontend/templates")

def generate_response(prompt):
    """
    Generate a response by calling the Deepseek model through Ollama.
    Make sure that Ollama is installed and Deepseek is set up locally.
    """
    # Construct the command to call Deepseek via Ollama
    construct = ["ollama", "create", "FinWiz", "-f", "C:/Users/salem/git/FinWiz/backend/Modelfile"]
    command = ["ollama", "run", "FinWiz", prompt]


    try:
        # Run the command and capture the output
        subprocess.run(construct)
        print(f"Running command: {' '.join(command)}")  # Debugging
        result = subprocess.run(command,shell=True, capture_output=True, text=True, check=True)
        # The response is expected in stdout
        response = result.stdout.strip()
        if not response:
            response = "No response from AI."

        print(f"AI Response: {response}")  # Debugging output

        response = re.sub(r'<think>.*?</think>', '', response, flags=re.DOTALL).strip()

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
@app.route('/')
def home():
    
    return render_template("index.html")


if __name__ == "__main__":
    
    app.run(debug=True, port=5000)
