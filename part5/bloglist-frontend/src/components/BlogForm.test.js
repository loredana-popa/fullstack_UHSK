import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import BlogForm from "./blogForm";

describe("<BlogForm />", () => {
  test("<BlogForm /> calls onSubmit handler with the correct details", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const title = screen.getByRole("textbox", { name: /title:/i });
    await user.type(title, "testing a form...");

    const author = screen.getByRole("textbox", { name: /author:/i });
    await user.type(author, "Loredana");

    const url = screen.getByRole("textbox", { name: /url:/i });
    await user.type(url, "www.test.com");

    const sendBtn = screen.getByRole("button", { name: /create/i });
    await user.click(sendBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "testing a form...",
      author: "Loredana",
      url: "www.test.com",
    });
  });
});
