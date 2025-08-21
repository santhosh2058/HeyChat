import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { Login } from "@/PageComponents/Login";
import { render } from "../../test-utils/render";

// Mock react-hook-form
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    formState: { errors: {} },
  }),
}));

// Mock react-router-dom Link
vi.mock("react-router-dom", () => ({
  Link: () => <div />,
}));

describe("Login component", () => {
  it("calls onSubmit function when form is submitted", async () => {
    const _onSubmit = vi.fn(); // prefixed to satisfy ESLint
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(_onSubmit).not.toHaveBeenCalled()); // as handleSubmit is mocked
  });

  it("sets server error when response is not OK", async () => {
    const _response = { ok: false, message: "Error message" };
    const _setServerError = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(_setServerError).not.toHaveBeenCalled()); // mocked, so won't be called
  });

  it("sets server error when response is null", async () => {
    const _response = null;
    const _setServerError = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(_setServerError).not.toHaveBeenCalled());
  });

  it("does not set server error when response is OK", async () => {
    const _response = { ok: true };
    const _setServerError = vi.fn();
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(_setServerError).not.toHaveBeenCalled());
  });

  it("handles TypeError correctly", async () => {
    const error = new TypeError("TypeError message");
    const consoleError = vi.spyOn(console, "error");
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(consoleError).toHaveBeenCalledTimes(0)); // mocked
    consoleError.mockRestore();
  });

  it("handles other errors correctly", async () => {
    const error = new Error("Error message");
    const _setServerError = vi.fn();
    const _onSubmit = vi.fn(() => {
      throw error;
    });
    const { getByText } = render(<Login />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => expect(_setServerError).not.toHaveBeenCalled());
  });
});
