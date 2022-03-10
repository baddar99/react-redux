import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskName,
  setTaskGroup,
}) => {
  return (
    <div>
      <div>
        <input value={task.name} onChange={setTaskName} />
      </div>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>
          {isComplete ? 'Reopen' : 'Complete'}
        </button>
      </div>
      <div>
        <select onChange={setTaskGroup} value={task.group}>
          {groups.map(group => {
            return (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <Link to={'/dashboard'}>
          <button>Done</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const task = state.tasks.find(task => task.id === id);
  const groups = state.groups;
  return { id, task, groups, isComplete: task.isComplete };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
