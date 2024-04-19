import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';

export function TodoModal({ todos, setTodos, setIsLoading, setError }) {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, control, reset: formReset } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');
    setIsLoading(true);
    setError(null);

    const todoData = {
      ...data,
      isComplete: false,
    };

    try {
      const res = await fetch('http://localhost:5000/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      });

      if (!res.ok) {
        throw new Error(`Error adding todo: ${res.statusText}`);
      }

      const newTodo = await res.json();

      setTodos([...todos, newTodo]);
      toast.success('Todo added', { id: toastId });
      formReset();
      setOpen(false);
    } catch (err) {
      console.log('While posting todo', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field: { onChange } }) => (
                <Select onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="todo">Todo</Label>
            <Textarea id="todo" {...register('todo')} />
          </div>

          <DialogFooter>
            <Button type="submit" className="mt-10">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
