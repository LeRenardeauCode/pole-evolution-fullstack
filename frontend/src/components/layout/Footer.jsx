import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import parametreService from "@services/parametreService";

import mapImgDefault from "@/assets/images/google_map.png";
import banniereImgDefault from "@/assets/images/ENSEIGNE.jpg";

const Footer = () => {
  const [footerData, setFooterData] = useState({
    adresseLigne1: "1412 Rue Joffre",
    adresseLigne2: "62680 RUMAUCOURT",
    description:
      "Rumaucourt est un petit village à 3 minutes de Baralle/Marquion.",
    distanceCambrai: "25 minutes de Cambrai",
    distanceDouai: "25 minutes de Douai",
    distanceArras: "Environ 30 minutes d'Arras",
    facebookUrl: "https://facebook.com/poleevolution",
    instagramUrl: "https://instagram.com/poleevolution",
    tiktokUrl: "https://tiktok.com/@poleevolution",
    mapImage: mapImgDefault,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterParams = async () => {
      try {
        const response =
          await parametreService.getParametresByCategorie("footer");

        const params = response.data || response;

        if (!Array.isArray(params)) {
          console.error("Les paramètres ne sont pas un tableau:", params);
          setLoading(false);
          return;
        }

        const paramsMap = {};
        params.forEach((param) => {
          paramsMap[param.cle] = param.valeur;
        });

        setFooterData({
          adresseLigne1:
            paramsMap.footer_adresse_ligne1 || footerData.adresseLigne1,
          adresseLigne2:
            paramsMap.footer_adresse_ligne2 || footerData.adresseLigne2,
          description: paramsMap.footer_description || footerData.description,
          distanceCambrai:
            paramsMap.footer_distance_cambrai || footerData.distanceCambrai,
          distanceDouai:
            paramsMap.footer_distance_douai || footerData.distanceDouai,
          distanceArras:
            paramsMap.footer_distance_arras || footerData.distanceArras,
          facebookUrl: paramsMap.footer_facebook_url || footerData.facebookUrl,
          instagramUrl:
            paramsMap.footer_instagram_url || footerData.instagramUrl,
          tiktokUrl: paramsMap.footer_tiktok_url || footerData.tiktokUrl,
          mapImage: paramsMap.footer_map_image
            ? `${import.meta.env.VITE_API_URL}${paramsMap.footer_map_image}`
            : mapImgDefault,
        });
      } catch (error) {
        console.error("Erreur chargement paramètres footer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "text.primary",
        color: "white",
        pt: 8,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 250, sm: 350, md: 400 },
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 4,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.990939667303!2d3.058239577007313!3d50.23607417155207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2b76852303691%3A0xd36cbdcffbec3944!2sp%C3%B4le%20evolution!5e0!3m2!1sfr!2sfr!4v1770367224217!5m2!1sfr!2sfr"
                width="700px"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Pole Evolution"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} alignContent="center">
            <Stack spacing={3}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  textTransform: "uppercase",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                OÙ TROUVER NOTRE SALLE DE POLE DANCE ?
              </Typography>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "white",
                    mb: 0.5,
                    textAlign: "center",
                  }}
                >
                  {footerData.adresseLigne1}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: "white",
                    mb: 3,
                    textAlign: "center",
                  }}
                >
                  {footerData.adresseLigne2}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    opacity: 0.9,
                    lineHeight: 1.8,
                    textAlign: "center",
                  }}
                >
                  {footerData.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    opacity: 0.9,
                    lineHeight: 1.8,
                  }}
                >
                  - {footerData.distanceCambrai}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    opacity: 0.9,
                    lineHeight: 1.8,
                  }}
                >
                  - {footerData.distanceDouai}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    opacity: 0.9,
                    lineHeight: 1.8,
                  }}
                >
                  - {footerData.distanceArras}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mb: 4 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Box
              component="img"
              loading="lazy"
              src={banniereImgDefault}
              alt="Pole Evolution"
              sx={{
                height: { xs: 40, md: 50 },
                width: "auto",
              }}
            />

            <Stack direction="row" spacing={2}>
              <IconButton
                component="a"
                href={footerData.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s",
                }}
              >
                <FaFacebook size={28} />
              </IconButton>

              <IconButton
                component="a"
                href={footerData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s",
                }}
              >
                <FaInstagram size={28} />
              </IconButton>

              <IconButton
                component="a"
                href={footerData.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s",
                }}
              >
                <FaTiktok size={28} />
              </IconButton>
            </Stack>
          </Stack>

          <Divider
            sx={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
            }}
          />
        </Box>

        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                opacity: 0.7,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              © {new Date().getFullYear()} Pole Evolution - Tous droits réservés
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 3 }}
              justifyContent={{ xs: "center", md: "flex-end" }}
              alignItems="center"
              flexWrap="wrap"
            >
              <MuiLink
                component={Link}
                to="/politique-confidentialite"
                sx={{
                  color: "white",
                  opacity: 0.7,
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "primary.main",
                    opacity: 1,
                  },
                  transition: "all 0.3s",
                }}
              >
                Politique de confidentialité
              </MuiLink>

              <MuiLink
                component={Link}
                to="/mentions-legales"
                sx={{
                  color: "white",
                  opacity: 0.7,
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "primary.main",
                    opacity: 1,
                  },
                  transition: "all 0.3s",
                }}
              >
                Mentions légales
              </MuiLink>

              <MuiLink
                component={Link}
                to="/politique-cookies"
                sx={{
                  color: "white",
                  opacity: 0.7,
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "primary.main",
                    opacity: 1,
                  },
                  transition: "all 0.3s",
                }}
              >
                Politique des cookies
              </MuiLink>

              <MuiLink
                component={Link}
                to="/reglement-interieur"
                sx={{
                  color: "white",
                  opacity: 0.7,
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "primary.main",
                    opacity: 1,
                  },
                  transition: "all 0.3s",
                }}
              >
                Règlement intérieur
              </MuiLink>

              <MuiLink
                component={Link}
                to="/contact"
                sx={{
                  color: "white",
                  opacity: 0.7,
                  textDecoration: "none",
                  fontSize: "14px",
                  "&:hover": {
                    color: "primary.main",
                    opacity: 1,
                  },
                  transition: "all 0.3s",
                }}
              >
                Contact
              </MuiLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
