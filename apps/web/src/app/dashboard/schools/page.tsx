import { PaginationComponent } from "./components/pagination";
import { ResultsSection } from "./components/results";
import { SearchBar } from "../../../components/searchBar";

export default function SchoolsPage() {
  return (
    
      <div className="flex-1 flex justify-center">
        <div className="h-full w-2/3 flex flex-col">
          <div className="h-24 flex justify-center items-center">
            <SearchBar placeholder="Busque uma escola" />
          </div>
          <div className="flex-1">
            <ResultsSection />
          </div>
          <div className="h-14">
            <PaginationComponent/>
          </div>
        </div>
      </div>
  );
}
