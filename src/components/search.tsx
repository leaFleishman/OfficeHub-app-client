import FormField from "./FormField"
type SearchProps = {
    search: string;
    onSearchChange: (value: string) => void;
};
const Search = ({ search, onSearchChange }: SearchProps) => {
    return (<>
        <FormField onChange={(e) => onSearchChange(e.target.value)
        } value={search} id="search" error="  " label="חיפוש" placeholder="חיפוש "></FormField>
    </>)
}
export default Search