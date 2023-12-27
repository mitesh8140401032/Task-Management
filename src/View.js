import React, { useContext, useEffect, useState } from "react"
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { cartContext } from "./ContextProvider";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function View() {
    const { CartLength, setCartLength } = useContext(cartContext)
    const [Data, setData] = useState()
    const [TaskEditID, setTaskEditID] = useState('')
    const [Right, setRight] = useState('Complite')
    const [Wrong, setWrong] = useState('Not Complite')

    console.log(Data)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const Navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('Alldata')) {
            let Taskdata = JSON.parse(localStorage.getItem('Alldata'))
            setData(Taskdata)
        }
    }, [])

    const handleDelete2 = (id) => {
        if (id) {
            console.log(id)
            let Taskdelete = Data.filter((i) => i.id !== id)
            console.log(Taskdelete)
            setData(Taskdelete)
            setCartLength(Taskdelete.length)
            localStorage.setItem('Alldata', JSON.stringify(Taskdelete))
            toast.error(" Tasks deleted successfully ", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    const handleDelete = (id) => {
        if (id) {
            const updatedData = Data.filter((_, index) => !id.includes(index));
            setData(updatedData);
            setCartLength(updatedData.length);
            localStorage.setItem('Alldata', JSON.stringify(updatedData));
            toast.error(" Tasks deleted successfully ", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    const handleEdit = (id) => {
        setTaskEditID(id)
        setShow(true);
        for (let i = 0; i < Data.length; i++) {
            if (Data[i].id == id) {
                console.log(Data[i], 'gug')
                formik.setFieldValue('taskNameEdit', Data[i].taskName)
                formik.setFieldValue('taskDescription', Data[i].taskDescription)
                formik.setFieldValue('isImportantEdit', Data[i].isImportant)
            }
        }
    }


    const handleView = ((id) => {
        Navigate('/updatetask/' + id)
    })

    const handleSave = () => {
        document.getElementById('addr-btn').click()
    }

    const formik = useFormik({
        initialValues: {
            taskNameEdit: '',
            taskDescription: '',

            isImportantEdit: false,
        },
        validationSchema: Yup.object({
            taskNameEdit: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),
            taskDescription: Yup.string()
                .min(2, 'Minimum 2 characters')
                .required('Required!'),

        }),
        onSubmit: (values) => {
            if (TaskEditID) {
                let findEditRow = Data.findIndex((item) => item.id == TaskEditID)
                let updateData = Data
                updateData[findEditRow].taskName = values.taskNameEdit
                updateData[findEditRow].taskDescription = values.taskDescription
                updateData[findEditRow].isImportant = values.isImportantEdit
                updateData[findEditRow].currentDate = new Date()

                setData(updateData)
                localStorage.setItem('Alldata', JSON.stringify(updateData))
                setTaskEditID('')
                formik.resetForm()
                setShow(false)
                toast.success(" Tasks Update successfully ", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        },
    });

    const columns = [
        {
            name: "",
            label: "No",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <span>{tableMeta.rowIndex + 1}</span>
                )
            },
        },
        {
            name: "taskName",
            label: "Task_Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "taskDescription",
            label: "Task_Description",
            options: {
                filter: false,
                sort: false,
            }
        },

        {
            name: "isImportant",
            label: "Yes/No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <p>{Data[tableMeta.rowIndex].isImportant === true ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path fill="#28a745" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                        </>
                    ) : (<>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path fill="#ff0000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                    </>)}</p>
                )
            },
        },

        {
            name: "edit",
            label: "Task_Edit",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className="btn" onClick={() => handleEdit(Data[tableMeta.rowIndex].id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">

                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                    </button>

                )
            },
        },
        {
            name: "delete",
            label: "Task_Delete",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <button className="btn " onClick={() => handleDelete2(Data[tableMeta.rowIndex].id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">

                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                    </button>

                )
            },
        },
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'standard',
        selectableRows: 'multiple',
        onRowsDelete: (rowsDeleted) => handleDelete(rowsDeleted.data.map((row) => row.dataIndex)),
    };

    return (
        <>
            {/* ALL TASK LIST */}

            <Header />
            <Container>
                <Row className='text-center mt-3'>
                    <Col>
                        <div className='create_title mb-4'>
                            <h3>Task List</h3>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div>
                            <MUIDataTable
                                data={Data}
                                columns={columns}
                                options={options}
                            />
                        </div>
                    </Col>
                </Row>

                {/* EDIT TASK */}

                <Row>
                    <Col>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Task</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>Task Name:-</label>
                                        <br />
                                        <input
                                            type='text'
                                            name='taskNameEdit'
                                            value={formik.values.taskNameEdit}
                                            onChange={formik.handleChange}
                                            className='w-100 p-2 rounded'
                                        />
                                        {formik.errors.taskNameEdit && formik.touched.taskNameEdit && (
                                            <p>{formik.errors.taskNameEdit}</p>
                                        )}
                                    </div>
                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>Task Description:-</label>
                                        <br />
                                        <input
                                            type='text'
                                            name='taskDescription'
                                            value={formik.values.taskDescription}
                                            onChange={formik.handleChange}
                                            className='w-100 p-2 rounded'
                                        />
                                        {formik.errors.taskDescription &&
                                            formik.touched.taskDescription && (
                                                <p>{formik.errors.taskDescription}</p>
                                            )}
                                    </div>

                                    <div className='text-start mb-4'>
                                        <label className='fw-medium mb-1'>
                                            <input
                                                type='checkbox'
                                                name='isImportantEdit'
                                                checked={formik.values.isImportantEdit === true}
                                                onChange={formik.handleChange}
                                                className="form-check-input mystyle me-2"
                                            />{' '}
                                            Important
                                        </label>
                                    </div>
                                    <div className='text-center mb-4 d-none'>
                                        <button id="addr-btn" className='btn btn-dark' type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleSave}>
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    )
}
