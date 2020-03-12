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