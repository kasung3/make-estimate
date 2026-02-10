"use strict";
exports.id = "vendor-chunks/stripe";
exports.ids = ["vendor-chunks/stripe"];
exports.modules = {

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Error.js":
/*!********************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Error.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StripeAPIError: () => (/* binding */ StripeAPIError),
/* harmony export */   StripeAuthenticationError: () => (/* binding */ StripeAuthenticationError),
/* harmony export */   StripeCardError: () => (/* binding */ StripeCardError),
/* harmony export */   StripeConnectionError: () => (/* binding */ StripeConnectionError),
/* harmony export */   StripeError: () => (/* binding */ StripeError),
/* harmony export */   StripeIdempotencyError: () => (/* binding */ StripeIdempotencyError),
/* harmony export */   StripeInvalidGrantError: () => (/* binding */ StripeInvalidGrantError),
/* harmony export */   StripeInvalidRequestError: () => (/* binding */ StripeInvalidRequestError),
/* harmony export */   StripePermissionError: () => (/* binding */ StripePermissionError),
/* harmony export */   StripeRateLimitError: () => (/* binding */ StripeRateLimitError),
/* harmony export */   StripeSignatureVerificationError: () => (/* binding */ StripeSignatureVerificationError),
/* harmony export */   StripeUnknownError: () => (/* binding */ StripeUnknownError),
/* harmony export */   TemporarySessionExpiredError: () => (/* binding */ TemporarySessionExpiredError),
/* harmony export */   generateV1Error: () => (/* binding */ generateV1Error),
/* harmony export */   generateV2Error: () => (/* binding */ generateV2Error)
/* harmony export */ });
/* eslint-disable camelcase */
/* eslint-disable no-warning-comments */
const generateV1Error = (rawStripeError) => {
    switch (rawStripeError.type) {
        case 'card_error':
            return new StripeCardError(rawStripeError);
        case 'invalid_request_error':
            return new StripeInvalidRequestError(rawStripeError);
        case 'api_error':
            return new StripeAPIError(rawStripeError);
        case 'authentication_error':
            return new StripeAuthenticationError(rawStripeError);
        case 'rate_limit_error':
            return new StripeRateLimitError(rawStripeError);
        case 'idempotency_error':
            return new StripeIdempotencyError(rawStripeError);
        case 'invalid_grant':
            return new StripeInvalidGrantError(rawStripeError);
        default:
            return new StripeUnknownError(rawStripeError);
    }
};
// eslint-disable-next-line complexity
const generateV2Error = (rawStripeError) => {
    switch (rawStripeError.type) {
        // switchCases: The beginning of the section generated from our OpenAPI spec
        case 'temporary_session_expired':
            return new TemporarySessionExpiredError(rawStripeError);
        // switchCases: The end of the section generated from our OpenAPI spec
    }
    // Special handling for requests with missing required fields in V2 APIs.
    // invalid_field response in V2 APIs returns the field 'code' instead of 'type'.
    switch (rawStripeError.code) {
        case 'invalid_fields':
            return new StripeInvalidRequestError(rawStripeError);
    }
    return generateV1Error(rawStripeError);
};
/**
 * StripeError is the base error from which all other more specific Stripe errors derive.
 * Specifically for errors returned from Stripe's REST API.
 */
class StripeError extends Error {
    constructor(raw = {}, type = null) {
        var _a;
        super(raw.message);
        this.type = type || this.constructor.name;
        this.raw = raw;
        this.rawType = raw.type;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.detail = raw.detail;
        this.headers = raw.headers;
        this.requestId = raw.requestId;
        this.statusCode = raw.statusCode;
        this.message = (_a = raw.message) !== null && _a !== void 0 ? _a : '';
        this.userMessage = raw.user_message;
        this.charge = raw.charge;
        this.decline_code = raw.decline_code;
        this.payment_intent = raw.payment_intent;
        this.payment_method = raw.payment_method;
        this.payment_method_type = raw.payment_method_type;
        this.setup_intent = raw.setup_intent;
        this.source = raw.source;
    }
}
/**
 * Helper factory which takes raw stripe errors and outputs wrapping instances
 */
StripeError.generate = generateV1Error;
// Specific Stripe Error types:
/**
 * CardError is raised when a user enters a card that can't be charged for
 * some reason.
 */
class StripeCardError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeCardError');
    }
}
/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */
class StripeInvalidRequestError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeInvalidRequestError');
    }
}
/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */
class StripeAPIError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeAPIError');
    }
}
/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Stripe's servers.
 */
class StripeAuthenticationError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeAuthenticationError');
    }
}
/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */
class StripePermissionError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripePermissionError');
    }
}
/**
 * RateLimitError is raised in cases where an account is putting too much load
 * on Stripe's API servers (usually by performing too many requests). Please
 * back off on request rate.
 */
class StripeRateLimitError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeRateLimitError');
    }
}
/**
 * StripeConnectionError is raised in the event that the SDK can't connect to
 * Stripe's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */
class StripeConnectionError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeConnectionError');
    }
}
/**
 * SignatureVerificationError is raised when the signature verification for a
 * webhook fails
 */
class StripeSignatureVerificationError extends StripeError {
    constructor(header, payload, raw = {}) {
        super(raw, 'StripeSignatureVerificationError');
        this.header = header;
        this.payload = payload;
    }
}
/**
 * IdempotencyError is raised in cases where an idempotency key was used
 * improperly.
 */
class StripeIdempotencyError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeIdempotencyError');
    }
}
/**
 * InvalidGrantError is raised when a specified code doesn't exist, is
 * expired, has been used, or doesn't belong to you; a refresh token doesn't
 * exist, or doesn't belong to you; or if an API key's mode (live or test)
 * doesn't match the mode of a code or refresh token.
 */
class StripeInvalidGrantError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeInvalidGrantError');
    }
}
/**
 * Any other error from Stripe not specifically captured above
 */
class StripeUnknownError extends StripeError {
    constructor(raw = {}) {
        super(raw, 'StripeUnknownError');
    }
}
// classDefinitions: The beginning of the section generated from our OpenAPI spec
class TemporarySessionExpiredError extends StripeError {
    constructor(rawStripeError = {}) {
        super(rawStripeError, 'TemporarySessionExpiredError');
    }
}
// classDefinitions: The end of the section generated from our OpenAPI spec


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/RequestSender.js":
/*!****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/RequestSender.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestSender: () => (/* binding */ RequestSender)
/* harmony export */ });
/* harmony import */ var _Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Error.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Error.js");
/* harmony import */ var _net_HttpClient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./net/HttpClient.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/HttpClient.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");



const MAX_RETRY_AFTER_WAIT = 60;
class RequestSender {
    constructor(stripe, maxBufferedRequestMetric) {
        this._stripe = stripe;
        this._maxBufferedRequestMetric = maxBufferedRequestMetric;
    }
    _normalizeStripeContext(optsContext, clientContext) {
        if (optsContext) {
            return optsContext.toString() || null; // return null for empty strings
        }
        return (clientContext === null || clientContext === void 0 ? void 0 : clientContext.toString()) || null; // return null for empty strings
    }
    _addHeadersDirectlyToObject(obj, headers) {
        // For convenience, make some headers easily accessible on
        // lastResponse.
        // NOTE: Stripe responds with lowercase header names/keys.
        obj.requestId = headers['request-id'];
        obj.stripeAccount = obj.stripeAccount || headers['stripe-account'];
        obj.apiVersion = obj.apiVersion || headers['stripe-version'];
        obj.idempotencyKey = obj.idempotencyKey || headers['idempotency-key'];
    }
    _makeResponseEvent(requestEvent, statusCode, headers) {
        const requestEndTime = Date.now();
        const requestDurationMs = requestEndTime - requestEvent.request_start_time;
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.removeNullish)({
            api_version: headers['stripe-version'],
            account: headers['stripe-account'],
            idempotency_key: headers['idempotency-key'],
            method: requestEvent.method,
            path: requestEvent.path,
            status: statusCode,
            request_id: this._getRequestId(headers),
            elapsed: requestDurationMs,
            request_start_time: requestEvent.request_start_time,
            request_end_time: requestEndTime,
        });
    }
    _getRequestId(headers) {
        return headers['request-id'];
    }
    /**
     * Used by methods with spec.streaming === true. For these methods, we do not
     * buffer successful responses into memory or do parse them into stripe
     * objects, we delegate that all of that to the user and pass back the raw
     * http.Response object to the callback.
     *
     * (Unsuccessful responses shouldn't make it here, they should
     * still be buffered/parsed and handled by _jsonResponseHandler -- see
     * makeRequest)
     */
    _streamingResponseHandler(requestEvent, usage, callback) {
        return (res) => {
            const headers = res.getHeaders();
            const streamCompleteCallback = () => {
                const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
                this._stripe._emitter.emit('response', responseEvent);
                this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed, usage);
            };
            const stream = res.toStream(streamCompleteCallback);
            // This is here for backwards compatibility, as the stream is a raw
            // HTTP response in Node and the legacy behavior was to mutate this
            // response.
            this._addHeadersDirectlyToObject(stream, headers);
            return callback(null, stream);
        };
    }
    /**
     * Default handler for Stripe responses. Buffers the response into memory,
     * parses the JSON and returns it (i.e. passes it to the callback) if there
     * is no "error" field. Otherwise constructs/passes an appropriate Error.
     */
    _jsonResponseHandler(requestEvent, apiMode, usage, callback) {
        return (res) => {
            const headers = res.getHeaders();
            const requestId = this._getRequestId(headers);
            const statusCode = res.getStatusCode();
            const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
            this._stripe._emitter.emit('response', responseEvent);
            res
                .toJSON()
                .then((jsonResponse) => {
                if (jsonResponse.error) {
                    let err;
                    // Convert OAuth error responses into a standard format
                    // so that the rest of the error logic can be shared
                    if (typeof jsonResponse.error === 'string') {
                        jsonResponse.error = {
                            type: jsonResponse.error,
                            message: jsonResponse.error_description,
                        };
                    }
                    jsonResponse.error.headers = headers;
                    jsonResponse.error.statusCode = statusCode;
                    jsonResponse.error.requestId = requestId;
                    if (statusCode === 401) {
                        err = new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeAuthenticationError(jsonResponse.error);
                    }
                    else if (statusCode === 403) {
                        err = new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripePermissionError(jsonResponse.error);
                    }
                    else if (statusCode === 429) {
                        err = new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeRateLimitError(jsonResponse.error);
                    }
                    else if (apiMode === 'v2') {
                        err = (0,_Error_js__WEBPACK_IMPORTED_MODULE_0__.generateV2Error)(jsonResponse.error);
                    }
                    else {
                        err = (0,_Error_js__WEBPACK_IMPORTED_MODULE_0__.generateV1Error)(jsonResponse.error);
                    }
                    throw err;
                }
                return jsonResponse;
            }, (e) => {
                throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeAPIError({
                    message: 'Invalid JSON received from the Stripe API',
                    exception: e,
                    requestId: headers['request-id'],
                });
            })
                .then((jsonResponse) => {
                this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
                // Expose raw response object.
                const rawResponse = res.getRawResponse();
                this._addHeadersDirectlyToObject(rawResponse, headers);
                Object.defineProperty(jsonResponse, 'lastResponse', {
                    enumerable: false,
                    writable: false,
                    value: rawResponse,
                });
                callback(null, jsonResponse);
            }, (e) => callback(e, null));
        };
    }
    static _generateConnectionErrorMessage(requestRetries) {
        return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ''}`;
    }
    // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
    static _shouldRetry(res, numRetries, maxRetries, error) {
        if (error &&
            numRetries === 0 &&
            _net_HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) {
            return true;
        }
        // Do not retry if we are out of retries.
        if (numRetries >= maxRetries) {
            return false;
        }
        // Retry on connection error.
        if (!res) {
            return true;
        }
        // The API may ask us not to retry (e.g., if doing so would be a no-op)
        // or advise us to retry (e.g., in cases of lock timeouts); we defer to that.
        if (res.getHeaders()['stripe-should-retry'] === 'false') {
            return false;
        }
        if (res.getHeaders()['stripe-should-retry'] === 'true') {
            return true;
        }
        // Retry on conflict errors.
        if (res.getStatusCode() === 409) {
            return true;
        }
        // Retry on 500, 503, and other internal errors.
        //
        // Note that we expect the stripe-should-retry header to be false
        // in most cases when a 500 is returned, since our idempotency framework
        // would typically replay it anyway.
        if (res.getStatusCode() >= 500) {
            return true;
        }
        return false;
    }
    _getSleepTimeInMS(numRetries, retryAfter = null) {
        const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
        const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
        // Apply exponential backoff with initialNetworkRetryDelay on the
        // number of numRetries so far as inputs. Do not allow the number to exceed
        // maxNetworkRetryDelay.
        let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(2, numRetries - 1), maxNetworkRetryDelay);
        // Apply some jitter by randomizing the value in the range of
        // (sleepSeconds / 2) to (sleepSeconds).
        sleepSeconds *= 0.5 * (1 + Math.random());
        // But never sleep less than the base sleep seconds.
        sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
        // And never sleep less than the time the API asks us to wait, assuming it's a reasonable ask.
        if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
            sleepSeconds = Math.max(sleepSeconds, retryAfter);
        }
        return sleepSeconds * 1000;
    }
    // Max retries can be set on a per request basis. Favor those over the global setting
    _getMaxNetworkRetries(settings = {}) {
        return settings.maxNetworkRetries !== undefined &&
            Number.isInteger(settings.maxNetworkRetries)
            ? settings.maxNetworkRetries
            : this._stripe.getMaxNetworkRetries();
    }
    _defaultIdempotencyKey(method, settings, apiMode) {
        // If this is a POST and we allow multiple retries, ensure an idempotency key.
        const maxRetries = this._getMaxNetworkRetries(settings);
        const genKey = () => `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
        // more verbose than it needs to be, but gives clear separation between V1 and V2 behavior
        if (apiMode === 'v2') {
            if (method === 'POST' || method === 'DELETE') {
                return genKey();
            }
        }
        else if (apiMode === 'v1') {
            if (method === 'POST' && maxRetries > 0) {
                return genKey();
            }
        }
        return null;
    }
    _makeHeaders({ contentType, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings, stripeAccount, stripeContext, apiMode, }) {
        const defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': contentType,
            'User-Agent': this._getUserAgentString(apiMode),
            'X-Stripe-Client-User-Agent': clientUserAgent,
            'X-Stripe-Client-Telemetry': this._getTelemetryHeader(),
            'Stripe-Version': apiVersion,
            'Stripe-Account': stripeAccount,
            'Stripe-Context': stripeContext,
            'Idempotency-Key': this._defaultIdempotencyKey(method, userSuppliedSettings, apiMode),
        };
        // As per https://datatracker.ietf.org/doc/html/rfc7230#section-3.3.2:
        //   A user agent SHOULD send a Content-Length in a request message when
        //   no Transfer-Encoding is sent and the request method defines a meaning
        //   for an enclosed payload body.  For example, a Content-Length header
        //   field is normally sent in a POST request even when the value is 0
        //   (indicating an empty payload body).  A user agent SHOULD NOT send a
        //   Content-Length header field when the request message does not contain
        //   a payload body and the method semantics do not anticipate such a
        //   body.
        //
        // These method types are expected to have bodies and so we should always
        // include a Content-Length.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        // If a content length was specified, we always include it regardless of
        // whether the method semantics anticipate such a body. This keeps us
        // consistent with historical behavior. We do however want to warn on this
        // and fix these cases as they are semantically incorrect.
        if (methodHasPayload || contentLength) {
            if (!methodHasPayload) {
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.emitWarning)(`${method} method had non-zero contentLength but no payload is expected for this verb`);
            }
            defaultHeaders['Content-Length'] = contentLength;
        }
        return Object.assign((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.removeNullish)(defaultHeaders), 
        // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHeaders)(userSuppliedHeaders));
    }
    _getUserAgentString(apiMode) {
        const packageVersion = this._stripe.getConstant('PACKAGE_VERSION');
        const appInfo = this._stripe._appInfo
            ? this._stripe.getAppInfoAsString()
            : '';
        return `Stripe/${apiMode} NodeBindings/${packageVersion} ${appInfo}`.trim();
    }
    _getTelemetryHeader() {
        if (this._stripe.getTelemetryEnabled() &&
            this._stripe._prevRequestMetrics.length > 0) {
            const metrics = this._stripe._prevRequestMetrics.shift();
            return JSON.stringify({
                last_request_metrics: metrics,
            });
        }
    }
    _recordRequestMetrics(requestId, requestDurationMs, usage) {
        if (this._stripe.getTelemetryEnabled() && requestId) {
            if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) {
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.emitWarning)('Request metrics buffer is full, dropping telemetry message.');
            }
            else {
                const m = {
                    request_id: requestId,
                    request_duration_ms: requestDurationMs,
                };
                if (usage && usage.length > 0) {
                    m.usage = usage;
                }
                this._stripe._prevRequestMetrics.push(m);
            }
        }
    }
    _rawRequest(method, path, params, options, usage) {
        const requestPromise = new Promise((resolve, reject) => {
            let opts;
            try {
                const requestMethod = method.toUpperCase();
                if (requestMethod !== 'POST' &&
                    params &&
                    Object.keys(params).length !== 0) {
                    throw new Error('rawRequest only supports params on POST requests. Please pass null and add your parameters to path.');
                }
                const args = [].slice.call([params, options]);
                // Pull request data and options (headers, auth) from args.
                const dataFromArgs = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDataFromArgs)(args);
                const data = requestMethod === 'POST' ? Object.assign({}, dataFromArgs) : null;
                const calculatedOptions = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getOptionsFromArgs)(args);
                const headers = calculatedOptions.headers;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const authenticator = calculatedOptions.authenticator;
                opts = {
                    requestMethod,
                    requestPath: path,
                    bodyData: data,
                    queryData: {},
                    authenticator,
                    headers,
                    host: calculatedOptions.host,
                    streaming: !!calculatedOptions.streaming,
                    settings: {},
                    // We use this for thin event internals, so we should record the more specific `usage`, when available
                    usage: usage || ['raw_request'],
                };
            }
            catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }
            const { headers, settings } = opts;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const authenticator = opts.authenticator;
            this._request(opts.requestMethod, opts.host, path, opts.bodyData, authenticator, { headers, settings, streaming: opts.streaming }, opts.usage, requestCallback);
        });
        return requestPromise;
    }
    _getContentLength(data) {
        // if we calculate this wrong, the server treats it as invalid json
        // or if content length is too big, the request never finishes and it
        // times out.
        return typeof data === 'string'
            ? new TextEncoder().encode(data).length
            : data.length;
    }
    _request(method, host, path, data, authenticator, options, usage = [], callback, requestDataProcessor = null) {
        var _a;
        let requestData;
        authenticator = (_a = authenticator !== null && authenticator !== void 0 ? authenticator : this._stripe._authenticator) !== null && _a !== void 0 ? _a : null;
        const apiMode = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getAPIMode)(path);
        const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
            return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
        };
        const makeRequest = (apiVersion, headers, numRetries) => {
            // timeout can be set on a per-request basis. Favor that over the global setting
            const timeout = options.settings &&
                options.settings.timeout &&
                Number.isInteger(options.settings.timeout) &&
                options.settings.timeout >= 0
                ? options.settings.timeout
                : this._stripe.getApiField('timeout');
            const request = {
                host: host || this._stripe.getApiField('host'),
                port: this._stripe.getApiField('port'),
                path: path,
                method: method,
                headers: Object.assign({}, headers),
                body: requestData,
                protocol: this._stripe.getApiField('protocol'),
            };
            authenticator(request)
                .then(() => {
                const req = this._stripe
                    .getApiField('httpClient')
                    .makeRequest(request.host, request.port, request.path, request.method, request.headers, request.body, request.protocol, timeout);
                const requestStartTime = Date.now();
                const requestEvent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.removeNullish)({
                    api_version: apiVersion,
                    account: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseHttpHeaderAsString)(headers['Stripe-Account']),
                    idempotency_key: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseHttpHeaderAsString)(headers['Idempotency-Key']),
                    method,
                    path,
                    request_start_time: requestStartTime,
                });
                const requestRetries = numRetries || 0;
                const maxRetries = this._getMaxNetworkRetries(options.settings || {});
                this._stripe._emitter.emit('request', requestEvent);
                req
                    .then((res) => {
                    if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
                        return retryRequest(makeRequest, apiVersion, headers, requestRetries, (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.parseHttpHeaderAsNumber)(res.getHeaders()['retry-after']));
                    }
                    else if (options.streaming && res.getStatusCode() < 400) {
                        return this._streamingResponseHandler(requestEvent, usage, callback)(res);
                    }
                    else {
                        return this._jsonResponseHandler(requestEvent, apiMode, usage, callback)(res);
                    }
                })
                    .catch((error) => {
                    if (RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) {
                        return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
                    }
                    else {
                        const isTimeoutError = error.code && error.code === _net_HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClient.TIMEOUT_ERROR_CODE;
                        return callback(new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeConnectionError({
                            message: isTimeoutError
                                ? `Request aborted due to timeout being reached (${timeout}ms)`
                                : RequestSender._generateConnectionErrorMessage(requestRetries),
                            detail: error,
                        }));
                    }
                });
            })
                .catch((e) => {
                throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeError({
                    message: 'Unable to authenticate the request',
                    exception: e,
                });
            });
        };
        const prepareAndMakeRequest = (error, data) => {
            if (error) {
                return callback(error);
            }
            requestData = data;
            this._stripe.getClientUserAgent((clientUserAgent) => {
                var _a, _b, _c;
                const apiVersion = this._stripe.getApiField('version');
                const headers = this._makeHeaders({
                    contentType: apiMode == 'v2'
                        ? 'application/json'
                        : 'application/x-www-form-urlencoded',
                    contentLength: this._getContentLength(data),
                    apiVersion: apiVersion,
                    clientUserAgent,
                    method,
                    // other callers expect null, but .headers being optional means it's undefined if not supplied. So we normalize to null.
                    userSuppliedHeaders: (_a = options.headers) !== null && _a !== void 0 ? _a : null,
                    userSuppliedSettings: (_b = options.settings) !== null && _b !== void 0 ? _b : {},
                    stripeAccount: (_c = options.stripeAccount) !== null && _c !== void 0 ? _c : this._stripe.getApiField('stripeAccount'),
                    stripeContext: this._normalizeStripeContext(options.stripeContext, this._stripe.getApiField('stripeContext')),
                    apiMode: apiMode,
                });
                makeRequest(apiVersion, headers, 0);
            });
        };
        if (requestDataProcessor) {
            requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
        }
        else {
            let stringifiedData;
            if (apiMode == 'v2') {
                stringifiedData = data ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyRequestData)(data) : '';
            }
            else {
                stringifiedData = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.queryStringifyRequestData)(data || {});
            }
            prepareAndMakeRequest(null, stringifiedData);
        }
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/ResourceNamespace.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/ResourceNamespace.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resourceNamespace: () => (/* binding */ resourceNamespace)
/* harmony export */ });
// ResourceNamespace allows you to create nested resources, i.e. `stripe.issuing.cards`.
// It also works recursively, so you could do i.e. `stripe.billing.invoicing.pay`.
function ResourceNamespace(stripe, resources) {
    for (const name in resources) {
        if (!Object.prototype.hasOwnProperty.call(resources, name)) {
            continue;
        }
        const camelCaseName = name[0].toLowerCase() + name.substring(1);
        const resource = new resources[name](stripe);
        this[camelCaseName] = resource;
    }
}
function resourceNamespace(namespace, resources) {
    return function (stripe) {
        return new ResourceNamespace(stripe, resources);
    };
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeContext.js":
/*!****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeContext.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StripeContext: () => (/* binding */ StripeContext)
/* harmony export */ });
/**
 * The StripeContext class provides an immutable container and convenience methods for interacting with the `Stripe-Context` header. All methods return a new instance of StripeContext.
 * You can use it whenever you're initializing a `Stripe` instance or sending `stripeContext` with a request. It's also found in the `EventNotification.context` property.
 */
