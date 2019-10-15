import React from 'react';
import ImportedTasks from './tasks.json';
import ListElement from './listElement';
import './style.css'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class MainList extends React.Component{
    constructor (props){
        super (props);
        this.state = {
            tasks:[],
            renderCount:5
        }
    }
    
    increaseCount  = async () => {
        let count = this.state.renderCount
    this.setState({renderCount:count+5}, this.renderArray())
    console.log (this.state.renderCount)
    }
    componentDidMount (){
        this.renderArray()
    }
    renderArray = ()=>{
        let arrMax= this.state.renderCount;
        let auxArr= JSON.parse(JSON.stringify(ImportedTasks));
        this.setState({tasks: auxArr.slice(0,arrMax)})
        console.log('hi')
    }
    renderChildren = ()=>{
        return this.state.tasks.length? this.state.tasks.slice(0,this.state.renderCount).map((task, idx)=><ListElement key={idx} data={task}/>) : "";
    }
    render (){
        return(
            <div className= "MainList" >
               <input type='button' value='See More' onClick={this.increaseCount}/>
                {this.renderChildren()}
            </div>

        )
    }
}
export default MainList;