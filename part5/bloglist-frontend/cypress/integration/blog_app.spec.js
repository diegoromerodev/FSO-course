// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Blog App", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "diego",
      password: "1234",
      name: "Diego Romero",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("form").should("have.id", "login-form");
  });

  describe("should respond to login when", function () {
    it("succesful", function () {
      cy.get("#username").type("diego");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();

      cy.contains("Diego Romero logged in");
    });

    it("failed", function () {
      cy.get("#username").type("diegoxd");
      cy.get("#password").type("1234");
      cy.get("#login-button").click();

      cy.should("not.contain", "Diego Romero logged in");
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "diego", password: "1234" });
    });

    it("a blog can be created", function () {
      cy.get("#blog-list").should("not.contain", "this new blog");

      cy.contains("create new blog").click();
      cy.get("#title-field").type("this new blog");
      cy.get("#url-field").type("wwwwwwwww.wwwwwwwwwww.net");
      cy.contains("save blog").click();

      cy.get("#blog-list").should("contain", "this new blog");
    });

    it("can like blogs", function () {
      cy.createBlog();
      cy.contains("show").click();
      cy.get("#like-button").click();
      cy.contains("1 likes");
    });

    it("can remove own posts", function () {
      cy.createBlog();
      cy.contains("remove").click();
      cy.get("#blog-list").should("not.contain", "tester blog :)");
    });

    it("can't remove other's posts", function () {
      cy.createBlog();
      cy.request("POST", "http://localhost:3003/api/users", {
        username: "diego2?",
        password: "1234",
        name: "Diego Romero",
      });
      cy.login({ username: "diego2?", password: "1234" });
      cy.contains("remove").click();
      cy.get("#blog-list").should("contain", "tester blog :)");
      cy.get(".notification").should("contain", "you can't do that");
    });

    it.only("blogs are sorted by likes", () => {
      cy.createManyBlogs();
      cy.get(".details").then((posts) => {
        posts.map((i, el) => {
          cy.wrap(el).contains("show").click();
          for (let i = 0; i < Math.floor(Math.random() * 12); i++) {
            cy.wrap(el).find(".like-button").click();
            cy.wait(500);
          }
        });
      });

      cy.get(".likes")
        .invoke("text")
        .then(($text) => {
          console.log($text);
          const likes = $text.split(" likes ").reduce((acc, like) => {
            console.log(acc, like);
            if (like) {
              parseInt(like);
              acc.push(like);
            }
            return acc;
          }, []);
          cy.wrap(likes).should(
            "deep.eq",
            likes.sort((a, b) => b - a)
          );
        });
    });
  });
});
