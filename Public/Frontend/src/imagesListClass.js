
import React, { Component} from 'react';
import ImageList from './imagesList';

export default class ImageListClass extends Component{

    constructor(props){
        super(props)
        this.state = {
            links: [],
            loaded: false,
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
          console.log(r.images);
          return r.images
        }) 
    }
    
    componentDidMount(){
      this.getImagesLinks().then(r =>
        this.setState({links: r,loaded: true})
      )
  }

    render(){
      if(!this.state.loaded)
        return false
      else
        return (
            <ImageList linkList={this.state.links} />
        )
    }
}