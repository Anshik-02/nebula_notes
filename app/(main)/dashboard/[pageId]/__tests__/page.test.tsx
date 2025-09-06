import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageId from "../page";


jest.mock("@/utils/initial-profile");
jest.mock("@/components/multi-block", () => () => <div>MultiBlockEditor Mock</div>);
jest.mock("@/components/starFeild", () => () => <button>StarField Mock</button>);
jest.mock("@/components/tag", () => () => <div>TagInput Mock</div>);
jest.mock("@/components/theme-dropdown", () => () => <div>ThemeDropdown Mock</div>);
jest.mock("@/components/editor", () => () => <div>Tiptap Mock</div>);


describe("this is the pageid page for notes", () => {
  it("renders the note page for writing note", async () => {
    const ui = await PageId();
    render(ui);
    expect(await screen.findByText("MultiBlockEditor Mock")).toBeInTheDocument();
    expect(await screen.findByText("TagInput Mock")).toBeInTheDocument();
    expect(await screen.findByText("ThemeDropdown Mock")).toBeInTheDocument();
    expect(await screen.findByText("StarField Mock")).toBeInTheDocument();
    expect(await screen.findByText("Tiptap Mock")).toBeInTheDocument();

  });
});
