const register = async(req,res) =>{
    try{
        
    }catch(error){

        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const login = async(req,res)=>{
    try{
        
    }catch(error){

        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}
const logout = async(req,res) =>{
    try{
        
    }catch(error){

        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

const getUser = async(req,res) =>{
    try{
        
    }catch(error){

        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}