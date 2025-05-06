"use client";
import ReloadIcon from "components/app/components/icons/ReloadIcon";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  const [randomSinger, setRandomSinger] = useState<{
    song: { name: string; singer: string };
    singers: Array<string>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeout = useRef<null | NodeJS.Timeout>(null);

  const numberOfSingers = [1, 2, 3, 4, 5, 6];
  const router = useRouter();

  const [number, setNumber] = useState(1);
  const getRandomSingers = useCallback(async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/singer/randomSinger/${number}`,
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
    timeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [number]);
  useEffect(() => {
    getRandomSingers();
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [getRandomSingers]);

  return (
    <div className="flex flex-col items-center py-10 gap-4">
      <div>
        <p>How many singers do you want ?</p>
      </div>
      <div className="flex flex-row gap-2">
        {numberOfSingers.map((i) => (
          <button
            className={`rounded-[6px] ${
              i === number
                ? "border-4 border-solid-white bg-blue-400"
                : " bg-blue-400"
            } mx-auto p-2 items-center`}
            onClick={() => {
              setNumber(i);
            }}
            key={i}
          >
            {i}
          </button>
        ))}
      </div>
      {isLoading ? (
        <ScaleLoader color={"#01c0eb"} />
      ) : randomSinger && !error ? (
        <div className="flex text-center flex-col items-center gap-2 text-xl border-solid border-2 border-[#FFFFFF]}-500 p-5 rounded-[6px] max-w-sm">
          <p>Singers : {randomSinger.singers.join(", ")}</p>
          <p className="text-blue-400">{randomSinger.song.name}</p>
          <p>({randomSinger.song.singer})</p>
        </div>
      ) : randomSinger ? (
        <>No song available</>
      ) : error ? (
        <>{error}</>
      ) : (
        <></>
      )}
      <div className="flex flex-row items-center gap-2">
        <button
          className="rounded-[6px] bg-blue-400 mx-auto p-2 items-center"
          onClick={getRandomSingers}
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
