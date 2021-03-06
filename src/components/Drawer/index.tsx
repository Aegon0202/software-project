import React, { FC,memo,useState } from 'react';

import classNames from 'classnames';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PieChartIcon from '@material-ui/icons/PieChart';

import useStyles from '../../styles/drawer';

import Anchor from '../Anchor';

export interface localProps {
  open:boolean;
}

const listItems=[
  {
    icon:<DashboardIcon />,
    text:'dashboard',
  },{
    icon:<HomeIcon />,
    text:'home',
  }
]

const CustomDrawer: FC<localProps> = memo(({open}) => {
    const classes = useStyles();

    return (
        <Drawer
            variant='permanent'
            classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose) }}
            open={open}>
            <div className={classes.toolbar}>
                <IconButton>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
              {listItems.map(({icon,text}, index) => (
                <ListItem button>
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Drawer>
    );
});

export default CustomDrawer;