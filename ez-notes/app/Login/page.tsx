async function getUsers() {
  const res = await fetch("http://localhost:2001/api/users", {
    cache: "no-store",
  });
  const data = await res.json();
  return data as any[];
}

export default function Login() {
  const users = getUsers();
  console.log(users);
  return <section className="">Login</section>;
}
