export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (process.env.NODE_ENV === "development") {
    console.error("Erreur:", err);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = {
      success: false,
      message: message.join(", "),
      statusCode: 400,
    };
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Le champ "${field}" existe déjà. Veuillez utiliser une autre valeur.`;
    error = {
      success: false,
      message,
      statusCode: 400,
    };
  }

  if (err.name === "CastError") {
    const message = `Ressource non trouvée avec l'ID: ${err.value}`;
    error = {
      success: false,
      message,
      statusCode: 404,
    };
  }

  const debugInfo = process.env.NODE_ENV === "development" ? { stack: err.stack } : {};

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Erreur serveur interne",
    ...debugInfo,
  });
};
