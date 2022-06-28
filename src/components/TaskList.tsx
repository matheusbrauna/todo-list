import { CheckCircle, PlusCircle, Trash } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function TaskList() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksStorage = localStorage.getItem('Tasks');

    if (tasksStorage) {
      return JSON.parse(tasksStorage);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleCreateNewTask(event: FormEvent) {
    event?.preventDefault();
    if (!taskTitle) return;

    const newTask = { id: uuidv4(), title: taskTitle, isCompleted: false };
    setTasks(oldState => [...oldState, newTask]);
    setTaskTitle('');
  }

  function handleToggleTaskCheck(id: string) {
    const newTasks = tasks.map(task =>
      task.id == id
        ? {
            ...task,
            isCompleted: !task.isCompleted,
          }
        : task,
    );
    setTasks(newTasks);
  }

  function handleDeleteTask(id: string) {
    const newTaskWithoutDeletedOne = tasks.filter(task => task.id !== id);
    setTasks(newTaskWithoutDeletedOne);
  }

  const checkedTasks = tasks.reduce(
    (acc, task) => (task.isCompleted ? acc + 1 : acc),
    0,
  );

  return (
    <main>
      <div className='wrapper'>
        <form className='form' onSubmit={handleCreateNewTask}>
          <input
            type='text'
            placeholder='Adicione uma nova tarefa'
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
            required
          />
          <button type='submit'>
            Criar <PlusCircle size={16} />
          </button>
        </form>
      </div>
      <div className='wrapper infoContainer'>
        <div className='totalTasks'>
          <h4>Tarefas criadas</h4>
          <span>{tasks.length}</span>
        </div>

        <div className='tasksCompleted'>
          <h4>Concluídas</h4>
          <span>
            {checkedTasks} de {tasks.length}
          </span>
        </div>
      </div>
      <ul className='wrapper taskContainer'>
        {tasks.map(({ id, isCompleted, title }) => {
          return (
            <li className={isCompleted ? 'completed task' : 'task'} key={id}>
              <label>
                <input
                  type='checkbox'
                  name='checkbox'
                  id='chekbox'
                  checked={isCompleted}
                  onChange={() => handleToggleTaskCheck(id)}
                />
                <CheckCircle
                  size={32}
                  color={isCompleted ? '#5e60ce' : '#4EA8DE'}
                  weight={isCompleted ? 'fill' : 'regular'}
                />
              </label>

              <span>{title}</span>
              <Trash
                size={24}
                onClick={() => handleDeleteTask(id)}
                color='#808080'
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
