export const colors = {
  lightBlue: '#7FC4FD',
  darkBlue: '#2699FB',
  white: '#fff',
};

export const card = {
  display: 'flex',
  backgroundColor: colors.white,
  borderRadius: 4,
  height: 200,
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  shadowOpacity: 0.2,
};

export const cardHeader = {
  backgroundColor: colors.lightBlue,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  height: '25%',
};

export const boldWhite = {
  fontWeight: 'bold',
  color: colors.white,
  textAlign: 'center',
  paddingVertical: 15,
};

export const container = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.darkBlue,
};

export const interiorContainer = {
  display: 'flex',
  marginTop: 60,
};

export const cardContainer = {
  marginTop: 60,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
