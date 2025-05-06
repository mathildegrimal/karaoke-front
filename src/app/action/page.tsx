"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SingersIcon from "../components/icons/Singers";
import MicroIcon from "../components/icons/Micro";
import Head from "next/head";

async function readCookieFromStorageRouteHandler() {
  const responseWithCookieFromStorage = await fetch("/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await responseWithCookieFromStorage.json();
  const lastname = data?.lastname || "unknown lastname";
  const firstname = data?.firstname || "unknown firstname";
  return { firstname, lastname };
}

export default function Home() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleReadCookieViaRouteHandler = async () => {
      const session = await readCookieFromStorageRouteHandler();
      if (session) {
        setLastname(session.lastname);
        setFirstname(session.firstname);
      }
    };
    handleReadCookieViaRouteHandler();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center p-10 gap-4 text-center">
        <p className="text-xl">
          Hello{" "}
          <b>
            {firstname} {lastname}
          </b>
          , what do you want to do ?
        </p>
        <div className="flex flex-col items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <button
              className="w-24 h-24 rounded-[6px] bg-blue-400 mx-auto items-center"
              onClick={() => {
                router.push("action/randomSong");
              }}
            >
              <MicroIcon />
            </button>
            <p>Random song</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="w-24 h-24 rounded-[6px] p-6 bg-blue-400 mx-auto items-center"
              onClick={() => {
                router.push("action/randomSingers");
              }}
            >
              <SingersIcon />
            </button>
            <p>Random singers and song</p>
          </div>
        </div>
      </div>
    </div>
  );
}
