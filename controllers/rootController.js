function homePage(req,res){
    if(typeof userProfile==='undefined'){
        res.render('index.ejs',{});}
    else{
    res.redirect('/success');
    }
}

function successPage(req,res){
    if(typeof userProfile!=='undefined'){
        res.render('success',{...userProfile,showDesc:false,availableCount:0})
        //console.log(userProfile);
    }else{
        res.redirect('/');
    }
}

function errorPage(req,res){
    res.send("error logging in")
}
module.exports={
    homePage,
    successPage,
    errorPage
}