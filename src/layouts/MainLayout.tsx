import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <header className="w-full max-w-3xl bg-gray-100 p-4 shadow-md rounded-md text-center">
        <h1 className="text-xl font-bold">To-Do App</h1>
      </header>
      <main className="w-full max-w-3xl flex-1">{children}</main>
    </div>
  );
};
