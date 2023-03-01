export function get_token(): string | null {
  return localStorage.getItem("token");
}
export function set_token(token: string): void {
  localStorage.setItem("token", token);
}
export function remove_token(): void {
  localStorage.removeItem("token");
}
