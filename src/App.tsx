import { ChangeEvent, FormEvent, useState } from 'react';

interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddTodo();
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText) {
      const newTodo = {
        id: Date.now().toString(),
        title: inputText,
        isComplete: false,
      };
      const copy = [...todos];

      setTodos([...copy, newTodo]);
      setInputText('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    const index = todos.findIndex((todo) => todo.id === id);

    if (index != -1) {
      const copy = [...todos];
      copy.splice(index, 1);
      setTodos(copy);
    }
  };

  const handleToggleCompleteTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    const index = todos.findIndex((todo) => todo.id === id);

    if (todo) {
      const copy = [...todos];

      copy[index].isComplete = !todo.isComplete;
      setTodos(copy);
    }
  };
  const handleEditTodo = () => {};

  return (
    <div>
      <h1>Simple To-Do App</h1>
      <section className={'add-new-todo'}>
        <form onSubmit={handleSubmit}>
          <label className={'add-new-todo__label'} htmlFor={'add-new-todo'}>
            Add a new to-do item
          </label>
          <input
            className={'add-new-todo__input'}
            id={'add-new-todo'}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            value={inputText}
          />
          <button
            type={'button'}
            className={'add-new-todo__button'}
            onClick={handleAddTodo}
          >
            Add new
          </button>
        </form>
      </section>

      {todos.map((todo) => (
        <>
          <section>
            <dl>
              <div>
                <dt
                  className={
                    todo.isComplete
                      ? 'todo__title todo__title--done'
                      : 'todo__title'
                  }
                >
                  {todo.title}
                </dt>
                <dd>Status: {todo.isComplete ? 'Done' : 'Needs Attention'}</dd>
                <dd>
                  {!todo.isComplete ? (
                    <button
                      type={'button'}
                      className={'todo-item__button--edit'}
                      onClick={handleEditTodo}
                    >
                      Edit
                    </button>
                  ) : null}

                  <button
                    type={'button'}
                    className={'todo-item__button--delete'}
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>

                  <button
                    type={'button'}
                    className={'todo-item__button--toggle-complete'}
                    onClick={() => handleToggleCompleteTodo(todo.id)}
                  >
                    Mark Complete
                  </button>
                </dd>
              </div>
            </dl>
          </section>
        </>
      ))}
    </div>
  );
}

export default App;
