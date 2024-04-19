import { Checkbox } from './ui/checkbox';

const TodoCard = ({ item, index, setTodos, todos }) => {
  const handleComplete = async (todoId, todoIndex) => {
    try {
      const res = await fetch(`http://localhost:5000/todo/${todoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isComplete: !item.isComplete }),
      });
      const updatedTodo = await res.json();
      setTodos([
        ...todos.slice(0, todoIndex),
        updatedTodo,
        ...todos.slice(todoIndex + 1),
      ]);
    } catch (err) {
      console.log('While updating', err);
    }
  };

  return (
    <div className="border border-gray-200 px-3 py-2 rounded-md flex items-center gap-2">
      <Checkbox
        checked={item.isComplete}
        onCheckedChange={() => handleComplete(item._id, index)}
      />
      <p
        className={`font-semibold ${
          item.isComplete ? 'line-through text-gray-400' : null
        } `}
      >
        {item?.todo}
      </p>
      <div
        className={`size-3 rounded-full ml-auto shrink-0 
      ${item.priority === 'high' ? 'bg-red-500' : null} 
      ${item.priority === 'medium' ? 'bg-yellow-500' : null} 
      ${item.priority === 'low' ? 'bg-green-500' : null} 
      `}
      />
    </div>
  );
};

export default TodoCard;
