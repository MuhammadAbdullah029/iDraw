document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');

    let isDrawing = false;
    let isErasing = false;

    // Set canvas size
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.8;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000'; // Initial color

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;

        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        if (isErasing) {
            ctx.strokeStyle = '#949393'; // White color for erasing
        } else {
            ctx.strokeStyle = colorPicker.value; // Use selected color
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Event listeners for mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Event listeners for touch
    canvas.addEventListener('touchstart', function(e) {
        startDrawing(e.touches[0]);
    });
    canvas.addEventListener('touchmove', function(e) {
        draw(e.touches[0]);
    });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);

    document.getElementById('draw').addEventListener('click', function() {
        isErasing = false;
    });

    document.getElementById('erase').addEventListener('click', function() {
        isErasing = true;
    });

    document.getElementById('clear').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        location.reload()
    });

    document.getElementById('download').addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = dataURL;
        link.click();
    });
});
