import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import BlogForm from "./BlogForm";

describe("blog form unit test", () => {
  let component;
  let saveBlog;
  let createNotification;
  beforeEach(() => {
    saveBlog = jest.fn();
    createNotification = jest.fn();
    component = render(
      <BlogForm saveBlog={saveBlog} createNotification={createNotification} />
    );
  });

  test("should save blog with right details", () => {
    const fieldValue = {
      target: {
        value: "",
      },
    };
    const titleField = component.container.querySelector("#title-field");
    const urlField = component.container.querySelector("#url-field");

    fieldValue.target.value = "Diego";
    fireEvent.change(titleField, fieldValue);
    fieldValue.target.value = "www.net";
    fireEvent.change(urlField, fieldValue);

    fireEvent.submit(component.container.querySelector("form"));

    expect(saveBlog.mock.calls[0][0].title).toBe("Diego");
    expect(saveBlog.mock.calls[0][0].url).toBe("www.net");
  });
});
