"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomSong, setRandomSong] = useState<{
    id: number;
    name: string;
    singer: string;
  } | null>(null);
  const router = useRouter();
  const [reload, setReload] = useState(false);
  const getRandomSong = async () => {
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
  };
  useEffect(() => {
    getRandomSong();
  }, [reload]);

  return (
    <main className="flex flex-col items-center py-10 gap-4">
      <div className="flex flex-row gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19.5C12 20.8807 10.8807 22 9.5 22C8.11929 22 7 20.8807 7 19.5C7 18.1193 8.11929 17 9.5 17C10.8807 17 12 18.1193 12 19.5Z"
            stroke="#FFFFFF"
            stroke-width="1.5"
          />
          <path
            d="M22 17.5C22 18.8807 20.8807 20 19.5 20C18.1193 20 17 18.8807 17 17.5C17 16.1193 18.1193 15 19.5 15C20.8807 15 22 16.1193 22 17.5Z"
            stroke="#FFFFFF"
            stroke-width="1.5"
          />
          <path
            d="M22 8L12 12"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M14.4556 5.15803L14.7452 5.84987L14.4556 5.15803ZM16.4556 4.32094L16.1661 3.62909L16.4556 4.32094ZM21.1081 3.34059L20.6925 3.96496L20.6925 3.96496L21.1081 3.34059ZM21.25 12.0004C21.25 12.4146 21.5858 12.7504 22 12.7504C22.4142 12.7504 22.75 12.4146 22.75 12.0004H21.25ZM12.75 19.0004V8.84787H11.25V19.0004H12.75ZM14.7452 5.84987L16.7452 5.01278L16.1661 3.62909L14.1661 4.46618L14.7452 5.84987ZM22.75 8.01078C22.75 6.67666 22.752 5.59091 22.6304 4.76937C22.5067 3.93328 22.2308 3.18689 21.5236 2.71622L20.6925 3.96496C20.8772 4.08787 21.0473 4.31771 21.1466 4.98889C21.248 5.67462 21.25 6.62717 21.25 8.01078H22.75ZM16.7452 5.01278C18.0215 4.47858 18.901 4.11263 19.5727 3.94145C20.2302 3.77391 20.5079 3.84204 20.6925 3.96496L21.5236 2.71622C20.8164 2.24554 20.0213 2.2792 19.2023 2.48791C18.3975 2.69298 17.3967 3.114 16.1661 3.62909L16.7452 5.01278ZM12.75 8.84787C12.75 8.18634 12.751 7.74991 12.7875 7.41416C12.822 7.09662 12.8823 6.94006 12.9594 6.8243L11.7106 5.99325C11.4527 6.38089 11.3455 6.79864 11.2963 7.25218C11.249 7.68752 11.25 8.21893 11.25 8.84787H12.75ZM14.1661 4.46618C13.5859 4.70901 13.0953 4.91324 12.712 5.12494C12.3126 5.34549 11.9686 5.60562 11.7106 5.99325L12.9594 6.8243C13.0364 6.70855 13.1575 6.59242 13.4371 6.438C13.7328 6.27473 14.135 6.10528 14.7452 5.84987L14.1661 4.46618ZM22.75 12.0004V8.01078H21.25V12.0004H22.75Z"
            fill="#FFFFFF"
          />
          <path
            d="M7 11V6.5V2"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle
            cx="4.5"
            cy="10.5"
            r="2.5"
            stroke="#FFFFFF"
            stroke-width="1.5"
          />
          <path
            d="M10 5C8.75736 5 7 4.07107 7 2"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <p className="text-2xl">Here is a song for you </p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19.5C12 20.8807 10.8807 22 9.5 22C8.11929 22 7 20.8807 7 19.5C7 18.1193 8.11929 17 9.5 17C10.8807 17 12 18.1193 12 19.5Z"
            stroke="#FFFFFF"
            stroke-width="1.5"
          />
          <path
            d="M22 17.5C22 18.8807 20.8807 20 19.5 20C18.1193 20 17 18.8807 17 17.5C17 16.1193 18.1193 15 19.5 15C20.8807 15 22 16.1193 22 17.5Z"
            stroke="#FFFFFF"
            stroke-width="1.5"
          />
          <path
            d="M22 8L12 12"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M14.4556 5.15803L14.7452 5.84987L14.4556 5.15803ZM16.4556 4.32094L16.1661 3.62909L16.4556 4.32094ZM21.1081 3.34059L20.6925 3.96496L20.6925 3.96496L21.1081 3.34059ZM21.25 12.0004C21.25 12.4146 21.5858 12.7504 22 12.7504C22.4142 12.7504 22.75 12.4146 22.75 12.0004H21.25ZM12.75 19.0004V8.84787H11.25V19.0004H12.75ZM14.7452 5.84987L16.7452 5.01278L16.1661 3.62909L14.1661 4.46618L14.7452 5.84987ZM22.75 8.01078C22.75 6.67666 22.752 5.59091 22.6304 4.76937C22.5067 3.93328 22.2308 3.18689 21.5236 2.71622L20.6925 3.96496C20.8772 4.08787 21.0473 4.31771 21.1466 4.98889C21.248 5.67462 21.25 6.62717 21.25 8.01078H22.75ZM16.7452 5.01278C18.0215 4.47858 18.901 4.11263 19.5727 3.94145C20.2302 3.77391 20.5079 3.84204 20.6925 3.96496L21.5236 2.71622C20.8164 2.24554 20.0213 2.2792 19.2023 2.48791C18.3975 2.69298 17.3967 3.114 16.1661 3.62909L16.7452 5.01278ZM12.75 8.84787C12.75 8.18634 12.751 7.74991 12.7875 7.41416C12.822 7.09662 12.8823 6.94006 12.9594 6.8243L11.7106 5.99325C11.4527 6.38089 11.3455 6.79864 11.2963 7.25218C11.249 7.68752 11.25 8.21893 11.25 8.84787H12.75ZM14.1661 4.46618C13.5859 4.70901 13.0953 4.91324 12.712 5.12494C12.3126 5.34549 11.9686 5.60562 11.7106 5.99325L12.9594 6.8243C13.0364 6.70855 13.1575 6.59242 13.4371 6.438C13.7328 6.27473 14.135 6.10528 14.7452 5.84987L14.1661 4.46618ZM22.75 12.0004V8.01078H21.25V12.0004H22.75Z"
            fill="#FFFFFF"
          />
          <path
            d="M7 11V6.5V2"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle
            cx="4.5"
            cy="10.5"
            r="2.5"
            stroke="#FFFFFF"
            stroke-width="1.5"
          />
          <path
            d="M10 5C8.75736 5 7 4.07107 7 2"
            stroke="#FFFFFF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      {randomSong ? (
        <div className="flex flex-col items-center gap-4 text-xl border-solid border-2 border-[#FFFFFF]}-500 p-5 rounded-[6px] max-w-sm">
          <p>{randomSong.name}</p>
          <p>{randomSong.singer}</p>
        </div>
      ) : (
        <>No song available</>
      )}
      <div className="flex flex-row items-center gap-2">
        <button
          className="rounded-[6px] bg-[#00e5ff] mx-auto p-2 items-center"
          onClick={getRandomSong}
        >
          <svg
            fill="#FFFFFF"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.977 0c-7.994 0-14.498 6.504-14.498 14.498 0 7.514 5.79 13.798 13.236 14.44l-2.87 1.455c-0.354 0.195-0.566 0.632-0.355 0.977l0.101 0.262c0.211 0.346 0.668 0.468 1.021 0.274l4.791-2.453c0.006-0.004 0.012-0.003 0.019-0.007l0.322-0.176c0.177-0.098 0.295-0.257 0.342-0.434 0.049-0.177 0.027-0.375-0.079-0.547l-0.191-0.313c-0.003-0.006-0.009-0.010-0.012-0.015l-2.959-4.624c-0.21-0.346-0.666-0.468-1.021-0.274l-0.232 0.162c-0.354 0.194-0.378 0.694-0.168 1.038l1.746 2.709c-0.009-0-0.018-0.004-0.027-0.005-6.54-0.429-11.662-5.907-11.662-12.47 0-6.891 5.607-12.498 12.498-12.498 6.892 0 12.53 5.606 12.53 12.498 0 3.968-1.823 7.613-5 9.999-0.442 0.332-0.53 0.959-0.199 1.401 0.332 0.442 0.959 0.531 1.401 0.199 3.686-2.768 5.799-6.996 5.799-11.598-0-7.994-6.536-14.498-14.53-14.498z"></path>
          </svg>
        </button>
        <button
          className="rounded-[6px] bg-[#00e5ff] mx-auto p-2 items-center"
          onClick={() => {
            router.push("/action");
          }}
        >
          Back to menu
        </button>
      </div>
    </main>
  );
}
