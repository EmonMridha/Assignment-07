import { logoutAction } from "../(authGroup)/_actions/authAction";

export default function Home() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        Logout
      </button>
    </form>
  );
}