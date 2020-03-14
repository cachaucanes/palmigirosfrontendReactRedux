import React, { useState, useEffect, useRef } from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment, editDepart, putEditDepart } from '../../redux/actions/departmentAction';
import { Chargin } from './DepartmentsList';

const DepartmentCreate = (props) => {

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [name, setName] = useState('')
  const [successEdit, setSuccessEdit] = useState(false)
  const nameRe = useRef()

  useEffect(() => {
    const { id } = props.match.params
    if (id && !successEdit) {
      dispatch(editDepart(id))
      setName(state.fetchDepartment.departEdit.departamento)
    } else {
      setName('')
      nameRe.current.focus()
    }

  }, [props.match.params, state.fetchDepartment.departEdit.departamento, dispatch, successEdit])

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        textAlign: 'center'
      },
    },
  }));
  const classes = useStyles();

  const hanldleChange = (e) => {
    setName(e.target.value)
  }

  const handle = (e) => {
    e.preventDefault()
    if (!props.match.params.id) {
      dispatch(createDepartment({ departamento: name }))
      setName('')
      return false
    }

    const nuevo = Object.assign(
      state.fetchDepartment.departEdit,
      { departamento: name }
    )
    dispatch(putEditDepart(nuevo))
    setSuccessEdit(true)
    setName('')    
    if (!state.fetchDepartment.departEdit.edit) {
      props.history.push('/department-list')
    }    
  }

  return (
    <div className={classes.root}>
      <div>
        <h1>{props.match.params.id ? 'Actualizar' : 'Registrar'} Departamentos</h1>
      </div>
      <div>
        <Chargin chargin={state.fetchDepartment.isFetching} />
        <p>{state.fetchDepartment.isFetching}</p>
      </div>
      <form onSubmit={handle} noValidate autoComplete="off">
        {/* <input type="text" defaultValue={name} onChange={hanldleChange} /> */}
        <TextField inputRef={nameRe} autoFocus value={name || ''} onChange={hanldleChange} label='Name departamento' id="outlined-basic" variant="outlined" />
        <Button onClick={handle} size="small" variant="outlined" color="primary">
          {props.match.params.id ? 'Actualizar' : 'Guardar'}
        </Button>
      </form>
    </div>
  )
}

export default DepartmentCreate