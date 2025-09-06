import {render,screen} from"@testing-library/react";
import"@testing-library/jest-dom";
import FilterComponent from "../filterComponent";

jest.mock("@/lib/db");
jest.mock("@/utils/initial-profile");
jest.mock("../tagComponent",(()=>()=> <div>Mocked TagComponent</div>));

describe("FilterComponent",()=>{
    test("renders FilterComponent with title and TagComponent",()=>{
        render(<FilterComponent/>);
        expect(screen.getByText("Filters")).toBeInTheDocument();
        expect(screen.getByText("# Filter by Tags")).toBeInTheDocument();
        expect(screen.getByText("Mocked TagComponent")).toBeInTheDocument();
    });
});