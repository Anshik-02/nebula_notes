// app/mocks/handlers.ts
import { http,HttpResponse } from 'msw';


export const handlers = [
  http.get('/notes', () => {
    return HttpResponse.json([
        { id: 1, name:"Note 1", content: 'Mock Note 1' ,createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),createdBy:"User1", updatedBy:"User1",tags:[{id:1,name:"Tag1",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:"User1",updatedBy:"User1"},{id:2,name:"Tag2",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:"User1",updatedBy:"User1"}]},
        { id: 2, name:"Note 2", content: 'Mock Note 2' ,createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),createdBy:"User1", updatedBy:"User1",tags:[{id:2,name:"Tag2",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:"User1",updatedBy:"User1"},]},{ id: 3, name:"Note 3", content: 'Mock Note 3' ,createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),createdBy:"User1", updatedBy:"User1",tags:[{id:3,name:"Tag3",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:"User1",updatedBy:"User1"},{id:1,name:"Tag1",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:"User1",updatedBy:"User1"}]}
        ]);
  }),


  http.post("/api/pages/create",async () => {
    return HttpResponse.json({
      id: "abcd1111",
      name:"Untitled Note",
      content:"",
      createdAt: 12112,
      updatedAt: 32123123,
      createdBy: "user-id",
      tags: [],
    });
  }),

  http.get("/api/pages/tags/get",async () => {
    return HttpResponse.json(
 { tags: ["fun", "work"], notes: [] }
    );
  }),

  http.get("/api/notes/search", (request) => {
    const query = request.url.searchParams.get("query");
    const tags = request.url.searchParams.getAll("tags");

    const notes = [
      {
        id: "1",
        name: "Test Note",  
        Block: [{ content: "<p>Hello block</p>" }],
        tag: [{ name: "tag1" }],
      },
    ];

    return HttpResponse.json({
        notes: query || tags.length ? notes : [],
      })
  }),

];
