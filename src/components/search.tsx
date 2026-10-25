import FormField from "./FormField"

type SearchProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

const Search = ({ search, onSearchChange }: SearchProps) => {
    return (
        <div className="search-box">
            <FormField
                id="search"
                label="חיפוש   "
                placeholder="הקלד מזהה..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
}

export default Search