class StripeContext {
    /**
     * Creates a new StripeContext with the given segments.
     */
    constructor(segments = []) {
        this._segments = [...segments];
    }
    /**
     * Gets a copy of the segments of this Context.
     */
    get segments() {
        return [...this._segments];
    }
    /**
     * Creates a new StripeContext with an additional segment appended.
     */
    push(segment) {
        if (!segment) {
            throw new Error('Segment cannot be null or undefined');
        }
        return new StripeContext([...this._segments, segment]);
    }
    /**
     * Creates a new StripeContext with the last segment removed.
     * If there are no segments, throws an error.
     */
    pop() {
        if (this._segments.length === 0) {
            throw new Error('Cannot pop from an empty context');
        }
        return new StripeContext(this._segments.slice(0, -1));
    }
    /**
     * Converts this context to its string representation.
     */
    toString() {
        return this._segments.join('/');
    }
    /**
     * Parses a context string into a StripeContext instance.
     */
    static parse(contextStr) {
        if (!contextStr) {
            return new StripeContext([]);
        }
        return new StripeContext(contextStr.split('/'));
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeMethod.js":
/*!***************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeMethod.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stripeMethod: () => (/* binding */ stripeMethod)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");
/* harmony import */ var _autoPagination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./autoPagination.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/autoPagination.js");


/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.fullPath=''] Fully qualified path to the method (eg. /v1/a/b/c).
 *  If this is specified, path should not be specified.
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
 * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 * @param [spec.host] Hostname for the request.
 *
 * <!-- Public API accessible via Stripe.StripeResource.method -->
 */
function stripeMethod(spec) {
    if (spec.path !== undefined && spec.fullPath !== undefined) {
        throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
    }
    return function (...args) {
        const callback = typeof args[args.length - 1] == 'function' && args.pop();
        spec.urlParams = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.extractUrlParams)(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ''));
        const requestPromise = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.callbackifyPromiseWithTimeout)(this._makeRequest(args, spec, {}), callback);
        Object.assign(requestPromise, (0,_autoPagination_js__WEBPACK_IMPORTED_MODULE_1__.makeAutoPaginationMethods)(this, args, spec, requestPromise));
        return requestPromise;
    };
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js":
/*!*****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StripeResource: () => (/* binding */ StripeResource)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");
/* harmony import */ var _StripeMethod_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StripeMethod.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeMethod.js");


// Provide extension mechanism for Stripe Resource Sub-Classes
StripeResource.extend = _utils_js__WEBPACK_IMPORTED_MODULE_0__.protoExtend;
// Expose method-creator
StripeResource.method = _StripeMethod_js__WEBPACK_IMPORTED_MODULE_1__.stripeMethod;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
/**
 * Encapsulates request logic for a Stripe Resource
 */
function StripeResource(stripe, deprecatedUrlData) {
    this._stripe = stripe;
    if (deprecatedUrlData) {
        throw new Error('Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.');
    }
    this.basePath = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.makeURLInterpolator)(
    // @ts-ignore changing type of basePath
    this.basePath || stripe.getApiField('basePath'));
    // @ts-ignore changing type of path
    this.resourcePath = this.path;
    // @ts-ignore changing type of path
    this.path = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.makeURLInterpolator)(this.path);
    this.initialize(...arguments);
}
StripeResource.prototype = {
    _stripe: null,
    // @ts-ignore the type of path changes in ctor
    path: '',
    resourcePath: '',
    // Methods that don't use the API's default '/v1' path can override it with this setting.
    basePath: null,
    initialize() { },
    // Function to override the default data processor. This allows full control
    // over how a StripeResource's request data will get converted into an HTTP
    // body. This is useful for non-standard HTTP requests. The function should
    // take method name, data, and headers as arguments.
    requestDataProcessor: null,
    // Function to add a validation checks before sending the request, errors should
    // be thrown, and they will be passed to the callback/promise.
    validateRequest: null,
    createFullPath(commandPath, urlData) {
        const urlParts = [this.basePath(urlData), this.path(urlData)];
        if (typeof commandPath === 'function') {
            const computedCommandPath = commandPath(urlData);
            // If we have no actual command path, we just omit it to avoid adding a
            // trailing slash. This is important for top-level listing requests, which
            // do not have a command path.
            if (computedCommandPath) {
                urlParts.push(computedCommandPath);
            }
        }
        else {
            urlParts.push(commandPath);
        }
        return this._joinUrlParts(urlParts);
    },
    // Creates a relative resource path with symbols left in (unlike
    // createFullPath which takes some data to replace them with). For example it
    // might produce: /invoices/{id}
    createResourcePathWithSymbols(pathWithSymbols) {
        // If there is no path beyond the resource path, we want to produce just
        // /<resource path> rather than /<resource path>/.
        if (pathWithSymbols) {
            return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
        }
        else {
            return `/${this.resourcePath}`;
        }
    },
    _joinUrlParts(parts) {
        // Replace any accidentally doubled up slashes. This previously used
        // path.join, which would do this as well. Unfortunately we need to do this
        // as the functions for creating paths are technically part of the public
        // interface and so we need to preserve backwards compatibility.
        return parts.join('/').replace(/\/{2,}/g, '/');
    },
    _getRequestOpts(requestArgs, spec, overrideData) {
        var _a;
        // Extract spec values with defaults.
        const requestMethod = (spec.method || 'GET').toUpperCase();
        const usage = spec.usage || [];
        const urlParams = spec.urlParams || [];
        const encode = spec.encode || ((data) => data);
        const isUsingFullPath = !!spec.fullPath;
        const commandPath = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.makeURLInterpolator)(isUsingFullPath ? spec.fullPath : spec.path || '');
        // When using fullPath, we ignore the resource path as it should already be
        // fully qualified.
        const path = isUsingFullPath
            ? spec.fullPath
            : this.createResourcePathWithSymbols(spec.path);
        // Don't mutate args externally.
        const args = [].slice.call(requestArgs);
        // Generate and validate url params.
        const urlData = urlParams.reduce((urlData, param) => {
            const arg = args.shift();
            if (typeof arg !== 'string') {
                throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
            }
            urlData[param] = arg;
            return urlData;
        }, {});
        // Pull request data and options (headers, auth) from args.
        const dataFromArgs = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDataFromArgs)(args);
        const data = encode(Object.assign({}, dataFromArgs, overrideData));
        const options = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOptionsFromArgs)(args);
        const host = options.host || spec.host;
        const streaming = !!spec.streaming || !!options.streaming;
        // Validate that there are no more args.
        if (args.filter((x) => x != null).length) {
            throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
        }
        // When using full path, we can just invoke the URL interpolator directly
        // as we don't need to use the resource to create a full path.
        const requestPath = isUsingFullPath
            ? commandPath(urlData)
            : this.createFullPath(commandPath, urlData);
        const headers = Object.assign(options.headers, spec.headers);
        if (spec.validator) {
            spec.validator(data, { headers });
        }
        const dataInQuery = spec.method === 'GET' || spec.method === 'DELETE';
        const bodyData = dataInQuery ? null : data;
        const queryData = dataInQuery ? data : {};
        return {
            requestMethod,
            requestPath,
            bodyData,
            queryData,
            authenticator: (_a = options.authenticator) !== null && _a !== void 0 ? _a : null,
            headers,
            host: host !== null && host !== void 0 ? host : null,
            streaming,
            settings: options.settings,
            usage,
        };
    },
    _makeRequest(requestArgs, spec, overrideData) {
        return new Promise((resolve, reject) => {
            var _a;
            let opts;
            try {
                opts = this._getRequestOpts(requestArgs, spec, overrideData);
            }
            catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(spec.transformResponseData
                        ? spec.transformResponseData(response)
                        : response);
                }
            }
            const emptyQuery = Object.keys(opts.queryData).length === 0;
            const path = [
                opts.requestPath,
                emptyQuery ? '' : '?',
                (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryStringifyRequestData)(opts.queryData),
            ].join('');
            const { headers, settings } = opts;
            this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.authenticator, {
                headers,
                settings,
                streaming: opts.streaming,
            }, opts.usage, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
        });
    },
};



/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Webhooks.js":
/*!***********************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Webhooks.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWebhooks: () => (/* binding */ createWebhooks)
/* harmony export */ });
/* harmony import */ var _Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Error.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Error.js");
/* harmony import */ var _crypto_CryptoProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crypto/CryptoProvider.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/CryptoProvider.js");


function createWebhooks(platformFunctions) {
    const Webhook = {
        DEFAULT_TOLERANCE: 300,
        signature: null,
        constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            try {
                if (!this.signature) {
                    throw new Error('ERR: missing signature helper, unable to verify');
                }
                this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            }
            catch (e) {
                if (e instanceof _crypto_CryptoProvider_js__WEBPACK_IMPORTED_MODULE_1__.CryptoProviderOnlySupportsAsyncError) {
                    e.message +=
                        '\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`';
                }
                throw e;
            }
            const jsonPayload = payload instanceof Uint8Array
                ? JSON.parse(new TextDecoder('utf8').decode(payload))
                : JSON.parse(payload);
            return jsonPayload;
        },
        async constructEventAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            if (!this.signature) {
                throw new Error('ERR: missing signature helper, unable to verify');
            }
            await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            const jsonPayload = payload instanceof Uint8Array
                ? JSON.parse(new TextDecoder('utf8').decode(payload))
                : JSON.parse(payload);
            return jsonPayload;
        },
        /**
         * Generates a header to be used for webhook mocking
         *
         * @typedef {object} opts
         * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
         * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
         * @property {string} secret - Stripe webhook secret 'whsec_...'
         * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
         * @property {string} signature - Computed webhook signature
         * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
         */
        generateTestHeaderString: function (opts) {
            const preparedOpts = prepareOptions(opts);
            const signature = preparedOpts.signature ||
                preparedOpts.cryptoProvider.computeHMACSignature(preparedOpts.payloadString, preparedOpts.secret);
            return preparedOpts.generateHeaderString(signature);
        },
        generateTestHeaderStringAsync: async function (opts) {
            const preparedOpts = prepareOptions(opts);
            const signature = preparedOpts.signature ||
                (await preparedOpts.cryptoProvider.computeHMACSignatureAsync(preparedOpts.payloadString, preparedOpts.secret));
            return preparedOpts.generateHeaderString(signature);
        },
    };
    const signature = {
        EXPECTED_SCHEME: 'v1',
        verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType, } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret);
            validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
            return true;
        },
        async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType, } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret);
            return validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
        },
    };
    function makeHMACContent(payload, details) {
        return `${details.timestamp}.${payload}`;
    }
    function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
        if (!encodedPayload) {
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No webhook payload was provided.',
            });
        }
        const suspectPayloadType = typeof encodedPayload != 'string' &&
            !(encodedPayload instanceof Uint8Array);
        const textDecoder = new TextDecoder('utf8');
        const decodedPayload = encodedPayload instanceof Uint8Array
            ? textDecoder.decode(encodedPayload)
            : encodedPayload;
        // Express's type for `Request#headers` is `string | []string`
        // which is because the `set-cookie` header is an array,
        // but no other headers are an array (docs: https://nodejs.org/api/http.html#http_message_headers)
        // (Express's Request class is an extension of http.IncomingMessage, and doesn't appear to be relevantly modified: https://github.com/expressjs/express/blob/master/lib/request.js#L31)
        if (Array.isArray(encodedHeader)) {
            throw new Error('Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.');
        }
        if (encodedHeader == null || encodedHeader == '') {
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No stripe-signature header value was provided.',
            });
        }
        const decodedHeader = encodedHeader instanceof Uint8Array
            ? textDecoder.decode(encodedHeader)
            : encodedHeader;
        const details = parseHeader(decodedHeader, expectedScheme);
        if (!details || details.timestamp === -1) {
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'Unable to extract timestamp and signatures from header',
            });
        }
        if (!details.signatures.length) {
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'No signatures found with expected scheme',
            });
        }
        return {
            decodedPayload,
            decodedHeader,
            details,
            suspectPayloadType,
        };
    }
    function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
        const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
        const docsLocation = '\nLearn more about webhook signing and explore webhook integration examples for various frameworks at ' +
            'https://docs.stripe.com/webhooks/signature';
        const whitespaceMessage = secretContainsWhitespace
            ? '\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value'
            : '';
        if (!signatureFound) {
            if (suspectPayloadType) {
                throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(header, payload, {
                    message: 'Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.' +
                        'Payload was provided as a parsed JavaScript object instead. \n' +
                        'Signature verification is impossible without access to the original signed material. \n' +
                        docsLocation +
                        '\n' +
                        whitespaceMessage,
                });
            }
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(header, payload, {
                message: 'No signatures found matching the expected signature for payload.' +
                    ' Are you passing the raw request body you received from Stripe? \n' +
                    ' If a webhook request is being forwarded by a third-party tool,' +
                    ' ensure that the exact request body, including JSON formatting and new line style, is preserved.\n' +
                    docsLocation +
                    '\n' +
                    whitespaceMessage,
            });
        }
        const timestampAge = Math.floor((typeof receivedAt === 'number' ? receivedAt : Date.now()) / 1000) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeSignatureVerificationError(header, payload, {
                message: 'Timestamp outside the tolerance zone',
            });
        }
        return true;
    }
    function parseHeader(header, scheme) {
        if (typeof header !== 'string') {
            return null;
        }
        return header.split(',').reduce((accum, item) => {
            const kv = item.split('=');
            if (kv[0] === 't') {
                accum.timestamp = parseInt(kv[1], 10);
            }
            if (kv[0] === scheme) {
                accum.signatures.push(kv[1]);
            }
            return accum;
        }, {
            timestamp: -1,
            signatures: [],
        });
    }
    let webhooksCryptoProviderInstance = null;
    /**
     * Lazily instantiate a CryptoProvider instance. This is a stateless object
     * so a singleton can be used here.
     */
    function getCryptoProvider() {
        if (!webhooksCryptoProviderInstance) {
            webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
        }
        return webhooksCryptoProviderInstance;
    }
    function prepareOptions(opts) {
        if (!opts) {
            throw new _Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeError({
                message: 'Options are required',
            });
        }
        const timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1000);
        const scheme = opts.scheme || signature.EXPECTED_SCHEME;
        const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
        const payloadString = `${timestamp}.${opts.payload}`;
        const generateHeaderString = (signature) => {
            return `t=${timestamp},${scheme}=${signature}`;
        };
        return Object.assign(Object.assign({}, opts), { timestamp,
            scheme,
            cryptoProvider,
            payloadString,
            generateHeaderString });
    }
    Webhook.signature = signature;
    return Webhook;
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/apiVersion.js":
/*!*************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/apiVersion.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiMajorVersion: () => (/* binding */ ApiMajorVersion),
/* harmony export */   ApiVersion: () => (/* binding */ ApiVersion)
/* harmony export */ });
// File generated from our OpenAPI spec
const ApiVersion = '2026-01-28.clover';
const ApiMajorVersion = 'clover';


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/autoPagination.js":
/*!*****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/autoPagination.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeAutoPaginationMethods: () => (/* binding */ makeAutoPaginationMethods)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");

