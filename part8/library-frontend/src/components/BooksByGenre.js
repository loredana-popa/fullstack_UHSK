const BooksByGenre = ({ filter, allBooks, booksByGen }) => {
	const resultArr = !filter ? [...allBooks] : [...booksByGen]

	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{resultArr.map(b => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default BooksByGenre
