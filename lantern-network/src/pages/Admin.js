import React, { useState } from 'react'
// import EmployeeForm from "./EmployeeForm";
// import PageHeader from "../../components/PageHeader";
// import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Collapse, Box, Typography, Table, TableHead } from '@material-ui/core';
import useTable from "../components/useTable";
// import * as employeeService from "../../services/employeeService";
// import Controls from "../../components/controls/Controls";
// import { Search } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    }
}))


const headCells = [
    { id: 'fullName', label: 'Mentor' },
    { id: 'mentees', label: 'Mentees' },
    { id: 'email', label: 'Email' },
    { id: 'occupation', label: 'Occupation' },
    { id: 'pronouns', label: 'Pronouns' },
    { id: 'backgroundCheck', label: 'Background Check' },
    { id: 'training', label: 'Training' },
]

const payload = [
    {
        "fullName": "Cayla S",
        "email": "@",
        "occupation": "Business",
        "pronouns": "she/her",
        "backgroundCheck": "",
        "training": "",


    },
    {
        "fullName": "Rob R",
        "email": "@",
        "occupation": "Business",
        "pronouns": "he/him",
        "backgroundCheck": "Done",
        "training": "Done",

    },
    {
        "fullName": "Patrick B",
        "email": "@",
        "occupation": "Tech",
        "pronouns": "he/him",
        "backgroundCheck": "",
        "training": "Done",

    },
    {
        "fullName": "Chris P",
        "email": "@",
        "occupation": "Business",
        "pronouns": "he/him",
        "backgroundCheck": "Done",
        "training": "",

    }
]
const mentees = [
    {
        "name" : "test",
        "pronoun" : "they/them"
    }
]
export default function Admin() {



    const classes = useStyles();
    const [records, setRecords] = useState(payload);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [open, setOpen] = React.useState(false);
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>

            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
                {/* <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar> */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.fullName}</TableCell>
                                <TableCell onClick={() => setOpen(!open)}>Click</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.occupation}</TableCell>
                                <TableCell>{item.pronouns}</TableCell>
                                <TableCell>{item.backgroundCheck}</TableCell>
                                <TableCell>{item.training}</TableCell>
                            </TableRow>

                            )
                            )
                        }
                        <TableRow>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        History
                                    </Typography>
                                    <Table size="small" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Mentee</TableCell>
                                                <TableCell>Pronoun</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {
                                                mentees.map(item =>
                                                (<TableRow key={item.id}>
                                                    <TableCell>{item.name}</TableCell>
                                                    <TableCell>{item.pronoun}</TableCell>
                                                </TableRow>

                                                )
                                                )
                                            }

                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableRow>
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </>
    )
}