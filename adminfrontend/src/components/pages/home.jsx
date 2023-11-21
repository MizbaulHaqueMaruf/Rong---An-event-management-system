

const Home = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div>
			<nav>
				<h1>Welcome to Admin Panel</h1>
				<button onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Home;
