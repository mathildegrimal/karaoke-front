"use client";
import MusicNoteIcon from "components/app/components/icons/MusicNote";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomSinger, setRandomSinger] = useState<{
    song: { name: string; singer: string };
    singers: Array<string>;
  } | null>(null);
  const [error, setError] = useState(null);

  const numberOfSingers = [1, 2, 3, 4, 5, 6];
  const router = useRouter();

  const [number, setNumber] = useState(1);
  useEffect(() => {
    const getRandomSingers = async () => {
      const response = await fetch(
        `http://localhost:4000/singer/randomSinger/${number}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        if (data.error) {
          setRandomSinger(null);
          setError(data.error);
        } else {
          setRandomSinger(data);
          setError(null);
        }
      }
    };
    getRandomSingers();
  }, [number]);

  return (
    <main className="flex flex-col items-center py-10 gap-4">
      <div>
        <p>How many singers do you want ?</p>
      </div>
      <div className="flex flex-row gap-2">
        {numberOfSingers.map((number) => (
          <button
            className={`rounded-[6px] ${
              number === number ? "bg-[#00e5ff]" : "bg-[#0093a3]"
            } mx-auto p-2 items-center`}
            onClick={() => {
              setNumber(number);
            }}
            key={number}
          >
            {number}
          </button>
        ))}
      </div>
      {randomSinger && !error ? (
        <div className="flex flex-col items-center gap-4 text-xl border-solid border-2 border-[#FFFFFF]}-500 p-5 rounded-[6px] max-w-sm">
          <p>Singers : {randomSinger.singers.join(", ")}</p>
          <p>{randomSinger.song.name}</p>
          <p>{randomSinger.song.singer}</p>
        </div>
      ) : randomSinger ? (
        <>No song available</>
      ) : error ? (
        <>{error}</>
      ) : (
        <></>
      )}
      <button
        className="rounded-[6px] bg-[#00e5ff] mx-auto p-2 items-center"
        onClick={() => {
          router.push("/action");
        }}
      >
        Back to menu
      </button>
    </main>
  );
}
