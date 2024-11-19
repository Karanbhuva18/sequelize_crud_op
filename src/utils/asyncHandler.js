

const asyncHandler = (fn) => async(req,res,next) =>{
    try{
        await fn(req,res,next)
    }
    catch(error){
        
        res.status(error.code||500).json({
            success: false,
            message: `unexpected error ${error.message}`,
            data: error.data || [],
            error: error.error || [],
        });
    }
}

export default asyncHandler;