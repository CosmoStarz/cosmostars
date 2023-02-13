export const forumApi = {
  getTopic: () => ([
    {
      id: 1,
      author: "Petr Petrov",
      content: "nice",
      likesCount: 2,
    },
    {
      id: 2,
      author: "Ivan Ivanov",
      content: "good topic",
    },
  ]),
  getAuthor: () => ({
    id: 3,
    title: "Topic example",
    author: "John Johnov",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    likesCount: 5,
  }),
};
