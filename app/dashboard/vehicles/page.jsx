import VehicleList from './VehicleList';
import DashboardLayout from '../layout';
import { Box } from '@mui/material';


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
