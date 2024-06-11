'use client'

import { Box } from "@mui/material";


export default function DashboardLayout({ children }) {


    return (
        <div style={{ display: 'flex' }}>
            <main style={{ width: "100%" }}>
                <Box width="100%">
                    {children}
                </Box>
            </main>
        </div>
    );
}
