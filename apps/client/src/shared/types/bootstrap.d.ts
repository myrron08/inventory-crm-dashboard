declare module 'bootstrap/js/dist/modal.js' {
  export default class Modal {
    constructor(element: Element, options?: Record<string, unknown>);
    show(): void;
    hide(): void;
    dispose(): void;
  }
}