class V1Iterator {
    constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.index = 0;
        this.pagePromise = firstPagePromise;
        this.promiseCache = { currentPromise: null };
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
    async iterate(pageResult) {
        if (!(pageResult &&
            pageResult.data &&
            typeof pageResult.data.length === 'number')) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `data` array.');
        }
        const reverseIteration = isReverseIteration(this.requestArgs);
        if (this.index < pageResult.data.length) {
            const idx = reverseIteration
                ? pageResult.data.length - 1 - this.index
                : this.index;
            const value = pageResult.data[idx];
            this.index += 1;
            return { value, done: false };
        }
        else if (pageResult.has_more) {
            // Reset counter, request next page, and recurse.
            this.index = 0;
            this.pagePromise = this.getNextPage(pageResult);
            const nextPageResult = await this.pagePromise;
            return this.iterate(nextPageResult);
        }
        return { done: true, value: undefined };
    }
    /** @abstract */
    getNextPage(_pageResult) {
        throw new Error('Unimplemented');
    }
    async _next() {
        return this.iterate(await this.pagePromise);
    }
    next() {
        /**
         * If a user calls `.next()` multiple times in parallel,
         * return the same result until something has resolved
         * to prevent page-turning race conditions.
         */
        if (this.promiseCache.currentPromise) {
            return this.promiseCache.currentPromise;
        }
        const nextPromise = (async () => {
            const ret = await this._next();
            this.promiseCache.currentPromise = null;
            return ret;
        })();
        this.promiseCache.currentPromise = nextPromise;
        return nextPromise;
    }
}
class V1ListIterator extends V1Iterator {
    getNextPage(pageResult) {
        const reverseIteration = isReverseIteration(this.requestArgs);
        const lastId = getLastId(pageResult, reverseIteration);
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            [reverseIteration ? 'ending_before' : 'starting_after']: lastId,
        });
    }
}
class V1SearchIterator extends V1Iterator {
    getNextPage(pageResult) {
        if (!pageResult.next_page) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.');
        }
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            page: pageResult.next_page,
        });
    }
}
class V2ListIterator {
    constructor(firstPagePromise, requestArgs, spec, stripeResource) {
        this.firstPagePromise = firstPagePromise;
        this.currentPageIterator = null;
        this.nextPageUrl = null;
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
    async initFirstPage() {
        if (this.firstPagePromise) {
            const page = await this.firstPagePromise;
            this.firstPagePromise = null;
            this.currentPageIterator = page.data[Symbol.iterator]();
            this.nextPageUrl = page.next_page_url || null;
        }
    }
    async turnPage() {
        if (!this.nextPageUrl)
            return null;
        this.spec.fullPath = this.nextPageUrl;
        const page = await this.stripeResource._makeRequest([], this.spec, {});
        this.nextPageUrl = page.next_page_url || null;
        this.currentPageIterator = page.data[Symbol.iterator]();
        return this.currentPageIterator;
    }
    async next() {
        await this.initFirstPage();
        if (this.currentPageIterator) {
            const result = this.currentPageIterator.next();
            if (!result.done)
                return { done: false, value: result.value };
        }
        const nextPageIterator = await this.turnPage();
        if (!nextPageIterator) {
            return { done: true, value: undefined };
        }
        const result = nextPageIterator.next();
        if (!result.done)
            return { done: false, value: result.value };
        return { done: true, value: undefined };
    }
}
const makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise) => {
    const apiMode = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAPIMode)(spec.fullPath || spec.path);
    if (apiMode !== 'v2' && spec.methodType === 'search') {
        return makeAutoPaginationMethodsFromIterator(new V1SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (apiMode !== 'v2' && spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new V1ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (apiMode === 'v2' && spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new V2ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    return null;
};
const makeAutoPaginationMethodsFromIterator = (iterator) => {
    const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
    const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
    const autoPaginationMethods = {
        autoPagingEach,
        autoPagingToArray,
        // Async iterator functions:
        next: () => iterator.next(),
        return: () => {
            // This is required for `break`.
            return {};
        },
        [getAsyncIteratorSymbol()]: () => {
            return autoPaginationMethods;
        },
    };
    return autoPaginationMethods;
};
/**
 * ----------------
 * Private Helpers:
 * ----------------
 */
function getAsyncIteratorSymbol() {
    if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
        return Symbol.asyncIterator;
    }
    // Follow the convention from libraries like iterall: https://github.com/leebyron/iterall#asynciterator-1
    return '@@asyncIterator';
}
function getDoneCallback(args) {
    if (args.length < 2) {
        return null;
    }
    const onDone = args[1];
    if (typeof onDone !== 'function') {
        throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
    }
    return onDone;
}
/**
 * We allow four forms of the `onItem` callback (the middle two being equivalent),
 *
 *   1. `.autoPagingEach((item) => { doSomething(item); return false; });`
 *   2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
 *   3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
 *   4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
 *
 * In addition to standard validation, this helper
 * coalesces the former forms into the latter form.
 */
function getItemCallback(args) {
    if (args.length === 0) {
        return undefined;
    }
    const onItem = args[0];
    if (typeof onItem !== 'function') {
        throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
    }
    // 4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
    if (onItem.length === 2) {
        return onItem;
    }
    if (onItem.length > 2) {
        throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
    }
    // This magically handles all three of these usecases (the latter two being functionally identical):
    // 1. `.autoPagingEach((item) => { doSomething(item); return false; });`
    // 2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
    // 3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
    return function _onItem(item, next) {
        const shouldContinue = onItem(item);
        next(shouldContinue);
    };
}
function getLastId(listResult, reverseIteration) {
    const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
    const lastItem = listResult.data[lastIdx];
    const lastId = lastItem && lastItem.id;
    if (!lastId) {
        throw Error('Unexpected: No `id` found on the last item while auto-paging a list.');
    }
    return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
    return function autoPagingEach( /* onItem?, onDone? */) {
        const args = [].slice.call(arguments);
        const onItem = getItemCallback(args);
        const onDone = getDoneCallback(args);
        if (args.length > 2) {
            throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
        }
        const autoPagePromise = wrapAsyncIteratorWithCallback(asyncIteratorNext, 
        // @ts-ignore we might need a null check
        onItem);
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.callbackifyPromiseWithTimeout)(autoPagePromise, onDone);
    };
}
function makeAutoPagingToArray(autoPagingEach) {
    return function autoPagingToArray(opts, onDone) {
        const limit = opts && opts.limit;
        if (!limit) {
            throw Error('You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.');
        }
        if (limit > 10000) {
            throw Error('You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.');
        }
        const promise = new Promise((resolve, reject) => {
            const items = [];
            autoPagingEach((item) => {
                items.push(item);
                if (items.length >= limit) {
                    return false;
                }
            })
                .then(() => {
                resolve(items);
            })
                .catch(reject);
        });
        // @ts-ignore
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.callbackifyPromiseWithTimeout)(promise, onDone);
    };
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
    return new Promise((resolve, reject) => {
        function handleIteration(iterResult) {
            if (iterResult.done) {
                resolve();
                return;
            }
            const item = iterResult.value;
            return new Promise((next) => {
                // Bit confusing, perhaps; we pass a `resolve` fn
                // to the user, so they can decide when and if to continue.
                // They can return false, or a promise which resolves to false, to break.
                onItem(item, next);
            }).then((shouldContinue) => {
                if (shouldContinue === false) {
                    return handleIteration({ done: true, value: undefined });
                }
                else {
                    return asyncIteratorNext().then(handleIteration);
                }
            });
        }
        asyncIteratorNext()
            .then(handleIteration)
            .catch(reject);
    });
}
function isReverseIteration(requestArgs) {
    const args = [].slice.call(requestArgs);
    const dataFromArgs = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDataFromArgs)(args);
    return !!dataFromArgs.ending_before;
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/CryptoProvider.js":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/CryptoProvider.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CryptoProvider: () => (/* binding */ CryptoProvider),
/* harmony export */   CryptoProviderOnlySupportsAsyncError: () => (/* binding */ CryptoProviderOnlySupportsAsyncError)
/* harmony export */ });
/**
 * Interface encapsulating the various crypto computations used by the library,
 * allowing pluggable underlying crypto implementations.
 */
class CryptoProvider {
    /**
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */
    computeHMACSignature(payload, secret) {
        throw new Error('computeHMACSignature not implemented.');
    }
    /**
     * Asynchronous version of `computeHMACSignature`. Some implementations may
     * only allow support async signature computation.
     *
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */
    computeHMACSignatureAsync(payload, secret) {
        throw new Error('computeHMACSignatureAsync not implemented.');
    }
    /**
     * Computes a SHA-256 hash of the data.
     */
    computeSHA256Async(data) {
        throw new Error('computeSHA256 not implemented.');
    }
}
/**
 * If the crypto provider only supports asynchronous operations,
 * throw CryptoProviderOnlySupportsAsyncError instead of
 * a generic error so that the caller can choose to provide
 * a more helpful error message to direct the user to use
 * an asynchronous pathway.
 */
class CryptoProviderOnlySupportsAsyncError extends Error {
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/NodeCryptoProvider.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/NodeCryptoProvider.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeCryptoProvider: () => (/* binding */ NodeCryptoProvider)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var _CryptoProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CryptoProvider.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/CryptoProvider.js");


/**
 * `CryptoProvider which uses the Node `crypto` package for its computations.
 */
class NodeCryptoProvider extends _CryptoProvider_js__WEBPACK_IMPORTED_MODULE_1__.CryptoProvider {
    /** @override */
    computeHMACSignature(payload, secret) {
        return crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');
    }
    /** @override */
    async computeHMACSignatureAsync(payload, secret) {
        const signature = await this.computeHMACSignature(payload, secret);
        return signature;
    }
    /** @override */
    async computeSHA256Async(data) {
        return new Uint8Array(await crypto__WEBPACK_IMPORTED_MODULE_0__.createHash('sha256')
            .update(data)
            .digest());
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/SubtleCryptoProvider.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/SubtleCryptoProvider.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubtleCryptoProvider: () => (/* binding */ SubtleCryptoProvider)
/* harmony export */ });
/* harmony import */ var _CryptoProvider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CryptoProvider.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/CryptoProvider.js");

/**
 * `CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
 *
 * This only supports asynchronous operations.
 */
class SubtleCryptoProvider extends _CryptoProvider_js__WEBPACK_IMPORTED_MODULE_0__.CryptoProvider {
    constructor(subtleCrypto) {
        super();
        // If no subtle crypto is interface, default to the global namespace. This
        // is to allow custom interfaces (eg. using the Node webcrypto interface in
        // tests).
        this.subtleCrypto = subtleCrypto || crypto.subtle;
    }
    /** @override */
    computeHMACSignature(payload, secret) {
        throw new _CryptoProvider_js__WEBPACK_IMPORTED_MODULE_0__.CryptoProviderOnlySupportsAsyncError('SubtleCryptoProvider cannot be used in a synchronous context.');
    }
    /** @override */
    async computeHMACSignatureAsync(payload, secret) {
        const encoder = new TextEncoder();
        const key = await this.subtleCrypto.importKey('raw', encoder.encode(secret), {
            name: 'HMAC',
            hash: { name: 'SHA-256' },
        }, false, ['sign']);
        const signatureBuffer = await this.subtleCrypto.sign('hmac', key, encoder.encode(payload));
        // crypto.subtle returns the signature in base64 format. This must be
        // encoded in hex to match the CryptoProvider contract. We map each byte in
        // the buffer to its corresponding hex octet and then combine into a string.
        const signatureBytes = new Uint8Array(signatureBuffer);
        const signatureHexCodes = new Array(signatureBytes.length);
        for (let i = 0; i < signatureBytes.length; i++) {
            signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
        }
        return signatureHexCodes.join('');
    }
    /** @override */
    async computeSHA256Async(data) {
        return new Uint8Array(await this.subtleCrypto.digest('SHA-256', data));
    }
}
// Cached mapping of byte to hex representation. We do this once to avoid re-
// computing every time we need to convert the result of a signature to hex.
const byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) {
    byteHexMapping[i] = i.toString(16).padStart(2, '0');
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/multipart.js":
/*!************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/multipart.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   multipartRequestDataProcessor: () => (/* binding */ multipartRequestDataProcessor)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");

// Method for formatting HTTP body for the multipart/form-data specification
// Mostly taken from Fermata.js
// https://github.com/natevw/fermata/blob/5d9732a33d776ce925013a265935facd1626cc88/fermata.js#L315-L343
const multipartDataGenerator = (method, data, headers) => {
    const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
    headers['Content-Type'] = `multipart/form-data; boundary=${segno}`;
    const textEncoder = new TextEncoder();
    let buffer = new Uint8Array(0);
    const endBuffer = textEncoder.encode('\r\n');
    function push(l) {
        const prevBuffer = buffer;
        const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
        buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
        buffer.set(prevBuffer);
        buffer.set(newBuffer, prevBuffer.length);
        buffer.set(endBuffer, buffer.length - 2);
    }
    function q(s) {
        return `"${s.replace(/"|"/g, '%22').replace(/\r\n|\r|\n/g, ' ')}"`;
    }
    const flattenedData = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.flattenAndStringify)(data);
    for (const k in flattenedData) {
        if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) {
            continue;
        }
        const v = flattenedData[k];
        push(`--${segno}`);
        if (Object.prototype.hasOwnProperty.call(v, 'data')) {
            const typedEntry = v;
            push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || 'blob')}`);
            push(`Content-Type: ${typedEntry.type || 'application/octet-stream'}`);
            push('');
            push(typedEntry.data);
        }
        else {
            push(`Content-Disposition: form-data; name=${q(k)}`);
            push('');
            push(v);
        }
    }
    push(`--${segno}--`);
    return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
    data = data || {};
    if (method !== 'POST') {
        return callback(null, (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryStringifyRequestData)(data));
    }
    this._stripe._platformFunctions
        .tryBufferData(data)
        .then((bufferedData) => {
        const buffer = multipartDataGenerator(method, bufferedData, headers);
        return callback(null, buffer);
    })
        .catch((err) => callback(err, null));
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/FetchHttpClient.js":
/*!**********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/FetchHttpClient.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchHttpClient: () => (/* binding */ FetchHttpClient),
/* harmony export */   FetchHttpClientResponse: () => (/* binding */ FetchHttpClientResponse)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");
/* harmony import */ var _HttpClient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/HttpClient.js");


/**
 * HTTP client which uses a `fetch` function to issue requests.
 *
 * By default relies on the global `fetch` function, but an optional function
 * can be passed in. If passing in a function, it is expected to match the Web
 * Fetch API. As an example, this could be the function provided by the
 * node-fetch package (https://github.com/node-fetch/node-fetch).
 */
class FetchHttpClient extends _HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClient {
    constructor(fetchFn) {
        super();
        // Default to global fetch if available
        if (!fetchFn) {
            if (!globalThis.fetch) {
                throw new Error('fetch() function not provided and is not defined in the global scope. ' +
                    'You must provide a fetch implementation.');
            }
            fetchFn = globalThis.fetch;
        }
        // Both timeout behaviors differs from Node:
        // - Fetch uses a single timeout for the entire length of the request.
        // - Node is more fine-grained and resets the timeout after each stage of the request.
        if (globalThis.AbortController) {
            // Utilise native AbortController if available
            // AbortController was added in Node v15.0.0, v14.17.0
            this._fetchFn = FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
        }
        else {
            // Fall back to racing against a timeout promise if not available in the runtime
            // This does not actually cancel the underlying fetch operation or resources
            this._fetchFn = FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
        }
    }
    static makeFetchWithRaceTimeout(fetchFn) {
        return (url, init, timeout) => {
            let pendingTimeoutId;
            const timeoutPromise = new Promise((_, reject) => {
                pendingTimeoutId = setTimeout(() => {
                    pendingTimeoutId = null;
                    reject(_HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClient.makeTimeoutError());
                }, timeout);
            });
            const fetchPromise = fetchFn(url, init);
            return Promise.race([fetchPromise, timeoutPromise]).finally(() => {
                if (pendingTimeoutId) {
                    clearTimeout(pendingTimeoutId);
                }
            });
        };
    }
    static makeFetchWithAbortTimeout(fetchFn) {
        return async (url, init, timeout) => {
            // Use AbortController because AbortSignal.timeout() was added later in Node v17.3.0, v16.14.0
            const abort = new AbortController();
            let timeoutId = setTimeout(() => {
                timeoutId = null;
                abort.abort(_HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClient.makeTimeoutError());
            }, timeout);
            try {
                return await fetchFn(url, Object.assign(Object.assign({}, init), { signal: abort.signal }));
            }
            catch (err) {
                // Some implementations, like node-fetch, do not respect the reason passed to AbortController.abort()
                // and instead it always throws an AbortError
                // We catch this case to normalise all timeout errors
                if (err.name === 'AbortError') {
                    throw _HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClient.makeTimeoutError();
                }
                else {
                    throw err;
                }
            }
            finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        };
    }
    /** @override. */
    getClientName() {
        return 'fetch';
    }
    async makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        const url = new URL(path, `${isInsecureConnection ? 'http' : 'https'}://${host}`);
        url.port = port;
        // For methods which expect payloads, we should always pass a body value
        // even when it is empty. Without this, some JS runtimes (eg. Deno) will
        // inject a second Content-Length header. See https://github.com/stripe/stripe-node/issues/1519
        // for more details.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        const body = requestData || (methodHasPayload ? '' : undefined);
        const res = await this._fetchFn(url.toString(), {
            method,
            headers: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.parseHeadersForFetch)(headers),
            body: body,
        }, timeout);
        return new FetchHttpClientResponse(res);
    }
}
class FetchHttpClientResponse extends _HttpClient_js__WEBPACK_IMPORTED_MODULE_1__.HttpClientResponse {
    constructor(res) {
        super(res.status, FetchHttpClientResponse._transformHeadersToObject(res.headers));
        this._res = res;
    }
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // Unfortunately `fetch` does not have event handlers for when the stream is
        // completely read. We therefore invoke the streamCompleteCallback right
        // away. This callback emits a response event with metadata and completes
        // metrics, so it's ok to do this without waiting for the stream to be
        // completely read.
        streamCompleteCallback();
        // Fetch's `body` property is expected to be a readable stream of the body.
        return this._res.body;
    }
    toJSON() {
        return this._res.json();
    }
    static _transformHeadersToObject(headers) {
        // Fetch uses a Headers instance so this must be converted to a barebones
        // JS object to meet the HttpClient interface.
        const headersObj = {};
        for (const entry of headers) {
            if (!Array.isArray(entry) || entry.length != 2) {
                throw new Error('Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.');
            }
            headersObj[entry[0]] = entry[1];
        }
        return headersObj;
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/HttpClient.js":
/*!*****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/HttpClient.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpClient: () => (/* binding */ HttpClient),
/* harmony export */   HttpClientResponse: () => (/* binding */ HttpClientResponse)
/* harmony export */ });
/**
 * Encapsulates the logic for issuing a request to the Stripe API.
 *
 * A custom HTTP client should should implement:
 * 1. A response class which extends HttpClientResponse and wraps around their
 *    own internal representation of a response.
 * 2. A client class which extends HttpClient and implements all methods,
 *    returning their own response class when making requests.
 */
