import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const banks = ['The Senshu Ikeda', 'SMBC'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;


    const handleClose = () => {
        onClose(false);
    };

    const handleListItemClick = (value, i) => {
        onClose(i);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{fontFamily: '"Montserrat", sans-serif', color: '#8a28d9'}}>Set bank account</DialogTitle>
            <List sx={{ p: 2 }}>
                {banks.map((bank, i) => (
                    <ListItem key={i} button onClick={() => handleListItemClick(bank, i)}>
                        <ListItemText  primary={ <p style={{fontFamily: '"Montserrat", sans-serif'}}> {bank} </p>} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ChooseBank({ set, show, onClose }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);

    React.useEffect(() => {
        setOpen(show.open)
    })

    const handleClose = (value) => {
        // console.log(value)
        if (value !== false){
            onClose(show.id, value)}
        setOpen(false);
        set({ open: false, id: '' })
    };

    return (
        <div>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}