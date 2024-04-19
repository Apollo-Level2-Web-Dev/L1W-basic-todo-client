const arr = [
  { todo: 'todo 1', isComplete: false }, //* index 0
  { todo: 'todo 2', isComplete: false }, //* index 1
  { todo: 'todo 3', isComplete: false }, //* index 2
  { todo: 'todo 4', isComplete: false }, //* index 3
  { todo: 'todo 5', isComplete: false }, //* index 4
  { todo: 'todo 6', isComplete: false }, //* index 5
  { todo: 'todo 7', isComplete: false }, //* index 6
  { todo: 'todo 8', isComplete: false }, //* index 7
];

const index = 3;

const beforeIndexThree = arr.slice(0, index);
const modifiedTodo = { todo: 'todo 4', isComplete: true };
const afterIndexThree = arr.slice(index + 1);

const updatedList = [...beforeIndexThree, modifiedTodo, ...afterIndexThree];

console.log(updatedList);
