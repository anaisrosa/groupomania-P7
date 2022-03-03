export default {
  name: "groupmaniaStorage",
  get() {
    const output = window.localStorage.getItem(this.name);
    if (output) {
      return JSON.parse(output);
    } else {
      return {};
    }
  },
  set(data) {
    window.localStorage.setItem(this.name, JSON.stringify(data));
  },
  clear(){
    window.localStorage.removeItem(this.name)
  }

};
