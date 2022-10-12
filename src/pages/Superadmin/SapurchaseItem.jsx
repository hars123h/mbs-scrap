import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const Users = [
  {
    id: 1,
    selected: false,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    vessel: "dummy",
    desc: "dummy",
    title: "dummy",
    img: "imgurl",
    lotNo:23930,
    purchaseDate:Date.now()
  },
  {
    id: 2,
    selected: false,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    vessel: "dummy",
    desc: "dummy",
    title: "dummy",
    img: "imgurl",
    lotNo:23930,
    purchaseDate:Date.now()
  },
  {
    id: 3,
    selected: false,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    vessel: "dummy",
    desc: "dummy",
    title: "dummy",
    img: "imgurl",
    lotNo:23930,
    purchaseDate:Date.now()
  },
  {
    id: 4,
    selected: true,
    name: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
    vessel: "dummy",
    desc: "dummy",
    title: "dummy",
    img: "imgurl",
    lotNo:23930,
    purchaseDate:Date.now()
  },
  {
    id: 5,
    selected: false,
    name: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
    vessel: "dummy",
    desc: "dummy",
    title: "dummy",
    img: "imgurl",
    lotNo:23930,
    purchaseDate:Date.now()
  },
];

function SapurchaseItem() {
  const [MasterChecked, setMasterChecked] = useState(false)
  const [List, setList] = useState(Users)
  const [SelectedList, setSelectedList] = useState([])
  // Select/ UnSelect Table rows
  const onMasterCheck = (e) => {
    let tempList = List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    setMasterChecked(e.target.checked,)
    setSelectedList(List.filter((e) => e.selected))
    setList(tempList)
  }

  // Update List Item's state and Master Checkbox State
  const onItemCheck = (e, item) => {
    let tempList = List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    setMasterChecked(totalItems === totalCheckedItems)
    setList(tempList)
    setSelectedList(List.filter((e) => e.selected))

  }

  // Event to get selected rows(Optional)
  const getSelectedRows = () => {
    setSelectedList(List.filter((e) => e.selected))

  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8a28d9",
      color: theme.palette.common.white,
    },
  }));

  return (
    <div className="">
      <div className="">
        <div className="c">
          <Table>
            <TableHead className='sapurchase__table__head'>
              <TableRow>
                <StyledTableCell>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={MasterChecked}
                    id="mastercheck"
                    onChange={(e) => onMasterCheck(e)}
                  /></StyledTableCell>
                <StyledTableCell>Customer Name</StyledTableCell>
                <StyledTableCell>Chessis No.</StyledTableCell>
                <StyledTableCell>Auction No.</StyledTableCell>
                <StyledTableCell>Lot No.</StyledTableCell>
                <StyledTableCell>Purcahse Date</StyledTableCell>
                <StyledTableCell>Yard Destination</StyledTableCell>
                <StyledTableCell>C&F Price</StyledTableCell>
                <StyledTableCell>Vessel</StyledTableCell>
                <StyledTableCell>Inspection</StyledTableCell>
                <StyledTableCell>Upload Docs</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className='sapurchase__table__body'>
              {
                List.map((user) => (
                  <TableRow>

                    <TableCell>
                      <input
                        type="checkbox"
                        checked={user.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        onChange={(e) => onItemCheck(e, user)}
                      /></TableCell>
                    <TableCell> {user.website}</TableCell>
                    <TableCell> {user.email}</TableCell>
                    <TableCell> {user.name}</TableCell>
                    <TableCell> {user.lotNo}</TableCell>
                    <TableCell> {user.purchaseDate}</TableCell>
                    <TableCell> {user.title}</TableCell>
                    <TableCell className='sapurchase__table__body__input'><input type="text" name="" id="" /></TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell> {user.vessel}</TableCell>
                    <TableCell> {user.img}</TableCell>
                  </TableRow>
                )

                )
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );

}

export default SapurchaseItem;