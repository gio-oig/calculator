import { useEffect, useRef, useState } from 'react';
import './App.css';

const methods = {
	'+': '+',
	'-': '-',
	'/': '/',
	'*': '*',
};

function App() {
	const [display, setDisplay] = useState('0');
	const [current, setCurrent] = useState('');
	const [history, setHistory] = useState([]);
	const historyContainer = useRef();

	const handleClick = (e) => {
		let input = e.target.innerHTML;

		if (current.length === 0 && /^[+/X]/.test(input)) return;

		if (/=/.test(current)) {
			setCurrent(display);
		}

		if (input === 'X') {
			input = '*';
		}

		if (input === '.') {
			if (display.includes('.')) {
				return;
			} else {
				setCurrent((state) => state + input);
				setDisplay((status) => status + input);
				return;
			}
		}

		// Case if input is Math method
		if (methods[input]) {
			setDisplay(input);
			// check last element
			if (methods[current[current.length - 1]]) {
				if (methods[current[current.length - 1]] !== '-' && input === '-') {
					setCurrent((state) => state.slice(0) + input);
					return;
				}
				if (
					methods[current[current.length - 2]] &&
					methods[current[current.length - 1]] === '-'
				) {
					setCurrent((state) => state.slice(0, -2) + input);
					return;
				}
				// change prev Math method with new method
				input = methods[input];
				setCurrent((state) => state.slice(0, -1) + input);
				return;
			}
		}

		setCurrent((state) => state + input);
		if (display[display.length - 1] in methods) {
			setDisplay(input);
			return;
		}
		if (!methods[input]) {
			setDisplay((state) => {
				state = state === '0' ? '' : state;
				return state + input;
			});
		} else {
			setDisplay(input);
		}
	};

	const calc = () => {
		let sum = eval(current);
		sum = sum % 1 === 0 ? sum : sum.toFixed(3);
		setHistory((state) => [...state, current + '=' + sum]);
		setCurrent((state) => {
			const expresson = state + '=' + sum;
			return expresson;
		});
		setDisplay(sum);
	};

	const getHistoryExpr = (e) => {
		const expr = e.target.innerHTML;
		const indexOfequals = expr.indexOf('=');
		const value = expr.slice(indexOfequals + 1);

		setCurrent(expr);
		setDisplay(value);
		historyContainer.current.classList.remove('active');
	};

	const handleClear = () => {
		setCurrent('');
		setDisplay('0');
	};

	useEffect(() => {
		console.log(history);
	}, [history]);

	useEffect(() => {
		let historyText = document.getElementById('history');
		const clb = () => {
			historyContainer.current.classList.toggle('active');
		};
		historyText.addEventListener('click', clb);

		return () => {
			historyText.removeEventListener('click', clb);
		};
	}, []);

	return (
		<div className="App">
			<div className="calculator">
				<div id="history">history</div>
				<div className="history-box" ref={historyContainer}>
					<ul>
						{history.map((expr, i) => {
							return (
								<li key={i} onClick={getHistoryExpr}>
									{expr}
								</li>
							);
						})}
					</ul>
				</div>
				<div className="display-container">
					<div className="example">{current}</div>
					<div id="display" className="current-display">
						{display}
					</div>
				</div>
				<div className="body-container">
					<div id="clear" className="btn" onClick={handleClear}>
						AC
					</div>
					<div id="divide" className="btn" onClick={handleClick}>
						/
					</div>
					<div id="multiply" className="btn" onClick={handleClick}>
						X
					</div>
					<div id="seven" className="btn" onClick={handleClick}>
						7
					</div>
					<div id="eight" className="btn" onClick={handleClick}>
						8
					</div>
					<div id="nine" className="btn" onClick={handleClick}>
						9
					</div>
					<div id="subtract" className="btn" onClick={handleClick}>
						-
					</div>
					<div id="four" className="btn" onClick={handleClick}>
						4
					</div>
					<div id="five" className="btn" onClick={handleClick}>
						5
					</div>
					<div id="six" className="btn" onClick={handleClick}>
						6
					</div>
					<div id="add" className="btn" onClick={handleClick}>
						+
					</div>
					<div id="one" className="btn" onClick={handleClick}>
						1
					</div>
					<div id="two" className="btn" onClick={handleClick}>
						2
					</div>
					<div id="three" className="btn" onClick={handleClick}>
						3
					</div>
					<div id="zero" className="btn" onClick={handleClick}>
						0
					</div>
					<div id="decimal" className="btn" onClick={handleClick}>
						.
					</div>
					<div id="equals" className="btn" onClick={calc}>
						=
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