class HttpClient {
    /** The client name used for diagnostics. */
    getClientName() {
        throw new Error('getClientName not implemented.');
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        throw new Error('makeRequest not implemented.');
    }
    /** Helper to make a consistent timeout error across implementations. */
    static makeTimeoutError() {
        const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
        timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
        return timeoutErr;
    }
}
// Public API accessible via Stripe.HttpClient
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ['ECONNRESET', 'EPIPE'];
HttpClient.TIMEOUT_ERROR_CODE = 'ETIMEDOUT';
class HttpClientResponse {
    constructor(statusCode, headers) {
        this._statusCode = statusCode;
        this._headers = headers;
    }
    getStatusCode() {
        return this._statusCode;
    }
    getHeaders() {
        return this._headers;
    }
    getRawResponse() {
        throw new Error('getRawResponse not implemented.');
    }
    toStream(streamCompleteCallback) {
        throw new Error('toStream not implemented.');
    }
    toJSON() {
        throw new Error('toJSON not implemented.');
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/NodeHttpClient.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/NodeHttpClient.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

var http__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
var https__WEBPACK_IMPORTED_MODULE_1___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeHttpClient: () => (/* binding */ NodeHttpClient),
/* harmony export */   NodeHttpClientResponse: () => (/* binding */ NodeHttpClientResponse)
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ "https");
/* harmony import */ var _HttpClient_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HttpClient.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/HttpClient.js");



// `import * as http_ from 'http'` creates a "Module Namespace Exotic Object"
// which is immune to monkey-patching, whereas http_.default (in an ES Module context)
// will resolve to the same thing as require('http'), which is
// monkey-patchable. We care about this because users in their test
// suites might be using a library like "nock" which relies on the ability
// to monkey-patch and intercept calls to http.request.
const http = http__WEBPACK_IMPORTED_MODULE_0__ || /*#__PURE__*/ (http__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (http__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(http__WEBPACK_IMPORTED_MODULE_0__, 2)));
const https = https__WEBPACK_IMPORTED_MODULE_1__ || /*#__PURE__*/ (https__WEBPACK_IMPORTED_MODULE_1___namespace_cache || (https__WEBPACK_IMPORTED_MODULE_1___namespace_cache = __webpack_require__.t(https__WEBPACK_IMPORTED_MODULE_1__, 2)));
const defaultHttpAgent = new http.Agent({ keepAlive: true });
const defaultHttpsAgent = new https.Agent({ keepAlive: true });
/**
 * HTTP client which uses the Node `http` and `https` packages to issue
 * requests.`
 */
class NodeHttpClient extends _HttpClient_js__WEBPACK_IMPORTED_MODULE_2__.HttpClient {
    constructor(agent) {
        super();
        this._agent = agent;
    }
    /** @override. */
    getClientName() {
        return 'node';
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        let agent = this._agent;
        if (!agent) {
            agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
        }
        const requestPromise = new Promise((resolve, reject) => {
            const req = (isInsecureConnection ? http : https).request({
                host: host,
                port: port,
                path,
                method,
                agent,
                headers,
                ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
            });
            req.setTimeout(timeout, () => {
                req.destroy(_HttpClient_js__WEBPACK_IMPORTED_MODULE_2__.HttpClient.makeTimeoutError());
            });
            req.on('response', (res) => {
                resolve(new NodeHttpClientResponse(res));
            });
            req.on('error', (error) => {
                reject(error);
            });
            req.once('socket', (socket) => {
                if (socket.connecting) {
                    socket.once(isInsecureConnection ? 'connect' : 'secureConnect', () => {
                        // Send payload; we're safe:
                        req.write(requestData);
                        req.end();
                    });
                }
                else {
                    // we're already connected
                    req.write(requestData);
                    req.end();
                }
            });
        });
        return requestPromise;
    }
}
class NodeHttpClientResponse extends _HttpClient_js__WEBPACK_IMPORTED_MODULE_2__.HttpClientResponse {
    constructor(res) {
        // @ts-ignore
        super(res.statusCode, res.headers || {});
        this._res = res;
    }
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // The raw response is itself the stream, so we just return that. To be
        // backwards compatible, we should invoke the streamCompleteCallback only
        // once the stream has been fully consumed.
        this._res.once('end', () => streamCompleteCallback());
        return this._res;
    }
    toJSON() {
        return new Promise((resolve, reject) => {
            let response = '';
            this._res.setEncoding('utf8');
            this._res.on('data', (chunk) => {
                response += chunk;
            });
            this._res.once('end', () => {
                try {
                    resolve(JSON.parse(response));
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/platform/NodePlatformFunctions.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/platform/NodePlatformFunctions.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodePlatformFunctions: () => (/* binding */ NodePlatformFunctions)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var _crypto_NodeCryptoProvider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../crypto/NodeCryptoProvider.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/NodeCryptoProvider.js");
/* harmony import */ var _net_NodeHttpClient_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../net/NodeHttpClient.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/NodeHttpClient.js");
/* harmony import */ var _PlatformFunctions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PlatformFunctions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/platform/PlatformFunctions.js");
/* harmony import */ var _Error_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Error.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Error.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! child_process */ "child_process");








class StreamProcessingError extends _Error_js__WEBPACK_IMPORTED_MODULE_5__.StripeError {
}
/**
 * Specializes WebPlatformFunctions using APIs available in Node.js.
 */
class NodePlatformFunctions extends _PlatformFunctions_js__WEBPACK_IMPORTED_MODULE_4__.PlatformFunctions {
    constructor() {
        super();
        this._exec = child_process__WEBPACK_IMPORTED_MODULE_7__.exec;
        this._UNAME_CACHE = null;
    }
    /** @override */
    uuid4() {
        // available in: v14.17.x+
        if (crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID) {
            return crypto__WEBPACK_IMPORTED_MODULE_0__.randomUUID();
        }
        return super.uuid4();
    }
    /**
     * @override
     * Node's built in `exec` function sometimes throws outright,
     * and sometimes has a callback with an error,
     * depending on the type of error.
     *
     * This unifies that interface by resolving with a null uname
     * if an error is encountered.
     */
    getUname() {
        if (!this._UNAME_CACHE) {
            this._UNAME_CACHE = new Promise((resolve, reject) => {
                try {
                    this._exec('uname -a', (err, uname) => {
                        if (err) {
                            return resolve(null);
                        }
                        resolve(uname);
                    });
                }
                catch (e) {
                    resolve(null);
                }
            });
        }
        return this._UNAME_CACHE;
    }
    /**
     * @override
     * Secure compare, from https://github.com/freewil/scmp
     */
    secureCompare(a, b) {
        if (!a || !b) {
            throw new Error('secureCompare must receive two arguments');
        }
        // return early here if buffer lengths are not equal since timingSafeEqual
        // will throw if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        // use crypto.timingSafeEqual if available (since Node.js v6.6.0),
        // otherwise use our own scmp-internal function.
        if (crypto__WEBPACK_IMPORTED_MODULE_0__.timingSafeEqual) {
            const textEncoder = new TextEncoder();
            const aEncoded = textEncoder.encode(a);
            const bEncoded = textEncoder.encode(b);
            return crypto__WEBPACK_IMPORTED_MODULE_0__.timingSafeEqual(aEncoded, bEncoded);
        }
        return super.secureCompare(a, b);
    }
    createEmitter() {
        return new events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    }
    /** @override */
    tryBufferData(data) {
        if (!(data.file.data instanceof events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter)) {
            return Promise.resolve(data);
        }
        const bufferArray = [];
        return new Promise((resolve, reject) => {
            data.file.data
                .on('data', (line) => {
                bufferArray.push(line);
            })
                .once('end', () => {
                // @ts-ignore
                const bufferData = Object.assign({}, data);
                bufferData.file.data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.concat)(bufferArray);
                resolve(bufferData);
            })
                .on('error', (err) => {
                reject(new StreamProcessingError({
                    message: 'An error occurred while attempting to process the file for upload.',
                    detail: err,
                }));
            });
        });
    }
    /** @override */
    createNodeHttpClient(agent) {
        return new _net_NodeHttpClient_js__WEBPACK_IMPORTED_MODULE_3__.NodeHttpClient(agent);
    }
    /** @override */
    createDefaultHttpClient() {
        return new _net_NodeHttpClient_js__WEBPACK_IMPORTED_MODULE_3__.NodeHttpClient();
    }
    /** @override */
    createNodeCryptoProvider() {
        return new _crypto_NodeCryptoProvider_js__WEBPACK_IMPORTED_MODULE_2__.NodeCryptoProvider();
    }
    /** @override */
    createDefaultCryptoProvider() {
        return this.createNodeCryptoProvider();
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/platform/PlatformFunctions.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/platform/PlatformFunctions.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformFunctions: () => (/* binding */ PlatformFunctions)
/* harmony export */ });
/* harmony import */ var _net_FetchHttpClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../net/FetchHttpClient.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/FetchHttpClient.js");
/* harmony import */ var _crypto_SubtleCryptoProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../crypto/SubtleCryptoProvider.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/SubtleCryptoProvider.js");


/**
 * Interface encapsulating various utility functions whose
 * implementations depend on the platform / JS runtime.
 */
class PlatformFunctions {
    constructor() {
        this._fetchFn = null;
        this._agent = null;
    }
    /**
     * Gets uname with Node's built-in `exec` function, if available.
     */
    getUname() {
        throw new Error('getUname not implemented.');
    }
    /**
     * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
     */
    uuid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    /**
     * Compares strings in constant time.
     */
    secureCompare(a, b) {
        // return early here if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        const len = a.length;
        let result = 0;
        for (let i = 0; i < len; ++i) {
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
    /**
     * Creates an event emitter.
     */
    createEmitter() {
        throw new Error('createEmitter not implemented.');
    }
    /**
     * Checks if the request data is a stream. If so, read the entire stream
     * to a buffer and return the buffer.
     */
    tryBufferData(data) {
        throw new Error('tryBufferData not implemented.');
    }
    /**
     * Creates an HTTP client which uses the Node `http` and `https` packages
     * to issue requests.
     */
    createNodeHttpClient(agent) {
        throw new Error('createNodeHttpClient not implemented.');
    }
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */
    createFetchHttpClient(fetchFn) {
        return new _net_FetchHttpClient_js__WEBPACK_IMPORTED_MODULE_0__.FetchHttpClient(fetchFn);
    }
    /**
     * Creates an HTTP client using runtime-specific APIs.
     */
    createDefaultHttpClient() {
        throw new Error('createDefaultHttpClient not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
     */
    createNodeCryptoProvider() {
        throw new Error('createNodeCryptoProvider not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
     */
    createSubtleCryptoProvider(subtleCrypto) {
        return new _crypto_SubtleCryptoProvider_js__WEBPACK_IMPORTED_MODULE_1__.SubtleCryptoProvider(subtleCrypto);
    }
    createDefaultCryptoProvider() {
        throw new Error('createDefaultCryptoProvider not implemented.');
    }
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources.js":
/*!************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Account: () => (/* reexport safe */ _resources_Accounts_js__WEBPACK_IMPORTED_MODULE_81__.Accounts),
/* harmony export */   AccountLinks: () => (/* reexport safe */ _resources_AccountLinks_js__WEBPACK_IMPORTED_MODULE_82__.AccountLinks),
/* harmony export */   AccountSessions: () => (/* reexport safe */ _resources_AccountSessions_js__WEBPACK_IMPORTED_MODULE_83__.AccountSessions),
/* harmony export */   Accounts: () => (/* reexport safe */ _resources_Accounts_js__WEBPACK_IMPORTED_MODULE_81__.Accounts),
/* harmony export */   ApplePayDomains: () => (/* reexport safe */ _resources_ApplePayDomains_js__WEBPACK_IMPORTED_MODULE_84__.ApplePayDomains),
/* harmony export */   ApplicationFees: () => (/* reexport safe */ _resources_ApplicationFees_js__WEBPACK_IMPORTED_MODULE_85__.ApplicationFees),
/* harmony export */   Apps: () => (/* binding */ Apps),
/* harmony export */   Balance: () => (/* reexport safe */ _resources_Balance_js__WEBPACK_IMPORTED_MODULE_86__.Balance),
/* harmony export */   BalanceSettings: () => (/* reexport safe */ _resources_BalanceSettings_js__WEBPACK_IMPORTED_MODULE_87__.BalanceSettings),
/* harmony export */   BalanceTransactions: () => (/* reexport safe */ _resources_BalanceTransactions_js__WEBPACK_IMPORTED_MODULE_88__.BalanceTransactions),
/* harmony export */   Billing: () => (/* binding */ Billing),
/* harmony export */   BillingPortal: () => (/* binding */ BillingPortal),
/* harmony export */   Charges: () => (/* reexport safe */ _resources_Charges_js__WEBPACK_IMPORTED_MODULE_89__.Charges),
/* harmony export */   Checkout: () => (/* binding */ Checkout),
/* harmony export */   Climate: () => (/* binding */ Climate),
/* harmony export */   ConfirmationTokens: () => (/* reexport safe */ _resources_ConfirmationTokens_js__WEBPACK_IMPORTED_MODULE_90__.ConfirmationTokens),
/* harmony export */   CountrySpecs: () => (/* reexport safe */ _resources_CountrySpecs_js__WEBPACK_IMPORTED_MODULE_91__.CountrySpecs),
/* harmony export */   Coupons: () => (/* reexport safe */ _resources_Coupons_js__WEBPACK_IMPORTED_MODULE_92__.Coupons),
/* harmony export */   CreditNotes: () => (/* reexport safe */ _resources_CreditNotes_js__WEBPACK_IMPORTED_MODULE_93__.CreditNotes),
/* harmony export */   CustomerSessions: () => (/* reexport safe */ _resources_CustomerSessions_js__WEBPACK_IMPORTED_MODULE_94__.CustomerSessions),
/* harmony export */   Customers: () => (/* reexport safe */ _resources_Customers_js__WEBPACK_IMPORTED_MODULE_95__.Customers),
/* harmony export */   Disputes: () => (/* reexport safe */ _resources_Disputes_js__WEBPACK_IMPORTED_MODULE_96__.Disputes),
/* harmony export */   Entitlements: () => (/* binding */ Entitlements),
/* harmony export */   EphemeralKeys: () => (/* reexport safe */ _resources_EphemeralKeys_js__WEBPACK_IMPORTED_MODULE_97__.EphemeralKeys),
/* harmony export */   Events: () => (/* reexport safe */ _resources_Events_js__WEBPACK_IMPORTED_MODULE_98__.Events),
/* harmony export */   ExchangeRates: () => (/* reexport safe */ _resources_ExchangeRates_js__WEBPACK_IMPORTED_MODULE_99__.ExchangeRates),
/* harmony export */   FileLinks: () => (/* reexport safe */ _resources_FileLinks_js__WEBPACK_IMPORTED_MODULE_100__.FileLinks),
/* harmony export */   Files: () => (/* reexport safe */ _resources_Files_js__WEBPACK_IMPORTED_MODULE_101__.Files),
/* harmony export */   FinancialConnections: () => (/* binding */ FinancialConnections),
/* harmony export */   Forwarding: () => (/* binding */ Forwarding),
/* harmony export */   Identity: () => (/* binding */ Identity),
/* harmony export */   InvoiceItems: () => (/* reexport safe */ _resources_InvoiceItems_js__WEBPACK_IMPORTED_MODULE_102__.InvoiceItems),
/* harmony export */   InvoicePayments: () => (/* reexport safe */ _resources_InvoicePayments_js__WEBPACK_IMPORTED_MODULE_103__.InvoicePayments),
/* harmony export */   InvoiceRenderingTemplates: () => (/* reexport safe */ _resources_InvoiceRenderingTemplates_js__WEBPACK_IMPORTED_MODULE_104__.InvoiceRenderingTemplates),
/* harmony export */   Invoices: () => (/* reexport safe */ _resources_Invoices_js__WEBPACK_IMPORTED_MODULE_105__.Invoices),
/* harmony export */   Issuing: () => (/* binding */ Issuing),
/* harmony export */   Mandates: () => (/* reexport safe */ _resources_Mandates_js__WEBPACK_IMPORTED_MODULE_106__.Mandates),
/* harmony export */   OAuth: () => (/* reexport safe */ _resources_OAuth_js__WEBPACK_IMPORTED_MODULE_107__.OAuth),
/* harmony export */   PaymentAttemptRecords: () => (/* reexport safe */ _resources_PaymentAttemptRecords_js__WEBPACK_IMPORTED_MODULE_108__.PaymentAttemptRecords),
/* harmony export */   PaymentIntents: () => (/* reexport safe */ _resources_PaymentIntents_js__WEBPACK_IMPORTED_MODULE_109__.PaymentIntents),
/* harmony export */   PaymentLinks: () => (/* reexport safe */ _resources_PaymentLinks_js__WEBPACK_IMPORTED_MODULE_110__.PaymentLinks),
/* harmony export */   PaymentMethodConfigurations: () => (/* reexport safe */ _resources_PaymentMethodConfigurations_js__WEBPACK_IMPORTED_MODULE_111__.PaymentMethodConfigurations),
/* harmony export */   PaymentMethodDomains: () => (/* reexport safe */ _resources_PaymentMethodDomains_js__WEBPACK_IMPORTED_MODULE_112__.PaymentMethodDomains),
/* harmony export */   PaymentMethods: () => (/* reexport safe */ _resources_PaymentMethods_js__WEBPACK_IMPORTED_MODULE_113__.PaymentMethods),
/* harmony export */   PaymentRecords: () => (/* reexport safe */ _resources_PaymentRecords_js__WEBPACK_IMPORTED_MODULE_114__.PaymentRecords),
/* harmony export */   Payouts: () => (/* reexport safe */ _resources_Payouts_js__WEBPACK_IMPORTED_MODULE_115__.Payouts),
/* harmony export */   Plans: () => (/* reexport safe */ _resources_Plans_js__WEBPACK_IMPORTED_MODULE_116__.Plans),
/* harmony export */   Prices: () => (/* reexport safe */ _resources_Prices_js__WEBPACK_IMPORTED_MODULE_117__.Prices),
/* harmony export */   Products: () => (/* reexport safe */ _resources_Products_js__WEBPACK_IMPORTED_MODULE_118__.Products),
/* harmony export */   PromotionCodes: () => (/* reexport safe */ _resources_PromotionCodes_js__WEBPACK_IMPORTED_MODULE_119__.PromotionCodes),
/* harmony export */   Quotes: () => (/* reexport safe */ _resources_Quotes_js__WEBPACK_IMPORTED_MODULE_120__.Quotes),
/* harmony export */   Radar: () => (/* binding */ Radar),
/* harmony export */   Refunds: () => (/* reexport safe */ _resources_Refunds_js__WEBPACK_IMPORTED_MODULE_121__.Refunds),
/* harmony export */   Reporting: () => (/* binding */ Reporting),
/* harmony export */   Reviews: () => (/* reexport safe */ _resources_Reviews_js__WEBPACK_IMPORTED_MODULE_122__.Reviews),
/* harmony export */   SetupAttempts: () => (/* reexport safe */ _resources_SetupAttempts_js__WEBPACK_IMPORTED_MODULE_123__.SetupAttempts),
/* harmony export */   SetupIntents: () => (/* reexport safe */ _resources_SetupIntents_js__WEBPACK_IMPORTED_MODULE_124__.SetupIntents),
/* harmony export */   ShippingRates: () => (/* reexport safe */ _resources_ShippingRates_js__WEBPACK_IMPORTED_MODULE_125__.ShippingRates),
/* harmony export */   Sigma: () => (/* binding */ Sigma),
/* harmony export */   Sources: () => (/* reexport safe */ _resources_Sources_js__WEBPACK_IMPORTED_MODULE_126__.Sources),
/* harmony export */   SubscriptionItems: () => (/* reexport safe */ _resources_SubscriptionItems_js__WEBPACK_IMPORTED_MODULE_127__.SubscriptionItems),
/* harmony export */   SubscriptionSchedules: () => (/* reexport safe */ _resources_SubscriptionSchedules_js__WEBPACK_IMPORTED_MODULE_128__.SubscriptionSchedules),
/* harmony export */   Subscriptions: () => (/* reexport safe */ _resources_Subscriptions_js__WEBPACK_IMPORTED_MODULE_129__.Subscriptions),
/* harmony export */   Tax: () => (/* binding */ Tax),
/* harmony export */   TaxCodes: () => (/* reexport safe */ _resources_TaxCodes_js__WEBPACK_IMPORTED_MODULE_130__.TaxCodes),
/* harmony export */   TaxIds: () => (/* reexport safe */ _resources_TaxIds_js__WEBPACK_IMPORTED_MODULE_131__.TaxIds),
/* harmony export */   TaxRates: () => (/* reexport safe */ _resources_TaxRates_js__WEBPACK_IMPORTED_MODULE_132__.TaxRates),
/* harmony export */   Terminal: () => (/* binding */ Terminal),
/* harmony export */   TestHelpers: () => (/* binding */ TestHelpers),
/* harmony export */   Tokens: () => (/* reexport safe */ _resources_Tokens_js__WEBPACK_IMPORTED_MODULE_133__.Tokens),
/* harmony export */   Topups: () => (/* reexport safe */ _resources_Topups_js__WEBPACK_IMPORTED_MODULE_134__.Topups),
/* harmony export */   Transfers: () => (/* reexport safe */ _resources_Transfers_js__WEBPACK_IMPORTED_MODULE_135__.Transfers),
/* harmony export */   Treasury: () => (/* binding */ Treasury),
/* harmony export */   V2: () => (/* binding */ V2),
/* harmony export */   WebhookEndpoints: () => (/* reexport safe */ _resources_WebhookEndpoints_js__WEBPACK_IMPORTED_MODULE_136__.WebhookEndpoints)
/* harmony export */ });
/* harmony import */ var _ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourceNamespace.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/ResourceNamespace.js");
/* harmony import */ var _resources_V2_Core_AccountLinks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources/V2/Core/AccountLinks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/AccountLinks.js");
/* harmony import */ var _resources_V2_Core_AccountTokens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resources/V2/Core/AccountTokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/AccountTokens.js");
/* harmony import */ var _resources_FinancialConnections_Accounts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resources/FinancialConnections/Accounts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Accounts.js");
/* harmony import */ var _resources_V2_Core_Accounts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resources/V2/Core/Accounts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts.js");
/* harmony import */ var _resources_Entitlements_ActiveEntitlements_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resources/Entitlements/ActiveEntitlements.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Entitlements/ActiveEntitlements.js");
/* harmony import */ var _resources_Billing_Alerts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resources/Billing/Alerts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/Alerts.js");
/* harmony import */ var _resources_Tax_Associations_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resources/Tax/Associations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Associations.js");
/* harmony import */ var _resources_Issuing_Authorizations_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resources/Issuing/Authorizations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Authorizations.js");
/* harmony import */ var _resources_TestHelpers_Issuing_Authorizations_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resources/TestHelpers/Issuing/Authorizations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Authorizations.js");
/* harmony import */ var _resources_Tax_Calculations_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./resources/Tax/Calculations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Calculations.js");
/* harmony import */ var _resources_Issuing_Cardholders_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resources/Issuing/Cardholders.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Cardholders.js");
/* harmony import */ var _resources_Issuing_Cards_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./resources/Issuing/Cards.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Cards.js");
/* harmony import */ var _resources_TestHelpers_Issuing_Cards_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./resources/TestHelpers/Issuing/Cards.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js");
/* harmony import */ var _resources_BillingPortal_Configurations_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./resources/BillingPortal/Configurations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BillingPortal/Configurations.js");
/* harmony import */ var _resources_Terminal_Configurations_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./resources/Terminal/Configurations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Configurations.js");
/* harmony import */ var _resources_TestHelpers_ConfirmationTokens_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./resources/TestHelpers/ConfirmationTokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/ConfirmationTokens.js");
/* harmony import */ var _resources_Terminal_ConnectionTokens_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./resources/Terminal/ConnectionTokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js");
/* harmony import */ var _resources_Billing_CreditBalanceSummary_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./resources/Billing/CreditBalanceSummary.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditBalanceSummary.js");
/* harmony import */ var _resources_Billing_CreditBalanceTransactions_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./resources/Billing/CreditBalanceTransactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditBalanceTransactions.js");
/* harmony import */ var _resources_Billing_CreditGrants_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./resources/Billing/CreditGrants.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditGrants.js");
/* harmony import */ var _resources_Treasury_CreditReversals_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./resources/Treasury/CreditReversals.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/CreditReversals.js");
/* harmony import */ var _resources_TestHelpers_Customers_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./resources/TestHelpers/Customers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Customers.js");
/* harmony import */ var _resources_Treasury_DebitReversals_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./resources/Treasury/DebitReversals.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/DebitReversals.js");
/* harmony import */ var _resources_Issuing_Disputes_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./resources/Issuing/Disputes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Disputes.js");
/* harmony import */ var _resources_Radar_EarlyFraudWarnings_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./resources/Radar/EarlyFraudWarnings.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js");
/* harmony import */ var _resources_V2_Core_EventDestinations_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./resources/V2/Core/EventDestinations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/EventDestinations.js");
/* harmony import */ var _resources_V2_Core_Events_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./resources/V2/Core/Events.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Events.js");
/* harmony import */ var _resources_Entitlements_Features_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./resources/Entitlements/Features.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Entitlements/Features.js");
/* harmony import */ var _resources_Treasury_FinancialAccounts_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./resources/Treasury/FinancialAccounts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js");
/* harmony import */ var _resources_TestHelpers_Treasury_InboundTransfers_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./resources/TestHelpers/Treasury/InboundTransfers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js");
/* harmony import */ var _resources_Treasury_InboundTransfers_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./resources/Treasury/InboundTransfers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/InboundTransfers.js");
/* harmony import */ var _resources_Terminal_Locations_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./resources/Terminal/Locations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Locations.js");
/* harmony import */ var _resources_Billing_MeterEventAdjustments_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./resources/Billing/MeterEventAdjustments.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/MeterEventAdjustments.js");
/* harmony import */ var _resources_V2_Billing_MeterEventAdjustments_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./resources/V2/Billing/MeterEventAdjustments.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventAdjustments.js");
/* harmony import */ var _resources_V2_Billing_MeterEventSession_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./resources/V2/Billing/MeterEventSession.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventSession.js");
/* harmony import */ var _resources_V2_Billing_MeterEventStream_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./resources/V2/Billing/MeterEventStream.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventStream.js");
/* harmony import */ var _resources_Billing_MeterEvents_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./resources/Billing/MeterEvents.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/MeterEvents.js");
/* harmony import */ var _resources_V2_Billing_MeterEvents_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./resources/V2/Billing/MeterEvents.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEvents.js");
/* harmony import */ var _resources_Billing_Meters_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./resources/Billing/Meters.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/Meters.js");
/* harmony import */ var _resources_Terminal_OnboardingLinks_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./resources/Terminal/OnboardingLinks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/OnboardingLinks.js");
/* harmony import */ var _resources_Climate_Orders_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./resources/Climate/Orders.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Orders.js");
/* harmony import */ var _resources_TestHelpers_Treasury_OutboundPayments_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./resources/TestHelpers/Treasury/OutboundPayments.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js");
/* harmony import */ var _resources_Treasury_OutboundPayments_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./resources/Treasury/OutboundPayments.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/OutboundPayments.js");
/* harmony import */ var _resources_TestHelpers_Treasury_OutboundTransfers_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./resources/TestHelpers/Treasury/OutboundTransfers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js");
/* harmony import */ var _resources_Treasury_OutboundTransfers_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./resources/Treasury/OutboundTransfers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js");
/* harmony import */ var _resources_Radar_PaymentEvaluations_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./resources/Radar/PaymentEvaluations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/PaymentEvaluations.js");
/* harmony import */ var _resources_Issuing_PersonalizationDesigns_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./resources/Issuing/PersonalizationDesigns.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/PersonalizationDesigns.js");
/* harmony import */ var _resources_TestHelpers_Issuing_PersonalizationDesigns_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./resources/TestHelpers/Issuing/PersonalizationDesigns.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/PersonalizationDesigns.js");
/* harmony import */ var _resources_Issuing_PhysicalBundles_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./resources/Issuing/PhysicalBundles.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/PhysicalBundles.js");
/* harmony import */ var _resources_Climate_Products_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./resources/Climate/Products.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Products.js");
/* harmony import */ var _resources_Terminal_Readers_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./resources/Terminal/Readers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Readers.js");
/* harmony import */ var _resources_TestHelpers_Terminal_Readers_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./resources/TestHelpers/Terminal/Readers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js");
/* harmony import */ var _resources_TestHelpers_Treasury_ReceivedCredits_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./resources/TestHelpers/Treasury/ReceivedCredits.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js");
/* harmony import */ var _resources_Treasury_ReceivedCredits_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./resources/Treasury/ReceivedCredits.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js");
/* harmony import */ var _resources_TestHelpers_Treasury_ReceivedDebits_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./resources/TestHelpers/Treasury/ReceivedDebits.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js");
/* harmony import */ var _resources_Treasury_ReceivedDebits_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./resources/Treasury/ReceivedDebits.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js");
/* harmony import */ var _resources_TestHelpers_Refunds_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./resources/TestHelpers/Refunds.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Refunds.js");
/* harmony import */ var _resources_Tax_Registrations_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./resources/Tax/Registrations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Registrations.js");
/* harmony import */ var _resources_Reporting_ReportRuns_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./resources/Reporting/ReportRuns.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reporting/ReportRuns.js");
/* harmony import */ var _resources_Reporting_ReportTypes_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./resources/Reporting/ReportTypes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reporting/ReportTypes.js");
/* harmony import */ var _resources_Forwarding_Requests_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./resources/Forwarding/Requests.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Forwarding/Requests.js");
/* harmony import */ var _resources_Sigma_ScheduledQueryRuns_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./resources/Sigma/ScheduledQueryRuns.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js");
/* harmony import */ var _resources_Apps_Secrets_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./resources/Apps/Secrets.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Apps/Secrets.js");
/* harmony import */ var _resources_BillingPortal_Sessions_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./resources/BillingPortal/Sessions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BillingPortal/Sessions.js");
/* harmony import */ var _resources_Checkout_Sessions_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./resources/Checkout/Sessions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Checkout/Sessions.js");
/* harmony import */ var _resources_FinancialConnections_Sessions_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./resources/FinancialConnections/Sessions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Sessions.js");
/* harmony import */ var _resources_Tax_Settings_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./resources/Tax/Settings.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Settings.js");
/* harmony import */ var _resources_Climate_Suppliers_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./resources/Climate/Suppliers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Suppliers.js");
/* harmony import */ var _resources_TestHelpers_TestClocks_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./resources/TestHelpers/TestClocks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/TestClocks.js");
/* harmony import */ var _resources_Issuing_Tokens_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./resources/Issuing/Tokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Tokens.js");
/* harmony import */ var _resources_Treasury_TransactionEntries_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./resources/Treasury/TransactionEntries.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/TransactionEntries.js");
/* harmony import */ var _resources_FinancialConnections_Transactions_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./resources/FinancialConnections/Transactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Transactions.js");
/* harmony import */ var _resources_Issuing_Transactions_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./resources/Issuing/Transactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Transactions.js");
/* harmony import */ var _resources_Tax_Transactions_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./resources/Tax/Transactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Transactions.js");
/* harmony import */ var _resources_TestHelpers_Issuing_Transactions_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./resources/TestHelpers/Issuing/Transactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Transactions.js");
/* harmony import */ var _resources_Treasury_Transactions_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./resources/Treasury/Transactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/Transactions.js");
/* harmony import */ var _resources_Radar_ValueListItems_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./resources/Radar/ValueListItems.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/ValueListItems.js");
/* harmony import */ var _resources_Radar_ValueLists_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./resources/Radar/ValueLists.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/ValueLists.js");
/* harmony import */ var _resources_Identity_VerificationReports_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./resources/Identity/VerificationReports.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Identity/VerificationReports.js");
/* harmony import */ var _resources_Identity_VerificationSessions_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./resources/Identity/VerificationSessions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Identity/VerificationSessions.js");
/* harmony import */ var _resources_Accounts_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./resources/Accounts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Accounts.js");
/* harmony import */ var _resources_AccountLinks_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./resources/AccountLinks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/AccountLinks.js");
/* harmony import */ var _resources_AccountSessions_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./resources/AccountSessions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/AccountSessions.js");
/* harmony import */ var _resources_ApplePayDomains_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./resources/ApplePayDomains.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ApplePayDomains.js");
/* harmony import */ var _resources_ApplicationFees_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./resources/ApplicationFees.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ApplicationFees.js");
/* harmony import */ var _resources_Balance_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./resources/Balance.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Balance.js");
/* harmony import */ var _resources_BalanceSettings_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./resources/BalanceSettings.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BalanceSettings.js");
/* harmony import */ var _resources_BalanceTransactions_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./resources/BalanceTransactions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BalanceTransactions.js");
/* harmony import */ var _resources_Charges_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./resources/Charges.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Charges.js");
/* harmony import */ var _resources_ConfirmationTokens_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./resources/ConfirmationTokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ConfirmationTokens.js");
/* harmony import */ var _resources_CountrySpecs_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./resources/CountrySpecs.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CountrySpecs.js");
/* harmony import */ var _resources_Coupons_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./resources/Coupons.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Coupons.js");
/* harmony import */ var _resources_CreditNotes_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./resources/CreditNotes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CreditNotes.js");
/* harmony import */ var _resources_CustomerSessions_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./resources/CustomerSessions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CustomerSessions.js");
/* harmony import */ var _resources_Customers_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./resources/Customers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Customers.js");
/* harmony import */ var _resources_Disputes_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./resources/Disputes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Disputes.js");
/* harmony import */ var _resources_EphemeralKeys_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./resources/EphemeralKeys.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/EphemeralKeys.js");
/* harmony import */ var _resources_Events_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./resources/Events.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Events.js");
/* harmony import */ var _resources_ExchangeRates_js__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./resources/ExchangeRates.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ExchangeRates.js");
/* harmony import */ var _resources_FileLinks_js__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./resources/FileLinks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FileLinks.js");
/* harmony import */ var _resources_Files_js__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./resources/Files.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Files.js");
/* harmony import */ var _resources_InvoiceItems_js__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./resources/InvoiceItems.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoiceItems.js");
/* harmony import */ var _resources_InvoicePayments_js__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./resources/InvoicePayments.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoicePayments.js");
/* harmony import */ var _resources_InvoiceRenderingTemplates_js__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./resources/InvoiceRenderingTemplates.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoiceRenderingTemplates.js");
/* harmony import */ var _resources_Invoices_js__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./resources/Invoices.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Invoices.js");
/* harmony import */ var _resources_Mandates_js__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./resources/Mandates.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Mandates.js");
/* harmony import */ var _resources_OAuth_js__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./resources/OAuth.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/OAuth.js");
/* harmony import */ var _resources_PaymentAttemptRecords_js__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./resources/PaymentAttemptRecords.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentAttemptRecords.js");
/* harmony import */ var _resources_PaymentIntents_js__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./resources/PaymentIntents.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentIntents.js");
/* harmony import */ var _resources_PaymentLinks_js__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./resources/PaymentLinks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentLinks.js");
/* harmony import */ var _resources_PaymentMethodConfigurations_js__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./resources/PaymentMethodConfigurations.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethodConfigurations.js");
/* harmony import */ var _resources_PaymentMethodDomains_js__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./resources/PaymentMethodDomains.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethodDomains.js");
/* harmony import */ var _resources_PaymentMethods_js__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./resources/PaymentMethods.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethods.js");
/* harmony import */ var _resources_PaymentRecords_js__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./resources/PaymentRecords.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentRecords.js");
/* harmony import */ var _resources_Payouts_js__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./resources/Payouts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Payouts.js");
/* harmony import */ var _resources_Plans_js__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./resources/Plans.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Plans.js");
/* harmony import */ var _resources_Prices_js__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./resources/Prices.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Prices.js");
/* harmony import */ var _resources_Products_js__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./resources/Products.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Products.js");
/* harmony import */ var _resources_PromotionCodes_js__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./resources/PromotionCodes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PromotionCodes.js");
/* harmony import */ var _resources_Quotes_js__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./resources/Quotes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Quotes.js");
/* harmony import */ var _resources_Refunds_js__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./resources/Refunds.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Refunds.js");
/* harmony import */ var _resources_Reviews_js__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./resources/Reviews.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reviews.js");
/* harmony import */ var _resources_SetupAttempts_js__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./resources/SetupAttempts.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SetupAttempts.js");
/* harmony import */ var _resources_SetupIntents_js__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./resources/SetupIntents.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SetupIntents.js");
/* harmony import */ var _resources_ShippingRates_js__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./resources/ShippingRates.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ShippingRates.js");
/* harmony import */ var _resources_Sources_js__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./resources/Sources.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Sources.js");
/* harmony import */ var _resources_SubscriptionItems_js__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./resources/SubscriptionItems.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SubscriptionItems.js");
/* harmony import */ var _resources_SubscriptionSchedules_js__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./resources/SubscriptionSchedules.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SubscriptionSchedules.js");
/* harmony import */ var _resources_Subscriptions_js__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./resources/Subscriptions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Subscriptions.js");
/* harmony import */ var _resources_TaxCodes_js__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./resources/TaxCodes.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxCodes.js");
/* harmony import */ var _resources_TaxIds_js__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./resources/TaxIds.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxIds.js");
/* harmony import */ var _resources_TaxRates_js__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./resources/TaxRates.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxRates.js");
/* harmony import */ var _resources_Tokens_js__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./resources/Tokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tokens.js");
/* harmony import */ var _resources_Topups_js__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./resources/Topups.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Topups.js");
/* harmony import */ var _resources_Transfers_js__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./resources/Transfers.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Transfers.js");
/* harmony import */ var _resources_WebhookEndpoints_js__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./resources/WebhookEndpoints.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/WebhookEndpoints.js");
// File generated from our OpenAPI spec










































































































































const Apps = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('apps', { Secrets: _resources_Apps_Secrets_js__WEBPACK_IMPORTED_MODULE_63__.Secrets });
const Billing = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('billing', {
    Alerts: _resources_Billing_Alerts_js__WEBPACK_IMPORTED_MODULE_6__.Alerts,
    CreditBalanceSummary: _resources_Billing_CreditBalanceSummary_js__WEBPACK_IMPORTED_MODULE_18__.CreditBalanceSummary,
    CreditBalanceTransactions: _resources_Billing_CreditBalanceTransactions_js__WEBPACK_IMPORTED_MODULE_19__.CreditBalanceTransactions,
    CreditGrants: _resources_Billing_CreditGrants_js__WEBPACK_IMPORTED_MODULE_20__.CreditGrants,
    MeterEventAdjustments: _resources_Billing_MeterEventAdjustments_js__WEBPACK_IMPORTED_MODULE_33__.MeterEventAdjustments,
    MeterEvents: _resources_Billing_MeterEvents_js__WEBPACK_IMPORTED_MODULE_37__.MeterEvents,
    Meters: _resources_Billing_Meters_js__WEBPACK_IMPORTED_MODULE_39__.Meters,
});
const BillingPortal = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('billingPortal', {
    Configurations: _resources_BillingPortal_Configurations_js__WEBPACK_IMPORTED_MODULE_14__.Configurations,
    Sessions: _resources_BillingPortal_Sessions_js__WEBPACK_IMPORTED_MODULE_64__.Sessions,
});
const Checkout = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('checkout', {
    Sessions: _resources_Checkout_Sessions_js__WEBPACK_IMPORTED_MODULE_65__.Sessions,
});
const Climate = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('climate', {
    Orders: _resources_Climate_Orders_js__WEBPACK_IMPORTED_MODULE_41__.Orders,
    Products: _resources_Climate_Products_js__WEBPACK_IMPORTED_MODULE_50__.Products,
    Suppliers: _resources_Climate_Suppliers_js__WEBPACK_IMPORTED_MODULE_68__.Suppliers,
});
const Entitlements = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('entitlements', {
    ActiveEntitlements: _resources_Entitlements_ActiveEntitlements_js__WEBPACK_IMPORTED_MODULE_5__.ActiveEntitlements,
    Features: _resources_Entitlements_Features_js__WEBPACK_IMPORTED_MODULE_28__.Features,
});
const FinancialConnections = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('financialConnections', {
    Accounts: _resources_FinancialConnections_Accounts_js__WEBPACK_IMPORTED_MODULE_3__.Accounts,
    Sessions: _resources_FinancialConnections_Sessions_js__WEBPACK_IMPORTED_MODULE_66__.Sessions,
    Transactions: _resources_FinancialConnections_Transactions_js__WEBPACK_IMPORTED_MODULE_72__.Transactions,
});
const Forwarding = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('forwarding', {
    Requests: _resources_Forwarding_Requests_js__WEBPACK_IMPORTED_MODULE_61__.Requests,
});
const Identity = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('identity', {
    VerificationReports: _resources_Identity_VerificationReports_js__WEBPACK_IMPORTED_MODULE_79__.VerificationReports,
    VerificationSessions: _resources_Identity_VerificationSessions_js__WEBPACK_IMPORTED_MODULE_80__.VerificationSessions,
});
const Issuing = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('issuing', {
    Authorizations: _resources_Issuing_Authorizations_js__WEBPACK_IMPORTED_MODULE_8__.Authorizations,
    Cardholders: _resources_Issuing_Cardholders_js__WEBPACK_IMPORTED_MODULE_11__.Cardholders,
    Cards: _resources_Issuing_Cards_js__WEBPACK_IMPORTED_MODULE_12__.Cards,
    Disputes: _resources_Issuing_Disputes_js__WEBPACK_IMPORTED_MODULE_24__.Disputes,
    PersonalizationDesigns: _resources_Issuing_PersonalizationDesigns_js__WEBPACK_IMPORTED_MODULE_47__.PersonalizationDesigns,
    PhysicalBundles: _resources_Issuing_PhysicalBundles_js__WEBPACK_IMPORTED_MODULE_49__.PhysicalBundles,
    Tokens: _resources_Issuing_Tokens_js__WEBPACK_IMPORTED_MODULE_70__.Tokens,
    Transactions: _resources_Issuing_Transactions_js__WEBPACK_IMPORTED_MODULE_73__.Transactions,
});
const Radar = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('radar', {
    EarlyFraudWarnings: _resources_Radar_EarlyFraudWarnings_js__WEBPACK_IMPORTED_MODULE_25__.EarlyFraudWarnings,
    PaymentEvaluations: _resources_Radar_PaymentEvaluations_js__WEBPACK_IMPORTED_MODULE_46__.PaymentEvaluations,
    ValueListItems: _resources_Radar_ValueListItems_js__WEBPACK_IMPORTED_MODULE_77__.ValueListItems,
    ValueLists: _resources_Radar_ValueLists_js__WEBPACK_IMPORTED_MODULE_78__.ValueLists,
});
const Reporting = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('reporting', {
    ReportRuns: _resources_Reporting_ReportRuns_js__WEBPACK_IMPORTED_MODULE_59__.ReportRuns,
    ReportTypes: _resources_Reporting_ReportTypes_js__WEBPACK_IMPORTED_MODULE_60__.ReportTypes,
});
const Sigma = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('sigma', {
    ScheduledQueryRuns: _resources_Sigma_ScheduledQueryRuns_js__WEBPACK_IMPORTED_MODULE_62__.ScheduledQueryRuns,
});
const Tax = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('tax', {
    Associations: _resources_Tax_Associations_js__WEBPACK_IMPORTED_MODULE_7__.Associations,
    Calculations: _resources_Tax_Calculations_js__WEBPACK_IMPORTED_MODULE_10__.Calculations,
    Registrations: _resources_Tax_Registrations_js__WEBPACK_IMPORTED_MODULE_58__.Registrations,
    Settings: _resources_Tax_Settings_js__WEBPACK_IMPORTED_MODULE_67__.Settings,
    Transactions: _resources_Tax_Transactions_js__WEBPACK_IMPORTED_MODULE_74__.Transactions,
});
const Terminal = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('terminal', {
    Configurations: _resources_Terminal_Configurations_js__WEBPACK_IMPORTED_MODULE_15__.Configurations,
    ConnectionTokens: _resources_Terminal_ConnectionTokens_js__WEBPACK_IMPORTED_MODULE_17__.ConnectionTokens,
    Locations: _resources_Terminal_Locations_js__WEBPACK_IMPORTED_MODULE_32__.Locations,
    OnboardingLinks: _resources_Terminal_OnboardingLinks_js__WEBPACK_IMPORTED_MODULE_40__.OnboardingLinks,
    Readers: _resources_Terminal_Readers_js__WEBPACK_IMPORTED_MODULE_51__.Readers,
});
const TestHelpers = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('testHelpers', {
    ConfirmationTokens: _resources_TestHelpers_ConfirmationTokens_js__WEBPACK_IMPORTED_MODULE_16__.ConfirmationTokens,
    Customers: _resources_TestHelpers_Customers_js__WEBPACK_IMPORTED_MODULE_22__.Customers,
    Refunds: _resources_TestHelpers_Refunds_js__WEBPACK_IMPORTED_MODULE_57__.Refunds,
    TestClocks: _resources_TestHelpers_TestClocks_js__WEBPACK_IMPORTED_MODULE_69__.TestClocks,
    Issuing: (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('issuing', {
        Authorizations: _resources_TestHelpers_Issuing_Authorizations_js__WEBPACK_IMPORTED_MODULE_9__.Authorizations,
        Cards: _resources_TestHelpers_Issuing_Cards_js__WEBPACK_IMPORTED_MODULE_13__.Cards,
        PersonalizationDesigns: _resources_TestHelpers_Issuing_PersonalizationDesigns_js__WEBPACK_IMPORTED_MODULE_48__.PersonalizationDesigns,
        Transactions: _resources_TestHelpers_Issuing_Transactions_js__WEBPACK_IMPORTED_MODULE_75__.Transactions,
    }),
    Terminal: (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('terminal', {
        Readers: _resources_TestHelpers_Terminal_Readers_js__WEBPACK_IMPORTED_MODULE_52__.Readers,
    }),
    Treasury: (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('treasury', {
        InboundTransfers: _resources_TestHelpers_Treasury_InboundTransfers_js__WEBPACK_IMPORTED_MODULE_30__.InboundTransfers,
        OutboundPayments: _resources_TestHelpers_Treasury_OutboundPayments_js__WEBPACK_IMPORTED_MODULE_42__.OutboundPayments,
        OutboundTransfers: _resources_TestHelpers_Treasury_OutboundTransfers_js__WEBPACK_IMPORTED_MODULE_44__.OutboundTransfers,
        ReceivedCredits: _resources_TestHelpers_Treasury_ReceivedCredits_js__WEBPACK_IMPORTED_MODULE_53__.ReceivedCredits,
        ReceivedDebits: _resources_TestHelpers_Treasury_ReceivedDebits_js__WEBPACK_IMPORTED_MODULE_55__.ReceivedDebits,
    }),
});
const Treasury = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('treasury', {
    CreditReversals: _resources_Treasury_CreditReversals_js__WEBPACK_IMPORTED_MODULE_21__.CreditReversals,
    DebitReversals: _resources_Treasury_DebitReversals_js__WEBPACK_IMPORTED_MODULE_23__.DebitReversals,
    FinancialAccounts: _resources_Treasury_FinancialAccounts_js__WEBPACK_IMPORTED_MODULE_29__.FinancialAccounts,
    InboundTransfers: _resources_Treasury_InboundTransfers_js__WEBPACK_IMPORTED_MODULE_31__.InboundTransfers,
    OutboundPayments: _resources_Treasury_OutboundPayments_js__WEBPACK_IMPORTED_MODULE_43__.OutboundPayments,
    OutboundTransfers: _resources_Treasury_OutboundTransfers_js__WEBPACK_IMPORTED_MODULE_45__.OutboundTransfers,
    ReceivedCredits: _resources_Treasury_ReceivedCredits_js__WEBPACK_IMPORTED_MODULE_54__.ReceivedCredits,
    ReceivedDebits: _resources_Treasury_ReceivedDebits_js__WEBPACK_IMPORTED_MODULE_56__.ReceivedDebits,
    TransactionEntries: _resources_Treasury_TransactionEntries_js__WEBPACK_IMPORTED_MODULE_71__.TransactionEntries,
    Transactions: _resources_Treasury_Transactions_js__WEBPACK_IMPORTED_MODULE_76__.Transactions,
});
const V2 = (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('v2', {
    Billing: (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('billing', {
        MeterEventAdjustments: _resources_V2_Billing_MeterEventAdjustments_js__WEBPACK_IMPORTED_MODULE_34__.MeterEventAdjustments,
        MeterEventSession: _resources_V2_Billing_MeterEventSession_js__WEBPACK_IMPORTED_MODULE_35__.MeterEventSession,
        MeterEventStream: _resources_V2_Billing_MeterEventStream_js__WEBPACK_IMPORTED_MODULE_36__.MeterEventStream,
        MeterEvents: _resources_V2_Billing_MeterEvents_js__WEBPACK_IMPORTED_MODULE_38__.MeterEvents,
    }),
    Core: (0,_ResourceNamespace_js__WEBPACK_IMPORTED_MODULE_0__.resourceNamespace)('core', {
        AccountLinks: _resources_V2_Core_AccountLinks_js__WEBPACK_IMPORTED_MODULE_1__.AccountLinks,
        AccountTokens: _resources_V2_Core_AccountTokens_js__WEBPACK_IMPORTED_MODULE_2__.AccountTokens,
        Accounts: _resources_V2_Core_Accounts_js__WEBPACK_IMPORTED_MODULE_4__.Accounts,
        EventDestinations: _resources_V2_Core_EventDestinations_js__WEBPACK_IMPORTED_MODULE_26__.EventDestinations,
        Events: _resources_V2_Core_Events_js__WEBPACK_IMPORTED_MODULE_27__.Events,
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/AccountLinks.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/AccountLinks.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountLinks: () => (/* binding */ AccountLinks)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const AccountLinks = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/account_links' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/AccountSessions.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/AccountSessions.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountSessions: () => (/* binding */ AccountSessions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const AccountSessions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/account_sessions' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Accounts.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Accounts.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accounts: () => (/* binding */ Accounts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
// Since path can either be `account` or `accounts`, support both through stripeMethod path
const Accounts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/accounts' }),
    retrieve(id, ...args) {
        // No longer allow an api key to be passed as the first string to this function due to ambiguity between
        // old account ids and api keys. To request the account for an api key, send null as the id
        if (typeof id === 'string') {
            return stripeMethod({
                method: 'GET',
                fullPath: '/v1/accounts/{id}',
            }).apply(this, [id, ...args]);
        }
        else {
            if (id === null || id === undefined) {
                // Remove id as stripeMethod would complain of unexpected argument
                [].shift.apply([id, ...args]);
            }
            return stripeMethod({
                method: 'GET',
                fullPath: '/v1/account',
            }).apply(this, [id, ...args]);
        }
    },
    update: stripeMethod({ method: 'POST', fullPath: '/v1/accounts/{account}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/accounts/{account}' }),
    createExternalAccount: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts',
    }),
    createLoginLink: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/login_links',
    }),
    createPerson: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons',
    }),
    deleteExternalAccount: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    deletePerson: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
    listCapabilities: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities',
        methodType: 'list',
    }),
    listExternalAccounts: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts',
        methodType: 'list',
    }),
    listPersons: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons',
        methodType: 'list',
    }),
    reject: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/reject',
    }),
    retrieveCurrent: stripeMethod({ method: 'GET', fullPath: '/v1/account' }),
    retrieveCapability: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}',
    }),
    retrieveExternalAccount: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    retrievePerson: stripeMethod({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
    updateCapability: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}',
    }),
    updateExternalAccount: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}',
    }),
    updatePerson: stripeMethod({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons/{person}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ApplePayDomains.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ApplePayDomains.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplePayDomains: () => (/* binding */ ApplePayDomains)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ApplePayDomains = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/apple_pay/domains' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains/{domain}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/apple_pay/domains/{domain}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ApplicationFees.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ApplicationFees.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplicationFees: () => (/* binding */ ApplicationFees)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ApplicationFees = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees',
        methodType: 'list',
    }),
    createRefund: stripeMethod({
        method: 'POST',
        fullPath: '/v1/application_fees/{id}/refunds',
    }),
    listRefunds: stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}/refunds',
        methodType: 'list',
    }),
    retrieveRefund: stripeMethod({
        method: 'GET',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}',
    }),
    updateRefund: stripeMethod({
        method: 'POST',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Apps/Secrets.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Apps/Secrets.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Secrets: () => (/* binding */ Secrets)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Secrets = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/apps/secrets' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/apps/secrets',
        methodType: 'list',
    }),
    deleteWhere: stripeMethod({
        method: 'POST',
        fullPath: '/v1/apps/secrets/delete',
    }),
    find: stripeMethod({ method: 'GET', fullPath: '/v1/apps/secrets/find' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Balance.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Balance.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Balance: () => (/* binding */ Balance)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Balance = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/balance' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BalanceSettings.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BalanceSettings.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BalanceSettings: () => (/* binding */ BalanceSettings)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const BalanceSettings = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/balance_settings' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/balance_settings' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BalanceTransactions.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BalanceTransactions.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BalanceTransactions: () => (/* binding */ BalanceTransactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const BalanceTransactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/balance_transactions/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/balance_transactions',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/Alerts.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/Alerts.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alerts: () => (/* binding */ Alerts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Alerts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/billing/alerts' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/billing/alerts/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/alerts',
        methodType: 'list',
    }),
    activate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/activate',
    }),
    archive: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/archive',
    }),
    deactivate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/deactivate',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditBalanceSummary.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditBalanceSummary.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreditBalanceSummary: () => (/* binding */ CreditBalanceSummary)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CreditBalanceSummary = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_summary',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditBalanceTransactions.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditBalanceTransactions.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreditBalanceTransactions: () => (/* binding */ CreditBalanceTransactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CreditBalanceTransactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditGrants.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/CreditGrants.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreditGrants: () => (/* binding */ CreditGrants)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CreditGrants = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/billing/credit_grants' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants',
        methodType: 'list',
    }),
    expire: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/expire',
    }),
    voidGrant: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/void',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/MeterEventAdjustments.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/MeterEventAdjustments.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeterEventAdjustments: () => (/* binding */ MeterEventAdjustments)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const MeterEventAdjustments = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/meter_event_adjustments',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/MeterEvents.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/MeterEvents.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeterEvents: () => (/* binding */ MeterEvents)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const MeterEvents = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/billing/meter_events' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/Meters.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Billing/Meters.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Meters: () => (/* binding */ Meters)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Meters = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/billing/meters' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/billing/meters/{id}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/billing/meters/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/meters',
        methodType: 'list',
    }),
    deactivate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}/deactivate',
    }),
    listEventSummaries: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing/meters/{id}/event_summaries',
        methodType: 'list',
    }),
    reactivate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}/reactivate',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BillingPortal/Configurations.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BillingPortal/Configurations.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Configurations: () => (/* binding */ Configurations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Configurations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations/{configuration}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations/{configuration}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BillingPortal/Sessions.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/BillingPortal/Sessions.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sessions: () => (/* binding */ Sessions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Sessions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/billing_portal/sessions',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Charges.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Charges.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Charges: () => (/* binding */ Charges)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Charges = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/charges' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/charges/{charge}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/charges/{charge}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/charges',
        methodType: 'list',
    }),
    capture: stripeMethod({
        method: 'POST',
        fullPath: '/v1/charges/{charge}/capture',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/charges/search',
        methodType: 'search',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Checkout/Sessions.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Checkout/Sessions.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sessions: () => (/* binding */ Sessions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Sessions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/checkout/sessions' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/checkout/sessions',
        methodType: 'list',
    }),
    expire: stripeMethod({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}/expire',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}/line_items',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Orders.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Orders.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Orders: () => (/* binding */ Orders)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Orders = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/climate/orders' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/climate/orders/{order}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/climate/orders/{order}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/climate/orders',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/climate/orders/{order}/cancel',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Products.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Products.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Products: () => (/* binding */ Products)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Products = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/climate/products/{product}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/climate/products',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Suppliers.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Climate/Suppliers.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Suppliers: () => (/* binding */ Suppliers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Suppliers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/climate/suppliers/{supplier}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/climate/suppliers',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ConfirmationTokens.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ConfirmationTokens.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmationTokens: () => (/* binding */ ConfirmationTokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ConfirmationTokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/confirmation_tokens/{confirmation_token}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CountrySpecs.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CountrySpecs.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CountrySpecs: () => (/* binding */ CountrySpecs)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CountrySpecs = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/country_specs/{country}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/country_specs',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Coupons.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Coupons.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Coupons: () => (/* binding */ Coupons)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Coupons = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/coupons' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/coupons/{coupon}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/coupons/{coupon}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/coupons',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/coupons/{coupon}' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CreditNotes.js":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CreditNotes.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreditNotes: () => (/* binding */ CreditNotes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CreditNotes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/credit_notes' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/credit_notes/{id}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/credit_notes/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes',
        methodType: 'list',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes/{credit_note}/lines',
        methodType: 'list',
    }),
    listPreviewLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/credit_notes/preview/lines',
        methodType: 'list',
    }),
    preview: stripeMethod({ method: 'GET', fullPath: '/v1/credit_notes/preview' }),
    voidCreditNote: stripeMethod({
        method: 'POST',
        fullPath: '/v1/credit_notes/{id}/void',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CustomerSessions.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/CustomerSessions.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomerSessions: () => (/* binding */ CustomerSessions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CustomerSessions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/customer_sessions' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Customers.js":
/*!**********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Customers.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Customers: () => (/* binding */ Customers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Customers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/customers' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/customers/{customer}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/customers/{customer}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/customers/{customer}' }),
    createBalanceTransaction: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions',
    }),
    createFundingInstructions: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/funding_instructions',
    }),
    createSource: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources',
    }),
    createTaxId: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/tax_ids',
    }),
    deleteDiscount: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/discount',
    }),
    deleteSource: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    deleteTaxId: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}',
    }),
    listBalanceTransactions: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions',
        methodType: 'list',
    }),
    listCashBalanceTransactions: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions',
        methodType: 'list',
    }),
    listPaymentMethods: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods',
        methodType: 'list',
    }),
    listSources: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources',
        methodType: 'list',
    }),
    listTaxIds: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids',
        methodType: 'list',
    }),
    retrieveBalanceTransaction: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}',
    }),
    retrieveCashBalance: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance',
    }),
    retrieveCashBalanceTransaction: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions/{transaction}',
    }),
    retrievePaymentMethod: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods/{payment_method}',
    }),
    retrieveSource: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    retrieveTaxId: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/customers/search',
        methodType: 'search',
    }),
    updateBalanceTransaction: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}',
    }),
    updateCashBalance: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/cash_balance',
    }),
    updateSource: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}',
    }),
    verifySource: stripeMethod({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}/verify',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Disputes.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Disputes.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Disputes: () => (/* binding */ Disputes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Disputes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/disputes/{dispute}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/disputes/{dispute}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/disputes',
        methodType: 'list',
    }),
    close: stripeMethod({
        method: 'POST',
        fullPath: '/v1/disputes/{dispute}/close',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Entitlements/ActiveEntitlements.js":
/*!********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Entitlements/ActiveEntitlements.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActiveEntitlements: () => (/* binding */ ActiveEntitlements)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ActiveEntitlements = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/entitlements/active_entitlements/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/entitlements/active_entitlements',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Entitlements/Features.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Entitlements/Features.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Features: () => (/* binding */ Features)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Features = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/entitlements/features' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/entitlements/features/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/entitlements/features/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/entitlements/features',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/EphemeralKeys.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/EphemeralKeys.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EphemeralKeys: () => (/* binding */ EphemeralKeys)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const EphemeralKeys = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/ephemeral_keys',
        validator: (data, options) => {
            if (!options.headers || !options.headers['Stripe-Version']) {
                throw new Error('Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node');
            }
        },
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/ephemeral_keys/{key}' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Events.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Events.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: () => (/* binding */ Events)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Events = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/events/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/events',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ExchangeRates.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ExchangeRates.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExchangeRates: () => (/* binding */ ExchangeRates)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ExchangeRates = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/exchange_rates/{rate_id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/exchange_rates',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FileLinks.js":
/*!**********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FileLinks.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileLinks: () => (/* binding */ FileLinks)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const FileLinks = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/file_links' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/file_links/{link}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/file_links/{link}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/file_links',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Files.js":
/*!******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Files.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Files: () => (/* binding */ Files)
/* harmony export */ });
/* harmony import */ var _multipart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../multipart.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/multipart.js");
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec


