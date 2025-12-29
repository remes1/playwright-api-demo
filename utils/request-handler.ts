import { expect, APIRequestContext } from "@playwright/test";

/**
 * RequestHandler is a fluent wrapper around Playwright APIRequestContext
 * that simplifies building and executing HTTP requests in API tests.
 */

export class RequestHandler {

    /** Playwright API request context */
    private request: APIRequestContext;

    /** Base URL of the API (e.g. https://api.example.com) */
    private baseUrl: string = '';

    /** API endpoint path (e.g. /users/1) */
    private endpointPath: string = '';

    /** Query parameters for the request */
    private queryParams: object = {};

    /** HTTP headers for the request */
    private requestHeaders: Record<string, string> = {};

    /** HTTP request body */
    private requestBody: object = {};

    /**
     * Creates a new RequestHandler instance
     * 
     * @param request Playwright APIRequestContext instance
     * @param baseUrl Base URL of the API
     */
    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    /**
     * Sets the base URL for the request
     * 
     * @param url Base URL of the API
     * @returns RequestHandler instance for method chaining
     */
    url(url: string) {
        this.baseUrl = url;
        return this;
    }


    /**
     * Sets the endpoint path for the request
     * 
     * @param path API endpoint path
     * @returns RequestHandler instance for method chaining
     */
    path(path: string) {
        this.endpointPath = path;
        return this;
    }

    /**
     * Adds query parameters to the request
     * 
     * @param params Object containing query parameters
     * @returns RequestHandler instance for method chaining
     */
    params(params: object) {
        this.queryParams = params;
        return this;
    }

    /**
     * Sets HTTP headers for the request
     * 
     * @param headers Object containing HTTP headers 
     * @returns RequestHandler instance for method chaining
     */
    headers(headers: Record<string, string>) {
        this.requestHeaders = headers;
        return this;
    }

    /**
     * Sets the request body
     * 
     * @param body HTTP request body
     * @returns RequestHandler instance for method chaining
     */
    body(body: object) {
        this.requestBody = body;
        return this;
    }

    /**
     * Executes a GET request and validates the response status code
     * 
     * @param statusCode Expected HTTP status code 
     * @returns Parsed JSON response body
     */
    async get(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.get(url, {
            headers: this.requestHeaders,
        });
        this.cleanUpFields();
        expect(response.status()).toEqual(statusCode);
        return await response.json();
    }

    /**
     * Executes a POST request and validates the response status code
     * 
     * @param statusCode Expected HTTP status code 
     * @returns Parsed JSON response body
     */
    async post(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.post(url, {
            headers: this.requestHeaders,
            data: this.requestBody,
        });
        this.cleanUpFields();
        expect(response.status()).toEqual(statusCode);
        return await response.json();
    }

    /**
     * Executes a POST request without validating the response
     * 
     * @returns Raw API response
     */
    async postRaw() {
        const url = this.getUrl();
        const response = await this.request.post(url, {
            headers: this.requestHeaders,
            data: this.requestBody,
        });
        this.cleanUpFields();
        return response;
    }

    /**
     * Executes a GET request without validating the response
     * 
     * @returns Raw API response
     */
    async getRaw() {
        const url = this.getUrl();
        const response = await this.request.get(url, {
            headers: this.requestHeaders,
        });
        this.cleanUpFields();
        return response;
    }


    /**
     * Executes a PUT request and validates the response status code
     * 
     * @param statusCode Expected HTTP status code
     * @returns Parsed JSON response body
     */
    async put(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.put(url, {
            headers: this.requestHeaders,
            data: this.requestBody,
        });
        this.cleanUpFields();
        expect(response.status()).toEqual(statusCode);
        return await response.json();
    }

    /**
     * Executes a DELETE request and validates the response status code
     * 
     * @param statusCode Expected HTTP status code
     */
    async delete(statusCode: number) {
        const url = this.getUrl();
        const response = await this.request.delete(url, {
            headers: this.requestHeaders,
        });
        this.cleanUpFields();
        expect(response.status()).toEqual(statusCode);
    }

    /**
     * Builds the final request URL including base URL,
     * endpoint path, and query parameters
     * @returns Final request URL
     */
    private getUrl() {
        const url = new URL(`${this.baseUrl}${this.endpointPath}`);
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, String(value));
        }
        return url.toString();
    }

    /**
     * Cleans up the internal state of the RequestHandler
     */
    private cleanUpFields() {
        this.endpointPath = '';
        this.queryParams = {};
        this.requestHeaders = {};
        this.requestBody = {};
    }
}