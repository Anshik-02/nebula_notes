import {create} from "zustand"

// interface NoteStore {
//   notes: Notes[];
//   addFolder: (folder: Folder) => void;
//   setFolders: (folders: Folder[]) => void;
// }

// type Folder = { id: string; name: string };

// interface FolderStore {
//   folders: Folder[];
//   addFolder: (folder: Folder) => void;
//   setFolders: (folders: Folder[]) => void;
// }


export const useNoteStore=create((set)=>({
    notes:[],
    setNotes:(notes)=>set({notes}),
    addNote:(note)=>set((state)=>({notes:[...state.notes,note]})),
    updateNote:(id,upadatedContent)=>set((state)=>({
     notes: state.notes.map((note) =>
      note.id === id
        ? { ...note, ...upadatedContent }
        : note
    ),}))

}))

export const useFolderStore = create((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),
}));


