// ./testing/render.jsx
import { render as rtlRender } from "@testing-library/react"
import { Provider } from "@/components/ui/provider"

export function render(ui) {
  return rtlRender(<>{ui}</>, {
    wrapper: ({ children }) => <Provider>{children}</Provider>,
  })
}
