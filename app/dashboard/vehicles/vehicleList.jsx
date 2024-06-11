/* eslint-disable react/jsx-key */
'use client'

import vehicleServices from "@/app/services/vehicleServices";
import UserTableEmptyRows from "@/components/shared/customTable/UserTableEmptyRows";
import UsersTableHead from "@/components/shared/customTable/UserTableHead";
import UserTableRow from "@/components/shared/customTable/UserTableRow";
import UserTableToolbar from "@/components/shared/customTable/UserTableToolbar";
import { emptyRows } from "@/components/shared/customTable/utils";
import useFetchData from "@/hooks/fetchData";
import { Button, Card, Container, Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { useRouter } from "next/navigation";


const VehicleList = () => {

    const { data } = useFetchData(vehicleServices.getVehicle)
    console.log("data", data)

    const dataFiltered = data
    const router = useRouter()



    return (
        <Container>
            <Card sx={{ borderRadius: '8px' }}>

                <UserTableToolbar title="All Vehicles">
                    <Button variant="primary" onClick={() => router.push('/dashboard/addvehicle')}>
                        Add new vehicle
                    </Button>
                </UserTableToolbar>

                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                        <UsersTableHead
                            rowCount={dataFiltered?.length}
                            headLabel={[
                                { id: 'model', label: 'Model' },
                                { id: 'price', label: 'Price' },
                                { id: 'phone', label: 'Phone' },
                                { id: 'city', label: 'City' },
                            ]}
                        />
                        <TableBody>
                            {Array.isArray(dataFiltered) && dataFiltered.length > 0
                                ? dataFiltered.map((row) => (
                                    <UserTableRow
                                        key={row.model}
                                        data={{

                                            model: row.carModel,
                                            price: row.price,
                                            phone: row.phone,
                                            city: row.city,
                                            status: row.status
                                        }}
                                    />
                                ))
                                : null}

                            <UserTableEmptyRows
                                height={77}
                                emptyRows={emptyRows(dataFiltered?.length)}
                            />

                        </TableBody>
                    </Table>
                </TableContainer>

            </Card>
        </Container>
    );
};

export default VehicleList;
