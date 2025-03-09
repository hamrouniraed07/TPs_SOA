let tasks = [
    { id: '1', title: 'Développement Front-end', description: 'Créer une UI en React.', completed: false, duration: 5 },
    { id: '2', title: 'Back-end Authentification', description: 'Système de login sécurisé.', completed: false, duration: 3 }
  ];
  
  const taskResolver = {
    Query: {
      task: (_, { id }) => tasks.find(task => task.id === id),
      tasks: () => tasks,
    },
    Mutation: {
      addTask: (_, { title, description, completed, duration }) => {
        const task = { id: String(tasks.length + 1), title, description, completed, duration };
        tasks.push(task);
        return task;
      },
      completeTask: (_, { id }) => {
        const task = tasks.find(t => t.id === id);
        if (task) task.completed = true;
        return task;
      },
      changeDescription: (_, { id, description }) => {
        const task = tasks.find(t => t.id === id);
        if (task) task.description = description;
        return task;
      },
      deleteTask: (_, { id }) => {
        tasks = tasks.filter(t => t.id !== id);
        return { id };
      }
    }
  };
  
  module.exports = taskResolver;