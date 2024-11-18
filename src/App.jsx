import React, { useState } from 'react'
import { Box, Container, Tab, Tabs, Typography, AppBar, Toolbar } from '@mui/material'
import ImageComparison from './components/ImageComparison'
import ImageWatermarking from './components/ImageWatermarking'
import DocumentComparison from './components/DocumentComparison'

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: '24px 0' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function App() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img 
            src="https://raw.githubusercontent.com/noumanjavaid96/ai-as-an-api/refs/heads/master/image%20(39).png" 
            alt="Centurion Logo"
            style={{ width: 40, marginRight: 16 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Centurion Analysis Tool
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Image Comparison" />
            <Tab label="Image Watermarking" />
            <Tab label="Document Comparison" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <ImageComparison />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ImageWatermarking />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <DocumentComparison />
        </TabPanel>
      </Container>
    </Box>
  )
}

export default App
