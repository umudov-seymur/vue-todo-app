var Mixin = {
  methods: {
    checkTodoInput(input) {
      return new Promise((resolve, reject) => {
        if (input.trim() !== "") {
          resolve(input);
        } else {
          reject("Please, fill the todo input!");
        }
      });
    },
  },
};

export default Mixin;
