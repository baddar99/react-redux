import React from 'react';
import { connect } from 'react-redux';

const TaskList = ({ tasks, name }) => {
  return (
    <div>
      <h3>{name}</h3>
      {tasks.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const groupID = ownProps.id;

  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter(task => task.group === groupID),
  };
};

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
