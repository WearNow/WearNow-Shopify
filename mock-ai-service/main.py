from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import time
import os
from PIL import Image

app = Flask(__name__)
CORS(app)

GENERATION_DELAY = (5)
TRAINING_DELAY = (5*60)

# Ensure the directory exists
os.makedirs('static/generated_images', exist_ok=True)

# Simple transformation for generated images


@app.route('/')
def index():
    return "AI Service is running"


# @app.route('/upload', methods=['POST'])
# def upload():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part"}), 400
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file:
#         filename = os.path.join('static/generated_images', file.filename)
#         file.save(filename)
#         return jsonify({"message": "File uploaded successfully", "filename": file.filename}), 200


@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.json
    # For simplicity, we'll just create a blank image here
    # generated_image = Image.new('RGB', (128, 128), color = 'red')
    # image_path = os.path.join('static/generated_images', 'generated_image.png')
    # generated_image.save(image_path)
    time.sleep(data["delay"])
    return jsonify({"message": "Image generated", "image_path": "//sample-path", "input": data}), 200


@app.route('/train_model', methods=['POST'])
def train_model():
    data = request.json
    # Placeholder for model training logic
    # Normally, you would process 'data' and train your model here
    time.sleep(data["delay"])
    return jsonify({"message": "Model trained successfully", "input": data}), 200


# @app.route('/static/generated_images/<filename>')
# def get_image(filename):
#     return send_from_directory('static/generated_images', filename)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