const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_1__.StripeResource.method;
const Files = _StripeResource_js__WEBPACK_IMPORTED_MODULE_1__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/files',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        host: 'files.stripe.com',
    }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/files/{file}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/files',
        methodType: 'list',
    }),
    requestDataProcessor: _multipart_js__WEBPACK_IMPORTED_MODULE_0__.multipartRequestDataProcessor,
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Accounts.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Accounts.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accounts: () => (/* binding */ Accounts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Accounts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts',
        methodType: 'list',
    }),
    disconnect: stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/disconnect',
    }),
    listOwners: stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}/owners',
        methodType: 'list',
    }),
    refresh: stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/refresh',
    }),
    subscribe: stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/subscribe',
    }),
    unsubscribe: stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/unsubscribe',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Sessions.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Sessions.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sessions: () => (/* binding */ Sessions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Sessions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/financial_connections/sessions',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/sessions/{session}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Transactions.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/FinancialConnections/Transactions.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transactions: () => (/* binding */ Transactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Transactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/transactions/{transaction}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/financial_connections/transactions',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Forwarding/Requests.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Forwarding/Requests.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Requests: () => (/* binding */ Requests)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Requests = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/forwarding/requests' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/forwarding/requests/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/forwarding/requests',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Identity/VerificationReports.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Identity/VerificationReports.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerificationReports: () => (/* binding */ VerificationReports)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const VerificationReports = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports/{report}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Identity/VerificationSessions.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Identity/VerificationSessions.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerificationSessions: () => (/* binding */ VerificationSessions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const VerificationSessions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions/{session}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/cancel',
    }),
    redact: stripeMethod({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/redact',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoiceItems.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoiceItems.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvoiceItems: () => (/* binding */ InvoiceItems)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const InvoiceItems = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/invoiceitems' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoiceitems',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/invoiceitems/{invoiceitem}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoicePayments.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoicePayments.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvoicePayments: () => (/* binding */ InvoicePayments)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const InvoicePayments = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoice_payments/{invoice_payment}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoice_payments',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoiceRenderingTemplates.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/InvoiceRenderingTemplates.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvoiceRenderingTemplates: () => (/* binding */ InvoiceRenderingTemplates)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const InvoiceRenderingTemplates = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoice_rendering_templates/{template}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoice_rendering_templates',
        methodType: 'list',
    }),
    archive: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoice_rendering_templates/{template}/archive',
    }),
    unarchive: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoice_rendering_templates/{template}/unarchive',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Invoices.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Invoices.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Invoices: () => (/* binding */ Invoices)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Invoices = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/invoices' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/invoices/{invoice}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/invoices/{invoice}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/invoices/{invoice}' }),
    addLines: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/add_lines',
    }),
    attachPayment: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/attach_payment',
    }),
    createPreview: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/create_preview',
    }),
    finalizeInvoice: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/finalize',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/{invoice}/lines',
        methodType: 'list',
    }),
    markUncollectible: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/mark_uncollectible',
    }),
    pay: stripeMethod({ method: 'POST', fullPath: '/v1/invoices/{invoice}/pay' }),
    removeLines: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/remove_lines',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/invoices/search',
        methodType: 'search',
    }),
    sendInvoice: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/send',
    }),
    updateLines: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/update_lines',
    }),
    updateLineItem: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/lines/{line_item_id}',
    }),
    voidInvoice: stripeMethod({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/void',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Authorizations.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Authorizations.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Authorizations: () => (/* binding */ Authorizations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Authorizations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations/{authorization}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations',
        methodType: 'list',
    }),
    approve: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/approve',
    }),
    decline: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/decline',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Cardholders.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Cardholders.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cardholders: () => (/* binding */ Cardholders)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Cardholders = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/issuing/cardholders' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders/{cardholder}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/cardholders/{cardholder}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Cards.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Cards.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cards: () => (/* binding */ Cards)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Cards = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/issuing/cards' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/issuing/cards/{card}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/issuing/cards/{card}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/cards',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Disputes.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Disputes.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Disputes: () => (/* binding */ Disputes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Disputes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/issuing/disputes' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/disputes/{dispute}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/disputes',
        methodType: 'list',
    }),
    submit: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}/submit',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/PersonalizationDesigns.js":
