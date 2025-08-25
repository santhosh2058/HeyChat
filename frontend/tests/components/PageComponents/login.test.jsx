import React from "react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";

// --------------------
// Partial mock of authSlice
// --------------------
vi.mock("@/redux/authSlice", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    loginUser: vi.fn(),
  };
});

// --------------------
// Mock Chakra UI components
// --------------------
vi.mock("@chakra-ui/react", () => {
  const React = require("react");
  const Simple = (props) => React.createElement("div", props, props.children);

  return {
    AbsoluteCenter: Simple,
    Box: Simple,
    Stack: Simple,
    Text: (props) => React.createElement("p", props, props.children),
    Button: ({ children, type = "button", ...rest }) =>
      React.createElement("button", { type, ...rest }, children),
    Input: (props) => React.createElement("input", { ...props }),
    Field: {
      Root: (props) => React.createElement("div", props, props.children),
      Label: (props) => React.createElement("label", props, props.children),
      RequiredIndicator: () => React.createElement("span", null, "*"),
      ErrorText: (props) =>
        React.createElement("div", { "data-testid": "field-error" }, props.children),
    },
  };
});

// --------------------
// Partial mock of react-redux (keep real Provider)
// --------------------
vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,               // keep Provider and other exports
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

// --------------------
// Mock react-router-dom
// --------------------
vi.mock("react-router-dom", () => {
  const React = require("react");
  return {
    Link: ({ children, to, ...rest }) =>
      React.createElement("a", { href: to, ...rest }, children),
    useNavigate: vi.fn(),
  };
});

// --------------------
// Tests
// --------------------
describe("Login component", () => {
  let loginUserMock;
  let LoginComponent;
  let renderFn;
  let reactRedux;
  let router;

  let dispatchMock;
  let navigateMock;

  beforeEach(async () => {
    vi.clearAllMocks();

    const authModule = await import("@/redux/authSlice");
    loginUserMock = authModule.loginUser;

    reactRedux = await import("react-redux");
    router = await import("react-router-dom");

    const loginModule = await import("@/components/PageComponents/Login");
    LoginComponent = loginModule.Login ?? loginModule.default ?? loginModule;

    const renderModule = await import("../../../test-utils/render");
    renderFn = renderModule.render ?? renderModule.default ?? renderModule;

    // Mock dispatch returning unwrap
    const unwrapMock = vi.fn().mockResolvedValue({ success: true });
    dispatchMock = vi.fn(() => ({ unwrap: unwrapMock }));
    reactRedux.useDispatch.mockReturnValue(dispatchMock);

    // Default selector
    reactRedux.useSelector.mockImplementation((selector) =>
      selector({ auth: { loading: false, error: null } })
    );

    // Mock navigate
    navigateMock = vi.fn();
    router.useNavigate.mockReturnValue(navigateMock);
  });

  it("renders form, dispatches loginUser on submit and navigates to /chat", async () => {
    renderFn(<LoginComponent />);

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

    renderFn(<LoginComponent />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
