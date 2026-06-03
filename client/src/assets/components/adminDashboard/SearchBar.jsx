function SearchBar({ props }) {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-5 mb-6">
            <input
                type="text"
                placeholder={props.placeholder}
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
        </div>
    );
}

export default SearchBar;