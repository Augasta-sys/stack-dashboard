import { useEffect, useMemo, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import {
  Check,
  Star,
  Trash2,
  X,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type Locale = "en" | "fr" | "es"

interface TodoTask {
  id: string
  text: string
  translationKey?: DefaultTaskKey
  starred: boolean
  completed: boolean
  custom?: boolean
}

type DefaultTaskKey =
  | "meeting"
  | "schoolPickup"
  | "shopping"
  | "review"
  | "diaSchool"
  | "designFiles"
  | "updateFile"

const defaultTasks: TodoTask[] = [
  {
    id: "1",
    text: "Meeting with CEO",
    translationKey: "meeting",
    starred: false,
    completed: false,
  },
  {
    id: "2",
    text: "Pick up kids from school",
    translationKey: "schoolPickup",
    starred: true,
    completed: false,
  },
  {
    id: "3",
    text: "Shopping with Brother",
    translationKey: "shopping",
    starred: false,
    completed: false,
  },
  {
    id: "4",
    text: "Review with HR",
    translationKey: "review",
    starred: false,
    completed: false,
  },
  {
    id: "5",
    text: "Going to Dia’s School",
    translationKey: "diaSchool",
    starred: false,
    completed: false,
  },
  {
    id: "6",
    text: "Check design files",
    translationKey: "designFiles",
    starred: true,
    completed: false,
  },
  {
    id: "7",
    text: "Update File",
    translationKey: "updateFile",
    starred: false,
    completed: false,
  },
]

const translations = {
  en: {
    title: "To-Do List",
    addTitle: "Add New To-Do",
    addTask: "Add New Task",
    save: "Save",
    placeholder: "Write Your task name here",
    required: "Please enter a task name.",
    taskAria: "Task",
    complete: "Mark task as complete",
    incomplete: "Mark task as incomplete",
    star: "Star task",
    unstar: "Unstar task",
    delete: "Delete task",
    tasks: {
      meeting: "Meeting with CEO",
      schoolPickup: "Pick up kids from school",
      shopping: "Shopping with Brother",
      review: "Review with HR",
      diaSchool: "Going to Dia’s School",
      designFiles: "Check design files",
      updateFile: "Update File",
    },
  },
  fr: {
    title: "Liste de tâches",
    addTitle: "Ajouter une tâche",
    addTask: "Nouvelle tâche",
    save: "Enregistrer",
    placeholder: "Écrivez le nom de votre tâche ici",
    required: "Veuillez saisir le nom d’une tâche.",
    taskAria: "Tâche",
    complete: "Marquer la tâche comme terminée",
    incomplete: "Marquer la tâche comme non terminée",
    star: "Ajouter aux favoris",
    unstar: "Retirer des favoris",
    delete: "Supprimer la tâche",
    tasks: {
      meeting: "Réunion avec le PDG",
      schoolPickup: "Récupérer les enfants à l’école",
      shopping: "Faire les magasins avec mon frère",
      review: "Réunion avec les RH",
      diaSchool: "Aller à l’école de Dia",
      designFiles: "Vérifier les fichiers de conception",
      updateFile: "Mettre à jour le fichier",
    },
  },
  es: {
    title: "Lista de tareas",
    addTitle: "Añadir nueva tarea",
    addTask: "Nueva tarea",
    save: "Guardar",
    placeholder: "Escribe el nombre de tu tarea aquí",
    required: "Escribe el nombre de una tarea.",
    taskAria: "Tarea",
    complete: "Marcar tarea como completada",
    incomplete: "Marcar tarea como pendiente",
    star: "Destacar tarea",
    unstar: "Quitar de destacados",
    delete: "Eliminar tarea",
    tasks: {
      meeting: "Reunión con el CEO",
      schoolPickup: "Recoger a los niños de la escuela",
      shopping: "Ir de compras con mi hermano",
      review: "Reunión con RR. HH.",
      diaSchool: "Ir a la escuela de Dia",
      designFiles: "Revisar los archivos de diseño",
      updateFile: "Actualizar archivo",
    },
  },
} as const

function getLocale(language: unknown): Locale {
  const value = String(language ?? "").trim().toLowerCase()

  // LanguageContext may provide either locale keys (en/fr/es)
  // or the displayed language names (English/French/Spanish).
  if (
    value === "fr" ||
    value === "fr-fr" ||
    value === "french" ||
    value.startsWith("français") ||
    value.startsWith("franc")
  ) {
    return "fr"
  }

  if (
    value === "es" ||
    value === "es-es" ||
    value === "spanish" ||
    value.startsWith("españ") ||
    value.startsWith("span")
  ) {
    return "es"
  }

  return "en"
}

export default function Todo() {
  const { language } = useLanguage()
  const lang = getLocale(language)
  const t = translations[lang]

  const [tasks, setTasks] = useState<TodoTask[]>(defaultTasks)
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState("")
  const [showValidation, setShowValidation] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const displayTasks = useMemo(
    () =>
      tasks.map((task) => ({
        ...task,
        displayText:
          task.translationKey && !task.custom
            ? t.tasks[task.translationKey]
            : task.text,
      })),
    [tasks, t],
  )

  useEffect(() => {
    if (!isAdding) {
      setShowValidation(false)
      return
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 50)

    return () => window.clearTimeout(timer)
  }, [isAdding])

  const openAddTask = () => {
    setShowValidation(false)
    setNewTask("")
    setIsAdding(true)
  }

  const cancelAddTask = () => {
    setShowValidation(false)
    setNewTask("")
    setIsAdding(false)
  }

  const saveTask = () => {
    const value = newTask.trim()

    if (!value) {
      setShowValidation(true)
      inputRef.current?.focus()
      return
    }

    const task: TodoTask = {
      id: `custom-${Date.now()}`,
      text: value,
      starred: false,
      completed: false,
      custom: true,
    }

    setTasks((current) => [task, ...current])
    setNewTask("")
    setShowValidation(false)
    setIsAdding(false)
  }

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      saveTask()
    }

    if (event.key === "Escape") {
      event.preventDefault()
      cancelAddTask()
    }
  }

  const toggleCompleted = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  const toggleStarred = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, starred: !task.starred }
          : task,
      ),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] sm:text-[32px] dark:text-white">
            {isAdding ? t.addTitle : t.title}
          </h1>

          <button
            type="button"
            onClick={isAdding ? saveTask : openAddTask}
            className="flex h-12 w-full shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-[#4880FF] px-5 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#3B6EE8] hover:shadow-md active:scale-[0.98] sm:w-[147px]"
          >
            {isAdding ? t.save : t.addTask}
          </button>
        </div>

        {isAdding && (
          <div className="mb-6 flex min-h-[88px] w-full items-center rounded-[12px] border border-[#E0E0E0]/80 bg-white px-5 shadow-xs transition-all sm:h-[93px] sm:px-8 dark:border-[#313D4F] dark:bg-[#273142]">
            <div className="w-full">
              <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={(event) => {
                  setNewTask(event.target.value)
                  if (showValidation && event.target.value.trim()) {
                    setShowValidation(false)
                  }
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t.placeholder}
                aria-label={t.taskAria}
                aria-invalid={showValidation}
                className="h-[46px] w-full max-w-[435px] rounded-[6px] border border-[#D5D5D5] bg-[#F5F6FA] px-4 text-[14px] font-semibold text-[#202224] outline-none transition-colors placeholder:text-[#A6A6A6] focus:border-[#4880FF] dark:border-[#4B5668] dark:bg-[#323D4E] dark:text-white dark:placeholder:text-gray-300"
              />

              {showValidation && (
                <p className="mt-1.5 text-xs font-semibold text-[#EF3826]">
                  {t.required}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-6">
          {displayTasks.map((task) => {
            if (task.completed) {
              return (
                <div
                  key={task.id}
                  className="flex min-h-[78px] w-full items-center justify-between gap-4 rounded-[12px] border border-[#4880FF] bg-[#4880FF] px-4 py-4 shadow-md transition-all duration-200 sm:h-[93px] sm:px-8"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
                    <button
                      type="button"
                      onClick={() => toggleCompleted(task.id)}
                      aria-label={t.incomplete}
                      className="flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border-2 border-white bg-transparent text-white transition-colors hover:bg-white/10 sm:h-7 sm:w-7"
                    >
                      <Check
                        className="h-4 w-4 stroke-[2.5]"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleCompleted(task.id)}
                      className="min-w-0 cursor-pointer select-none truncate text-left font-sans text-[15px] font-semibold text-white sm:text-[16px]"
                    >
                      {task.displayText}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={t.delete}
                    className="flex h-9 w-12 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-white/40 bg-white/20 text-white transition-all hover:bg-white/30 sm:h-[38px] sm:w-[52px]"
                  >
                    <Trash2
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )
            }

            return (
              <div
                key={task.id}
                className="flex min-h-[78px] w-full items-center justify-between gap-4 rounded-[12px] border border-[#E0E0E0]/80 bg-white px-4 py-4 shadow-2xs transition-all duration-200 hover:border-[#4880FF]/50 hover:shadow-md sm:h-[93px] sm:px-8 dark:border-[#313D4F] dark:bg-[#273142]"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => toggleCompleted(task.id)}
                    aria-label={t.complete}
                    className="h-[26px] w-[26px] shrink-0 cursor-pointer rounded-[6px] border border-[#D5D5D5] bg-[#FBFCFE] transition-colors hover:border-[#4880FF] sm:h-7 sm:w-7 dark:border-[#4B5668] dark:bg-[#323D4E]"
                  />

                  <button
                    type="button"
                    onClick={() => toggleCompleted(task.id)}
                    className="min-w-0 cursor-pointer select-none truncate text-left font-sans text-[15px] font-semibold text-[#202224] sm:text-[16px] dark:text-white"
                  >
                    {task.displayText}
                  </button>
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:gap-7">
                  <button
                    type="button"
                    onClick={() => toggleStarred(task.id)}
                    aria-label={task.starred ? t.unstar : t.star}
                    className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={
                        task.starred
                          ? "h-6 w-6 fill-[#FFD56D] text-[#FFD56D]"
                          : "h-6 w-6 text-[#B9B9B9] hover:text-[#FFD56D] dark:text-gray-400"
                      }
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={t.delete}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#B9B9B9] text-[#888888] transition-colors hover:border-[#EF3826] hover:bg-[#EF3826]/10 hover:text-[#EF3826] sm:h-[30px] sm:w-[30px] dark:border-gray-400 dark:text-gray-300"
                  >
                    <X
                      className="h-[14px] w-[14px]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
