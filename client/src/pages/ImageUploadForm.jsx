import React, { useState, useRef } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState('');
  const [captureMode, setCaptureMode] = useState(false);

  const videoRef = useRef();

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please choose an image file only!');
      event.target.value = null;
    }
  };

  const startCaptureHandler = () => {
    setCaptureMode(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          alert('Failed to access camera!');
        });
    }
  };

  const captureImageHandler = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      setSelectedFile(blob);
      setPreview(URL.createObjectURL(blob));
      setCaptureMode(false); // Exit capture mode after capturing
    }, 'image/jpeg');
  };

  const fileUploadHandler = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file or capture an image first!');
      return;
    }
    if (!category) {
      alert('Please select a category!');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('image', selectedFile);
    console.log(formData); 

    try {
      const response = await axios.post('http://localhost:3000/api/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6  mb-8 border border-gray-300 rounded-lg bg-gray-100 shadow-md md:flex">
      {/* Left side - Instructions */}
      <div className="flex-1 pr-4">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">English:</h3>
          <ul className="list-disc pl-4">
            <li>Capture the image with a white background.</li>
            <li>Ensure adequate lighting while capturing the image.</li>
            <li>Capture the entire article in the frame.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Hindi:</h3>
          <ul className="list-disc pl-4">
            <li>सफेद पृष्ठभूमि के साथ छवि को कैप्चर करें।</li>
            <li>छवि को कैप्चर करते समय उचित प्रकाश सुनिश्चित करें।</li>
            <li>फ्रेम में पूरे वस्त्रादि को कैप्चर करें।</li>
          </ul>
        </div>
      </div>
      {/* Right side - Image Capture */}
      <div className="flex-1 pl-4">
        <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
        <form onSubmit={fileUploadHandler} className="space-y-4">
          <div className="flex items-center justify-center gap-4 space-y-2">
            <label htmlFor="category" className="sr-only">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Select a category</option>
              <option value="Terracotta Ornaments & Home Décor">Terracotta Ornaments & Home Décor</option>
              <option value="Moonj Based Handicrafts">Moonj Based Handicrafts</option>
              <option value="Banana Fiber based ornaments & Home Décor">Banana Fiber based ornaments & Home Décor</option>
              <option value="Jute Bags & Allied Products">Jute Bags & Allied Products</option>
              <option value="Macrame Based Handicraft">Macrame Based Handicraft</option>
              <option value="Others">Others</option>
            </select>
            <input type="file" onChange={fileSelectedHandler} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-center justify-center">
            {!captureMode && (
              <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Upload Image
              </button>
            )}
            {captureMode && (
              <div className="relative">
                <video ref={videoRef} className="w-full rounded-lg shadow-md" autoPlay playsInline />
                <button type="button" onClick={captureImageHandler} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Capture Image
                </button>
              </div>
            )}
          </div>
          {preview && (
            <div className="text-center">
              <img src={preview} alt="Preview" className="mt-4 mx-auto rounded-lg shadow-md" style={{ maxWidth: '100%' }} />
            </div>
          )}
          {!captureMode && (
            <button type="button" onClick={startCaptureHandler} className="w-full mt-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
              Capture from Camera
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImageUploadForm;
