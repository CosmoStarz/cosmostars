export const forumApi = {
  getTopic: () => [
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
  ],
  getAuthor: () => ({
    id: 3,
    display_name: "John Johnov",
    login: "User",
    avatar: null,
  }),
  getComments: () => [
    {
      topicId: 1,
      comments: [
        { id: 1, content: "Comment 1", author: "Comment Author" },
        { id: 2, content: "Comment 2", author: "Comment Author 2" },
      ],
    },
  ],
};
