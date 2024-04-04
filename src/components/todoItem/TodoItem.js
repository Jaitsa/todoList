import React from 'react';
import { Checkbox, Button, Typography, Grid, Box } from '@mui/material';

const TodoItem = ({ task, deleteTask, toggleCompleted }) => {
    const handleChange = () => {
        toggleCompleted(task.id, task.title, task.desc, !task.completed);
    }

    return (
        <Box sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '10px',
        }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Checkbox
                        checked={task.completed}
                        onChange={handleChange}
                        color="primary"
                        sx={{
                            color: 'white',
                            '&.Mui-checked': {
                                color: 'pink',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'white',
                            textDecoration: task.completed ? 'line-through 1px red' : 'none',
                            overflowWrap: 'break-word',
                            '& .task': {
                                fontWeight: 'bold',
                                fontSize: '18px',
                                color: '#FFA9FE'
                            },
                            '& .desc': {
                                fontSize: '18px',
                                color: '#F1F1F1'
                            },
                        }}
                    >
                        <span className="task">{task.title}:</span>
                        <br />
                        <span className="desc">{task.desc}</span>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="error" onClick={() => deleteTask(task.id)}>
                        X
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TodoItem;
