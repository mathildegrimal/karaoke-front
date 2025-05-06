"use client";
import { FormEvent, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { ScaleLoader } from "react-spinners";

interface Props {
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (firstname === "" || lastname === "") {
      return;
    }
    setIsLoading(true);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname }),
      };
      const apiReady = await fetch("/api", options);
      if (apiReady.status !== 200) throw new Error("Service not available");
      const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/singer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname }),
      });
      if (user.status !== 201) {
        throw new Error("Can't login");
      } else {
        setError("");
        router.push("/action");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log(e);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center py-10 gap-4">
      {isLoading ? (
        <ScaleLoader color={"#01c0eb"} />
      ) : error !== "" ? (
        <div className="flex flex-col gap-2">
          <p>An error occured, please refresh the page</p>
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
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
            <button className="w-20 rounded-[6px] p-2 bg-blue-400 mx-auto">
              Enter
            </button>
          </form>
        </>
      )}
    </div>
  );
}
