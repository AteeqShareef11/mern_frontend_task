import DashboardLayout from '../layout';
import { Container } from '@mui/material';
import VehicleForm from './vehicleForm';


function AddVehicles() {
    return (
        <DashboardLayout>
            <Container maxWidth="md">
                <VehicleForm />
            </Container>
        </DashboardLayout>
    );
}

export default AddVehicles;
