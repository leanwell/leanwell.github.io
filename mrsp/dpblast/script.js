document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('zoom').addEventListener('input', handleZoom);
document.getElementById('download').addEventListener('click', downloadImage);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let frame = new Image();
let zoomLevel = 1;

// main framee
frame.src = 'mainframe.png';
frame.onload = () => drawImage(); 

function handleImageUpload(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = () => drawImage();
    }
    reader.readAsDataURL(event.target.files[0]);
}

function handleZoom(event) {
    zoomLevel = event.target.value;
    drawImage();
}

function drawImage() {
    canvas.width = frame.width;  
    canvas.height = frame.height; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let userImageWidth = frame.width * zoomLevel;
    let userImageHeight = (img.height / img.width) * userImageWidth;
    let xPos = (canvas.width - userImageWidth) / 2;
    let yPos = (canvas.height - userImageHeight) / 2;

    ctx.drawImage(img, xPos, yPos, userImageWidth, userImageHeight);

    ctx.drawImage(frame, 0, 0);
}

function downloadImage() {
    let link = document.createElement('a');
    link.download = 'mrsp-dpblast.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // clear ang canvas after reload (commented for future use)
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
}


document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburgerMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});
