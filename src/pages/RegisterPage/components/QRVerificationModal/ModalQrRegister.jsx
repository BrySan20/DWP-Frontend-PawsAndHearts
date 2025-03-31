import React, { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  FormControlLabel, 
  Checkbox,
  CircularProgress
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

const ModalQrRegister = ({ open, onClose, qrCodeUrl, onConfirm, isLoading }) => {
  const [hasScanned, setHasScanned] = useState(false);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Configurar Autenticación de Dos Factores</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
          <Typography variant="body1" align="center">
            Escanea este código QR con la aplicación Google Authenticator para configurar
            la autenticación de dos factores.
          </Typography>
          
          {qrCodeUrl ? (
            <Box sx={{ 
              p: 2, 
              border: "1px solid #ccc", 
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              bgcolor: "#fff"
            }}>
              <QRCodeSVG value={qrCodeUrl} size={200} />
            </Box>
          ) : (
            <CircularProgress />
          )}
          
          <Typography variant="body2" align="center" color="text.secondary">
            Una vez que hayas escaneado el código, marca la casilla de abajo para continuar con el registro.
          </Typography>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={hasScanned}
                onChange={(e) => setHasScanned(e.target.checked)}
                color="primary"
              />
            }
            label="He escaneado el código QR"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose}
          color="inherit"
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm}
          variant="contained"
          disabled={!hasScanned || isLoading}
          sx={{ backgroundColor: "#FFB74D", color: "black" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Completar Registro"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalQrRegister;