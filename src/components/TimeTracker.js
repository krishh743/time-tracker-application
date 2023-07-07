import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./TimeTracker.css"
import {Stack, TextField} from '@mui/material';

const TimeTracker = () => {
    const [timer, setTimer] = useState(0);
    const [running, setRunning] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editTaskIndex, setEditTaskIndex] = useState(-1);
    const [editedTaskDescription, setEditedTaskDescription] = useState('');

    useEffect(() => {
        let interval = null;

        if (running) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [running]);

    const handleStart = () => {
        setRunning(true);
    };

    const handlePause = () => {
        setRunning(false);
    };

    const handleSave = () => {
        setModalOpen(true);
        setOpen(true);
    };

    const handleModalSave = () => {
        const task = {
            title: taskTitle,
            description: taskDescription,
            time: timer,
        };

        setTasks((prevTasks) => [...prevTasks, task]);
        setModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
        setTimer(0);
    };

    const handleModalCancel = () => {
        setModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };


    const handleEditTask = (index) => {
        setEditTaskIndex(index);
        setEditedTaskDescription(tasks[index].description);
    };

    const handleSaveEditedTask = () => {
        const updatedTasks = [...tasks];
        updatedTasks[editTaskIndex].description = editedTaskDescription;
        setTasks(updatedTasks);
        setEditTaskIndex(-1);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='time-page'>
            <h1>Time Tracking App</h1>
            <Stack spacing={3} direction={"column"}>
                <div className="timer">{formatTime(timer)}</div>
                <div className="buttons">
                    <Stack spacing={3} direction={"row"} alignContent={"center"} justifyContent={"center"}>
                        <Button variant="contained" color="success" onClick={handleStart} disabled={running}>
                            Start
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handlePause} disabled={!running}>
                            Pause
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave} disabled={running}>
                            Save
                        </Button>
                    </Stack>
                </div>
            </Stack>
            {modalOpen && (
                <div>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure want to Save file?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <p>
                                    This dialog is to name your file like title, description and save it to list out all time trackers.
                                    You can able to edit Your data if any mistake in previous title and description.
                                </p>
                                <Stack spacing={2} direction={"column"}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Title"
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}

                                    />
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Description"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                    />
                                </Stack>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button variant="contained" onClick={handleModalSave}>Save</Button>
                            <Button variant="contained" onClick={handleModalCancel} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            )}
            <h2>Saved Tasks</h2>
            <div className='list-container'>
                {tasks.map((task, index) => (
                    <Stack className='all-list'>
                        <div key={index} className='lists' >
                            <Stack direction={"row"} justifyContent={"center"} spacing={4}>
                                <span className="title-text">Title & Description : </span>    {task.title} - {editTaskIndex === index ? (

                                    <input
                                        type="text"
                                        placeholder='description'
                                        value={editedTaskDescription}
                                        onChange={(e) => setEditedTaskDescription(e.target.value)}
                                    />
                                ) : (
                                    task.description
                                )} - {formatTime(task.time)}
                                {editTaskIndex === index ? (
                                    <Button variant="contained" onClick={handleSaveEditedTask}>Save</Button>
                                ) : (
                                    <Button variant="contained" color="secondary"
                                        onClick={() => handleEditTask(index)}>Edit</Button>
                                )}
                            </Stack>
                        </div>
                    </Stack>
                ))}
            </div>
        </div>
    );
};

export default TimeTracker;

