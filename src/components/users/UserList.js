import React, { useEffect } from 'react'
import UserView from './UserView'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, deleteUser } from '../../redux/actions/userActions'
import { Grid } from '@material-ui/core'
import Chargin from '../../pages/Chargin'
import AlertMessage from '../../pages/AlertMessage'


const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.fetchUser)

  useEffect(() => {
    dispatch(getUsers())        
  }, [dispatch])

  const onDeleteUSer = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <div>
    {users.message && <AlertMessage typoAlerta={users.status} messageAlerta={users.message} />}
      <div style={{ textAlign: 'center' }}>
        <h1>Lista de usuarios</h1>
        <Chargin chargin={users.isFetching}/>
      </div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {users.users.map(user => (
          <UserView onDeleteUSer={onDeleteUSer} key={user.id} user={user} />
        ))}
      </Grid>
    </div>
  )
}

export default UserList