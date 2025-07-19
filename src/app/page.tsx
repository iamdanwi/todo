"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

type Task = {
  title: string;
  desc: string;
  completed: boolean;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      title: input.trim(),
      desc: description.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
    setDescription("");
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-5">
      <header>
        <h1 className="text-2xl md:text-4xl font-semibold text-neutral-900">
          Hello, <span className="text-neutral-500">there!</span>
        </h1>
        <p className="text-muted-foreground italic mt-2">
          &quote;The secret of getting ahead is getting started.&quote;
        </p>
      </header>

      <section className="flex flex-col space-y-3 w-full md:w-1/2 md:mx-auto">
        <Dialog>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-neutral-800">Tasks</h3>
            <DialogTrigger asChild>
              <Button>
                <Plus />
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription>Add a new task to your list.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Task title..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="py-6"
              />
              <Textarea
                placeholder="Add a description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={addTask}>Add</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ScrollArea className="h-[500px] w-full p-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-muted-foreground">No tasks yet. Add one.</p>
            ) : (
              tasks.map((task, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between py-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`task-${index}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(index)}
                      />
                      <div className="flex flex-col space-y-1 leading-none">
                        <Label
                          htmlFor={`task-${index}`}
                          className={task.completed ? "line-through text-muted-foreground" : ""}
                        >
                          {task.title}
                        </Label>
                        {task.desc && (
                          <p className="text-sm text-muted-foreground">{task.desc}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteTask(index)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  {index < tasks.length - 1 && <Separator />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </section>
    </main>
  );
}
