import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
const NewRecordForm = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: {
            value: '',
            error: false,
            errorMessage: 'You must enter a name.'
        },
        description: {
            value: '',
            error: false,
            errorMessage: 'You must enter a description.'
        },
        phoneNumber: {
            value: '',
            error: false,
            errorMessage: 'You must enter restaurant phone number'
        },
        rating: {
            value: 0,
            error: false,
            errorMessage: 'You must choose your job title'
        }
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        navigate('/');
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: formValues.name.value, Description: formValues.description.value, phoneNumber: formValues.phoneNumber.value, rating: formValues.rating.value })
    };

    const handleSubmit = () => {
        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }
        let formValid = true;
        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;

            if (currentValue === '') {
                formValid = false;
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true
                    }
                }

            }

        }
        setFormValues(newFormValues);
        if (formValid) {
            fetch('http://localhost:8080/api/v1/restaurants/', requestOptions)
                .then(response => response.json())
                .then(() => handleOpen());
        }

    }

    const onNameChange = (e) => setFormValues({

        ...formValues, name: {
            value: e.target.value
        }
    })
    const onDescriptionChange = (e) => setFormValues({
        ...formValues, description: {
            value: e.target.value
        }
    });
    const onNumberChange = (e) => setFormValues({
        ...formValues, phoneNumber: {
            value: e.target.value
        }
    });
    const onRatingChange = (e) => setFormValues({
        ...formValues, rating: {
            value: e.target.value
        }
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <h1>Create new Restaurant form</h1>
            <Box
                component="form"
                sx={{
                    width: 500,
                    maxWidth: '100%',
                    color: '#fff',
                    background: "#fff"
                    
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        onChange={onNameChange}
                        fullWidth
                        required
                        margin="normal"
                        id="outlined-required"
                        label="Name"
                        error={formValues.name.error}
                        helperText={formValues.name.error && formValues.name.errorMessage}
                        value={formValues.name.value}
                    />
                    <TextField
                        multiline
                        rows={4}
                        onChange={onDescriptionChange}
                        fullWidth
                        required
                        margin="normal"
                        id="outlined-required"
                        label="Description"
                        error={formValues.description.error}
                        helperText={formValues.description.error && formValues.description.errorMessage}
                        value={formValues.description.value}
                    />
                    <TextField
                        onChange={onNumberChange}
                        fullWidth
                        required
                        margin="normal"
                        id="outlined-required"
                        label="Phone Number"
                        error={formValues.phoneNumber.error}
                        helperText={formValues.phoneNumber.error && formValues.phoneNumber.errorMessage}
                        value={formValues.phoneNumber.value}
                    />
                    <TextField
                        onChange={onRatingChange}
                        fullWidth
                        margin="normal"
                        id="outlined-number"
                        label="Rating"
                        type="number"

                        value={formValues.rating.value}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="secondary" onClick={() => handleSubmit()}>
                        Create
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Restaurant with name "{formValues.name.value}" created successfully.
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
                            <h1>Restaurant</h1>
                            <p>Name: <b>{formValues.name.value}</b></p>
                            <p>Description:<b> {formValues.description.value}</b></p>
                            <p>Phone number:<b> {formValues.phoneNumber.value}</b></p>
                            <p>Rating:<b> {formValues.rating.value} </b></p>

                        </Typography>
                    </Box>
                </Modal>
            </Box>
        </div>
    )

}

export default NewRecordForm;