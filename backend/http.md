# HTTP Status Codes Reference

## 1xx Informational Responses
Temporary responses indicating the server received the request and is continuing processing.

| Code | Status            | Description                                                                 | Typical Use Case                          |
|------|-------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| 100  | Continue          | Client should continue the request or ignore if already finished            | Large POST requests with Expect: 100-continue header |
| 101  | Switching Protocols | Server agrees to switch protocols as requested by client                 | WebSocket upgrades, HTTP/2 transitions   |
| 102  | Processing        | Server has received and is processing the request but no response available | Long-running requests (WebDAV)           |
| 103  | Early Hints       | Used to return some response headers before final HTTP message              | Preloading resources                     |

## 2xx Success Responses
Indicates that the client's request was successfully received, understood, and accepted.

| Code | Status            | Description                                                                 | Typical Use Case                          |
|------|-------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| 200  | OK                | Standard response for successful requests                                   | GET, POST, PUT, DELETE success           |
| 201  | Created           | Request succeeded and resource was created                                  | Successful POST to create resource        |
| 202  | Accepted          | Request accepted but processing not complete                                | Asynchronous processing                   |
| 203  | Non-Authoritative | Transformed version of 200 from intermediary                               | Proxy modifications                      |
| 204  | No Content        | Success but no body to return                                              | DELETE requests, form submissions         |
| 205  | Reset Content     | Client should reset document view                                          | Form clearing after submission            |
| 206  | Partial Content   | Server delivering partial resource                                         | Range requests, large file downloads      |
| 207  | Multi-Status      | Multiple status codes for different parts                                  | WebDAV batch operations                   |
| 208  | Already Reported  | Members of DAV binding already enumerated                                  | WebDAV propfind                           |
| 226  | IM Used           | Server fulfilled GET request for resource                                  | Delta encoding implementations            |

## 3xx Redirection Responses
Indicates further action needs to be taken to complete the request.

| Code | Status              | Description                                                                 | Typical Use Case                          |
|------|---------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| 300  | Multiple Choices    | Multiple options for resource representation                               | Content negotiation                       |
| 301  | Moved Permanently   | Resource permanently moved to new URI                                      | Website restructuring                     |
| 302  | Found               | Resource temporarily moved to different URI                                 | Temporary redirects                       |
| 303  | See Other           | Client should make GET request to another URI                               | POST-redirect-GET pattern                 |
| 304  | Not Modified        | Resource not modified since last request                                   | Conditional GET requests                  |
| 305  | Use Proxy           | Request must be accessed through proxy (deprecated)                        | Legacy proxy requirements                 |
| 307  | Temporary Redirect  | Same as 302 but preserves HTTP method                                      | Temporary redirects with method preservation |
| 308  | Permanent Redirect  | Same as 301 but preserves HTTP method                                      | Permanent redirects with method preservation |

## 4xx Client Error Responses
Indicates errors where the client appears to have erred.

