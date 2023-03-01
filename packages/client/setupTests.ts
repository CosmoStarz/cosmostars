// Mocking 'fetch' is necessary so that rtk does not swear at the lack of fetch function
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
