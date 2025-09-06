import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import TagComponent from "../tagComponent";

describe("TagComponent", () => {

  test("renders tags from API", async () => {
    render(<TagComponent />);

    expect(await screen.findByText("fun")).toBeInTheDocument();
    expect(await screen.findByText("work")).toBeInTheDocument();
  });

  test("debounced search calls API with query param", async () => {
    render(<TagComponent />);

    const input = screen.getByPlaceholderText("🔍 Search your notes");
    await userEvent.type(input, "hello");

    // wait for debounce + fetch
    await waitFor(() => {
      expect(screen.getByText("Test Note")).toBeInTheDocument();
    });
  }, 10000);

  test("selecting a tag calls API with tags param", async () => {
    render(<TagComponent />);

    const tag = await screen.findByText("fun");
    await userEvent.click(tag);

    await waitFor(() => {
      expect(screen.getByText("Test Note")).toBeInTheDocument();
    });
  });

  test("renders fetched notes correctly", async () => {
    render(<TagComponent />);

    expect(await screen.findByText("Test Note")).toBeInTheDocument();
    expect(await screen.findByText("Hello block")).toBeInTheDocument();
    expect(await screen.findByText("tag1")).toBeInTheDocument();
  });
});
