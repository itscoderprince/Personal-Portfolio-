import Profile from "@/components/Profile";
import Main from "@/app/main/page";

export default function Page() {

  return (
    <main className='min-h-screen lg:flex lg:items-start lg:gap-10 pb-20 lg:pb-0'>
      <Profile />
      <Main />
    </main>
  );
}