import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewNote from "@/components/sidebar/newNote";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/hooks/use-note-store";
import userEvent from "@testing-library/user-event";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/hooks/use-note-store");

describe("NewNote Component", () => {
  const pushMock = jest.fn();
  const addNoteMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    (useNoteStore as unknown as jest.Mock).mockImplementation((selector: any) =>
      selector({ addNote: addNoteMock })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders "+ New Note" button', () => {
    render(<NewNote />);
    const button = screen.getByText("+ New Note");
    expect(button).toBeInTheDocument();
  });

  test("new note creates a new note and navigates to it", async () => {
    render(<NewNote />);
    const button = screen.getByText("+ New Note");
    await userEvent.click(button);
    expect(addNoteMock).toHaveBeenCalledWith({
      name: "Untitled Note",
      content: "",
      tags: [],
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      id: expect.any(String),
      createdBy: "user-id",
    });
    expect(pushMock).toHaveBeenCalledWith(`/dashboard/abcd1111`);
  });

});


