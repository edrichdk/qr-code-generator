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
        
        // Clear the previous QR code if any
        qrCodeDiv.innerHTML = "";

        // Generate a new QR Code
        QRCode.toCanvas(imgData, function(error, canvas) {
            if (error) {
                alert("Error generating QR code. Please try again.");
            } else {
                qrCodeDiv.style.display = 'block';  // Make QR code visible
                qrCodeDiv.appendChild(canvas);
            }
        });
    };

    reader.readAsDataURL(file);
}
