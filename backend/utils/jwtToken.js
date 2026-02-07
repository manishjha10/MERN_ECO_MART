// export const sendToken = (user, statusCode, res)=>{
//     const token=user.getJWTToken(); 
   
//     //options for cookies 
//     const options ={
//         expires: new Date(Date.now() + process.env.EXPIRE_COOKIE*24*60*60*1000),
//         httpOnly: true 
//     }
//     res.status(statusCode)
//     .cookie('token', token, options)
//     .json({
//         success:true,
//         user,
//         token
//     })

// }




export const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        ),
        httpOnly: true,
        sameSite: "lax",
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
        });
}; 