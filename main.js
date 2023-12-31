const imageInput = document.getElementById('imageInput');
const watermarkTextElement = document.getElementById('watermarkText');
const watermarkColorElement = document.getElementById('watermarkColor');
// const watermarkPositionElement = document.getElementById('watermarkPosition');
const boldElement = document.getElementById('bold');
const italicElement = document.getElementById('italic');
const fontFamilyElement = document.getElementById('fontFamily');
const fontSizeElement = document.getElementById('fontSize');
const xPositionElement = document.getElementById('xPosition');
const yPositionElement = document.getElementById('yPosition');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const downloadButton = document.getElementById('downloadButton');

watermarkTextElement.addEventListener('input', updateWatermark);
watermarkColorElement.addEventListener('input', updateWatermark);
// watermarkPositionElement.addEventListener('change', updateWatermark);
boldElement.addEventListener('change', updateWatermark);
italicElement.addEventListener('change', updateWatermark);
fontFamilyElement.addEventListener('change', updateWatermark);
fontSizeElement.addEventListener('input', updateWatermark);
xPositionElement.addEventListener('input', updateWatermark);
yPositionElement.addEventListener('input', updateWatermark);

function updateWatermark() {
  const watermarkText = watermarkTextElement.value;
  const watermarkColor = watermarkColorElement.value;
  // const watermarkPosition = watermarkPositionElement.value;
  const isBold = boldElement.checked;
  const isItalic = italicElement.checked;
  const selectedFontFamily = fontFamilyElement.value;
  const fontSize = `${fontSizeElement.value}px`; // Explicitly add 'px'
  const xPosition = parseInt(xPositionElement.value, 10);
  const yPosition = parseInt(yPositionElement.value, 10);

  const image = new Image();

  image.onload = function () {
    // Set canvas size to match image size
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image on the canvas
    context.drawImage(image, 0, 0);

    // Add watermark text based on selected options
    context.font = `${isBold ? 'bold ' : ''}${isItalic ? 'italic ' : ''}${fontSize} ${selectedFontFamily}`;
    context.fillStyle = watermarkColor;
    context.fillText(watermarkText, xPosition, yPosition);

    downloadButton.addEventListener('click', downloadImage);
    downloadButton.disabled = false;
  };

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
  }
}

function downloadImage() {
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'watermarked_image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


var m = document.createElement('meta');
m.name = 'theme-color';
m.content = '#1f2937';
document.head.appendChild(m);