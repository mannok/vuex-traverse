declare module '*.json' {
	const value: any;
	export default value;
}

interface WSRequest {
	requestID: string;
	params: unknown[];
}

interface WSResponse {
	responseID: string;
	payload: unknown;
}
