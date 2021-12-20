import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Button } from "@mui/material";
import useQueryParameter from "./hooks/useQueryParameter";

interface Props {
	defaultCount?: number;
	defaultIncrement?: number;
}

const FunctionComponent = ({defaultCount = 20, defaultIncrement = 4}: Props) => {

	const [query] = useQueryParameter(window.location.href);

	const [count, setCount] = useState<number>(defaultCount);
	const [increment, setIncrement] = useState<number>(defaultIncrement);

	const timeoutRef = useRef<number>();

	useEffect(() => {
		if (query) {
			if (query.count) setCount(parseInt(query.count))
			if (query.increment) setIncrement(parseInt(query.increment))
		}
	}, [query, setCount, setIncrement])

	useEffect(() => {
		timeoutRef.current = window.setTimeout(() => {
			setCount(count => count + increment);
		}, 1000)

		return () => {
			window.clearTimeout(timeoutRef.current);
		}
	}, [count, increment, setCount])

	const handleIncrementDown = useCallback(() => {
		setIncrement(increment - 1);
	}, [increment, setIncrement])

	const handleIncrementUp = useCallback(() => {
		setIncrement(increment + 1);
	}, [increment, setIncrement])

	const incrementIsEven = useMemo(() => (increment % 2 === 0), [increment]);

	return (
		<div className="component">
			<h1 className="title">Function Component</h1>
			<div className="counter">{count}</div>
			<div className="increment">
				<div className="increment-display">Increment: {increment}</div>
				<div className="increment-control">
					<Button onClick={handleIncrementDown} style={{ marginRight: 10 }} variant="contained">DOWN</Button>
					<Button onClick={handleIncrementUp} variant="contained">UP</Button>
				</div>
				<div className="increment-even">
					Increment Is EVEN: <span className={incrementIsEven ? "even" : "uneven"}>{incrementIsEven ? "Yes" : "No"}</span>
				</div>
				<div>
					Timeout Reference ID: {timeoutRef.current}
				</div>
			</div>
		</div>
	)
}

export default FunctionComponent;