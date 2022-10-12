import React from 'react'
import { Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import Logo from '../../static/assets/WhatsApp Image 2021-11-25 at 11.35.05 AM.jpeg'
import Address from '../../static/assets/Screenshot 2021-11-25 at 11.40.42.png'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Invoice() {
    return (
        <Stack>
            <Stack direction="row" justifyContent="space-between">
                <img src={Logo} width="25%" />
                <img src={Address} width="25%" />
            </Stack>
            <Toolbar sx={{ borderBottom: 'double #c49a6c' }} />
            <Toolbar />
            <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }} > M/s. </Typography>

            <Stack direction="row" justifyContent="space-between" sx={{ pt: 2 }}>
                <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }} > No. MBS-3053/21-CA | Date. 05 Oct 2020 </Typography>
                <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }} > Saif's Automobiles Ltd. </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" sx={{ pt: 2 }}>
                <Typography variant="h3" > PROFORMA <br /> INVOICE </Typography>
                <Typography sx={{ textAlign: 'right', fontWeight: 'bold', width: '300px' }} > 1750 Pivet Dr., San Quinten Blvd., CA 71250 +1 625 547 2021 | info@saifsautombiles.com </Typography>
            </Stack>

            <Stack alignItems="flex-end" sx={{ pt: 2 }}>
                <Stack sx={{ width: '50%', p: 2 }}>
                    <Typography variant="h5" > VEHICLE DESCRIPTION </Typography>
                    
                    <TableContainer elevation={0} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>
        </Stack>
    )
}
