import React from 'react'

export default function Home() {
  ;<div className="flex h-screen w-screen items-center justify-center bg-cover py-5 text-center">
    <form id="startGameForm">
      <h1 className="mb-2 block p-5 text-5xl font-bold text-green-600">
        Welcom to Card Game station!
      </h1>
      <p className="block text-2xl font-bold text-white">
        Which game do you want to play? Click!
      </p>
      <div className="flex p-3">
        <button
          id="startBlackjack"
          type="button"
          className="m-3 flex-1 rounded border bg-yellow-500 p-3 text-2xl font-bold hover:bg-yellow-400"
        >
          Black Jack
        </button>
        <button
          id="startPoker"
          type="button"
          className="m-3 flex-1 rounded border bg-yellow-500 p-3 text-2xl font-bold hover:bg-yellow-400"
        >
          Poker
        </button>
        <button
          id="startSpeed"
          type="button"
          className="m-3 flex-1 rounded border bg-yellow-500 p-3 text-2xl font-bold hover:bg-yellow-400"
        >
          Speed
        </button>
        <button
          id="startComingSoon"
          type="button"
          className="m-3 flex-1 rounded border bg-yellow-500 p-3 text-2xl font-bold hover:bg-yellow-400"
        >
          Coming soon..
        </button>
      </div>
    </form>
  </div>
}
