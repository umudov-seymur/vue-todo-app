import client from "./client";

const END_POINT = "/todos";

const getAllTodos = (page) => client.get(`${END_POINT}?page=${page}`);
const storeTodo = (todo) => client.post(END_POINT, todo);
const updateTodo = (todo) => client.put(`${END_POINT}/${todo.id}`, todo);
const removoTodo = (id) => client.delete(`${END_POINT}/${id}`);

const updateCheckAll = (ids) => client.post(`${END_POINT}/check-all`, ids);
const destroyCompleted = (ids) =>
  client.post(`${END_POINT}/delete-completed`, { ids });

export {
  getAllTodos,
  storeTodo,
  updateTodo,
  removoTodo,
  updateCheckAll,
  destroyCompleted,
};
