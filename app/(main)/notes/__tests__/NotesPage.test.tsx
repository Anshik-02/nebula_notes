import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "@/app/mocks/server";
import AllNotes from "@/app/(main)/notes/page";
import { clerkClient } from "@clerk/nextjs/server";
import { initalProfile } from "@/utils/initial-profile";
import { db } from "@/lib/db";


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


describe("this page gets all the notes", () => {
  beforeEach(() => {
    (initalProfile as jest.Mock).mockResolvedValue({ id: "user-123" });

    (db.note.findMany as jest.Mock).mockResolvedValue([
      {
        id: "note-1",
        creatorId: "user-123",
        name: "Test Note",
        content: "Hello world",
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        isStarred: false,
        folderId: null,
        Block: [{ content: "<p>Block content</p>" }],
        tag: [{ name: "tag1" }, { name: "tag2" }],
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all notes for the user", async () => {
    const ui = await AllNotes();
    render(ui);

    expect(await screen.findByText("All Notes (1)")).toBeInTheDocument();
    expect(await screen.findByText("Test Note")).toBeInTheDocument();
    expect(await screen.findByText("tag1")).toBeInTheDocument();
  });
});
