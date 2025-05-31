// src/Player.ts

import { PlaybackState } from "./PlaybackState";

export interface PlayerOptions {
  /**
   * The HTMLVideoElement that this Player controls.
   */
  videoElement: HTMLVideoElement;

  /**
   * Optional callback invoked whenever the playback state changes.
   * Use this to update a UI element (e.g., “Status” span).
   */
  onStateChange?: (state: PlaybackState) => void;
}

export class Player {
  private video: HTMLVideoElement;
  private state: PlaybackState = PlaybackState.Idle;
  private onStateChangeCallback?: (state: PlaybackState) => void;

  constructor(options: PlayerOptions) {
    this.video = options.videoElement;
    this.onStateChangeCallback = options.onStateChange;

    // When native events fire, update our state accordingly:
    this.video.addEventListener("playing", () => {
      this.updateState(PlaybackState.Playing);
    });

    this.video.addEventListener("pause", () => {
      this.updateState(PlaybackState.Paused);
    });

    this.video.addEventListener("ended", () => {
      this.updateState(PlaybackState.Ended);
    });

    this.video.addEventListener("waiting", () => {
      // Fired when the video is buffering/loading
      this.updateState(PlaybackState.Loading);
    });

    this.video.addEventListener("error", () => {
      this.updateState(PlaybackState.Error);
    });
  }

  /** Internal helper to change state and invoke the callback if provided */
  private updateState(newState: PlaybackState) {
    if (this.state !== newState) {
      this.state = newState;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(this.state);
      }
    }
  }

  /**
   * Play the video. Returns a Promise that resolves when playback
   * actually starts, or rejects on error.
   */
  public async play(): Promise<void> {
    try {
      // Before calling play(), set state to Loading
      this.updateState(PlaybackState.Loading);

      // Wait for the browser to start playback
      await this.video.play();
      // Once playing, the “playing” event listener sets state to Playing.
    } catch (err) {
      console.error("Error attempting to play:", err);
      this.updateState(PlaybackState.Error);
    }
  }

  /**
   * Pause the video. When the native 'pause' event fires,
   * updateState(PlaybackState.Paused) runs automatically.
   */
  public pause(): void {
    this.video.pause();
    // The 'pause' event listener will set state to Paused.
  }

  /**
   * Seeks the video to a specific time (in seconds).
   * Native events (e.g. 'timeupdate', 'playing') will follow.
   */
  public seek(timeSec: number): void {
    this.video.currentTime = timeSec;
  }

  /**
   * Returns the current playback state.
   */
  public getPlaybackState(): PlaybackState {
    return this.state;
  }
}
