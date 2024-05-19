// const asyncHandler = () => {

// }


// A higher order function that will be used for middlewares
// and after a middleware completes its task with the help of next
// it will go to the next middleware

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message,
//         })
//     }
// }

export {asyncHandler}

