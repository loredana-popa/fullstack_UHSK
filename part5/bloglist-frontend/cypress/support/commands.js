Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogappUser")).accessToken
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});
