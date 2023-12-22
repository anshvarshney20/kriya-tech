import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import List from '@material-ui/core/List';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import PeopleIcon from '@mui/icons-material/People';
import Drawer from '@material-ui/core/Drawer';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import ListItem from '@material-ui/core/ListItem';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListItemText from '@material-ui/core/ListItemText';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { Button, ListItemIcon } from '@material-ui/core';
import { Info } from '@mui/icons-material';
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 280, // Adjust the width as needed
  },
}));

const Navbar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const classes = useStyles();

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
      };
    
    return (
        <>
            <div id="header" className="header d-flex align-items-center">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto"><Link to='/'>KRIYA</Link></h1>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul style={{fontWeight:'bold'}}>
                            <li><Link to='/' className="active"><b>HOME</b></Link></li>
                            <li><Link to='/features'><b>FEATURES</b></Link></li>
                            <li><Link to='/creators'><b>CREATORS</b></Link></li>
                            <li><Link to='/pricing'><b>PRICING</b></Link></li>
                            <li><Link to='/contact'><b>CONTACT</b></Link></li>


                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" onClick={toggleDrawer}></i>
                        <Drawer
              open={isDrawerOpen}
              onClose={toggleDrawer}
              className={classes.drawer}
            >
              <List>
                <ListItem button component={Link} to="/" style={{ minWidth: 200 }}>
                  <ListItemIcon>
                    <AddHomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/features">
                  <ListItemIcon>
                    <LibraryBooksIcon />
                  </ListItemIcon>
                  <ListItemText primary="Features" />
                </ListItem>
                <ListItem button component={Link} to="/creators">
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Creators" />
                </ListItem>
                <ListItem button component={Link} to="/pricing">
                  <ListItemIcon>
                    <PriceChangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pricing" />
                </ListItem>
                <ListItem button component={Link} to="/contact">
                  <ListItemIcon>
                    <ContactsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Drawer>

                    </nav>

                </div>
            </div>
        </>
    );
};

export default Navbar;