

class ApiError extends Error{
    constructor(statusCode,message='somthing went wrong',errors=[],stack=''){
        super(message);
        this.statusCode = statusCode,
        this.data = []
        this.error = errors,
        this.message = message
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export default ApiError