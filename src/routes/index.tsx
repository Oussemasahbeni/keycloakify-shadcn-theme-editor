import { ModeToggle } from '#/components/mode-toggle'
import { db } from '#/db'
import { todos } from '#/db/schema'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'

const seedTodos = createServerFn({ method: 'POST' }).handler(async () => {
  await db
    .insert(todos)
    .values([
      { title: 'Buy groceries' },
      { title: 'Read a book' },
      { title: 'Workout' },
    ])
})

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [done, setDone] = useState(false)

  async function handleSeed() {
    await seedTodos()
    setDone(true)
  }

  return (
    <div className="p-8">
      <ModeToggle />
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <button
        onClick={handleSeed}
        disabled={done}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {done ? 'Todos seeded!' : 'Seed todos'}
      </button>
    </div>
  )
}
