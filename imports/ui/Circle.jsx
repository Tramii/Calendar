import React, {Component} from "react";

export default class Circle extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    var toReturn;
    if(this.props.userImageUrl){
      toReturn = (
                <div style={{color:'white',margin:'auto'}}>
                  <img src={this.props.userImageUrl}/>
                </div>
      )
    }else{
      toReturn = (
                <div style={{color:'white',margin:'auto',fontSize:this.props.fontSize ? this.props.fontSize : '2vw'}}>
                  {this.props.userName[0][0] + this.props.userName[1][0]}
                </div>
      )
    }
    
    return (
      <div style={{background:!this.props.userImageUrl ? '#2c3e50' : 'transparent', height:this.props.heightInPx ? this.props.heightInPx : 50,width:this.props.widthInPx ? this.props.widthInPx : 50 ,borderRadius:'50%',display:'flex', alignItems:'center'}}>
        {toReturn}
      </div>
    )
  }
}
