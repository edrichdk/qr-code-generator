function generateQRCode() {
    const fileInput = document.getElementById('imageInput');
    const qrCodeDiv = document.getElementById('qrCode');

    if (fileInput.files.length === 0) {
        alert("Please select an image file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imgData = e.target.result;
        QRCode.toCanvas(imgData, function(error, canvas) {
            if (error) {
                console.error(error);
            } else {
                qrCodeDiv.innerHTML = "";
                qrCodeDiv.appendChild(canvas);
            }
        });
    };

    reader.readAsDataURL(file);
}
