import {
  SignedOut,
  SignInButton,
  SignedIn,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

const Home = () => {
  return (
    <>
      <h1>Welcome to KyoCode!</h1>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />
    </>
  );
};

export default Home;
