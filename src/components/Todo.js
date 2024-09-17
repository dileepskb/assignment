export const TodoItem = ({ todo, toggleComplete, deleteTodo }) => (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        <span onClick={toggleComplete}>{todo.text}</span>
        <button onClick={deleteTodo}>Delete</button>
    </li>
);