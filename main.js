document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    let qrcode = null;
    let uploadedImage = null;

    generateBtn.addEventListener('click', generateQR);
    downloadBtn.addEventListener('click', downloadQR);

    function generateQR() {
        const text = document.getElementById('qr-text').value.trim();
        const imageInput = document.getElementById('image-input');
        
        if (!text) {
            alert('Please enter text or URL');
            return;
        }

        document.getElementById('qrcode').innerHTML = '';
        
        qrcode = new QRCode(document.getElementById('qrcode'), {
            text: text,
            width: 256,
            height: 256,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage = new Image();
                uploadedImage.src = e.target.result;
                uploadedImage.onload = function() {
                    addImageToQR();
                };
            };
            reader.readAsDataURL(imageInput.files[0]);
        }

        downloadBtn.style.display = 'inline-block';
    }

    function addImageToQR() {
        const canvas = document.querySelector('#qrcode canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const imgSize = Math.min(canvas.width, canvas.height) * 0.3;
        const x = (canvas.width - imgSize) / 2;
        const y = (canvas.height - imgSize) / 2;
        
        ctx.drawImage(uploadedImage, x, y, imgSize, imgSize);
    }

    function downloadQR() {
        const canvas = document.querySelector('#qrcode canvas');
        if (!canvas) {
            alert('Please generate a QR code first');
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'custom-qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
});
