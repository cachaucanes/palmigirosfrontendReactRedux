/*Link usando router */
<Link component={LinkBehavior} color="inherit">
  Countries
          </Link>
  <Typography className={classes.root}>

    <Link className={classes.linkNav} component={RouterLink} to='/department' color="inherit">
      Department
        </Link>
    <Link className={classes.linkNav} component={RouterLink} to='/cities' color="inherit">
      Cities
        </Link>
  </Typography>