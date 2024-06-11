import DashboardLayout from '../layout';
import { Box } from '@mui/material';
import VehicleList from './vehicleList';


function Vehicles() {
    return (
        <DashboardLayout>
            <Box width="100%">
                <VehicleList />
            </Box>
        </DashboardLayout>
    );
}

export default Vehicles;
