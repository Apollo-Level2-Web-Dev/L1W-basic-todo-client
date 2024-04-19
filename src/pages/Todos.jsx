import TodoCard from '@/components/TodoCard';
import { TodoModal } from '@/components/TodoModal';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { Input } from '@/components/ui/input';
import { LogOut, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/todos');

      if (!res.ok) {
        throw new Error(`Failed to fetch todos : ${res.statusText}`);
      }

      const allTodos = await res.json();

      console.log(allTodos);

      setTodos(allTodos);
    } catch (err) {
      console.log('While fetching todos', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container>
      <div className="flex justify-between mt-32">
        <div className="flex items-center gap-2">
          <SearchIcon />
          <Input type="text" placeholder="Search todo" />
        </div>
        <div>
          <TodoModal
            todos={todos}
            setTodos={setTodos}
            setError={setError}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      <div className="border-b border-gray-300  my-5" />
      <div>
        {isLoading && (
          <p className="text-center text-gray-400 text-xl my-16">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 text-xl my-16">
            Error: {error}
          </p>
        )}
        {todos.length === 0 && !isLoading && !error && (
          <p className="text-center text-gray-400 text-xl my-16">
            Nothing to see here, the list is empty. Try to add something using
            &quot;Add todo&quot; button .
          </p>
        )}
        {todos.length > 0 && !isLoading && !error && (
          <div className="space-y-2">
            {todos?.map((item, index) => (
              <TodoCard
                item={item}
                key={item._id}
                index={index}
                setTodos={setTodos}
                todos={todos}
                setIsLoading={setIsLoading}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Todos;
