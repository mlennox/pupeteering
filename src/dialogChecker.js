/**
 * Opening the dialog means there is no way to change how the assertion
 */
export const dialogChecker = (() => {
  let latch = () => { };
  return {
    updateMessage: (message) => {
      latch(message);
    },
    check: () => {
      return new Promise((resolve, reject) => {
        latch = message => {
          resolve(message);
        }
      });
    }
  };
})();