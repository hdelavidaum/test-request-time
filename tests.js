import denv from "dotenv";
import fetch from "node-fetch";

const dotenv = denv.config();

const url =
  "https://api.dev.bancobari.com.br/partners/v2/proposal?pageNumber=0&pageSize=10";

const bearerToken = `Bearer ${process.env.BEARER_TOKEN}`;

class RequestAnalytics {
  constructor(beforeRequest, afterRequest) {
    this.beforeRequest = beforeRequest;
    this.afterRequest = afterRequest;
    this.timeBetweenInSec = 0;
  }

  getDifference() {
    this.timeBetweenInSec = (this.afterRequest - this.beforeRequest) / 1000;
  }
}

const fetchResults = [];

const makeRequests = async (index) => {
  const beforeRequest = Date.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => {
        console.log(`request #${index} | status: ${response.status}`);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }

  const afterRequest = Date.now();
  fetchResults.push(new RequestAnalytics(beforeRequest, afterRequest));
};

for (let i = 0; i < 50; i++) {
  await makeRequests(i + 1);
  let actualResult = fetchResults[i];
  actualResult.getDifference();
  fetchResults[i] = actualResult;
}

console.table(fetchResults);
