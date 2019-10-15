import React from 'react';
import './style.css'

class ListElement extends React.Component{
    constructor (props){
        super (props);
        this.state = {
            tasks:{},
            id:'',
            details:'',
            completed:false,
        }
    }
    
    showJson  = (e) => {
       this.state.completed ? this.setState({completed:false}): this.setState({completed:true}); 
       console.log(this.state.completed)
    }
    componentDidMount (){
        this.setState({tasks: this.props.data})
       console.log('something2 ',this.props.data.details)
    }

    render (){
        return(
            <div className= "mainElementDiv">
                <label className='taskID'> some  {this.props.data.id}</label>
                <label className='taskDetails'>{this.props.data.details}</label> 
                <label className='taskCompleted'> this task is: {this.state.completed ? "Completed" : "Pending" }</label> 
               <input type='checkbox' className='changeButton' onChange={this.showJson}/>
            </div>

        )
    }
}
export default ListElement;