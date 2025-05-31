/**
 * PlaybackState enumerates the possible states of our video player.
 */
export enum PlaybackState {
  Idle = "idle",
  Loading = "loading",
  Playing = "playing",
  Paused = "paused",
  Ended = "ended",
  Error = "error",
}
