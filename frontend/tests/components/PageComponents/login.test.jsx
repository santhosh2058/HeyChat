import React from "react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../../test-utils/render";

// --------------------
// Mocks
// --------------------
vi.mock("@/redux/authSlice", async () => {
  const actual = await vi.importActual("@/redux/authSlice"); // real reducer
  return {
    ...actual,
    loginUser: vi.fn(), // mock async action
  };
});

vi.mock("@chakra-ui/react", () => {
  const Simple = (props) => <div {...props}>{props.children}</div>;
  return {
    AbsoluteCenter: Simple,
    Box: Simple,
    Stack: Simple,
    Text: (props) => <p {...props}>{props.children}</p>,
    Button: ({ children, type = "button", ...rest }) => (
      <button type={type} {...rest}>{children}</button>
    ),
    Input: (props) => <input {...props} />,
    Field: {
      Root: (props) => <div {...props}>{props.children}</div>,
      Label: (props) => <label {...props}>{props.children}</label>,
      RequiredIndicator: () => <span>*</span>,
      ErrorText: (props) => <div data-testid="field-error">{props.children}</div>,
    },
  };
});

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Link: ({ children, to, ...rest }) => <a href={to} {...rest}>{children}</a>,
    useNavigate: vi.fn(),
  };
});

// --------------------
// Tests
// --------------------
describe("Login component", () => {
  let LoginComponent;
  let loginUserMock;
  let dispatchMock;
  let navigateMock;
  let reactRedux;
  let router;

  beforeEach(async () => {
    vi.clearAllMocks();

    const authModule = await import("@/redux/authSlice");
    loginUserMock = authModule.loginUser;

    reactRedux = await import("react-redux");
    router = await import("react-router-dom");

    const loginModule = await import("@/components/PageComponents/Login");
    LoginComponent = loginModule.Login ?? loginModule.default ?? loginModule;

    const unwrapMock = vi.fn().mockResolvedValue({ success: true });
    dispatchMock = vi.fn(() => ({ unwrap: unwrapMock }));
    reactRedux.useDispatch.mockReturnValue(dispatchMock);

    reactRedux.useSelector.mockImplementation((selector) =>
      selector({ auth: { loading: false, error: null } })
    );

    navigateMock = vi.fn();
    router.useNavigate.mockReturnValue(navigateMock);
  });

  it("renders form, dispatches loginUser on submit and navigates to /chat", async () => {
    render(<LoginComponent />);

    const usernameInput = screen.getByPlaceholderText("me@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(dispatchMock).toHaveBeenCalled());
    expect(loginUserMock).toHaveBeenCalledWith({
      username: "testuser",
      password: "password123",
    });
    await waitFor(() =>
      expect(router.useNavigate()).toHaveBeenCalledWith("/chat", { replace: true })
    );
  });

  it("displays server error when auth.error exists", async () => {
    reactRedux.useSelector.mockImplementation((selector) =>
      selector({ auth: { loading: false, error: "Invalid credentials" } })
    );

    render(<LoginComponent />);
    expect(screen.getByText("Invalid credentials")).toBeTruthy();
  });
});
