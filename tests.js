import fetch from "node-fetch";

const url =
  "https://api.dev.bancobari.com.br/partners/v2/proposal?pageNumber=0&pageSize=10";

const bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTUFTVEVSIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiY29udGFiaWxpZGFkZUBiYXJpZ3VpcHJvbW90b3JhLmNvbS5iciIsIlVzZXJJZCI6IjEiLCJleHAiOjE2Mjg4OTk4NzcsImlzcyI6Ik5vdmkiLCJhdWQiOiJOb3ZpIn0.jHPFPCDS3OOGuY7RDXet1oCZWd8PwEWW2qUo79-IPmg";

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
