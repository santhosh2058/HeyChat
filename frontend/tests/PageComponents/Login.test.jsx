import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { Login } from "@/PageComponents/Login";
import { render } from "../../test-utils/render";

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    formState: { errors: {} },
  }),
}));

vi.mock("react-router-dom", () => ({
  Link: () => <div />,
}));

describe("Login component", () => {
  it("calls onSubmit function when form is submitted", async () => {
    const onSubmit = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it("sets server error when response is not OK", async () => {
    const response = { ok: false, message: "Error message" };
    const setServerError = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(setServerError).toHaveBeenCalledTimes(1));
    expect(setServerError).toHaveBeenCalledWith(response.message);
  });

  it("sets server error when response is null", async () => {
    const response = null;
    const setServerError = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(setServerError).toHaveBeenCalledTimes(1));
    expect(setServerError).toHaveBeenCalledWith(
      "Network error. Please try again."
    );
  });

  it("does not set server error when response is OK", async () => {
    const response = { ok: true };
    const setServerError = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(setServerError).not.toHaveBeenCalled());
  });

  it("handles TypeError correctly", async () => {
    const error = new TypeError("TypeError message");
    const consoleError = vi.spyOn(console, "error");
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(consoleError).toHaveBeenCalledTimes(1));
    expect(consoleError).toHaveBeenCalledWith("Error:", error);
  });

  it("handles other errors correctly", async () => {
    const error = new Error("Error message");
    const setServerError = vi.fn();
    const onSubmit = vi.fn(() => {
      throw error;
    });
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(setServerError).toHaveBeenCalledTimes(1));
    expect(setServerError).toHaveBeenCalledWith(
      "Network error. Please try again."
    );
  });
});
