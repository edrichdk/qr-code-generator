<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Image to QR Code Generator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      text-align: center;
      background-color: #f4f4f4;
    }
    h1 {
      color: #333;
    }
    #qrCode {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>🖼️ Image to QR Code Generator 🔳</h1>
  <input type="file" id="imageInput" accept="image/*"><br><br>
  <button onclick="generateQRCode()">Generate QR Code</button>

  <div id="qrCode" style="display: none;"></div>

  <!-- QRCode library from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.0/build/qrcode.min.js"></script>
  <script>
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

        // Clear the previous QR code
        qrCodeDiv.innerHTML = "";

        // Generate QR code from image base64
        QRCode.toCanvas(imgData, function(error, canvas) {
          if (error) {
            alert("Error generating QR code. Please try again.");
            console.error(error);
          } else {
            qrCodeDiv.style.display = 'block';
            qrCodeDiv.appendChild(canvas);
          }
        });
      };

      reader.readAsDataURL(file);
    }
  </script>
</body>
</html>
