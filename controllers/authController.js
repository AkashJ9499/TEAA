
function signIn(req,res){
    res.render('index.ejs',{});
}

function signUp(req,res){
    res.render('index.ejs',{});
}
function callbackOAuth(req,res){
    res.send(req.query.code);
}
module.exports={
    signIn,
    signUp,
    callbackOAuth
}