/*!*******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/PersonalizationDesigns.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PersonalizationDesigns: () => (/* binding */ PersonalizationDesigns)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PersonalizationDesigns = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/personalization_designs',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/personalization_designs/{personalization_design}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/personalization_designs/{personalization_design}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/personalization_designs',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/PhysicalBundles.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/PhysicalBundles.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PhysicalBundles: () => (/* binding */ PhysicalBundles)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PhysicalBundles = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/physical_bundles/{physical_bundle}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/physical_bundles',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Tokens.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Tokens.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tokens: () => (/* binding */ Tokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Tokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/tokens/{token}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/tokens/{token}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/tokens',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Transactions.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Issuing/Transactions.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transactions: () => (/* binding */ Transactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Transactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/transactions/{transaction}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/issuing/transactions/{transaction}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/issuing/transactions',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Mandates.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Mandates.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mandates: () => (/* binding */ Mandates)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Mandates = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/mandates/{mandate}' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/OAuth.js":
/*!******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/OAuth.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OAuth: () => (/* binding */ OAuth)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");



const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const oAuthHost = 'connect.stripe.com';
const OAuth = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    basePath: '/',
    authorizeUrl(params, options) {
        params = params || {};
        options = options || {};
        let path = 'oauth/authorize';
        // For Express accounts, the path changes
        if (options.express) {
            path = `express/${path}`;
        }
        if (!params.response_type) {
            params.response_type = 'code';
        }
        if (!params.client_id) {
            params.client_id = this._stripe.getClientId();
        }
        if (!params.scope) {
            params.scope = 'read_write';
        }
        return `https://${oAuthHost}/${path}?${(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.queryStringifyRequestData)(params)}`;
    },
    token: stripeMethod({
        method: 'POST',
        path: 'oauth/token',
        host: oAuthHost,
    }),
    deauthorize(spec, ...args) {
        if (!spec.client_id) {
            spec.client_id = this._stripe.getClientId();
        }
        return stripeMethod({
            method: 'POST',
            path: 'oauth/deauthorize',
            host: oAuthHost,
        }).apply(this, [spec, ...args]);
    },
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentAttemptRecords.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentAttemptRecords.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentAttemptRecords: () => (/* binding */ PaymentAttemptRecords)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentAttemptRecords = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_attempt_records/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_attempt_records',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentIntents.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentIntents.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentIntents: () => (/* binding */ PaymentIntents)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentIntents = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/payment_intents' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents/{intent}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents',
        methodType: 'list',
    }),
    applyCustomerBalance: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/apply_customer_balance',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/cancel',
    }),
    capture: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/capture',
    }),
    confirm: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/confirm',
    }),
    incrementAuthorization: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/increment_authorization',
    }),
    listAmountDetailsLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents/{intent}/amount_details_line_items',
        methodType: 'list',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_intents/search',
        methodType: 'search',
    }),
    verifyMicrodeposits: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/verify_microdeposits',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentLinks.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentLinks.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentLinks: () => (/* binding */ PaymentLinks)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentLinks = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/payment_links' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_links/{payment_link}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_links',
        methodType: 'list',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}/line_items',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethodConfigurations.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethodConfigurations.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentMethodConfigurations: () => (/* binding */ PaymentMethodConfigurations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentMethodConfigurations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_method_configurations',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_method_configurations/{configuration}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_method_configurations/{configuration}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_method_configurations',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethodDomains.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethodDomains.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentMethodDomains: () => (/* binding */ PaymentMethodDomains)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentMethodDomains = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_method_domains',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_method_domains',
        methodType: 'list',
    }),
    validate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}/validate',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethods.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentMethods.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentMethods: () => (/* binding */ PaymentMethods)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentMethods = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/payment_methods' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_methods/{payment_method}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payment_methods',
        methodType: 'list',
    }),
    attach: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/attach',
    }),
    detach: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/detach',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentRecords.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PaymentRecords.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentRecords: () => (/* binding */ PaymentRecords)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentRecords = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/payment_records/{id}' }),
    reportPayment: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/report_payment',
    }),
    reportPaymentAttempt: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt',
    }),
    reportPaymentAttemptCanceled: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_canceled',
    }),
    reportPaymentAttemptFailed: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_failed',
    }),
    reportPaymentAttemptGuaranteed: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_guaranteed',
    }),
    reportPaymentAttemptInformational: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_payment_attempt_informational',
    }),
    reportRefund: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payment_records/{id}/report_refund',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Payouts.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Payouts.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Payouts: () => (/* binding */ Payouts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Payouts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/payouts' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/payouts/{payout}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/payouts/{payout}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/payouts',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/cancel',
    }),
    reverse: stripeMethod({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/reverse',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Plans.js":
/*!******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Plans.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Plans: () => (/* binding */ Plans)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Plans = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/plans' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/plans/{plan}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/plans/{plan}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/plans',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/plans/{plan}' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Prices.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Prices.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Prices: () => (/* binding */ Prices)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Prices = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/prices' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/prices/{price}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/prices/{price}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/prices',
        methodType: 'list',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/prices/search',
        methodType: 'search',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Products.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Products.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Products: () => (/* binding */ Products)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Products = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/products' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/products/{id}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/products/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/products',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/products/{id}' }),
    createFeature: stripeMethod({
        method: 'POST',
        fullPath: '/v1/products/{product}/features',
    }),
    deleteFeature: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/products/{product}/features/{id}',
    }),
    listFeatures: stripeMethod({
        method: 'GET',
        fullPath: '/v1/products/{product}/features',
        methodType: 'list',
    }),
    retrieveFeature: stripeMethod({
        method: 'GET',
        fullPath: '/v1/products/{product}/features/{id}',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/products/search',
        methodType: 'search',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PromotionCodes.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/PromotionCodes.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PromotionCodes: () => (/* binding */ PromotionCodes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PromotionCodes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/promotion_codes' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/promotion_codes/{promotion_code}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/promotion_codes/{promotion_code}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/promotion_codes',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Quotes.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Quotes.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Quotes: () => (/* binding */ Quotes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Quotes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/quotes' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/quotes/{quote}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/quotes/{quote}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes',
        methodType: 'list',
    }),
    accept: stripeMethod({ method: 'POST', fullPath: '/v1/quotes/{quote}/accept' }),
    cancel: stripeMethod({ method: 'POST', fullPath: '/v1/quotes/{quote}/cancel' }),
    finalizeQuote: stripeMethod({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/finalize',
    }),
    listComputedUpfrontLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/computed_upfront_line_items',
        methodType: 'list',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/line_items',
        methodType: 'list',
    }),
    pdf: stripeMethod({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/pdf',
        host: 'files.stripe.com',
        streaming: true,
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EarlyFraudWarnings: () => (/* binding */ EarlyFraudWarnings)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const EarlyFraudWarnings = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings/{early_fraud_warning}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/PaymentEvaluations.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/PaymentEvaluations.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentEvaluations: () => (/* binding */ PaymentEvaluations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PaymentEvaluations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/radar/payment_evaluations',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/ValueListItems.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/ValueListItems.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValueListItems: () => (/* binding */ ValueListItems)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ValueListItems = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/radar/value_list_items',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items/{item}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/radar/value_list_items/{item}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/ValueLists.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Radar/ValueLists.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValueLists: () => (/* binding */ ValueLists)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ValueLists = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/radar/value_lists' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/radar/value_lists',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/radar/value_lists/{value_list}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Refunds.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Refunds.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Refunds: () => (/* binding */ Refunds)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Refunds = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/refunds' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/refunds/{refund}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/refunds/{refund}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/refunds',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/refunds/{refund}/cancel',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reporting/ReportRuns.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reporting/ReportRuns.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportRuns: () => (/* binding */ ReportRuns)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ReportRuns = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/reporting/report_runs' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs/{report_run}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reporting/ReportTypes.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reporting/ReportTypes.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportTypes: () => (/* binding */ ReportTypes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ReportTypes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_types/{report_type}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/reporting/report_types',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reviews.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Reviews.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Reviews: () => (/* binding */ Reviews)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Reviews = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/reviews/{review}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/reviews',
        methodType: 'list',
    }),
    approve: stripeMethod({
        method: 'POST',
        fullPath: '/v1/reviews/{review}/approve',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SetupAttempts.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SetupAttempts.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetupAttempts: () => (/* binding */ SetupAttempts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const SetupAttempts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/setup_attempts',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SetupIntents.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SetupIntents.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetupIntents: () => (/* binding */ SetupIntents)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const SetupIntents = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/setup_intents' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/setup_intents/{intent}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/setup_intents',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/cancel',
    }),
    confirm: stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/confirm',
    }),
    verifyMicrodeposits: stripeMethod({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/verify_microdeposits',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ShippingRates.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/ShippingRates.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShippingRates: () => (/* binding */ ShippingRates)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ShippingRates = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/shipping_rates' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/shipping_rates',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScheduledQueryRuns: () => (/* binding */ ScheduledQueryRuns)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ScheduledQueryRuns = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs/{scheduled_query_run}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Sources.js":
/*!********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Sources.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sources: () => (/* binding */ Sources)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Sources = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/sources' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/sources/{source}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/sources/{source}' }),
    listSourceTransactions: stripeMethod({
        method: 'GET',
        fullPath: '/v1/sources/{source}/source_transactions',
        methodType: 'list',
    }),
    verify: stripeMethod({
        method: 'POST',
        fullPath: '/v1/sources/{source}/verify',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SubscriptionItems.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SubscriptionItems.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubscriptionItems: () => (/* binding */ SubscriptionItems)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const SubscriptionItems = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/subscription_items' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_items/{item}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_items/{item}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_items',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscription_items/{item}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SubscriptionSchedules.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/SubscriptionSchedules.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubscriptionSchedules: () => (/* binding */ SubscriptionSchedules)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const SubscriptionSchedules = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_schedules/{schedule}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscription_schedules',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/cancel',
    }),
    release: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/release',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Subscriptions.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Subscriptions.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscriptions: () => (/* binding */ Subscriptions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Subscriptions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/subscriptions' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscriptions',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}',
    }),
    deleteDiscount: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}/discount',
    }),
    migrate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription}/migrate',
    }),
    resume: stripeMethod({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription}/resume',
    }),
    search: stripeMethod({
        method: 'GET',
        fullPath: '/v1/subscriptions/search',
        methodType: 'search',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Associations.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Associations.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Associations: () => (/* binding */ Associations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Associations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    find: stripeMethod({ method: 'GET', fullPath: '/v1/tax/associations/find' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Calculations.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Calculations.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Calculations: () => (/* binding */ Calculations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Calculations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/tax/calculations' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}/line_items',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Registrations.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Registrations.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Registrations: () => (/* binding */ Registrations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Registrations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/tax/registrations' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/registrations/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax/registrations/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/registrations',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Settings.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Settings.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Settings: () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Settings = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/tax/settings' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/tax/settings' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Transactions.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tax/Transactions.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transactions: () => (/* binding */ Transactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Transactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}',
    }),
    createFromCalculation: stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_from_calculation',
    }),
    createReversal: stripeMethod({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_reversal',
    }),
    listLineItems: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}/line_items',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxCodes.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxCodes.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaxCodes: () => (/* binding */ TaxCodes)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const TaxCodes = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/tax_codes/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_codes',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxIds.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxIds.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaxIds: () => (/* binding */ TaxIds)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const TaxIds = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/tax_ids' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/tax_ids/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_ids',
        methodType: 'list',
    }),
    del: stripeMethod({ method: 'DELETE', fullPath: '/v1/tax_ids/{id}' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxRates.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TaxRates.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaxRates: () => (/* binding */ TaxRates)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const TaxRates = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/tax_rates' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/tax_rates/{tax_rate}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/tax_rates/{tax_rate}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/tax_rates',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Configurations.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Configurations.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Configurations: () => (/* binding */ Configurations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Configurations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/configurations',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/configurations',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/terminal/configurations/{configuration}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConnectionTokens: () => (/* binding */ ConnectionTokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ConnectionTokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/connection_tokens',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Locations.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Locations.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Locations: () => (/* binding */ Locations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Locations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/terminal/locations' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/locations/{location}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/locations/{location}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/locations',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/terminal/locations/{location}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/OnboardingLinks.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/OnboardingLinks.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnboardingLinks: () => (/* binding */ OnboardingLinks)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const OnboardingLinks = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/onboarding_links',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Readers.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Terminal/Readers.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Readers: () => (/* binding */ Readers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Readers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/terminal/readers' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/terminal/readers',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/terminal/readers/{reader}',
    }),
    cancelAction: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/cancel_action',
    }),
    collectInputs: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/collect_inputs',
    }),
    collectPaymentMethod: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/collect_payment_method',
    }),
    confirmPaymentIntent: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/confirm_payment_intent',
    }),
    processPaymentIntent: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_payment_intent',
    }),
    processSetupIntent: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_setup_intent',
    }),
    refundPayment: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/refund_payment',
    }),
    setReaderDisplay: stripeMethod({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/set_reader_display',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/ConfirmationTokens.js":
/*!*******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/ConfirmationTokens.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmationTokens: () => (/* binding */ ConfirmationTokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ConfirmationTokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/confirmation_tokens',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Customers.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Customers.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Customers: () => (/* binding */ Customers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Customers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    fundCashBalance: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/customers/{customer}/fund_cash_balance',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Authorizations.js":
/*!***********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Authorizations.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Authorizations: () => (/* binding */ Authorizations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Authorizations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations',
    }),
    capture: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/capture',
    }),
    expire: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/expire',
    }),
    finalizeAmount: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount',
    }),
    increment: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/increment',
    }),
    respond: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond',
    }),
    reverse: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/reverse',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cards: () => (/* binding */ Cards)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Cards = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    deliverCard: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/deliver',
    }),
    failCard: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/fail',
    }),
    returnCard: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/return',
    }),
    shipCard: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/ship',
    }),
    submitCard: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/submit',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/PersonalizationDesigns.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/PersonalizationDesigns.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PersonalizationDesigns: () => (/* binding */ PersonalizationDesigns)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PersonalizationDesigns = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    activate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate',
    }),
    deactivate: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate',
    }),
    reject: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Transactions.js":
