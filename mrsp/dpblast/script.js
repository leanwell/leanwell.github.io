document.addEventListener('DOMContentLoaded', function () {
    // Event listeners for existing features
    document.getElementById('upload').addEventListener('change', handleImageUpload);
    document.getElementById('zoom').addEventListener('input', handleZoom);
    document.getElementById('download').addEventListener('click', downloadImage);
    
    // Event listeners for the new text input and copy-to-clipboard feature
    document.getElementById('generate').addEventListener('click', generateParagraph);
    document.getElementById('copy').addEventListener('click', copyToClipboard);

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let img = new Image();
    let frame = new Image();
    let zoomLevel = 1;

    // Load the main frame
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
    }

    function generateParagraph() {
        const name = document.getElementById('name').value;
        const year = document.getElementById('year').value;
        const course = document.getElementById('course').value;
        const section = document.getElementById('section').value;

        const paragraph = `Excited to announce that I've officially joined the YES-O Club for 2024! My name is ${name}, currently a ${year} year student in the ${course} program, Section ${section}, at the Technological University of the Philippines - Taguig. Looking forward to an incredible year of learning, growth, and making a positive impact on our environment with this amazing community. Let's make 2024 a year to remember!`;

        document.getElementById('output-paragraph').value = paragraph;
    }

    function copyToClipboard() {
        const paragraph = document.getElementById('output-paragraph');
        paragraph.select();
        paragraph.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
    }
});
