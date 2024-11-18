import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Grid, TextField, Button, CircularProgress } from '@mui/material'
import { useDropzone } from 'react-dropzone'

function ImageWatermarking() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [watermarkText, setWatermarkText] = useState('')
  const [watermarking, setWatermarking] = useState(false)
  const [watermarkedPreview, setWatermarkedPreview] = useState(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setImage(file)
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setWatermarkedPreview(null)
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      if (watermarkedPreview) URL.revokeObjectURL(watermarkedPreview)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  })

  const handleWatermark = async () => {
    if (!image || !watermarkText) return
    
    setWatermarking(true)
    try {
      // Simulated watermarking process
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In a real implementation, you would process the image here
      setWatermarkedPreview(preview) // For demo, just using the same image
    } catch (error) {
      console.error('Watermarking failed:', error)
    } finally {
      setWatermarking(false)
    }
  }

  const dropzoneStyle = {
    p: 2,
    textAlign: 'center',
    cursor: 'pointer',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed',
    borderColor: isDragActive ? 'primary.main' : 'grey.300',
    borderRadius: 1,
    bgcolor: isDragActive ? 'action.hover' : 'background.paper',
    transition: 'all 0.2s ease'
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        Image Watermarking
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box {...getRootProps()} sx={dropzoneStyle}>
              <input {...getInputProps()} />
              {preview ? (
                <Box sx={{ width: '100%', position: 'relative' }}>
                  <img 
                    src={preview} 
                    alt="Original" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: 400,
                      objectFit: 'contain'
                    }} 
                  />
                  <Typography variant="caption" sx={{ mt: 1 }}>
                    {image.name}
                  </Typography>
                </Box>
              ) : (
                <Typography>
                  Drag and drop image here or click to select
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Watermark Settings
            </Typography>
            <TextField
              fullWidth
              label="Watermark Text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={handleWatermark}
              disabled={!image || !watermarkText || watermarking}
              fullWidth
              sx={{ mt: 2 }}
            >
              {watermarking ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                  Adding Watermark...
                </>
              ) : (
                'Add Watermark'
              )}
            </Button>
          </Paper>
        </Grid>

        {watermarkedPreview && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Watermarked Result
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src={watermarkedPreview} 
                  alt="Watermarked" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 400,
                    objectFit: 'contain'
                  }} 
                />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default ImageWatermarking