/*!*********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Issuing/Transactions.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transactions: () => (/* binding */ Transactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Transactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    createForceCapture: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/create_force_capture',
    }),
    createUnlinkedRefund: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/create_unlinked_refund',
    }),
    refund: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/{transaction}/refund',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Refunds.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Refunds.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Refunds: () => (/* binding */ Refunds)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Refunds = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    expire: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/refunds/{refund}/expire',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Readers: () => (/* binding */ Readers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Readers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    presentPaymentMethod: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method',
    }),
    succeedInputCollection: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection',
    }),
    timeoutInputCollection: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/TestClocks.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/TestClocks.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestClocks: () => (/* binding */ TestClocks)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const TestClocks = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}',
    }),
    advance: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}/advance',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InboundTransfers: () => (/* binding */ InboundTransfers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const InboundTransfers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    fail: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail',
    }),
    returnInboundTransfer: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/return',
    }),
    succeed: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/succeed',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js":
/*!**************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutboundPayments: () => (/* binding */ OutboundPayments)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const OutboundPayments = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}',
    }),
    fail: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/fail',
    }),
    post: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/post',
    }),
    returnOutboundPayment: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/return',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js":
/*!***************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutboundTransfers: () => (/* binding */ OutboundTransfers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const OutboundTransfers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}',
    }),
    fail: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail',
    }),
    post: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post',
    }),
    returnOutboundTransfer: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js":
/*!*************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReceivedCredits: () => (/* binding */ ReceivedCredits)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ReceivedCredits = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_credits',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js":
/*!************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReceivedDebits: () => (/* binding */ ReceivedDebits)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ReceivedDebits = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_debits',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tokens.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Tokens.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tokens: () => (/* binding */ Tokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Tokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/tokens' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/tokens/{token}' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Topups.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Topups.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Topups: () => (/* binding */ Topups)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Topups = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/topups' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/topups/{topup}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/topups/{topup}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/topups',
        methodType: 'list',
    }),
    cancel: stripeMethod({ method: 'POST', fullPath: '/v1/topups/{topup}/cancel' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Transfers.js":
/*!**********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Transfers.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transfers: () => (/* binding */ Transfers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Transfers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/transfers' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v1/transfers/{transfer}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v1/transfers/{transfer}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers',
        methodType: 'list',
    }),
    createReversal: stripeMethod({
        method: 'POST',
        fullPath: '/v1/transfers/{id}/reversals',
    }),
    listReversals: stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers/{id}/reversals',
        methodType: 'list',
    }),
    retrieveReversal: stripeMethod({
        method: 'GET',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}',
    }),
    updateReversal: stripeMethod({
        method: 'POST',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/CreditReversals.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/CreditReversals.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreditReversals: () => (/* binding */ CreditReversals)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const CreditReversals = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/credit_reversals',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals/{credit_reversal}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/DebitReversals.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/DebitReversals.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebitReversals: () => (/* binding */ DebitReversals)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const DebitReversals = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/debit_reversals',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals/{debit_reversal}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js":
/*!***************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FinancialAccounts: () => (/* binding */ FinancialAccounts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const FinancialAccounts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts',
        methodType: 'list',
    }),
    close: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/close',
    }),
    retrieveFeatures: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features',
    }),
    updateFeatures: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/InboundTransfers.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/InboundTransfers.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InboundTransfers: () => (/* binding */ InboundTransfers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const InboundTransfers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/OutboundPayments.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/OutboundPayments.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutboundPayments: () => (/* binding */ OutboundPayments)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const OutboundPayments = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments/{id}/cancel',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js":
/*!***************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OutboundTransfers: () => (/* binding */ OutboundTransfers)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const OutboundTransfers = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers',
        methodType: 'list',
    }),
    cancel: stripeMethod({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}/cancel',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReceivedCredits: () => (/* binding */ ReceivedCredits)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ReceivedCredits = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReceivedDebits: () => (/* binding */ ReceivedDebits)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const ReceivedDebits = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/TransactionEntries.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/TransactionEntries.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionEntries: () => (/* binding */ TransactionEntries)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const TransactionEntries = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/Transactions.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/Treasury/Transactions.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transactions: () => (/* binding */ Transactions)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Transactions = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transactions/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/treasury/transactions',
        methodType: 'list',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventAdjustments.js":
/*!*********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventAdjustments.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeterEventAdjustments: () => (/* binding */ MeterEventAdjustments)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const MeterEventAdjustments = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_adjustments',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventSession.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventSession.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeterEventSession: () => (/* binding */ MeterEventSession)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const MeterEventSession = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_session',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventStream.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEventStream.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeterEventStream: () => (/* binding */ MeterEventStream)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const MeterEventStream = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_stream',
        host: 'meter-events.stripe.com',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEvents.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Billing/MeterEvents.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeterEvents: () => (/* binding */ MeterEvents)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const MeterEvents = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/billing/meter_events' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/AccountLinks.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/AccountLinks.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountLinks: () => (/* binding */ AccountLinks)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const AccountLinks = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/core/account_links' }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/AccountTokens.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/AccountTokens.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountTokens: () => (/* binding */ AccountTokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const AccountTokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v2/core/account_tokens' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/account_tokens/{id}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accounts: () => (/* binding */ Accounts)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
/* harmony import */ var _Accounts_Persons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Accounts/Persons.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts/Persons.js");
/* harmony import */ var _Accounts_PersonTokens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Accounts/PersonTokens.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts/PersonTokens.js");
// File generated from our OpenAPI spec



const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Accounts = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    constructor: function (...args) {
        _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.apply(this, args);
        this.persons = new _Accounts_Persons_js__WEBPACK_IMPORTED_MODULE_1__.Persons(...args);
        this.personTokens = new _Accounts_PersonTokens_js__WEBPACK_IMPORTED_MODULE_2__.PersonTokens(...args);
    },
    create: stripeMethod({ method: 'POST', fullPath: '/v2/core/accounts' }),
    retrieve: stripeMethod({ method: 'GET', fullPath: '/v2/core/accounts/{id}' }),
    update: stripeMethod({ method: 'POST', fullPath: '/v2/core/accounts/{id}' }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts',
        methodType: 'list',
    }),
    close: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{id}/close',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts/PersonTokens.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts/PersonTokens.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PersonTokens: () => (/* binding */ PersonTokens)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const PersonTokens = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/person_tokens',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/person_tokens/{id}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts/Persons.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Accounts/Persons.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Persons: () => (/* binding */ Persons)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Persons = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/persons',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/accounts/{account_id}/persons',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v2/core/accounts/{account_id}/persons/{id}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/EventDestinations.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/EventDestinations.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventDestinations: () => (/* binding */ EventDestinations)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const EventDestinations = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations',
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v2/core/event_destinations',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v2/core/event_destinations/{id}',
    }),
    disable: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/disable',
    }),
    enable: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/enable',
    }),
    ping: stripeMethod({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/ping',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Events.js":
/*!***************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/V2/Core/Events.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: () => (/* binding */ Events)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// This file is manually maintained

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const Events = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    retrieve(...args) {
        const transformResponseData = (response) => {
            return this.addFetchRelatedObjectIfNeeded(response);
        };
        return stripeMethod({
            method: 'GET',
            fullPath: '/v2/core/events/{id}',
            transformResponseData,
        }).apply(this, args);
    },
    list(...args) {
        const transformResponseData = (response) => {
            return Object.assign(Object.assign({}, response), { data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this)) });
        };
        return stripeMethod({
            method: 'GET',
            fullPath: '/v2/core/events',
            methodType: 'list',
            transformResponseData,
        }).apply(this, args);
    },
    /**
     * @private
     *
     * For internal use in stripe-node.
     *
     * @param pulledEvent The retrieved event object
     * @returns The retrieved event object with a fetchRelatedObject method,
     * if pulledEvent.related_object is valid (non-null and has a url)
     */
    addFetchRelatedObjectIfNeeded(pulledEvent) {
        if (!pulledEvent.related_object || !pulledEvent.related_object.url) {
            return pulledEvent;
        }
        return Object.assign(Object.assign({}, pulledEvent), { fetchRelatedObject: () => 
            // call stripeMethod with 'this' resource to fetch
            // the related object. 'this' is needed to construct
            // and send the request, but the method spec controls
            // the url endpoint and method, so it doesn't matter
            // that 'this' is an Events resource object here
            stripeMethod({
                method: 'GET',
                fullPath: pulledEvent.related_object.url,
            }).apply(this, [
                {
                    stripeContext: pulledEvent.context,
                },
            ]) });
    },
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/WebhookEndpoints.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources/WebhookEndpoints.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebhookEndpoints: () => (/* binding */ WebhookEndpoints)
/* harmony export */ });
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
// File generated from our OpenAPI spec

const stripeMethod = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.method;
const WebhookEndpoints = _StripeResource_js__WEBPACK_IMPORTED_MODULE_0__.StripeResource.extend({
    create: stripeMethod({ method: 'POST', fullPath: '/v1/webhook_endpoints' }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints',
        methodType: 'list',
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}',
    }),
});


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/stripe.core.js":
/*!**************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/stripe.core.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStripe: () => (/* binding */ createStripe)
/* harmony export */ });
/* harmony import */ var _Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Error.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Error.js");
/* harmony import */ var _RequestSender_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RequestSender.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/RequestSender.js");
/* harmony import */ var _StripeResource_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StripeResource.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeResource.js");
/* harmony import */ var _StripeContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StripeContext.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/StripeContext.js");
/* harmony import */ var _Webhooks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Webhooks.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/Webhooks.js");
/* harmony import */ var _apiVersion_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./apiVersion.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/apiVersion.js");
/* harmony import */ var _crypto_CryptoProvider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./crypto/CryptoProvider.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/crypto/CryptoProvider.js");
/* harmony import */ var _net_HttpClient_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./net/HttpClient.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/net/HttpClient.js");
/* harmony import */ var _resources_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resources.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/resources.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js");










