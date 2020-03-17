
import React, { Component} from 'react';
import ImageList from './imagesList';
import Header from './header'
import {tokenLogin} from './globalFunction'
import Typography from '@material-ui/core/Typography';



export default class ImageListClass extends Component{

  //classe che richiede all'api la lista delle immagini dell'utente e le passa al "imagesList" per la visualizzazione

    constructor(props){
        super(props)
        this.state = {
            links: [],
            loaded: false,
            notAuthenticated: false,
        }
        
        
    }
    
    //metodo per la richiesta delle immagini all'api
    //ritorna un array di oggetti di formato {id:string,url:string}
    getImagesLinks= async()=>{
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
    
    //metodo che viene chiamato dopo la renderizzazione del componente
    componentDidMount(){
      //viene controllato nuovamente se il token e l'username permettono l'accesso ai dati
      tokenLogin().then(r => {
        if(r){
          //in caso ci sia l'accesso richiede le immagini
          this.getImagesLinks().then(r =>
            //settaggio dello stato in modo da renderizzare il componente ImagesList
            this.setState({links: r,loaded: true})
          )
        }
        else{
          //settaggio dello stato per far visualizzare un messaggio d'errore
          this.setState({notAuthenticated: true,loaded: true})
        }
      })  
    }


    render(){
          //controlla se l'array di link è già disponibile
          if(!this.state.loaded)
            return false
          else{
            //controlla se è presente un errore di autenticazione
            if(this.state.notAuthenticated === false)
              return (
                <div>
                  <Header/>
                  <ImageList linkList={this.state.links} />
                </div>
              )
            else
              return (
                <div>
                  <Typography  variant="h2" component="h2" gutterBottom>
                    NOT AUTORIZED!
                  </Typography>
                  <Typography variant="h3" component="h2" gutterBottom>
                    Please <a href="../singIn">sing in</a> or <a href="../singUp">create a new account</a>
                  </Typography>
                </div>
              )
          }
      
    }
}