"use client";

import { useState } from "react";
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
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<{ title: string; desc: string }[]>([]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks((prev) => [...prev, { title: input.trim(), desc: description.trim() }]);
    setInput("");
    setDescription("");
  };

  return (
    <main className="flex min-h-screen flex-col p-6 space-y-5">
      <div>
        <h1 className="text-2xl md:text-4xl font-semibold text-neutral-900">
          Hello, <span className="text-neutral-500">Dainwi</span>
        </h1>
        {/* Quote */}
        <p className="text-muted-foreground italic mt-2">
          &quot;The secret of getting ahead is getting started.&quot;
        </p>
      </div>

      <section className="flex flex-col space-y-3 w-full md:w-1/2 md:mx-auto">
        {/* Task List Section */}
        <div className="mt-8">
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
                <DialogDescription>
                  Add a new task to your list.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
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
                  <Button onClick={addTask}>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <ScrollArea className="h-[500px] w-full p-4">
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-muted-foreground">No tasks yet. Add one</p>
              ) : (
                tasks.map((task, index) => (
                  <div key={index}>
                    <div className="flex items-start space-x-3 py-2">
                      <Checkbox id={`task-${index}`} />
                      <div className="flex flex-col space-y-1 leading-none">
                        <Label htmlFor={`task-${index}`}>{task.title}</Label>
                        {task.desc && <p className="text-sm text-muted-foreground">{task.desc}</p>}
                      </div>
                    </div>
                    {index < tasks.length - 1 && <Separator />}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}