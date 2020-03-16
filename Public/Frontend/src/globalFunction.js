export function validString(string){
    var list = invalidCharList()
    var result = true
    list.forEach(element =>{
        if(string.includes(element))
            result = false
    })
    return result
  }

export function invalidCharList(){
    return ["'",'"','{','}','(',')','[',']','=','+','&','%','|','/','^']
}

export function invalidCharString(){
    var list = invalidCharList()
    var s = ""
    list.forEach(element => {
        s += element + ', '
    });
    s = s.substring(0,s.length-1)
    return s
}

export async function getImagesLinks(){
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
      console.log(r.images);
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