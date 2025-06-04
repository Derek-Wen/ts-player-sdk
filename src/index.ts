// src/index.ts

import { Player } from "./Player";
import { PlaybackState } from "./PlaybackState";

// 1) Grab references to our DOM elements (or null if not found)
const videoEl = document.getElementById("videoElement") as HTMLVideoElement | null;
const playBtn = document.getElementById("playBtn") as HTMLButtonElement | null;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement | null;
const seekBtn = document.getElementById("seekBtn") as HTMLButtonElement | null;
const stateSpan = document.getElementById("playbackState") as HTMLSpanElement | null;

// 2) Log them to confirm they’re not null
console.log(
  `videoEl: ${videoEl}, playBtn: ${playBtn}, pauseBtn: ${pauseBtn}, seekBtn: ${seekBtn}, stateSpan: ${stateSpan}`
);

if (!videoEl || !playBtn || !pauseBtn || !seekBtn || !stateSpan) {
  console.error("One or more DOM elements not found! Aborting player setup.");
  // Log DOM elements not found
  const missing: string[] = [];
  if (!videoEl) missing.push("videoElement");
  if (!playBtn) missing.push("playBtn");
  if (!pauseBtn)  missing.push("pauseBtn");
  if (!seekBtn) missing.push("seekBtn");
  if (!stateSpan) missing.push("playbackState");
  console.error("Missing DOM element(s):", missing.join(", "));
} else {
  // 3) Instantiate the Player
  const player = new Player({
    videoElement: videoEl,
    onStateChange: (newState: PlaybackState) => {
      console.log("Player state changed to:", newState);
      stateSpan.textContent = newState;
    },
  });

  // 4) Initial status
  console.log("Initial playback state:", player.getPlaybackState());
  stateSpan.textContent = player.getPlaybackState();

  // 5) Wire up button clicks with try/catch
  playBtn.addEventListener("click", async () => {
    console.log("Play button clicked.");
    try {
      await player.play();
      console.log("player.play() resolved successfully");
    } catch (err) {
      console.error("Error in player.play():", err);
    }
  });

  pauseBtn.addEventListener("click", () => {
    console.log("Pause button clicked.");
    try {
      player.pause();
      console.log("player.pause() called");
    } catch (err) {
      console.error("Error in player.pause():", err);
    }
  });

  seekBtn.addEventListener("click", () => {
    console.log("Seek button clicked (to 30s).");
    try {
      player.seek(30);
      console.log("player.seek(30) called");
    } catch (err) {
      console.error("Error in player.seek(30):", err);
    }
  });
}
