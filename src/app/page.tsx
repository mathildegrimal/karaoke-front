"use client";
import { FormEvent, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (firstname === "" || lastname === "") {
      return;
    }
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname }),
      };
      const response = await fetch("/api", options);

      if (response.status !== 200) throw new Error("Can't login");
      await fetch("http://localhost:4000/singer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname }),
      });
      router.push("/action");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="flex flex-col items-center py-10 gap-4">
      <p>Who are you ?</p>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(e) => {
          login(e);
        }}
      >
        <input
          placeholder="Firstname"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          className="h-10 enabled:hover:border-gray-400 disabled:opacity-75 rounded-[6px] text-[#000000] p-2 text-center"
        />
        <input
          placeholder="Lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          className="h-10 enabled:hover:border-gray-400 disabled:opacity-75 rounded-[6px] text-[#000000] p-2 text-center"
        />
        <button className="w-20 rounded-[6px] p-2 bg-[#00e5ff] mx-auto">
          Enter
        </button>
      </form>
    </main>
  );
}
