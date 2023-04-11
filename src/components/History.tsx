import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import BaseAPI from '../Api/BaseAPI';

type CurrentPage = 'Signin' | 'Signup' | 'History';

type UserType = {
	username: String;
	accessToken: String;
	id: String;
	refreshToken: String;
};

type AuthContextType = {
	handleSignIn: (email: String, password: String) => void;
	handleSignUp: (email: String, password: String, name: String) => void;
	user: UserType;
};

interface HistoryPropsType {
	onSetCurrentPage: (input: CurrentPage) => void;
}

const History: React.FC<HistoryPropsType> = ({}: HistoryPropsType) => {
	const [history, setHistory] = useState([]);

	const { user }: AuthContextType | any = useContext(AuthContext);

	const getHistory = async () => {
		try {
			let response = await BaseAPI.get(`highlight-history/userId/${user.id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setHistory(response?.data?.data || []);
		} catch (error) {
			alert(error);
		}
	};
	useEffect(() => {
		getHistory();
	}, []);

	return (
		<>
			<div className="history-page">
				<h1 className="title">History</h1>
				{history.map(({ textResponse, userText }: any) => (
					<div className="history-details">
						<div className="history-time">
							<span>Title: {userText}</span>
						</div>
						<p>{textResponse}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default History;
