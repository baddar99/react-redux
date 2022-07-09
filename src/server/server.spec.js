import { addNewTask, updateTask } from './server';

(async function myFunc() {
  await addNewTask({ name: 'My new task', id: '1234' });

  await updateTask({ name: 'My new task Updated', id: '1234' });
})();
