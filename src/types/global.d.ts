interface Workbox {
  addEventListener: (type: string, callback: (event: Event) => void) => void;
  messageSkipWaiting: () => void;
  register: () => Promise<void>;
}

declare global {
  interface Window {
    workbox: Workbox;
  }
} 