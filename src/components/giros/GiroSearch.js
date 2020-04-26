import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, makeStyles, Button } from '@material-ui/core';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchGiros } from '../../redux/actions/giroActions';


const GiroSearch = ({ searchGiroCc }) => {

  const [ccReceptor, setCcReceptor] = useState('')
  const dispatch = useDispatch()

  const giroFindByCcReceptor = (e) => {
    setCcReceptor(e.target.value)
  }

  const getAllGiros = () => {
    dispatch(fetchGiros())
    setCcReceptor('')
  }

  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#3f51b529',
      /* '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      }, */
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    }
  }))
  const classes = useStyles();
  return (
    <div>
      {ccReceptor.length >= 5 && <div style={{ position: 'absolute', left: '10px' }}><Button onClick={getAllGiros} title='Buscar' variant="outlined" color="primary">
        Ver todos
          </Button>
      </div>}
      <div className={classes.search}>

        <form onSubmit={(e) => searchGiroCc(e, ccReceptor)}>
          <InputBase
            onChange={giroFindByCcReceptor}
            type='number'
            placeholder="Buscar por cc receptor"
            autoFocus
            value={ccReceptor}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          <Button disabled={ccReceptor.length <= 5} onClick={(e) => searchGiroCc(e, ccReceptor)} title='Buscar' variant="contained" color="primary">
            <SearchIcon />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default GiroSearch