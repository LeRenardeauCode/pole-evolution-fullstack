export const headerTitle = { mb: 3, fontWeight: 700 };
export const cardBorder = { border: '1px solid #e0e0e0' };
export const fieldMb = { mb: 2 };
export const createButton = { mt: 2 };
export const sectionTitle = { mb: 2, fontWeight: 600 };
export const centerBox = { textAlign: 'center', py: 4 };
export const tableHeaderRow = { bgcolor: 'grey.100' };
export const dialogTitle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
export const loadingBox = { display: 'flex', justifyContent: 'center', p: 3 };
export const alertMt2 = { mt: 2 };
export const tableContainerMt2 = { mt: 2 };
export const summaryBox = { mt: 3, p: 2, bgcolor: '#F5F5F5', borderRadius: 1 };
export const fieldMt2 = { mt: 2 };
export const tabsBorder = { mb: 3, borderBottom: 1, borderColor: 'divider' };
export const flexCenterGap = { display: 'flex', alignItems: 'center', gap: 1 };
export const flexGap1 = { display: 'flex', gap: 1 };
export const mr1 = { mr: 1 };
export const mt2mb2 = { mt: 2, mb: 2 };
export const navyDialogTitle = { bgcolor: 'navy.main', color: 'white', fontWeight: 700 };
export const dialogContentPt3 = { pt: 3 };
export const bodyMb1 = { mb: 1 };
export const bodyMb3 = { mb: 3 };
export const dialogActionsPadding = { p: 2 };

export const layoutFullHeight = { display: 'flex', minHeight: '100vh' };
export const leftPanel = {
  flex: { xs: '0 0 100%', md: '0 0 30%' },
  background:
    'linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: 4,
};
export const logoImg = { width: 300, height: 'auto', mb: 3 };
export const titleH3 = { fontSize: '2.5rem', fontWeight: 800, color: 'white', textAlign: 'center' };
export const subtitlePrimary = { fontSize: '1.2rem', fontWeight: 600, color: 'primary.main', textAlign: 'center', mt: 2 };
export const rightPanel = { flex: 1, backgroundColor: '#100249', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, md: 6 } };

export const textFieldWhite = { mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0, backgroundColor: 'white' } };
export const textFieldWhiteHelper = { mb: 4, '& .MuiOutlinedInput-root': { borderRadius: 0, backgroundColor: 'white' }, '& .MuiFormHelperText-root': { color: 'white' } };
export const smallWhiteText = { color: 'white', fontSize: '0.9rem', mb: 4 };
export const whiteText = { color: 'white' };
export const whiteTextMb2 = { color: 'white', mb: 2 };
export const whiteTextMb1 = { color: 'white', mb: 1 };
export const linkPrimary = { color: 'primary.main', fontSize: '0.9rem', mb: 2, display: 'block', textDecoration: 'underline', cursor: 'pointer' };
export const radioPrimary = { color: 'primary.main' };
export const primaryButton = { backgroundColor: 'transparent', border: '2px solid', borderColor: 'primary.main', borderRadius: 3, color: 'primary.main', py: 1.5, fontSize: '1rem', fontWeight: 600, '&:hover': { background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)', color: 'white' } };
export const primaryButtonDisabled = { '&:disabled': { borderColor: 'grey.500', color: 'grey.500' } };
export const fullWidthButtonPx = { px: 4, width: { xs: '100%', sm: 'auto' } };

export default {
  headerTitle,
  cardBorder,
  fieldMb,
  createButton,
  sectionTitle,
  centerBox,
  tableHeaderRow,
  dialogTitle,
  loadingBox,
  alertMt2,
  tableContainerMt2,
  summaryBox,
  fieldMt2,
  tabsBorder,
  flexCenterGap,
  flexGap1,
  mr1,
  mt2mb2,
  navyDialogTitle,
  dialogContentPt3,
  bodyMb1,
  bodyMb3,
  dialogActionsPadding,
  layoutFullHeight,
  leftPanel,
  logoImg,
  titleH3,
  subtitlePrimary,
  rightPanel,
  textFieldWhite,
  textFieldWhiteHelper,
  smallWhiteText,
  whiteText,
  whiteTextMb2,
  whiteTextMb1,
  linkPrimary,
  radioPrimary,
  primaryButton,
  primaryButtonDisabled,
  fullWidthButtonPx,
};
