import React, { useState, useEffect, useRef } from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment, editDepart, putEditDepart } from '../../redux/actions/departmentAction';
import Chargin from '../../pages/Chargin';

const DepartmentCreate = (props) => {

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [name, setName] = useState('')
  const nameRe = useRef()

  useEffect(() => {
    const { id } = props.match.params
    if (id) {
      dispatch(editDepart(id))
    } else {
      setName('')
      nameRe.current.focus()
    }
  }, [props.match.params, dispatch])

  useEffect(() => {
    if (props.match.params.id) {
      setName(state.fetchDepartment.departEdit.departamento)
    }
  }, [state.fetchDepartment.departEdit.departamento, props.match.params.id])

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
    setName('')
    /* if (!state.fetchDepartment.departEdit.edit) {
      props.history.push('/department-list')
    } */
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