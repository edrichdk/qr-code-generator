function generateQRCode() {
    const fileInput = document.getElementById('imageInput');
    const qrCodeDiv = document.getElementById('qrCode');

    if (fileInput.files.length === 0) {
        alert("Please select an image file to generate a QR code.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imgData = e.target.result;
        
        // Debugging: Check the imgData to ensure it’s a valid base64 string.
        console.log('Image Data: ', imgData);

        // Clear the previous QR code if any
        qrCodeDiv.innerHTML = "";

        // Generate QR code from image base64
        QRCode.toCanvas(imgData, function(error, canvas) {
            if (error) {
                // Log the error to the console for debugging
                console.error("Error generating QR code: ", error);
                alert("Error generating QR code. Please try again.");
            } else {
                qrCodeDiv.style.display = 'block';  // Make QR code visible
                qrCodeDiv.appendChild(canvas);
            }
        });
    };

    reader.onerror = function() {
        console.error("Error reading the file");
    };

    reader.readAsDataURL(file);
}
