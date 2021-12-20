import React from "react";
import { Button } from "@mui/material";
import parseUrl from "parse-url";

interface Props {
	defaultCount?: number;
	defaultIncrement?: number;
}

interface State {
	count: number;
	increment: number;
	intervalId: number | undefined;
}

class ClassComponent extends React.Component<Props, State> {

	static defaultProps: Props = {
		defaultCount: 20,
		defaultIncrement: 4
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			count: 0,
			increment: 1,
			intervalId: undefined
		}

		this.handleIncrementDown = this.handleIncrementDown.bind(this);
		this.handleIncrementUp = this.handleIncrementUp.bind(this);
	}

	componentWillMount() {
		const parsedUrl = parseUrl(window.location.href)

		let defaultCount = parsedUrl.query.count ? parseInt(parsedUrl.query.count) : this.props.defaultCount;

		let defaultIncrement = parsedUrl.query.increment ? parseInt(parsedUrl.query.increment) : this.props.defaultIncrement;

		if (defaultCount && defaultIncrement) {
			this.setState({
				count: defaultCount,
				increment: defaultIncrement
			})
		}
	}

	componentDidMount() {
		const intervalId = window.setInterval(() => {
			this.setState(prevState => {
				return {
					...prevState,
					count: prevState.count + prevState.increment
				}
			})
		}, 1000)

		this.setState({ intervalId });
	}

	componentWillUnmount() {
		window.clearInterval(this.state.intervalId)
	}

	handleIncrementUp() {
		this.setState(prevState => {
			return {
				...prevState,
				increment: prevState.increment + 1
			}
		})
	}

	handleIncrementDown() {
		this.setState(prevState => {
			return {
				...prevState,
				increment: prevState.increment - 1
			}
		})
	}

	render() {

		const incrementIsEven = this.state.increment % 2 === 0;

		return (
			<div className="component">
				<h1 className="title">Class Component</h1>
				<div className="counter">{this.state.count}</div>
				<div className="increment">
					<div className="increment-display">Increment: {this.state.increment}</div>
					<div className="increment-control">
						<Button onClick={this.handleIncrementDown} style={{ marginRight: 10 }} variant="contained">DOWN</Button>
						<Button onClick={this.handleIncrementUp} variant="contained">UP</Button>
					</div>
					<div className="increment-even">
						Increment Is EVEN: <span className={incrementIsEven ? "even" : "uneven"}>{incrementIsEven ? "Yes" : "No"}</span>
					</div>
					<div>
					Timeout Reference ID: {this.state.intervalId}
				</div>
				</div>
			</div>
		);
	}
}

export default ClassComponent;