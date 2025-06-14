interface Workbox {
  addEventListener: (type: string, callback: (event: any) => void) => void;
  messageSkipWaiting: () => void;
  register: () => Promise<void>;
}

declare global {
  interface Window {
    workbox: Workbox;
  }
} 