import { BrowserRouter as Router } from "react-router-dom"
import Movies from "./components/Movies"
import { ContextProvider } from "./context/context"

const App = () => {
	return (
		<ContextProvider>
			<Router>
				<Movies />
			</Router>
		</ContextProvider>
	)
}

export default App
