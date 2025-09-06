import { render, screen,act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { initalProfile } from "@/utils/initial-profile";
import { db } from "@/lib/db";
import RecentNotes from "../recentNotes";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/utils/initial-profile");
jest.mock("@/lib/db");
jest.mock("@/hooks/use-note-store");
jest.mock("@/lib/db", () => ({
  db: {
    note: {
      findMany: jest.fn(),
    },
  },
}));
jest.mock('../favNotes',(() => () => <div>Mocked FavNotes</div>));

describe("this component gets 3 recent notes of user and displays then on dashboard", () => {
  beforeEach(() => {
    (initalProfile as jest.Mock).mockResolvedValue({ id: "user-123" });

    (db.note.findMany as jest.Mock).mockResolvedValue([
      {
        id: "note-2",
        creatorId: "user-123",
        name: "Test Note2",
        content: "Hello world",
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        isStarred: true,
        folderId: null,
        Block: [{ content: "<p>Block content</p>" }],
        tag: [{ name: "tag1" }, { name: "tag2" }],
      },{
        id: "note-3",
        creatorId: "user-123",
        name: "Test Note3",
        content: "Hello world2",
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        isStarred: true,
        folderId: null,
        Block: [{ content: "<p>Block content</p>" }],
        tag: [ { name: "tag3" }],
      },{
        id: "note-4",
        creatorId: "user-123",
        name: "Test Note4",
        content: "Hello world3",
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        isStarred: true,
        folderId: null,
        Block: [{ content: "<p>Block content</p>" }],
        tag: [{ name: "crzy" }, { name: "or suna 35 bete" }],
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders 3 recent notes for the user", async () => {
const ui = await RecentNotes();
  render(ui);

    expect(await screen.findByText("Recent notes")).toBeInTheDocument();
    expect(await screen.findByText("Test Note2")).toBeInTheDocument();
    expect(await screen.findByText("Test Note3")).toBeInTheDocument();
    expect(await screen.findByText("Test Note4")).toBeInTheDocument();
    expect(await screen.findByText("crzy")).toBeInTheDocument();
    expect(await screen.findByText("or suna 35 bete")).toBeInTheDocument();
    expect(await screen.findByText("tag1")).toBeInTheDocument();
    expect(await screen.findByText("Mocked FavNotes")).toBeInTheDocument();

  });
});
