export interface IRequest {
	body: unknown;
	params: Record<string, string>;
	headers: Record<string, string>;
}
