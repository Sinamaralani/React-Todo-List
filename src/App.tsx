import { useState } from 'react'
interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodoList([...todoList, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  return (
    <>
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400'>
        <div className='no-scrollbar max-h-[700px] overflow-auto rounded-3xl bg-white p-16 shadow-lg'>
          <h1 className='mb-6 text-center text-3xl font-bold text-gray-900'>ریکت تو دو لیست✅</h1>
          <div className='mb-4 flex'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              placeholder='لیست خود را وارد کنید'
              className='rounded-r-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo} className='rounded-l-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
              افزودن
            </button>
          </div>
          <ul className='space-y-2'>
            {todoList.map((todo) => (
              <li key={todo.id} className='flex items-center rounded-lg border border-gray-200 bg-slate-100 p-3'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() =>
                    setTodoList(todoList.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)))
                  }
                  className='ml-2 h-5 w-5 text-blue-600'
                />
                <span className={`flex-grow ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => setTodoList(todoList.filter((t) => t.id !== todo.id))}
                  className='ml-2 rounded-lg border-none bg-red-500 p-2 text-white hover:bg-red-600'
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
