import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuickActions from "../quickActions";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));
jest.mock("@/utils/initial-profile");

const mockNewNote = jest.fn();
jest.mock("@/components/sidebar/newNote", () => (props: any) => {
  return <button onClick={mockNewNote}>New Note</button>;
});

describe("this component show 2 quick action buttons displays then on dashboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders newNote button", async () => {
    const ui = QuickActions();
    render(ui);

    expect(await screen.findByText("Quick Actions")).toBeInTheDocument();
    const newNoteBtn = await screen.findByText("New Note");
    expect(newNoteBtn).toBeInTheDocument();
    await userEvent.click(newNoteBtn);
    expect(mockNewNote).toHaveBeenCalled();
  });

  test("renders graph view button", async () => {
    const ui = <QuickActions />;
    render(ui);

    expect(await screen.findByText("Quick Actions")).toBeInTheDocument();
    const grapghBtn = await screen.findByText("Graph view");
    expect(grapghBtn).toBeInTheDocument();
    await userEvent.click(grapghBtn);
    expect(mockPush).toHaveBeenCalled();
  });

});