| Code | Status              | Description                                                                 | Typical Use Case                          |
|------|---------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| 400  | Bad Request         | Server cannot process malformed request                                    | Invalid syntax, malformed request         |
| 401  | Unauthorized        | Authentication required and failed                                         | Missing/invalid credentials               |
| 402  | Payment Required    | Reserved for future use (originally for digital payment)                   | Rarely implemented                        |
| 403  | Forbidden           | Server refuses action regardless of auth                                   | Insufficient permissions                  |
| 404  | Not Found           | Resource not found at requested URI                                        | Broken links, deleted resources           |
| 405  | Method Not Allowed  | HTTP method not supported for this resource                                | Using POST when only GET allowed          |
| 406  | Not Acceptable      | Server cannot produce response matching client's Accept headers            | Content negotiation failures              |
| 407  | Proxy Auth Required | Client must authenticate with proxy first                                  | Proxy authentication                      |
| 408  | Request Timeout     | Server timed out waiting for request                                       | Client took too long to send request      |
| 409  | Conflict            | Request conflicts with current server state                                | Version control conflicts                 |
| 410  | Gone                | Resource permanently removed with no forwarding address                    | Expired promotional content               |
| 411  | Length Required     | Server requires Content-Length header                                      | Missing Content-Length                    |
| 412  | Precondition Failed | Client's preconditions in headers failed                                   | Conditional requests failure              |
| 413  | Payload Too Large   | Request larger than server willing/able to process                         | File uploads exceeding limits             |
| 414  | URI Too Long        | URI longer than server willing to interpret                                | Excessive query parameters                |
| 415  | Unsupported Media   | Payload format unsupported by resource                                     | Incorrect Content-Type                    |
| 416  | Range Not Satisfiable | Requested range not available for resource                               | Invalid Range header                      |
| 417  | Expectation Failed  | Server cannot meet Expect request-header requirements                      | Failed Expect: 100-continue               |
| 418  | I'm a teapot        | April Fools' joke (RFC 2324)                                               | Never actually used                       |
| 421  | Misdirected Request | Server not configured to produce response for URI scheme                   | Wrong virtual host                        |
| 422  | Unprocessable Entity | Well-formed but semantically incorrect request                            | WebDAV, validation errors                 |
| 423  | Locked              | Resource is locked                                                         | WebDAV locked resources                   |
| 424  | Failed Dependency   | Request failed because of previous failure                                 | WebDAV dependency failures                |
| 425  | Too Early           | Server unwilling to risk processing replay attack                         | Replayed requests                         |
| 426  | Upgrade Required    | Client should switch to different protocol                                 | HTTP to HTTPS upgrades                    |
| 428  | Precondition Required | Server requires conditional requests                                      | Missing If-Match header                   |
| 429  | Too Many Requests   | Client sent too many requests in given time                                | Rate limiting                             |
| 431  | Request Header Fields Too Large | Headers too large for server to process                                | Excessive/cookies too big                 |
| 451  | Unavailable For Legal Reasons | Resource censored for legal reasons                                    | Government-mandated restrictions          |

## 5xx Server Error Responses
Indicates server failed to fulfill valid request.

| Code | Status                  | Description                                                                 | Typical Use Case                          |
|------|-------------------------|-----------------------------------------------------------------------------|-------------------------------------------|
| 500  | Internal Server Error   | Generic server error when no more specific message appropriate              | Server-side exceptions                    |
| 501  | Not Implemented         | Server lacks ability to fulfill request                                     | Unsupported HTTP methods                  |
| 502  | Bad Gateway             | Invalid response from upstream server                                       | Proxy/gateway issues                      |
| 503  | Service Unavailable     | Server temporarily unable to handle request                                 | Maintenance, overload                     |
| 504  | Gateway Timeout         | Upstream server failed to respond in time                                   | Proxy/gateway timeouts                    |
| 505  | HTTP Version Not Supported | Server doesn't support HTTP version used in request                      | Legacy clients                            |
| 506  | Variant Also Negotiates | Server has internal configuration error                                     | Content negotiation errors                |
| 507  | Insufficient Storage    | Server unable to store representation needed to complete request            | WebDAV storage issues                     |
| 508  | Loop Detected           | Server detected infinite loop processing request                           | WebDAV recursive operations               |
| 510  | Not Extended            | Server needs extended request from client                                   | Optional extensions                       |
| 511  | Network Auth Required   | Client needs to authenticate to gain network access                         | Captive portals                           |

## Requirements for Proper Use

### General Requirements:
- **1xx codes**: Must not include a body, used for provisional responses
- **2xx codes**: Indicate success, may include response body
- **3xx codes**: Should include Location header when redirecting
- **4xx codes**: Client-side error, client should not repeat without modification
- **5xx codes**: Server-side error, client may retry later

### Best Practices:
- Use specific status codes rather than generic ones when possible
- Include appropriate headers (Location for redirects, Retry-After for 503, etc.)
- Provide meaningful error details in response body for 4xx/5xx errors
- Cache 3xx responses appropriately (permanent vs. temporary)
- Follow REST conventions for appropriate status codes per method:
  - GET: 200 (OK), 404 (Not Found)
  - POST: 201 (Created), 400 (Bad Request)
  - PUT: 200 (OK), 204 (No Content)
  - DELETE: 200 (OK), 204 (No Content), 404 (Not Found)