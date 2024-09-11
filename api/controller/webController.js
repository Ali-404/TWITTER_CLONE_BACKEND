
class  WebController{
    static get(req, res){
        return res.json({
            "message": "Welcome to twitter clone api v1.0 "
        });
        
    }
}

export default WebController;