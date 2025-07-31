export class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "suceess"
    ) {
        this.status = statusCode,
        this.data = data,
        this.message = message
        this.success < 500
    }
}