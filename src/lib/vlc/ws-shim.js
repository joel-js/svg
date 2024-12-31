// src/lib/vlc/ws-shim.js
export default class WebSocket extends window.WebSocket {
    constructor(url, protocols) {
      super(url, protocols);
    }
  }