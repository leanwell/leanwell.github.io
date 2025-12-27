# Community Fireworks 2026 (Gesture Controlled)

A 3D interactive web experience powered by Three.js and MediaPipe Hands. Users can control a 3D fireworks display and explore community photos using hand gestures via their webcam.

## Available Hand Gestures

Control the experience using your hand in front of the camera:

* **OPEN PALM:** Explode the fireworks (reveals images and names).
* **CLOSED FIST:** Reset the scene to the initial magic box state.
* **PEACE SIGN (2 Fingers):** Zoom In (Incremental).
* **ONE FINGER (Index):** Zoom Out (Incremental).
* **THREE FINGERS UP:** Tilt Scene Up.
* **FOUR FINGERS UP:** Tilt Scene Down.
* **THUMB UP:** Start Auto-Tour Mode (Camera automatically visits each image).
* **HAND ROTATION (Left/Right):** Rotate the scene horizontally (Joystick control).

## System Requirements

To run or host this project, ensure you meet the following requirements:

### For Users (Client-Side)
* **Browser:** Modern web browser with WebGL and Camera support (Chrome, Edge, Firefox, Safari).
* **Hardware:** * Webcam (Required for gesture control).
    * GPU capable of rendering WebGL content (Integrated graphics are usually sufficient).
* **Permissions:** Must allow camera access when prompted.

### For Developers (Hosting/editing)
* **Web Server:** Any static file server (VS Code Live Server, Python SimpleHTTPServer, Vercel, Netlify).
* **Internet Connection:** Required to load CDNs for Three.js, MediaPipe, and TensorFlow models.
* **Supabase Project:**
    * A valid Supabase URL and Anon Key.
    * A `profiles` table with `name` (text) and `image_url` (text) columns.
    * Storage bucket configuration if handling uploads (optional for this view-only file).

## Installation

1.  Download the `index.html` file.
2.  Open the file in a code editor or simply double-click to open in a browser (Note: Camera access often requires `https://` or `localhost`. Opening via `file://` might block the camera).
3.  Ensure your Supabase credentials in the script are valid.

## Usage

1.  Allow camera access when the page loads.
2.  Wait for the "Initializing AI..." loader to finish.
3.  Show an **OPEN PALM** to start the show.
4.  Use gestures to navigate or show a **THUMB UP** to sit back and watch the auto-tour.