const DEFAULT_HOST = 'api.stripe.com';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = '/v1/';
const DEFAULT_API_VERSION = _apiVersion_js__WEBPACK_IMPORTED_MODULE_5__.ApiVersion;
const DEFAULT_TIMEOUT = 80000;
const MAX_NETWORK_RETRY_DELAY_SEC = 5;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
const APP_INFO_PROPERTIES = ['name', 'version', 'url', 'partner_id'];
const ALLOWED_CONFIG_PROPERTIES = [
    'authenticator',
    'apiVersion',
    'typescript',
    'maxNetworkRetries',
    'httpAgent',
    'httpClient',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
    'stripeAccount',
    'stripeContext',
];
const defaultRequestSenderFactory = (stripe) => new _RequestSender_js__WEBPACK_IMPORTED_MODULE_1__.RequestSender(stripe, _StripeResource_js__WEBPACK_IMPORTED_MODULE_2__.StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
    Stripe.PACKAGE_VERSION = '20.3.1';
    Stripe.API_VERSION = _apiVersion_js__WEBPACK_IMPORTED_MODULE_5__.ApiVersion;
    Stripe.USER_AGENT = Object.assign({ bindings_version: Stripe.PACKAGE_VERSION, lang: 'node', publisher: 'stripe', uname: null, typescript: false }, (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.determineProcessUserAgentProperties)());
    Stripe.StripeResource = _StripeResource_js__WEBPACK_IMPORTED_MODULE_2__.StripeResource;
    Stripe.StripeContext = _StripeContext_js__WEBPACK_IMPORTED_MODULE_3__.StripeContext;
    Stripe.resources = _resources_js__WEBPACK_IMPORTED_MODULE_8__;
    Stripe.HttpClient = _net_HttpClient_js__WEBPACK_IMPORTED_MODULE_7__.HttpClient;
    Stripe.HttpClientResponse = _net_HttpClient_js__WEBPACK_IMPORTED_MODULE_7__.HttpClientResponse;
    Stripe.CryptoProvider = _crypto_CryptoProvider_js__WEBPACK_IMPORTED_MODULE_6__.CryptoProvider;
    Stripe.webhooks = (0,_Webhooks_js__WEBPACK_IMPORTED_MODULE_4__.createWebhooks)(platformFunctions);
    function Stripe(key, config = {}) {
        if (!(this instanceof Stripe)) {
            return new Stripe(key, config);
        }
        const props = this._getPropsFromConfig(config);
        this._platformFunctions = platformFunctions;
        Object.defineProperty(this, '_emitter', {
            value: this._platformFunctions.createEmitter(),
            enumerable: false,
            configurable: false,
            writable: false,
        });
        this.VERSION = Stripe.PACKAGE_VERSION;
        this.on = this._emitter.on.bind(this._emitter);
        this.once = this._emitter.once.bind(this._emitter);
        this.off = this._emitter.removeListener.bind(this._emitter);
        const agent = props.httpAgent || null;
        this._api = {
            host: props.host || DEFAULT_HOST,
            port: props.port || DEFAULT_PORT,
            protocol: props.protocol || 'https',
            basePath: DEFAULT_BASE_PATH,
            version: props.apiVersion || DEFAULT_API_VERSION,
            timeout: (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.validateInteger)('timeout', props.timeout, DEFAULT_TIMEOUT),
            maxNetworkRetries: (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.validateInteger)('maxNetworkRetries', props.maxNetworkRetries, 2),
            agent: agent,
            httpClient: props.httpClient ||
                (agent
                    ? this._platformFunctions.createNodeHttpClient(agent)
                    : this._platformFunctions.createDefaultHttpClient()),
            dev: false,
            stripeAccount: props.stripeAccount || null,
            stripeContext: props.stripeContext || null,
        };
        const typescript = props.typescript || false;
        if (typescript !== Stripe.USER_AGENT.typescript) {
            // The mutation here is uncomfortable, but likely fastest;
            // serializing the user agent involves shelling out to the system,
            // and given some users may instantiate the library many times without switching between TS and non-TS,
            // we only want to incur the performance hit when that actually happens.
            Stripe.USER_AGENT.typescript = typescript;
        }
        if (props.appInfo) {
            this._setAppInfo(props.appInfo);
        }
        this._prepResources();
        this._setAuthenticator(key, props.authenticator);
        this.errors = _Error_js__WEBPACK_IMPORTED_MODULE_0__;
        this.webhooks = Stripe.webhooks;
        this._prevRequestMetrics = [];
        this._enableTelemetry = props.telemetry !== false;
        this._requestSender = requestSender(this);
        // Expose StripeResource on the instance too
        // @ts-ignore
        this.StripeResource = Stripe.StripeResource;
    }
    Stripe.errors = _Error_js__WEBPACK_IMPORTED_MODULE_0__;
    Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */
    Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
    /**
     * Create a CryptoProvider which uses the built-in Node crypto libraries for
     * its crypto operations.
     */
    Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
    /**
     * Creates a CryptoProvider which uses the Subtle Crypto API from the Web
     * Crypto API spec for its crypto operations.
     *
     * A SubtleCrypto interface can optionally be passed in as a parameter. If none
     * is passed, will default to the default `crypto.subtle` object in the global
     * scope.
     */
    Stripe.createSubtleCryptoProvider =
        platformFunctions.createSubtleCryptoProvider;
    Stripe.prototype = {
        // Properties are set in the constructor above
        _appInfo: undefined,
        on: null,
        off: null,
        once: null,
        VERSION: null,
        StripeResource: null,
        webhooks: null,
        errors: null,
        _api: null,
        _prevRequestMetrics: null,
        _emitter: null,
        _enableTelemetry: null,
        _requestSender: null,
        _platformFunctions: null,
        rawRequest(method, path, params, options) {
            return this._requestSender._rawRequest(method, path, params, options);
        },
        /**
         * @private
         */
        _setAuthenticator(key, authenticator) {
            if (key && authenticator) {
                throw new Error("Can't specify both apiKey and authenticator");
            }
            if (!key && !authenticator) {
                throw new Error('Neither apiKey nor config.authenticator provided');
            }
            this._authenticator = key
                ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.createApiKeyAuthenticator)(key)
                : authenticator;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setAppInfo(info) {
            if (info && typeof info !== 'object') {
                throw new Error('AppInfo must be an object.');
            }
            if (info && !info.name) {
                throw new Error('AppInfo.name is required');
            }
            info = info || {};
            this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
                if (typeof info[prop] == 'string') {
                    accum = accum || {};
                    accum[prop] = info[prop];
                }
                return accum;
            }, {});
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiField(key, value) {
            this._api[key] = value;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getApiField(key) {
            return this._api[key];
        },
        setClientId(clientId) {
            this._clientId = clientId;
        },
        getClientId() {
            return this._clientId;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getConstant: (c) => {
            switch (c) {
                case 'DEFAULT_HOST':
                    return DEFAULT_HOST;
                case 'DEFAULT_PORT':
                    return DEFAULT_PORT;
                case 'DEFAULT_BASE_PATH':
                    return DEFAULT_BASE_PATH;
                case 'DEFAULT_API_VERSION':
                    return DEFAULT_API_VERSION;
                case 'DEFAULT_TIMEOUT':
                    return DEFAULT_TIMEOUT;
                case 'MAX_NETWORK_RETRY_DELAY_SEC':
                    return MAX_NETWORK_RETRY_DELAY_SEC;
                case 'INITIAL_NETWORK_RETRY_DELAY_SEC':
                    return INITIAL_NETWORK_RETRY_DELAY_SEC;
            }
            return Stripe[c];
        },
        getMaxNetworkRetries() {
            return this.getApiField('maxNetworkRetries');
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _setApiNumberField(prop, n, defaultVal) {
            const val = (0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.validateInteger)(prop, n, defaultVal);
            this._setApiField(prop, val);
        },
        getMaxNetworkRetryDelay() {
            return MAX_NETWORK_RETRY_DELAY_SEC;
        },
        getInitialNetworkRetryDelay() {
            return INITIAL_NETWORK_RETRY_DELAY_SEC;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent and uses a cached version for a slight
         * speed advantage.
         */
        getClientUserAgent(cb) {
            return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent by encoding a seeded object and
         * fetching a uname from the system.
         */
        getClientUserAgentSeeded(seed, cb) {
            this._platformFunctions.getUname().then((uname) => {
                var _a;
                const userAgent = {};
                for (const field in seed) {
                    if (!Object.prototype.hasOwnProperty.call(seed, field)) {
                        continue;
                    }
                    userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : 'null');
                }
                // URI-encode in case there are unusual characters in the system's uname.
                userAgent.uname = encodeURIComponent(uname || 'UNKNOWN');
                const client = this.getApiField('httpClient');
                if (client) {
                    userAgent.httplib = encodeURIComponent(client.getClientName());
                }
                if (this._appInfo) {
                    userAgent.application = this._appInfo;
                }
                cb(JSON.stringify(userAgent));
            });
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */
        getAppInfoAsString() {
            if (!this._appInfo) {
                return '';
            }
            let formatted = this._appInfo.name;
            if (this._appInfo.version) {
                formatted += `/${this._appInfo.version}`;
            }
            if (this._appInfo.url) {
                formatted += ` (${this._appInfo.url})`;
            }
            return formatted;
        },
        getTelemetryEnabled() {
            return this._enableTelemetry;
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _prepResources() {
            for (const name in _resources_js__WEBPACK_IMPORTED_MODULE_8__) {
                if (!Object.prototype.hasOwnProperty.call(_resources_js__WEBPACK_IMPORTED_MODULE_8__, name)) {
                    continue;
                }
                // @ts-ignore
                this[(0,_utils_js__WEBPACK_IMPORTED_MODULE_9__.pascalToCamelCase)(name)] = new _resources_js__WEBPACK_IMPORTED_MODULE_8__[name](this);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */
        _getPropsFromConfig(config) {
            // If config is null or undefined, just bail early with no props
            if (!config) {
                return {};
            }
            // config can be an object or a string
            const isString = typeof config === 'string';
            const isObject = config === Object(config) && !Array.isArray(config);
            if (!isObject && !isString) {
                throw new Error('Config must either be an object or a string');
            }
            // If config is a string, we assume the old behavior of passing in a string representation of the api version
            if (isString) {
                return {
                    apiVersion: config,
                };
            }
            // If config is an object, we assume the new behavior and make sure it doesn't contain any unexpected values
            const values = Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value));
            if (values.length > 0) {
                throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(', ')}`);
            }
            return config;
        },
        parseEventNotification(payload, header, secret, tolerance, cryptoProvider, receivedAt
        // this return type is ignored?? picks up types from `types/index.d.ts` instead
        ) {
            // parses and validates the event payload all in one go
            const eventNotification = this.webhooks.constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt);
            // Parse string context into StripeContext object if present
            if (eventNotification.context) {
                eventNotification.context = _StripeContext_js__WEBPACK_IMPORTED_MODULE_3__.StripeContext.parse(eventNotification.context);
            }
            eventNotification.fetchEvent = () => {
                return this._requestSender._rawRequest('GET', `/v2/core/events/${eventNotification.id}`, undefined, {
                    stripeContext: eventNotification.context,
                }, ['fetch_event']);
            };
            eventNotification.fetchRelatedObject = () => {
                if (!eventNotification.related_object) {
                    return Promise.resolve(null);
                }
                return this._requestSender._rawRequest('GET', eventNotification.related_object.url, undefined, {
                    stripeContext: eventNotification.context,
                }, ['fetch_related_object']);
            };
            return eventNotification;
        },
    };
    return Stripe;
}


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/stripe.esm.node.js":
/*!******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/stripe.esm.node.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Stripe: () => (/* binding */ Stripe),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_NodePlatformFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform/NodePlatformFunctions.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/platform/NodePlatformFunctions.js");
/* harmony import */ var _stripe_core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stripe.core.js */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/stripe.core.js");


const Stripe = (0,_stripe_core_js__WEBPACK_IMPORTED_MODULE_1__.createStripe)(new _platform_NodePlatformFunctions_js__WEBPACK_IMPORTED_MODULE_0__.NodePlatformFunctions());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stripe);


/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js":
/*!********************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/stripe/esm/utils.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callbackifyPromiseWithTimeout: () => (/* binding */ callbackifyPromiseWithTimeout),
/* harmony export */   concat: () => (/* binding */ concat),
/* harmony export */   createApiKeyAuthenticator: () => (/* binding */ createApiKeyAuthenticator),
/* harmony export */   determineProcessUserAgentProperties: () => (/* binding */ determineProcessUserAgentProperties),
/* harmony export */   emitWarning: () => (/* binding */ emitWarning),
/* harmony export */   extractUrlParams: () => (/* binding */ extractUrlParams),
/* harmony export */   flattenAndStringify: () => (/* binding */ flattenAndStringify),
/* harmony export */   getAPIMode: () => (/* binding */ getAPIMode),
/* harmony export */   getDataFromArgs: () => (/* binding */ getDataFromArgs),
/* harmony export */   getOptionsFromArgs: () => (/* binding */ getOptionsFromArgs),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isOptionsHash: () => (/* binding */ isOptionsHash),
/* harmony export */   jsonStringifyRequestData: () => (/* binding */ jsonStringifyRequestData),
/* harmony export */   makeURLInterpolator: () => (/* binding */ makeURLInterpolator),
/* harmony export */   normalizeHeader: () => (/* binding */ normalizeHeader),
/* harmony export */   normalizeHeaders: () => (/* binding */ normalizeHeaders),
/* harmony export */   parseHeadersForFetch: () => (/* binding */ parseHeadersForFetch),
/* harmony export */   parseHttpHeaderAsNumber: () => (/* binding */ parseHttpHeaderAsNumber),
/* harmony export */   parseHttpHeaderAsString: () => (/* binding */ parseHttpHeaderAsString),
/* harmony export */   pascalToCamelCase: () => (/* binding */ pascalToCamelCase),
/* harmony export */   protoExtend: () => (/* binding */ protoExtend),
/* harmony export */   queryStringifyRequestData: () => (/* binding */ queryStringifyRequestData),
/* harmony export */   removeNullish: () => (/* binding */ removeNullish),
/* harmony export */   validateInteger: () => (/* binding */ validateInteger)
/* harmony export */ });
const OPTIONS_KEYS = [
    'apiKey',
    'idempotencyKey',
    'stripeAccount',
    'apiVersion',
    'maxNetworkRetries',
    'timeout',
    'host',
    'authenticator',
    'stripeContext',
    'additionalHeaders',
    'streaming',
];
function isOptionsHash(o) {
    return (o &&
        typeof o === 'object' &&
        OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop)));
}
/**
 * Stringifies an Object, accommodating nested objects
 * (forming the conventional key 'parent[child]=value')
 */
function queryStringifyRequestData(data, 
/** @deprecated Will be removed in a future release. */
_apiMode) {
    return stringifyRequestData(data);
}
/**
 * Encodes a value for use in a query string, keeping brackets unencoded
 * for readability (the server accepts both encoded and unencoded brackets).
 */
function encodeQueryValue(value) {
    return (encodeURIComponent(value)
        // Encode characters not encoded by encodeURIComponent but encoded by qs
        .replace(/!/g, '%21')
        .replace(/\*/g, '%2A')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/'/g, '%27')
        // Decode brackets for readability (server accepts both)
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']'));
}
/**
 * Converts a value to a string representation for query string encoding.
 * Dates are converted to Unix timestamps.
 */
function valueToString(value) {
    if (value instanceof Date) {
        return Math.floor(value.getTime() / 1000).toString();
    }
    if (value === null) {
        return '';
    }
    return String(value);
}
/**
 * Custom query string stringifier that handles nested objects and arrays.
 * Produces output compatible with the qs library's indexed array format.
 */
function stringifyRequestData(data) {
    const pairs = [];
    function encode(key, value) {
        if (value === undefined) {
            return;
        }
        if (value === null || typeof value !== 'object' || value instanceof Date) {
            // Primitive value (including null and Date)
            pairs.push(encodeQueryValue(key) + '=' + encodeQueryValue(valueToString(value)));
            return;
        }
        if (Array.isArray(value)) {
            // Array: use indexed format arr[0], arr[1], etc.
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== undefined) {
                    encode(key + '[' + i + ']', value[i]);
                }
            }
            return;
        }
        // Object: recurse with bracket notation
        for (const k of Object.keys(value)) {
            encode(key + '[' + k + ']', value[k]);
        }
    }
    // Handle top-level object
    if (typeof data === 'object' && data !== null) {
        for (const key of Object.keys(data)) {
            encode(key, data[key]);
        }
    }
    return pairs.join('&');
}
/**
 * Outputs a new function with interpolated object property values.
 * Use like so:
 *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
 */
const makeURLInterpolator = (() => {
    const rc = {
        '\n': '\\n',
        '"': '\\"',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    };
    return (str) => {
        const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
        return (outputs) => {
            return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => {
                const output = outputs[$1];
                if (isValidEncodeUriComponentType(output))
                    return encodeURIComponent(output);
                return '';
            });
        };
    };
})();
function isValidEncodeUriComponentType(value) {
    return ['number', 'string', 'boolean'].includes(typeof value);
}
function extractUrlParams(path) {
    const params = path.match(/\{\w+\}/g);
    if (!params) {
        return [];
    }
    return params.map((param) => param.replace(/[{}]/g, ''));
}
/**
 * Return the data argument from a list of arguments
 *
 * @param {object[]} args
 * @returns {object}
 */
function getDataFromArgs(args) {
    if (!Array.isArray(args) || !args[0] || typeof args[0] !== 'object') {
        return {};
    }
    if (!isOptionsHash(args[0])) {
        return args.shift();
    }
    const argKeys = Object.keys(args[0]);
    const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
    // In some cases options may be the provided as the first argument.
    // Here we're detecting a case where there are two distinct arguments
    // (the first being args and the second options) and with known
    // option keys in the first so that we can warn the user about it.
    if (optionKeysInArgs.length > 0 &&
        optionKeysInArgs.length !== argKeys.length) {
        emitWarning(`Options found in arguments (${optionKeysInArgs.join(', ')}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
    }
    return {};
}
/**
 * Return the options hash from a list of arguments
 */
function getOptionsFromArgs(args) {
    const opts = {
        host: null,
        headers: {},
        settings: {},
        streaming: false,
    };
    if (args.length > 0) {
        const arg = args[args.length - 1];
        if (typeof arg === 'string') {
            opts.authenticator = createApiKeyAuthenticator(args.pop());
        }
        else if (isOptionsHash(arg)) {
            const params = Object.assign({}, args.pop());
            const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
            if (extraKeys.length) {
                emitWarning(`Invalid options found (${extraKeys.join(', ')}); ignoring.`);
            }
            if (params.apiKey) {
                opts.authenticator = createApiKeyAuthenticator(params.apiKey);
            }
            if (params.idempotencyKey) {
                opts.headers['Idempotency-Key'] = params.idempotencyKey;
            }
            if (params.stripeAccount) {
                opts.headers['Stripe-Account'] = params.stripeAccount;
            }
            if (params.stripeContext) {
                if (opts.headers['Stripe-Account']) {
                    throw new Error("Can't specify both stripeAccount and stripeContext.");
                }
                opts.headers['Stripe-Context'] = params.stripeContext;
            }
            if (params.apiVersion) {
                opts.headers['Stripe-Version'] = params.apiVersion;
            }
            if (Number.isInteger(params.maxNetworkRetries)) {
                opts.settings.maxNetworkRetries = params.maxNetworkRetries;
            }
            if (Number.isInteger(params.timeout)) {
                opts.settings.timeout = params.timeout;
            }
            if (params.host) {
                opts.host = params.host;
            }
            if (params.authenticator) {
                if (params.apiKey) {
                    throw new Error("Can't specify both apiKey and authenticator.");
                }
                if (typeof params.authenticator !== 'function') {
                    throw new Error('The authenticator must be a function ' +
                        'receiving a request as the first parameter.');
                }
                opts.authenticator = params.authenticator;
            }
            if (params.additionalHeaders) {
                opts.headers = params.additionalHeaders;
            }
            if (params.streaming) {
                opts.streaming = true;
            }
        }
    }
    return opts;
}
/**
 * Provide simple "Class" extension mechanism.
 * <!-- Public API accessible via Stripe.StripeResource.extend -->
 */
function protoExtend(sub) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Super = this;
    const Constructor = Object.prototype.hasOwnProperty.call(sub, 'constructor')
        ? sub.constructor
        : function (...args) {
            Super.apply(this, args);
        };
    // This initialization logic is somewhat sensitive to be compatible with
    // divergent JS implementations like the one found in Qt. See here for more
    // context:
    //
    // https://github.com/stripe/stripe-node/pull/334
    Object.assign(Constructor, Super);
    Constructor.prototype = Object.create(Super.prototype);
    Object.assign(Constructor.prototype, sub);
    return Constructor;
}
/**
 * Remove empty values from an object
 */
function removeNullish(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Argument must be an object');
    }
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] != null) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/**
 * Normalize standard HTTP Headers:
 * {'foo-bar': 'hi'}
 * becomes
 * {'Foo-Bar': 'hi'}
 */
function normalizeHeaders(obj) {
    if (!(obj && typeof obj === 'object')) {
        return obj;
    }
    return Object.keys(obj).reduce((result, header) => {
        result[normalizeHeader(header)] = obj[header];
        return result;
    }, {});
}
/**
 * Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
 * without the exceptions which are irrelevant to us.
 */
function normalizeHeader(header) {
    return header
        .split('-')
        .map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
        .join('-');
}
function callbackifyPromiseWithTimeout(promise, callback) {
    if (callback) {
        // Ensure callback is called outside of promise stack.
        return promise.then((res) => {
            setTimeout(() => {
                callback(null, res);
            }, 0);
        }, (err) => {
            setTimeout(() => {
                callback(err, null);
            }, 0);
        });
    }
    return promise;
}
/**
 * Allow for special capitalization cases (such as OAuth)
 */
function pascalToCamelCase(name) {
    if (name === 'OAuth') {
        return 'oauth';
    }
    else {
        return name[0].toLowerCase() + name.substring(1);
    }
}
function emitWarning(warning) {
    if (typeof process.emitWarning !== 'function') {
        return console.warn(`Stripe: ${warning}`); /* eslint-disable-line no-console */
    }
    return process.emitWarning(warning, 'Stripe');
}
function isObject(obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
}
// For use in multipart requests
function flattenAndStringify(data) {
    const result = {};
    const step = (obj, prevKey) => {
        Object.entries(obj).forEach(([key, value]) => {
            const newKey = prevKey ? `${prevKey}[${key}]` : key;
            if (isObject(value)) {
                if (!(value instanceof Uint8Array) &&
                    !Object.prototype.hasOwnProperty.call(value, 'data')) {
                    // Non-buffer non-file Objects are recursively flattened
                    return step(value, newKey);
                }
                else {
                    // Buffers and file objects are stored without modification
                    result[newKey] = value;
                }
            }
            else {
                // Primitives are converted to strings
                result[newKey] = String(value);
            }
        });
    };
    step(data, null);
    return result;
}
function validateInteger(name, n, defaultVal) {
    if (!Number.isInteger(n)) {
        if (defaultVal !== undefined) {
            return defaultVal;
        }
        else {
            throw new Error(`${name} must be an integer`);
        }
    }
    return n;
}
function determineProcessUserAgentProperties() {
    return typeof process === 'undefined'
        ? {}
        : {
            lang_version: process.version,
            platform: process.platform,
        };
}
function createApiKeyAuthenticator(apiKey) {
    const authenticator = (request) => {
        request.headers.Authorization = 'Bearer ' + apiKey;
        return Promise.resolve();
    };
    // For testing
    authenticator._apiKey = apiKey;
    return authenticator;
}
/**
 * Joins an array of Uint8Arrays into a single Uint8Array
 */
function concat(arrays) {
    const totalLength = arrays.reduce((len, array) => len + array.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    arrays.forEach((array) => {
        merged.set(array, offset);
        offset += array.length;
    });
    return merged;
}
/**
 * Replaces Date objects with Unix timestamps
 */
function dateTimeReplacer(key, value) {
    if (this[key] instanceof Date) {
        return Math.floor(this[key].getTime() / 1000).toString();
    }
    return value;
}
/**
 * JSON stringifies an Object, replacing Date objects with Unix timestamps
 */
function jsonStringifyRequestData(data) {
    return JSON.stringify(data, dateTimeReplacer);
}
/**
 * Inspects the given path to determine if the endpoint is for v1 or v2 API
 */
function getAPIMode(path) {
    if (!path) {
        return 'v1';
    }
    return path.startsWith('/v2') ? 'v2' : 'v1';
}
function parseHttpHeaderAsString(header) {
    if (Array.isArray(header)) {
        return header.join(', ');
    }
    return String(header);
}
function parseHttpHeaderAsNumber(header) {
    const number = Array.isArray(header) ? header[0] : header;
    return Number(number);
}
function parseHeadersForFetch(headers) {
    return Object.entries(headers).map(([key, value]) => {
        return [key, parseHttpHeaderAsString(value)];
    });
}


/***/ })

};
;