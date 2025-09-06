import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../page";

jest.mock("@/utils/initial-profile");
jest.mock("@/components/three/PlanetScene", () => () => <div>PlanetScene Mock</div>);
jest.mock("@/components/sidebar/newNote", () => () => <button>+ New Note</button>);
jest.mock("@/components/dashboard/recentNotes", () => () => <div>RecentNotes Mock</div>);
jest.mock("@/components/theme-dropdown", () => () => <div>ThemeDropdown Mock</div>);

describe("this is the dashboard page", () => {
  it("renders the dashboard of the app ", async () => {
    const ui = await Dashboard();
    render(ui);
    expect(await screen.findByText("Welcome to Nebula Notes")).toBeInTheDocument();
    expect(await screen.findByText("Organize your mind, explore the cosmos.")).toBeInTheDocument();
    expect(await screen.findByText("+ New Note")).toBeInTheDocument();
    expect(await screen.findByText("RecentNotes Mock")).toBeInTheDocument();
    expect(await screen.findByText("ThemeDropdown Mock")).toBeInTheDocument();
    expect(await screen.findByText("PlanetScene Mock")).toBeInTheDocument();
  });
});
