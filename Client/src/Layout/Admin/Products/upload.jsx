import React, { useState } from 'react';

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        } else {
            alert("Please select a valid image file!");
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image to upload!");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            setUploadStatus("Uploading...");
            const response = await fetch('http://localhost:8000/api/optionRouter/addnewColor', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadStatus("Upload successful!");
            } else {
                setUploadStatus(`Upload failed: ${data.message || "Unknown error."}`);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploadStatus("Upload failed.");
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Preview" style={{ width: '200px', margin: '10px 0' }} />}
            <button onClick={handleUpload}>Upload</button>
            <p>{uploadStatus}</p>
        </div>
    );
}

export default ImageUpload;
