import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
      <main className="flex min-h-screen items-center justify-between overflow-hidden">
        <div className="mx-auto">
          <SignIn />
        </div>
      </main>
    );
}