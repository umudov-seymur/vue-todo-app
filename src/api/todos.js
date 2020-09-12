import client from "./client";

const END_POINT = "/todos";

export default {
  getAllTodos(page) {
    return client.get(`${END_POINT}?page=${page}`);
  },
  storeTodo(todo) {
    return client.post(END_POINT, todo);
  },
  updateTodo(todo) {
    return client.put(`${END_POINT}/${todo.id}`, todo);
  },
  removoTodo(id) {
    return client.delete(`${END_POINT}/${id}`);
  },
  updateCheckAll(ids) {
    return client.post(`${END_POINT}/check-all`, ids);
  },
  destroyCompleted(ids) {
    return client.post(`${END_POINT}/delete-completed`, { ids });
  },
};
