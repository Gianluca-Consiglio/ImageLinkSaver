
import React, { Component} from 'react';
import ImageList from './imagesList';
import Header from './header'
import {tokenLogin} from './globalFunction'
import Typography from '@material-ui/core/Typography';



export default class ImageListClass extends Component{

    constructor(props){
        super(props)
        this.state = {
            links: [],
            loaded: false,
            notAuthenticated: false,
        }
        
        
    }
    

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
    
    componentDidMount(){
      tokenLogin().then(r => {
        if(r){
          this.getImagesLinks().then(r =>
            this.setState({links: r,loaded: true})
          )
        }
        else{
          this.setState({notAuthenticated: true,loaded: true})
        }
      })  
    }


    render(){
          if(!this.state.loaded)
            return false
          else{
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