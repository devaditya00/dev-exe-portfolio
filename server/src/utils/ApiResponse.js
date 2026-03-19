export class ApiResponse {
    static success(data, message = 'Success', statusCode = 200) {
        return {success:true, statusCode, message, data};
    }
    static error(message = 'Something went wrong', statusCode = 500, errors = []) {
        return {success: false, statusCode, message, errors};
    }
}