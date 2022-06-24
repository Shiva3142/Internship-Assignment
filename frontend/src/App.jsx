import './App.css';
import './Styles/main.scss'
import { Routes, Route } from "react-router-dom";
import Home from './Components/HomePage/Home';
import Graph from './Components/GraphPage/Graph';
import { AnimatePresence } from 'framer-motion';

function App() {
	return (
		<>
		<AnimatePresence>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/graphs' element={<Graph />} />
			</Routes>
		</AnimatePresence>
		</>
	);
}

export default App;
