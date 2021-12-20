import { useState, useEffect } from "react";
import parseUrl from "parse-url";

const useQueryParameter = (href: string): [any, (key: string) => string | null] => {
	const [query, setQuery] = useState<any>();

	useEffect(() => {
		const query = parseUrl(href)?.query;
		setQuery(query)
	}, [href])

	const getQueryValue = (key: string): string | null => {
		if (query !== undefined && query[key]) {
			return query[key];
		}
		return null;
	}

	return [query, getQueryValue]
}

export default useQueryParameter;