export function validString(string){//funzione per la validazione di una stringa
    var list = invalidCharList()
    var result = true
    list.forEach(element =>{
        if(string.includes(element))
            result = false
    })
    return result
  }

export function invalidCharList(){ //funzione che restituisce un array con tutti i caratteri non ammessi
    return ["'",'"','{','}','(',')','[',']','=','+','&','%','|','/','^']
}

export function invalidCharString(){//funzione che restituisce una stringa con tutti i caratteri non ammessi
    var list = invalidCharList()
    var s = ""
    list.forEach(element => {
        s += element + ', '
    });
    s = s.substring(0,s.length-1)
    return s
}

export async function getImagesLinks(){
    //funzione per la richiesta dei link delle immagini all'api
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    const request = new Request('https://ImgSaver-backend--gianluca-consig.repl.co/users/' + username + '/images',{
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json', 
        'x-access-token' : token 
        }
    })
    return await fetch(request).then(r => r.json()).then(r =>  {
      //console.log(r.images);
      return r.images
    }) 
}

export async function tokenLogin(){
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
      //console.log(r)
      if(r.status === "authenticated!"){
          localStorage.setItem("username",r.username)
          return true
      }
          
      else
          return false
      
  })
  return logIn.then(function(r) {return r})
}

export function fieldControl(setPasswordError, setUsernameError){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    let error = false;            
    if(password === ""){
      setPasswordError({error:true, helpText:"required field"})
      error = true
    }
    else
      setPasswordError({error:false, helpText:""})
    if(username === ""){
      setUsernameError({error:true, helpText:"required field"})
      error = true
    }
    else
      setUsernameError({error:false, helpText:""})
    if(!validString(username) || !validString(password)){
      error = true
      if(!validString(username))
        setUsernameError({error:true, helpText:"invalid characters( " + invalidCharString() + " )"})
      if(!validString(password))
        setPasswordError({error:true, helpText:"invalid characters( " + invalidCharString() + " )"})
      }
    
      return !error
  }