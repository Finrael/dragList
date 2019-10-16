import './components/style.css'
import ListElement from './components/listElement'
import * as serviceWorker from './serviceWorker';
import ImportedTasks from './components/tasks.json';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// this functions reorders the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#14FDA0" : "#A7A7FE",

  // styles for dragables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 800
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tasks:'',
        renderCount:5,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const tasks = reorder(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );

    this.setState({
        tasks
    });
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
    return this.state.tasks.length? this.state.tasks.slice(0,this.state.renderCount).map((task, idx)=>
        <Draggable key={task.id} draggableId={task.id} index={idx} className='dragableItem'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <ListElement key={idx} data={task}/>
          </div>
        )}
      </Draggable>
    ) : "";
}
  render() {
    return (
        <div>
        <input type='button' value='Show More' onClick={this.increaseCount}/>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.renderChildren()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
