import React from 'react';
import { Redirect } from 'react-router';
import {useState} from 'react';

async function tokenLogin(){
    let token = localStorage.getItem("token")
    let logIn = false

    if(token === null)
        return logIn
    
    const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/',{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json', 
            'x-access-token' : token 
        }
    })
    logIn = fetch(request).then(function(r) {return r.json()}).then(function(r){
        console.log(r)
        if(r.status == "authenticated!"){
            localStorage.setItem("username",r.username)
            return true
        }
            
        else
            return false
        
    })
    return logIn.then(function(r) {return r})
}

function Home(){
    const [redirect,setRedirect] = useState(false)

    tokenLogin().then(r => {
        setRedirect(r)
    })
    
    if(redirect){
        return(
            <Redirect push to={{
                pathname: "/imageList",
              }} />
        )
    }
    
    return(
        <div>
            <h1>Questa è l'home page di Images Link Saver!</h1>
        </div>
    )
}localStorage.getItem("token")

export default Home;