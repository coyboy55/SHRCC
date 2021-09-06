import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVert from '@material-ui/icons/MoreVert'
import Delete from '@material-ui/icons/Delete'

import Edit from '@material-ui/icons/Edit'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

 function MenuListComposition(props) {


    
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  let layout=props.layout

  return (
    <div className={classes.root}>



      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <i style={{color:'#4671A2'}}><MoreVert/></i>


           
         
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'rigth-end' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
             
                    {layout===1 ? (
                         <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={props.toggleEditMode}> <i style={{color:'#6DCFF6'}} ><Edit/></i></MenuItem>
                  
                    <MenuItem onClick={props.handleDelete}> <i style={{color:'red'}} ><Delete/> </i></MenuItem>
                         </MenuList>
                    ):layout===2 && (
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={props.handleSubmit}> <i style={{color:'#6DCFF6'}}><Edit/></i></MenuItem>
                  
                    <MenuItem onClick={props.handleReset}> <i style={{color:'red'}}><ArrowBackIos/></i></MenuItem>
                         </MenuList>
                    )
                  }
                 
                 
             
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
export default MenuListComposition;