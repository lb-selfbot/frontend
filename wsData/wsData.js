class WebsocketData {
  constructor(data) {
    this.onChangeListeners = [];

    this.selfbotConnected = false;
    this.console =
      '<span style="color:rgb(193, 239, 255);">Waiting for connection...</span>';
    this.config = {};
  }

  setSelfbotConnected(value) {
    this.selfbotConnected = value;
    this.onChange();
  }

  setConsole(value) {
    this.console = value || "";
    this.onChange();
  }

  appendConsole(value) {
    this.console += `${value}`;
    this.onChange();
  }

  setConfig(value) {
    this.config = value;
    this.onChange();
  }

  onChange() {
    this.onChangeListeners.forEach((listener) => {
      setTimeout(listener, 0);
    });
  }

  addChangeListener(listener) {
    this.onChangeListeners.push(listener);
  }

  removeChangeListener(listener) {
    this.onChangeListeners = this.onChangeListeners.filter(
      (l) => l !== listener
    );
  }
}

const wsData = new WebsocketData();

export { wsData };
