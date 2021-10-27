import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("blog hiding details", () => {
  let blogComponent;
  let sendLike;

  beforeEach(() => {
    const blog = {
      title: "This book rules",
      url: "www.com",
      author: {
        name: "Diego",
      },
      likes: 57,
    };
    const handleDelete = jest.fn();
    sendLike = jest.fn();
    blogComponent = render(
      <Blog blog={blog} handleDelete={handleDelete} sendLike={sendLike} />
    );
  });

  test("url and likes hidden by default", () => {
    const moreDetails = blogComponent.container.querySelector(".more-details");
    expect(moreDetails).toHaveStyle("display: none");
  });

  test("more details is shown when button is clicked", () => {
    const showButton = blogComponent.getByText("show");
    const moreDetails = blogComponent.container.querySelector(".more-details");

    fireEvent.click(showButton);
    expect(moreDetails).not.toHaveStyle("display: none");
  });

  test("like function must be called for every click", () => {
    const likeButton = blogComponent.getByText("like");

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(sendLike.mock.calls).toHaveLength(2);
  });
});
