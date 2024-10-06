from flask import Flask, request, jsonify, render_template
from PIL import Image
import re
import numpy as np
from paddleocr import PaddleOCR
import io
from flask_cors import CORS 
#from flask_cors import COR

app = Flask(__name__)
CORS(app) 
#CORS(app)
# Define the OCR function
def ocr_with_paddle(img):
    ocr = PaddleOCR(lang='en', use_angle_cls=True)
    result = ocr.ocr(np.array(img))  # Ensure the image is in NumPy array format for PaddleOCR
    
    # Check if result contains valid data
    if not result or not result[0]:
        return None

    # Extract text from the OCR result
    detected_texts = [result[0][i][1][0] for i in range(len(result[0]))]

    # Patterns
    plate_pattern = r'[A-Z]{1,4}[-.\s]{0,2}\d{2,4}'  
    model_number_pattern = r'([A-Z]{1,4})([-.\s]{1})(\d{2,4})'  
    model_exclusion_pattern = r'[A-Z]{1,2}\d{4,6}[A-Z]{1,2}'  
    number_pattern = r'\d{4}'  
    phone_number_pattern = r'(\+?\d{1,4})?[-.\s]?\(?\d{3,4}\)?[-.\s]?\d{6,7}'  

    plate_text = None
    remaining_part = None  
    number_text = None

    for text in detected_texts:
        if re.match(phone_number_pattern, text):
            continue  
        
        if re.match(model_exclusion_pattern, text):
            continue
        
        model_match = re.match(model_number_pattern, text)
        if model_match:
            alphabetic_part = model_match.group(1)  
            remaining_part = model_match.group(3)  
            plate_text = alphabetic_part  
        
        elif re.match(plate_pattern, text):
            plate_text = text
        
        elif re.match(number_pattern, text):
            number_text = text

    if plate_text and number_text:
        plate_text = re.sub(r'\d+$', '', plate_text)  
        result = f"{plate_text} {number_text}"
    elif plate_text and remaining_part:
        result = f"{plate_text}-{remaining_part}"  
    elif plate_text:
        result = plate_text
    elif remaining_part:
        result = remaining_part
    else:
        result = None
    
    if result:
        result = re.sub(r'[^A-Za-z0-9]', '', result)

    return result

# Route for rendering the front-end
@app.route('/')
def index():
    return render_template('index.html')

# Define a route for uploading an image and processing it
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        # Open the image using PIL
        img = Image.open(io.BytesIO(file.read()))
        
        # Run the OCR function
        result_text = ocr_with_paddle(img)
        
        # If no result, return error message
        if not result_text:
            return jsonify({"message": "Sorry, could not read the license plate"}), 200
        
        # Return the result as JSON
        return jsonify({"license_plate": result_text}), 200

    except Exception as e:
        print(e)  # Log the error for debugging purposes
        return jsonify({"error": "An error occurred while processing the image"}), 500

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)