class Utilities {
  constructor(filePath) {
    this.filePath = filePath;
  }
  getTestData() {
    // Explained in detail, this line does the following:
    // 1. `require(this.filePath)` loads the JSON file specified by `this.filePath` and returns its contents as a JavaScript object.
    // 2. `JSON.stringify(...)` converts the JavaScript object into a JSON string. This is necessary to create a deep copy of the data.
    // 3. `JSON.parse(...)` takes the JSON string and parses it back into a new JavaScript object. This ensures that we have a completely
    //  separate copy of the data, preventing any unintended side effects from modifying the original object.
    const testData = JSON.parse(JSON.stringify(require(this.filePath)));

    return testData;
  }
}

export { Utilities };
