import React from 'react';
import ImportedTasks from './tasks.json';
import ListElement from './listElement';
import './style.css'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import styled, { css } from 'styled-components';

class MainList extends React.Component{
    constructor (props){
        super (props);
        this.state = {
            tasks:[],
            renderCount:5,
            isDragging: false,

            originalX: 0,
            originalY: 0,
        
            translateX: 0,
            translateY: 0,
        
            lastTranslateX: 0,
            lastTranslateY: 0

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
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
      }
    
      handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    
        if (this.props.onDragStart) {
          this.props.onDragStart();
        }
    
        this.setState({
          originalX: clientX,
          originalY: clientY,
          isDragging: true
        });
      };
    
      handleMouseMove = ({ clientX, clientY }) => {
        const { isDragging } = this.state;
        const { onDrag } = this.props;
    
        if (!isDragging) {
          return;
        }
    
        this.setState(prevState => ({
          translateX: clientX - prevState.originalX + prevState.lastTranslateX,
          translateY: clientY - prevState.originalY + prevState.lastTranslateY
        }), () => {
          if (onDrag) {
            onDrag({
              translateX: this.state.translateX,
              translateY: this.state.translateY
            });
          }
        });
      };
    
      handleMouseUp = () => {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    
        this.setState(
          {
            originalX: 0,
            originalY: 0,
            lastTranslateX: this.state.translateX,
            lastTranslateY: this.state.translateY,
    
            isDragging: false
          },
          () => {
            if (this.props.onDragEnd) {
              this.props.onDragEnd();
            }
          }
        );
      };
    render (){
        const { translateX, translateY, isDragging } = this.state;
        return(
            <div>
                <input type='button' value='See More' onClick={this.increaseCount}/>
           
            <Container
        onMouseDown={this.handleMouseDown}
        x={translateX}
        y={translateY}
        isDragging={isDragging}
      >
        {this.renderChildren()}
      </Container>
      </div>
        )
    }
}
const Container = styled.div.attrs({
    style: ({ x, y }) => ({
      transform: `translate(${x}px, ${y}px)`
    }),
  })`
    cursor: grab;
    
    ${({ isDragging }) =>
    isDragging && css`
      opacity: 0.8;
      cursor: grabbing;
    `};
  `;
export default MainList;