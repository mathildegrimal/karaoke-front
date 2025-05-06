"use client";
import MusicNoteIcon from "components/app/components/icons/MusicNote";
import ReloadIcon from "components/app/components/icons/ReloadIcon";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  const [randomSong, setRandomSong] = useState<{
    id: number;
    name: string;
    singer: string;
  } | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getRandomSong = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/song/random`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data) {
      setRandomSong(data);
    }
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  useEffect(() => {
    getRandomSong();
  }, [getRandomSong]);

  return (
    <div className="flex flex-col items-center py-10 gap-4">
      <div className="flex flex-row gap-2">
        <MusicNoteIcon />
        <p className="text-2xl">Here is a song for you </p>
        <MusicNoteIcon />
      </div>
      {isLoading ? (
        <ScaleLoader color={"#01c0eb"} />
      ) : randomSong ? (
        <div className="flex flex-col text-center items-center gap-2 text-xl border-solid border-2 border-[#FFFFFF]}-500 p-5 rounded-[6px] max-w-sm">
          <p className="text-blue-400">{randomSong.name}</p>
          <p>({randomSong.singer}))</p>
        </div>
      ) : (
        <>No song available</>
      )}
      <div className="flex flex-row items-center gap-2">
        <button
          className="rounded-[6px] bg-blue-400 mx-auto p-2 items-center"
          onClick={getRandomSong}
        >
          <ReloadIcon />
        </button>
        <button
          className="rounded-[6px] bg-blue-400 mx-auto p-2 items-center"
          onClick={() => {
            router.push("/action");
          }}
        >
          Back to menu
        </button>
      </div>
    </div>
  );
}
