import { act } from '@testing-library/react-native';

async function wait(expectation) {
  const startTime = Date.now();

  const response = await act(async () => {
    return new Promise((resolve, reject) => {
      function runExpectation() {
        try {
          const result = expectation();
          resolve(result);
        } catch (error) {
          if (Date.now() - startTime >= 4500) {
            reject(error);
            return;
          }
          setTimeout(runExpectation, 50);
        }
      }

      setTimeout(runExpectation, 0);
    });
  });

  return response;
}

export default wait;
