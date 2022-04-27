import React, {useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
	const baseUrl = "http://localhost:5000/api/Pokemon";
	const [favorites, setFavorites] = useState([]);
	const [data, setData] = useState([]);

	const peticionGet = async () => {
		fetch(baseUrl)
			.then((res) => res.json())
			.then((result) => {
				setData(result.results);
			});
	};

	useEffect(() => {
		peticionGet();
		console.log(data);
	}, []);

	useEffect(() => {
		console.log(favorites);
	  }, [favorites]);
	
	function handleFavorite(name) {
		const newFavorites = favorites.map(gestor => {
		  return gestor.name === name ? { ...gestor, favorite: !gestor.favorite } : gestor;
		});
	
		setFavorites(newFavorites);
	  }
	return (
		<div>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{data.map((gestor) => (
						<tr key={gestor.name}>
							<td>{gestor.name}</td>
							<td>
							<button onClick={()=>{handleFavorite(gestor.name)}}>
								{gestor.name ===true? "❌":"❤"}
							</button>
							</td>
						</tr>
						))}
				</tbody>
			</table>
			<h1>Favorite list</h1>
      		<ul>
        	{favorites.map(gestor =>
          	gestor.favorite === false ? <li key={gestor.name}>{gestor.name}</li> : null
        	)}
      </ul>
		</div>
	);
}
export default App;