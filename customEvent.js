// 2. Application state changes
class Store {
  constructor() {
    this.state = {};
    this.target = new EventTarget(); // Or use document
  }

  setState(newState) {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...newState };

    this.target.dispatchEvent(
      new CustomEvent("stateChange", {
        detail: { oldState, newState: this.state },
      })
    );
  }

  subscribe(callback) {
    this.target.addEventListener("stateChange", (e) => {
      callback(e.detail.newState, e.detail.oldState);
    });
  }
}

const store = new Store();
store.subscribe((newState, oldState) => {
  console.log("State changed:", newState);
});
store.setState({ count: 1 });
store.setState({ count: 2 });
