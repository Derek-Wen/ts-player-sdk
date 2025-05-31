// Grab references to our DOM elements
const videoEl = document.getElementById("videoElement") as HTMLVideoElement | null;
const playBtn = document.getElementById("playBtn") as HTMLButtonElement | null;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement | null;
const seekBtn = document.getElementById("seekBtn") as HTMLButtonElement | null;
const stateSpan = document.getElementById("playbackState") as HTMLSpanElement | null;

// Log them to confirm they’re not null
console.log("videoEl:", videoEl);
console.log("playBtn:", playBtn);
console.log("pauseBtn:", pauseBtn);
console.log("seekBtn:", seekBtn);
console.log("stateSpan:", stateSpan);

// If everything exists, update the status to “ready”
if (videoEl && playBtn && pauseBtn && seekBtn && stateSpan) {
  stateSpan.textContent = "ready";
} else {
  console.error("One or more DOM elements not found!");
}
