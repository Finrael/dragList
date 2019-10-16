import React from 'react';
import ImportedTasks from './tasks.json';
import ListElement from './listElement';
// import './style.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

class MainList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: '',
            renderCount: 5
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
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

    increaseCount = async () => {
        let count = this.state.renderCount
        this.setState({ renderCount: count + 5 }, this.renderArray())
        console.log(this.state.renderCount)
    }
    componentDidMount() {
        this.renderArray()
    }
    renderArray = () => {
        let arrMax = this.state.renderCount;
        let auxArr = JSON.parse(JSON.stringify(ImportedTasks));
        this.setState({ tasks: auxArr.slice(0, arrMax) })
        console.log('hi')
    }

    renderChildren = () => {
        return this.state.tasks.length ? this.state.tasks.slice(0, this.state.renderCount).map((task, idx) =>
            <Draggable key={task[idx]} draggableId={task[idx]} index={idx}>
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
                        <ListElement key={idx} data={task} />
                    </div>
                )}
            </Draggable>
        ) : "";
    }
    render() {
        return (
            <div>
                <input type='button' value='See More' onClick={this.increaseCount} />
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

export default MainList;