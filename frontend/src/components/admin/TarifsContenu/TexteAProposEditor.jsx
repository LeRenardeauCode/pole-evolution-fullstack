import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

export default function TexteAProposEditor({
  texteAPropos,
  onTextChange,
  onSave,
  loading,
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Modifier le texte de présentation (page "À propos")
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={8}
          value={texteAPropos}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Texte de présentation de Coraline..."
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={onSave}
          disabled={loading}
        >
          Enregistrer le texte
        </Button>
      </CardContent>
    </Card>
  );
}
