import FormField from "./FormField"

type SearchProps = {
    search: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
};

const Search = ({ search, onSearchChange, placeholder = "הקלד מזהה..." }: SearchProps) => {
    return (
        <div className="search-box">
            <FormField
                id="search"
                label="חיפוש   "
                placeholder={placeholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
}

export default Search
