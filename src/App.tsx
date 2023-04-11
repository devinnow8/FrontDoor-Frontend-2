import './App.css';
import { useState } from 'react';
import ExtensionToggle from './components/ExtensionToggle';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import History from './components/History';
import AuthProvider from './components/AuthProvider';

export type CurrentPage = 'Signin' | 'Signup' | 'History';

function App() {
	const [currentPage, setCurrentPage] = useState<CurrentPage>('Signin');

	return (
		<AuthProvider setCurrentPage={setCurrentPage}>
			<div className="app">
				<div className="ext_main_div">
					<div className="toggle">
						<p>Frontdoor extension</p>
						<ExtensionToggle />
					</div>
				</div>
				{currentPage === 'Signin' && (
					<Signin onSetCurrentPage={setCurrentPage} />
				)}
				{currentPage === 'Signup' && (
					<Signup onSetCurrentPage={setCurrentPage} />
				)}
				{currentPage === 'History' && (
					<History onSetCurrentPage={setCurrentPage} />
				)}
			</div>
		</AuthProvider>
	);
}

export default App;
