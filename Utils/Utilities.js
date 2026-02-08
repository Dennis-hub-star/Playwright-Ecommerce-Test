class Utilities {
  constructor(filePath) {
    this.filePath = filePath;
  }
  getTestData() {
    const testData = JSON.parse(JSON.stringify(require(this.filePath)));

    return testData;
  }
}

export { Utilities };
