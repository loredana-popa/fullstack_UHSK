const FilterButtons = ({ filterBooks, genres }) => {
	return (
		<div>
			{genres.map((genre, i) => {
				return (
					<button onClick={() => filterBooks(genre)} key={i}>
						{genre}
					</button>
				)
			})}
		</div>
	)
}

export default FilterButtons
