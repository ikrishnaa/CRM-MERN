import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { getCustomers, deleteCustomer, changeStatus } from '../services/api.js';
import { Link } from "react-router-dom";

import styled from 'styled-components';


const StyleTable = styled(Table)`
    width: 90%;
    margin: 50px auto 0 auto;
`;

const TableHead1 = styled(TableHead)`
  background-color: #f7f7f7;
`;

const THead = styled(TableRow)`
    & > th:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    }

  & > th:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    }
    & > th {
        font-size: 20px;
        background-color:#054F81;
        color: #fff;
        text-align: center;
        padding: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 2px solid #fff;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
        font-weight: bold;


    }
`;


const TBody = styled(TableRow)`
    & > td{
        font-size: 18px;
        text-align: center;

    }
`;

const Loading = styled.div`
  opacity: ${props => props.isLoading ? 0 : 2};
  transition: opacity 0.3s ease-in-out;
`;

const Pending = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 20);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const [customers, setCustomer] = useState([]);



    useEffect(() => {
        getAllCustomers();
    }, []);



    const getAllCustomers = async () => {
        let response = await getCustomers();
        const pendingCustomer = response.data.filter(e => e.status === 'pending');
        setCustomer(pendingCustomer);

    }

    const deleteCustomerDetails = async (id) => {
        await deleteCustomer(id);
        getAllCustomers();
    }

    const markChecked = async (id, newStatus) => {
        try {
            await changeStatus(id, newStatus);
            getAllCustomers();
        } catch (error) {
            console.log('Error while marking customer as checked', error);
        }
    }

    return (
        <Loading isLoading={isLoading}>
            {isLoading ? <div>Loading...</div> : (
                <div>
                    <StyleTable>
                        <TableHead1>
                            <THead>
                                <TableCell>Id</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Device</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Problem</TableCell>
                                <TableCell>Cost</TableCell>
                                <TableCell>Note</TableCell>
                                <TableCell>Actions</TableCell>
                            </THead>
                        </TableHead1>
                        <TableBody>
                            {
                                customers.map(customer => (
                                    <TBody key={customer._id}>
                                        <TableCell>{customer._id}</TableCell>
                                        <TableCell>{customer.date + ' @ ' + customer.time}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.mobile}</TableCell>
                                        <TableCell>{customer.device}</TableCell>
                                        <TableCell>{customer.brand}</TableCell>
                                        <TableCell>{customer.problem}</TableCell>
                                        <TableCell>{customer.cost}</TableCell>
                                        <TableCell>{customer.note}</TableCell>
                                        <TableCell>
                                            <Button variant='contained' style={{ marginRight: 10 }} onClick={() => markChecked(customer._id, 'checked')}>Checked</Button>
                                            <Button variant='contained' style={{ marginRight: 10 }} color="secondary" component={Link} to={`/edit/${customer._id}`}>Edit</Button>
                                            <Button><DeleteIcon color='error' onClick={() => deleteCustomerDetails(customer._id)} /></Button>
                                        </TableCell>

                                    </TBody>
                                ))
                            }

                        </TableBody>
                    </StyleTable>
                </div>
            )}
        </Loading>
    );


}

export default Pending;