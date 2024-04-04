import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import TodoItem from "../todoItem/TodoItem";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [desc, setDesc] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://demo2.z-bit.ee/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const updatedTasks = data.map(element => ({
                    ...element,
                    completed: element.marked_as_done
                }));
                setTasks(updatedTasks);
            } else {
                console.error('Failed to fetch tasks:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (title, desc) => {
        try {
            const response = await fetch('http://demo2.z-bit.ee/tasks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({ title, desc, marked_as_done: false })
            });

            if (response.ok) {
                const newTask = await response.json();
                console.log(newTask);
                setTasks((prevTasks) => [...prevTasks, newTask]);
                setText("");
                setDesc("");
            } else {
                console.error("Failed to add task:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://demo2.z-bit.ee/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            if (response.ok) {
                setTasks(tasks.filter((task) => task.id !== id));
            } else {
                console.error("Failed to delete task:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleCompleted = async (id, title, desc, marked_as_done,) => {
        try {
            const response = await fetch(`http://demo2.z-bit.ee/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({
                    title,
                    marked_as_done: marked_as_done,
                    desc
                })
            });

            if (response.ok) {
                setTasks(
                    tasks.map((task) => {
                        if (task.id === id) {
                            return { ...task, completed: !task.completed };
                        } else {
                            return task;
                        }
                    })
                );
            } else {
                console.error("Failed to toggle task completion:", response.statusText);
            }
        } catch (error) {
            console.error("Error toggling task completion:", error);
        }
    };


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '40px',
                    borderRadius: '10px',
                    marginBottom: '10px',
                }}>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Task"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        InputProps={{
                            sx: {
                                color: 'white',
                                borderBottom: 'none',
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: 'white !important',
                                textDecoration: 'none',
                            },
                        }}
                        sx={{
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '2px solid pink',
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none !important',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none !important',
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        label="Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        InputProps={{
                            sx: {
                                color: 'white',
                                borderBottom: 'none',
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: 'white !important',
                                textDecoration: 'none',
                            },
                        }}
                        sx={{
                            marginBottom: '10px',
                            borderRadius: '5px',
                            border: '2px solid pink',
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'transparent',
                            },
                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none !important',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none !important',
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addTask(text, desc)}
                        style={{
                            marginTop: '10px',
                            backgroundColor: 'pink',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {tasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                    />
                ))}
            </Grid>
        </Grid >
    );
};

export default TodoList;